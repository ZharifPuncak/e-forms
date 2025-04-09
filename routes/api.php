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
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ManualController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;


    
        Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
            return $request->user();
        });


        // Authenticated routes
        Route::group(['middleware' => ['auth:sanctum']] ,function () {


        // Dashboard
        Route::prefix('dashboard')->group(function () { 
            Route::get('/acknowledgements',[DashboardController::class,'acknowledgements'])->middleware(['permission:dashboard.view_overview']);
        });

        // Forms
        Route::prefix('forms')->group(function () { 
            
            //Forms
            Route::middleware(['permission:form.view_form'])->group(function () { 
                Route::get('/',[FormController::class,'index']);
                Route::get('/info',[FormController::class,'info']);
                Route::get('/categories',[FormController::class,'categories']);
                Route::get('/details/{code}',[FormController::class,'details']);
                Route::get('/acknowledgement/info/{code}',[FormController::class,'acknowledgementInfo']);
                Route::get('/acknowledgement/{code}',[FormController::class,'acknowledgement']);
            });
            
            //Forms
            Route::post('/store',[FormController::class,'store'])->middleware(['permission:form.create_form']);
            Route::post('/delete',[FormController::class,'delete'])->middleware(['permission:form.delete_form']);
       
            Route::middleware(['permission:form.update_form'])->group(function () { 
                 
               //Forms
                Route::post('/confirm',[FormController::class,'confirm']);
                Route::post('/update',[FormController::class,'update']);
                Route::post('/close',[FormController::class,'close']);

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
                    Route::post('/update',[IssuanceController::class,'update']);
                    Route::post('/delete',[IssuanceController::class,'delete']);
                    Route::post('/dispatch',[IssuanceController::class,'dispatch']);
                });
            });


        });

            // Acknowledgements 
            Route::prefix('acknowledgements')->group(function () { 
                Route::get('/',[AcknowledgementController::class,'index']);
                Route::get('/info',[AcknowledgementController::class,'info']);
                Route::get('/details/{code}',[AcknowledgementController::class,'details']);
                Route::post('/sign',[AcknowledgementController::class,'signature']);
            });

      

            // Staffs
            Route::prefix('staffs')->group(function () { 

                Route::middleware(['permission:stf.view_staff'])->group(function () { 
                    Route::get('/',[StaffController::class,'index']);
                    Route::get('/details/{staffNo}',[StaffController::class,'details']);
                    Route::get('/info',[StaffController::class,'info']);
                });

                Route::middleware(['permission:stf.create_staff'])->group(function () { 
                    Route::post('/store',[StaffController::class,'store']);
                });


                Route::middleware(['permission:stf.update_staff'])->group(function () { 
                    Route::post('/update',[StaffController::class,'update']);
                    Route::post('/confirm',[StaffController::class,'confirm']);
                });

                Route::middleware(['permission:stf.delete_staff'])->group(function () { 
                    Route::post('/delete',[StaffController::class,'delete']);
                });

            });

            //Report
            Route::prefix('report')->middleware(['role:Admin|Admin-HR'])->group(function () { 
                Route::post('/form',[ReportController::class,'form']);
            });




            // Shared
                Route::prefix('shared')->group(function (){ 
                Route::get('/companies',[SharedController::class,'companies']);
                Route::get('/departments',[SharedController::class,'departments']);
                Route::get('/positions',[SharedController::class,'positions']);
                Route::get('/grades',[SharedController::class,'grades']);
                Route::get('/categories',[SharedController::class,'categories']);
            });

            // Notifications
            Route::prefix('notifications')->group(function () { 
                Route::get('/',[NotificationController::class,'index']);
            });

            // Users
            Route::prefix('users')->group(function () { 
                Route::get('/',[UserController::class,'index']);
            });
    
            // Manual
            Route::prefix('manual')->group(function () { 
                Route::get('/',[ManualController::class,'index']);
            });

            // Update password
            Route::post('/password/update',[ProfileController::class,'updatePassword']);
            Route::post('/email/update',[ProfileController::class,'updateEmail']);
        });

            Route::post('/login',[AuthController::class, 'staffLogin']);
            Route::post('/login/admin',[AuthController::class, 'adminLogin']);
            Route::post('/logout',[AuthController::class, 'logout']);
            Route::post('/password/reset',[PasswordResetLinkController::class,'store']);
            Route::post('/password/reset/update',[NewPasswordController::class,'store']);
         