<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\IssuanceController;
use App\Http\Controllers\AcknowledgementController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SharedController;

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
        Route::put('/confirm',[FormController::class,'confirm']);
        Route::put('/update',[FormController::class,'update']);
        Route::post('/delete',[FormController::class,'delete']);
        Route::get('/categories',[FormController::class,'categories']);
        Route::get('/details/{code}',[FormController::class,'details']);

         //Files
        Route::prefix('files')->group(function () { 
            Route::get('/{code}',[FileController::class,'index']);
            Route::post('/upload',[FileController::class,'upload']);
            Route::post('/delete',[FileController::class,'delete']);
        });

        //Issuances
        Route::prefix('issuances')->group(function () { 
            Route::get('/{code}',[IssuanceController::class,'index']);
            Route::post('/store',[IssuanceController::class,'store']);
            Route::put('/update',[IssuanceController::class,'update']);
            Route::post('/delete',[IssuanceController::class,'delete']);
            Route::put('/dispatch',[IssuanceController::class,'dispatch']);
        });
    });

    // Acknowledgements 
    Route::prefix('acknowledgements')->group(function () { 
        Route::get('/{code}',[AcknowledgementController::class,'index']);
        Route::get('/info/{code}',[AcknowledgementController::class,'info']);
    });

    // Shared
    Route::prefix('shared')->group(function () { 
        Route::get('/companies',[SharedController::class,'companies']);
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
