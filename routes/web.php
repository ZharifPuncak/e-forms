<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReportController;



//Fallback URL
Route::get('/{any?}', function () {
    return view('layouts.app');
})->where('any', '^(?!api\/)[\/\w\.\,-]*');


require __DIR__.'/auth.php';
