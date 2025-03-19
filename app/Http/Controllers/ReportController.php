<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Traits\HttpResponses;
use App\Models\Form\Form;

use Symfony\Component\HttpFoundation\BinaryFileResponse;
use function Spatie\LaravelPdf\Support\pdf;
// use Barryvdh\DomPDF\Facade\Pdf;
// use Barryvdh\DomPDF\Facade\Pdf;

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

        // $tempFilePath = storage_path('app/temp_form.pdf');
        // $pdf = Pdf::view('reports.form',['data' => $form ])
        // ->format('A4')
        // ->save($tempFilePath);

        // return response()->download($pdf, 'downloaded_file.pdf', [
        //     'Content-Type' => 'application/pdf; charset=UTF-8'
        // ]);

        return pdf()
            ->view('reports.form', compact('form'))
            ->name('invoice-2023-04-10.pdf')
            ->download();

    }
      
 



 
       
  
  
  
     

}
