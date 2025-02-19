<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\AcknowledgementController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\NotificationController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


// Authenticated routes
Route::group(['middleware' => ['auth:sanctum']] ,function () {

    // Forms
    Route::prefix('forms')->group(function () { 
        Route::get('/',[FormController::class,'index']);
        Route::get('/info',[FormController::class,'info']);
        Route::post('/store',[FormController::class,'store']);
        Route::put('/update',[FormController::class,'update']);
        Route::delete('/delete',[FormController::class,'delete']);
        Route::get('/categories',[FormController::class,'categories']);
    });


    // Acknowledgements 
    Route::prefix('acknowledgements')->group(function () { 
        Route::get('/',[AcknowledgementController::class,'index']);
    });

    // Staffs
    Route::prefix('staffs')->group(function () { 
        Route::get('/',[StaffController::class,'index']);
    });

    // Notifications
    Route::prefix('notifications')->group(function () { 
        Route::get('/',[NotificationController::class,'index']);
    });
});



Route::post('/login',[AuthController::class, 'staffLogin']);
Route::post('/login/admin',[AuthController::class, 'adminLogin']);
Route::post('/logout',[AuthController::class, 'logout']);
Route::post('/password/update',[AuthController::class,'update']);
