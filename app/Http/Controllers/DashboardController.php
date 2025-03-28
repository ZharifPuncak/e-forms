<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\Form\FormAcknowledgement;
use App\Models\Form\Form;

use App\Http\Resources\Dashboard\AcknowledgementResource;
use Carbon\Carbon;
use Auth;

class DashboardController extends Controller
{
    use HttpResponses;

    public function acknowledgements(){

 

        $acknowledgements = FormAcknowledgement::with('form')->when(Auth::user()->hasRole('Staff'), function ($query){
            return $query->whereHas('staff', function($query){
               return $query->where('user_id', Auth::user()->id);
            });
        });

        $loadedAcknowledgements = $acknowledgements->clone()->whereIn('status',['ongoing','completed'])->get();

     
        return $this->success([
            'today' => Carbon::now()->format('M d, Y'),
            'total' => $acknowledgements->clone()->count(),
            'pending' => $acknowledgements->clone()->where('status','pending')->count(),
            'completed' => $acknowledgements->clone()->where('status','completed')->count(),
            'incompleted' => $acknowledgements->clone()->where('status','incompleted')->count(),
            'cancelled' => $acknowledgements->clone()->where('status','cancelled')->count(),
            'acknowledgements' => AcknowledgementResource::collection($loadedAcknowledgements)
            
        ]);

    }
}
