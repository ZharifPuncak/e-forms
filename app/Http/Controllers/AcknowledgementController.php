<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormAcknowledgement;

use App\Http\Resources\Acknowledgement\AcknowledgementResource;

use App\Traits\HttpResponses;

class AcknowledgementController extends Controller
{
    use HttpResponses;
    public function index($code){

        $acknowledgements = FormAcknowledgement::with('staff.user')->whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->get();

        return $this->success(['acknowledgements' => AcknowledgementResource::collection($acknowledgements)]);
    }

    public function info($code){

        $acknowledgements = FormAcknowledgement::whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->orderBy('id','desc');

        $totalCount = $acknowledgements->count();
        $pendingCount = $acknowledgements->where('status','pending')->count();
        $completedCount = $acknowledgements->where('status','completed')->count();

        return $this->success([
            'total' => $totalCount,
            'pending' => $pendingCount,
            'completed' => $completedCount
        ]);

    }
}
