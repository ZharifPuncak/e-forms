<?php

namespace App\Listeners\Issuance;

use App\Events\IssuanceDispatched;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendReminder implements ShouldQueue
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
        
    }
}
