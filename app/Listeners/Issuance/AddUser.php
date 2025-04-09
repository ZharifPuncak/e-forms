<?php

namespace App\Listeners\Issuance;

use App\Events\IssuanceDispatched;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\Form\FormIssuance;

use App\Models\Staff\Staff;
use App\Models\Form\FormAcknowledgement;

use App\Jobs\Notification\EmailAnnouncement;
use App\Jobs\Notification\EmailReminder;
use App\Jobs\Notification\InitiateNotification;

use Carbon\Carbon;

class AddUser implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(IssuanceDispatched $event): void
    {

        $issuance = FormIssuance::with('form','companies')->where('id',$event->issuanceId)->first();

        if($issuance){

            if($issuance->companies){

                foreach($issuance->companies as $company){

                   // Get staff for selected companies of the issuance 
                    $staffs = Staff::with('user')->where('status','active')->whereHas('details', function($query) use($company){
                        return $query->where('company_id',$company->company_id);
                    })->get();

                    // Check if form already closed
                    if($issuance->form->status == 'closed') return;

                    // Assign staff with acknowledgements
                        foreach($staffs as $staff){
                            if($staff){
                                FormAcknowledgement::create(['staff_id' => $staff['id'], 'form_id' => $issuance->form->id, 'form_issuance_id' => $event->issuanceId ]);

                                // Check effective end.
                                if(Carbon::now()->format('Y-m-d') > Carbon::parse($issuance->form->effective_to)->format('Y-m-d')) return;

                            }
                        }
                }
            }

             // Initiate Announcement :
             if(Carbon::now()->format('Y-m-d') >= Carbon::parse($issuance?->form?->effective_from)->format('Y-m-d')){
                InitiateNotification::dispatch($issuance,'announcement')->delay(Carbon::parse($issuance?->issued_at));
             }
                    
             // Initiate Reminder :
             InitiateNotification::dispatch($issuance,'reminder')->delay(Carbon::parse($issuance?->deadlined_at));     

        }

  
    }
}
