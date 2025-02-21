<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\FormIssuance;

use App\Http\Resources\Issuance\IssuanceResource;

class IssuanceController extends Controller
{
    
    public function index($code){

        $issuances = FormIssuance::whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->get();

        return $this->success([
            'issuances' => new IssuanceResource($issuances),
        ]);
    }

    public function create(Request $request){


    }

    public function update(Request $request){

    }

    public function delete(Request $request){

    }

}
