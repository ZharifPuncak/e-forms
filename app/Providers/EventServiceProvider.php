<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Illuminate\Support\Facades\Event;
use App\Events\IssuanceDispatched;
use App\Listeners\Issuance\AddUser;
use App\Listeners\Issuance\SendAnnoucement;
use App\Listeners\Issuance\SendReminder;

class EventServiceProvider extends ServiceProvider
{

    
    protected $listen = [
        IssuanceDispatched::class => [
            AddUser::class,
            SendAnnoucement::class,
            SendReminder::class,
        ],
    ];

    public function boot()
    {
       
    }
}
