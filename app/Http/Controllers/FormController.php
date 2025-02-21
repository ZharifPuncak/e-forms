<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormCategory;

use App\Traits\HttpResponses;

use App\Http\Resources\Form\FormResource;
use App\Http\Resources\Form\FormListResource;

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

    }

    public function info(){

        $forms = Form::orderBy('id','desc');
        $newCount = $forms->where('status','new')->count();
        $pendingCount = $forms->where('status','pending')->count();
        $completedCount = $forms->where('status','completed')->count();

        return $this->success([
            'new' => $newCount,
            'pending' => $pendingCount,
            'completed' => $completedCount
        ]);
    }

    public function details(Request $request, $code){
        
        $form = Form::with('category:id,name')->where('code',$code)->first();

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
   
}
