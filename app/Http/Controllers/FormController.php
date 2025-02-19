<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Form\Form;
use App\Models\Form\FormCategory;

use App\Traits\HttpResponses;

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
        $code = 1;

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

        return response()->json(['message' => 'Form created.'],200);

    }

    public function update(Request $request){

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

    public function categories(){

        $categories = FormCategory::select('id','name')->get();

        return $this->success([
            'categories' => $categories,
        ]);
    }


    
}
