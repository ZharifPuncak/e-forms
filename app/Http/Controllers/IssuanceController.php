<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormIssuance;

use App\Http\Resources\Issuance\IssuanceResource;
use App\Http\Requests\Form\IssuanceRequest;

use App\Traits\HttpResponses;
use Carbon\Carbon;

class IssuanceController extends Controller
{
    use HttpResponses;
    public function index($code){
        
        $form = Form::where('code',$code)->first();

        if(!$form){
            return $this->error(null, 'Form not found', 404);
        }

        $issuances = FormIssuance::whereHas('form',function($query) use($code){
            $query->where('code',$code);
        })->get();

        return $this->success([  
            'form_name' => $form->name,
            'form_alias' => $form->alias,
            'form_end'   => Carbon::parse($form->effective_to)->format('d M, Y'),
            'issuances' =>  IssuanceResource::collection($issuances),
        ]);
    }

    public function store(IssuanceRequest $request){

        // Validate
         $request->validated($request->all());

      
        // Check if form status is not closed.
        $form = Form::where('code',$request->code)->first();

        if(!$form){
            return $this->error(null, 'No form found', 404);
        }

        if($form && $form->status == 'closed'){
            return $this->error(null, 'Form already closed', 422);
        }

        // Check if issuance issued date to form end date
        $effective_to = Carbon::parse($form->effective_to)->format('Y-m-d');
        if($form && Carbon::parse($request->issued_at)->addDays(2)->format('Y-m-d') > $effective_to){
            return $this->error(null, 'Issued date is near to effective to', 422);
        }

        // Check if issuance deadlined date to form end date
        if($form && Carbon::parse($request->deadlined_at)->addDays(1)->format('Y-m-d') > $effective_to){
            return $this->error(null, 'Deadlined date is near to effective to', 422);
        }

        //Create the issuance
        
        $issuance = FormIssuance::create(['form_id' => $form->id,'issued_at' =>  Carbon::parse($request->issued_at)->format('y-m-d'), 'deadlined_at' => Carbon::parse($request->deadlined_at)->format('y-m-d')]);

        // Issuance to companies
        // Delete records that are not in the new list
        $ids = array_column($request->companies,'id');
        // $existingIds = $form->issuance()->pluck('id')->toArray();
        // $form->issuance()->whereNotIn('id', $ids)->delete();

        // Insert or update the new ones
        // $newIds = array_diff($ids, $existingIds);
        // if($newIds){
            foreach($ids as $id){
                $issuance->companies()->create(['company_id' => $id]);
            }
        // }
     

        return $this->success([], 'Issuance Added.');
    }

    public function update(Request $request){

    }

    public function delete(Request $request){

    }

    

}
