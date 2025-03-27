<?php

namespace App\Http\Controllers;

use Carbon\Carbon;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormAcknowledgement;

use App\Http\Resources\Acknowledgement\AcknowledgementFormResource;
use App\Http\Resources\Acknowledgement\AcknowledgementFormDetailResource;

use App\Http\Requests\Acknowledgement\SignRequest;

use App\Traits\HttpResponses;
use Auth;

class AcknowledgementController extends Controller
{
    use HttpResponses;
    public function index(){
        
        $acknowledgements = FormAcknowledgement::whereHas('staff', function($query){
            $query->where('user_id', Auth::user()->id);
        })->orderBy('status', 'asc')->get();

        return $this->success(['acknowledgements' => AcknowledgementFormResource::collection($acknowledgements)]);
    }

   

    public function info(){

        $acknowledgements = FormAcknowledgement::whereHas('staff', function($query){
            $query->where('user_id', Auth::user()->id);
        })->orderBy('id','desc');

        $totalCount = $acknowledgements->clone()->count();
        $pendingCount = $acknowledgements->clone()->where('status','pending')->count();
        $completedCount = $acknowledgements->clone()->where('status','completed')->count();
        $incompletedCount = $acknowledgements->clone()->where('status','incompleted')->count();

        return $this->success([
            'total' => $totalCount,
            'pending' => $pendingCount,
            'completed' => $completedCount,
            'incompleted' => $incompletedCount
        ]);

    }

    public function details($code){

        $acknowledgement = FormAcknowledgement::with('form','issuance')->whereHas('staff', function($query){
            $query->where('user_id', Auth::user()->id);
        })->whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->orderBy('id','desc')->first();

        if(!$acknowledgement){
            return $this->error(null, 'Form acknowledgement does not exists', 404);
        }

        
        return $this->success(['details' => new AcknowledgementFormDetailResource($acknowledgement)]);
    }



    public function signature(SignRequest $request){

        $code = $request->code;

        $acknowledgement = FormAcknowledgement::with('form','issuance')->whereHas('staff', function($query){
            $query->where('user_id', Auth::user()->id);
        })->whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->orderBy('id','desc')->first();

        if(!$acknowledgement){
            return $this->error(null, 'Form acknowledgement does not exists', 404);
        }

        if($acknowledgement->status == 'completed'){
            return $this->error(null, 'Form acknowledgement already submitted', 422);
        }

        if($acknowledgement->status == 'closed'){
            return $this->error(null, 'Form acknowledgement already closed', 422);
        }

        $acknowledgement->update(['signature' => $request->signature, 'status' => 'completed', 'submitted_at' =>  Carbon::now()]);

        return $this->success([], 'Acknowledgement Submitted.');

    }
}
