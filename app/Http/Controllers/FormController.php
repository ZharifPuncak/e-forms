<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormCategory;
use App\Models\Form\FormAcknowledgement;

use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;


use App\Http\Resources\Form\FormResource;
use App\Http\Resources\Form\FormListResource;
use App\Http\Resources\Acknowledgement\AcknowledgementResource;

use App\Http\Requests\Form\FormStoreRequest;

use Carbon\Carbon;


class FormController extends Controller
{
    use HttpResponses;
    public function index(){

        $forms = Form::with('category')->orderBy('id','desc')->get();

        return $this->success([
            'data' =>  FormListResource::collection($forms),
        ]);

    }

    public function store(FormStoreRequest $request){

        $request->validated($request->all());

     

        //Generate form code
        $day = Carbon::now()->format('d');
        $year = Carbon::now()->format('Y');
        $month = Carbon::now()->format('m');
        $lastFormId = Form::latest()->value('id') ?? 0;
        $code = $day.$month.str_pad($lastFormId + 1, 4, '0', STR_PAD_LEFT).$year;
     

        //Create form
        Form::create([
            'name' => $request->name,
            'alias' => $request->alias,
            'code'  => $code,
            'form_category_id' => $request->category['id'],
            'descriptions' => $request->descriptions,
            'effective_from' => Carbon::parse($request->effective_from)->format('y-m-d'),
            'effective_to'   => Carbon::parse($request->effective_to)->format('y-m-d')
        ]);

        
        return $this->success([], 'Form Created.');


    }

    public function update(FormStoreRequest $request){

        $form = Form::where('id', $request->id)->first();

        if($form->status != 'new'){
            return $this->error(null, 'Cannot update. Form already confirmed', 422);
        }


        if($form){
            $form->update([
                'name' => $request->name,
                'alias' => $request->alias,
                'form_category_id' => $request->category['id'],
                'descriptions' => $request->descriptions,
                'effective_from' => Carbon::parse($request->effective_from)->format('y-m-d'),
                'effective_to'   => Carbon::parse($request->effective_to)->format('y-m-d')
            ]);
        }

        return $this->success([], 'Form Updated.');

        
    }

    public function delete(Request $request){

        $form = Form::where('code', $request->code)->first();

        if(!$form){
            return $this->error(null, 'Form do not exists', 404);
        }

        if($form->status != 'pending'){
            return $this->error(null, 'Cannot confirm. Form already '.$form?->status, 422);
        }

        //Check for file upload. If exist, delete file directory
        if($form->file){
            $path = storage_path().'/app/public/forms/'.$form->code;

            if(File::exists($path)) {
                File::deleteDirectory($path);
            }
    
           $form->file()->delete();
        }
    
        //Delete form
        $form->delete();

        return $this->success([], 'Form Deleted.');
    }

    public function confirm(Request $request){

        $form = Form::where('code', $request->code)->first();
        
        if(!$form){
            return $this->error(null, 'form not found', 404);
        }

        if($form->status != 'pending'){
            return $this->error(null, 'Cannot confirm. Form already '.$form?->status, 422);
        }

        if(empty($form->file)){
            return $this->error(null, 'Cannot confirm. Form file not exist', 422);
        }
    
        $form->update(['status' => 'confirmed']);

        return $this->success([], 'Form Confirmed.');
    }

    public function info(){

        $forms = Form::orderBy('id','desc');
        $pendingCount = $forms->clone()->where('status','pending')->count();
        $ongoingCount = $forms->clone()->where('status','ongoing')->count();
        $closedCount = $forms->clone()->where('status','closed')->count();
        $confirmedCount = $forms->clone()->where('status','confirmed')->count();

        return $this->success([
            'ongoing' => $ongoingCount,
            'pending' => $pendingCount,
            'closed' => $closedCount,
            'confirmed' => $confirmedCount
        ]);
    }

    public function details(Request $request, $code){
        
        $form = Form::with('category:id,name')->where('code',$code)->first();

        if(!$form){
            return $this->error(null, 'Form do not exists', 404);
        }

        return $this->success([
            'data' =>  new FormResource($form),
        ]);
    }

    public function categories(){

        $categories = FormCategory::select('id','name')->get();

        return $this->success([
            'categories' => $categories,
        ]);
    }


    public function acknowledgement($code){

        $acknowledgements = FormAcknowledgement::with('staff.user','staff.details')->whereHas('form',function($query) use($code){
                $query->where('code',$code);
        })->orderBy('status', 'asc')->get();

       return $this->success(['acknowledgements' => AcknowledgementResource::collection($acknowledgements)]);
    }

    public function acknowledgementInfo($code){

        $acknowledgements = FormAcknowledgement::whereHas('form',function($query) use($code){
                $query->where('code',$code);
        })->orderBy('id','desc');

        $totalCount = $acknowledgements?->clone()->count();
        $pendingCount = $acknowledgements?->clone()->where('status','pending')->count();
        $completedCount = $acknowledgements?->clone()->where('status','completed')->count();
        $incompletedCount = $acknowledgements?->clone()->where('status','incompleted')->count();

        return $this->success([
            'total' => $totalCount,
            'pending' => $pendingCount,
            'completed' => $completedCount,
            'incompleted' => $incompletedCount
        ]);

      }
   
}
