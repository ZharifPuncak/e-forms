<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Traits\HttpResponses;
use App\Models\Form\Form;


use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Spatie\LaravelPdf\Facades\Pdf;
use Illuminate\Support\Facades\Response;
use Spatie\Browsershot\Browsershot;
use Illuminate\Support\Facades\File;

use App\Http\Resources\Report\FormResource;


class ReportController extends Controller
{
    use HttpResponses;
    public function form(Request $request){

        //Data to pass
        $code = $request->code;
        $form = Form::with('acknowledgements.staff.user','issuance.companies.company')->where('code',$code)->first();
        
        if(!$form){
            return $this->error(null, 'Form not found', 422);
        }

        $filePath = storage_path('app/public/report.pdf');
        $formattedForm = (new FormResource($form))->toArray(request());
 
        
        $pdf = Pdf::view('reports.form.main',['formattedForm' => $formattedForm])
        ->headerView('reports.form.header',['formattedForm' => $formattedForm])
        ->footerView('reports.form.footer')
        ->save($filePath);


        $fileContents = base64_encode(file_get_contents($filePath));

        // Delete the file after encoding
        if (File::exists($filePath)) {
            File::delete($filePath);
        }
    
        return response()->json([
            "base64" => $fileContents
        ]);


    }
      
 



 
       
  
  
  
     

}
