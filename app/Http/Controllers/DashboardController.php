<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\Form\FormAcknowledgement;
use App\Models\Form\Form;
use Carbon\Carbon;
use Auth;

class DashboardController extends Controller
{
    use HttpResponses;

    public function acknowledgements(){

 

        $acknowledgements = FormAcknowledgement::when(Auth::user()->hasRole('Staff'), function ($query){
            return $query->whereHas('staff', function($query){
               return $query->where('user_id', Auth::user()->id);
            });
        });
     
        return $this->success([
            'today' => Carbon::now()->format('M d, Y'),
            'total' => $acknowledgements->clone()->count(),
            'pending' => $acknowledgements->clone()->where('status','pending')->count(),
            'completed' => $acknowledgements->clone()->where('status','completed')->count(),
            'incompleted' => $acknowledgements->clone()->where('status','incompleted')->count(),
            'cancelled' => $acknowledgements->clone()->where('status','cancelled')->count(),
        ]);

    }
}
