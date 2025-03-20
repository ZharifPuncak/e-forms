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


class ReportController extends Controller
{
    use HttpResponses;
    public function form(Request $request){

        //Data to pass
        $code = $request->code;
        $form = Form::with('acknowledgements')->where('code',$code)->first();
        
        if(!$form){
            return $this->error(null, 'Form not found', 422);
        }

        $filePath = storage_path('app/public/report.pdf');

        
        $pdf = Pdf::view('reports.form',['form' => $form , 'date' => Carbon::now()->format('d/m/Y H:i')])
        ->withBrowsershot(function (Browsershot $browsershot) {
            $browsershot->scale(1)->setOption('debug', true);
        })->save($filePath);


        $fileContents = base64_encode(file_get_contents($filePath));
    
        return response()->json([
            "base64" => $fileContents
        ]);


    }
      
 



 
       
  
  
  
     

}
