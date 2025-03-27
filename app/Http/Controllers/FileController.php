<?php

namespace App\Http\Controllers;

use App\Models\Form\Form;
use App\Models\Form\FormFile;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

use App\Traits\HttpResponses;

use App\Http\Resources\File\FileResource;

class FileController extends Controller
{
    use HttpResponses;

    public function index($code){

        $files = FormFile::with('form')->whereHas('form',function($query) use($code){
             $query->where('code',$code);
        })->orderBy('id','desc')->get();

        return $this->success([
            'files' => FileResource::collection($files),
        ]);
    }

    public function upload(Request $request){

        $form = Form::where('code',$request->code)->first();

        if($form){

            if($form->status != 'pending'){
                return $this->error(null, 'Cannot upload file. Form already '.$form?->status, 422);
            }
            
            $path = storage_path().'/app/public/forms/'.$form->code;
             
            if(File::exists($path)){
                File::deleteDirectory($path);
            }

           $asset =  $request->file('file_path'); 
           $filename = $asset->getClientOriginalName();
           $path     =  Storage::disk('public')->putFileAS('forms/'.$form->code,$asset,$filename);

           
           $form->file()->updateOrCreate(
             ['form_id' => $form->id],
             ['title' => $request->title,'file_path' => $path,'file_name'=> pathinfo($filename, PATHINFO_FILENAME),'file_size' => number_format((filesize($asset))/1048576,2), 'file_ext' => $asset->guessExtension()]   
           );

           return $this->success([], 'Form file uploaded.');
        }
    }

    public function delete(Request $request){

        $form = Form::where('code',$request->code)->first();
    
        if($form){

            if($form->status != 'pending'){
                return $this->error(null, 'Cannot delete file. Form already '.$form?->status, 422);
            }
            
            $path = storage_path().'/app/public/forms/'.$form->code;

            if(File::exists($path)) {
                File::deleteDirectory($path);
            }

           $form->file()->delete();

           return $this->success([], 'Form file deleted.');
        }

        return $this->error(null, 'Form do not found', 422);
    }

}
