<?php

namespace App\Listeners\Issuance;

use App\Events\IssuanceDispatched;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

use App\Models\Form\FormIssuance;

use App\Models\Staff\Staff;
use App\Models\Form\FormAcknowledgement;

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
                    $staffs = Staff::whereHas('details', function($query) use($company){
                        return $query->where('company_id',$company->id);
                    })->get();

                    // Assign staff with acknowledgements
                        foreach($staffs as $staff){
                            if($staff){
                                FormAcknowledgement::create(['staff_id' => $staff['id'], 'form_id' => $issuance->form->id]);
                            }
                        }
                }
            }

        }

  
    }
}
