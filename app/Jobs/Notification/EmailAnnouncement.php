<?php

namespace App\Jobs\Notification;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Mail\Notification\Annoucement;
use Illuminate\Support\Facades\Mail;

class EmailAnnouncement implements ShouldQueue
{
    use Queueable;


    public $email;
    public $data;
    public function __construct($email, $data)
    {
        $this->email = $email;
        $this->data = $data;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Mail::to($this->email)->send(new Annoucement($data));
    }
}
