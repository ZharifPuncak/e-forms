<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormIssuance;
use App\Models\Shared\Company;

use App\Http\Resources\Issuance\IssuanceResource;
use App\Http\Requests\Form\IssuanceRequest;

use App\Traits\HttpResponses;
use Carbon\Carbon;



use App\Events\IssuanceDispatched;


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
        })->orderBy('id','desc')->get();


        //Get IDs for company
        $companyIds = $issuances->flatMap(fn($issuance) => $issuance->companies()->pluck('company_id'))->toArray();
        $companies = Company::whereNotIn('id',$companyIds)->select('id','code','name')->get();
  
        return $this->success([  
            'form_name' => $form->name,
            'form_alias' => $form->alias,
            'form_end'   => Carbon::parse($form->effective_to)->format('d M, Y'),
            'issuances' =>  IssuanceResource::collection($issuances),
            'loaded_companies' => $companies
        ]);
    }

    public function checkingIssuance(IssuanceRequest $request){

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

            return $form;

    }

    public function store(IssuanceRequest $request){
        

        //Create the issuance   
        $form = $this->checkingIssuance($request);  
        $issuance = FormIssuance::create(['form_id' => $form->id,'issued_at' =>  Carbon::parse($request->issued_at)->format('y-m-d'), 'deadlined_at' => Carbon::parse($request->deadlined_at)->format('y-m-d')]);

        // Issuance to companies
        $ids = array_column($request->companies,'id');

        //Get all ID of loaded company ID
        $filteredIssuances = $form->issuance->reject(function ($el) use($request) {
            return $el->id === $request->id; // Change $someId to the ID you want to exclude
        });
   
        foreach($filteredIssuances as $obj){
            if($obj->companies->whereIn('company_id',$ids)->first()){
                return $this->error(null, 'Company already in issuance list.', 422);
            }
        }
       
        foreach($ids as $id){
            $issuance->companies()->create(['company_id' => $id]);
        }

        return $this->success([], 'Issuance Added.');
    }

    public function update(IssuanceRequest $request){

        // Update the issuance 
        $form = $this->checkingIssuance($request);   

               
        // Get all issuance of new company ID 
        $ids = array_column($request->companies,'id');

        //Get all ID of loaded company ID
        $filteredIssuances = $form->issuance->reject(function ($el) use($request) {
            return $el->id === $request->id; // Change $someId to the ID you want to exclude
        });

        foreach($filteredIssuances as $obj){
            if($obj->companies->whereIn('company_id',$ids)->first()){
                return $this->error(null, 'Company already in issuance list.', 422);
            }
        }
    
        $issuance = FormIssuance::where('id',$request->id)->first();

        if($issuance){

            if($issuance->status == 'dispatched'){
                return $this->error(null, 'Cannot update. Issuance already dispatched.', 422);
            }

            $issuance->update(['form_id' => $form->id,'issued_at' =>  Carbon::parse($request->issued_at)->format('y-m-d'), 'deadlined_at' => Carbon::parse($request->deadlined_at)->format('y-m-d')]);
        }

        // Delete records list
        $issuance->companies()->delete();

        // Insert or update the new ones
        foreach($ids as $id){
            $issuance->companies()->create(['company_id' => $id]);
        }

        return $this->success([], 'Issuance updated.');

    }


    public function delete(Request $request){

            $issuance = FormIssuance::with('form')->where('id',$request->id)->first();

            if($issuance->status == 'dispatched'){
                return $this->error(null, 'Cannot delete. Issuance already dispatched.', 422);
            }

            if($issuance->form->status == 'closed'){
                return $this->error(null, 'Cannot delete. Form already closed.', 422);
            }

            $issuance->companies()->delete();
            $issuance->delete();

            return $this->success([], 'Issuance Deleted.');
    }


    public function dispatch(Request $request){

            $issuance = FormIssuance::with('form')->where('id',$request->id)->first();

            if($issuance->status == 'dispatched'){
                return $this->error(null, 'Issuance already dispatched.', 422);
            }

            if($issuance->form->status == 'closed'){
                return $this->error(null, 'Cannot dispatched. Form already closed.', 422);
            }

            if(Carbon::now() > $issuance->form->effective_to){
                return $this->error(null, 'Cannot dispatched. Form already effective ended.', 422);
            }

            event(new IssuanceDispatched($issuance->id));

            $issuance->update(['status' => 'dispatched']);

            if($issuance->form->status == 'confirmed'){
                   $issuance->form()->update(['status' => 'ongoing']);
            }
    
        return $this->success([], 'Issuance Dispatched.');
    }
      
}
