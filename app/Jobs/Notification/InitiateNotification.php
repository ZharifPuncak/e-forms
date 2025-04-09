<?php

namespace App\Jobs\Notification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Jobs\Notification\EmailAnnouncement;
use App\Jobs\Notification\EmailReminder;

use App\Models\Form\FormAcknowledgement;
use Carbon\Carbon;

class InitiateNotification implements ShouldQueue
{
    use Queueable;

    public $issuance;
    public $type;

    public function __construct($data,$type)
    {
       $this->issuance = $data; 
       $this->type = $type;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $acknowledgements = FormAcknowledgement::with('staff.user')->whereHas('staff',function($query){
            $query->where('status','active');
        })->where(['form_id' => $this->issuance?->form?->id])->get();

            foreach($acknowledgements as $acknowledgement){
                if($acknowledgement){

                    $email = $acknowledgement->staff->user->email;
                    $name = $acknowledgement->staff->user->name;

                    // Check effective end.
                    if(Carbon::now()->format('Y-m-d') > Carbon::parse($this->issuance->form->effective_to)->format('Y-m-d')) return;
    
                        if($email && $name){
    
                                //Schedule Announcement :
                                if($this->type == 'announcement'){
                                    if(Carbon::now()->format('Y-m-d') >= Carbon::parse($this->issuance?->form?->effective_from)->format('Y-m-d')){
                                        EmailAnnouncement::dispatch($email,$this->issuance, $name)->delay(Carbon::now()->addSeconds(5));
                                    }
                                }
                           
                                
                                //Schedule Reminder :
                                if($this->type == 'reminder'){
                                    EmailReminder::dispatch($email,$this->issuance, $name)->delay(Carbon::now()->addSeconds(5));
                                }
                                     
                        }
                     }
              }
      }
}
