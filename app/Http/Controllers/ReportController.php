<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Carbon\Carbon;
use App\Traits\HttpResponses;
use App\Models\Form\Form;
// use Barryvdh\DomPDF\Facade\Pdf;
use Spatie\LaravelPdf\Facades\Pdf;

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

        $tempFilePath = storage_path('app/temp_invoice.pdf');
        $pdf = Pdf::view('reports.form',['data' => $form ])
        ->format('A4')
        ->save($tempFilePath);

        // Return the file as a download
        return response()->download($tempFilePath, 'invoice.pdf', [
            'Content-Type' => 'application/pdf',
        ]); 
     

    //     $pageData = ['form' => $form];
    //     $pdf = Pdf::loadView('reports.form', $pageData);
    //     $pdf->render();

    //     $pdfWidth = $pdf->getDomPDF()->getCanvas()->get_width();
    //     $pdfHeight = $pdf->getDomPDF()->getCanvas()->get_height();
    //     $totalPages = $pdf->getDomPDF()->getCanvas()->get_page_count();

    //     //Setting for included image
    //     Pdf::setOption(['isRemoteEnabled' => false,'isHtml5ParserEnabled' => true]);

    //     //Load view 
    //    $data = [
    //         'form' => $form, 
    //         'total_pages' => $totalPages, 
    //         'date' => Carbon::now()->format('d/m/Y'),
    //         'width' => $pdfWidth,
    //         'height' => $pdfHeight
    //    ];

       
    //    $formReport = Pdf::loadView('reports.form', $data)->setPaper('a4');
   
    //    //Create temp files
    //    $tempFilePath = tempnam(sys_get_temp_dir(), 'dompdf_');
    //    file_put_contents($tempFilePath, $formReport->output());

    //    return response()->download($tempFilePath, $form->code.'.pdf',[
    //         'Content-Type' => 'application/pdf',
    //    ]);

    }
      
 



 
       
  
  
  
     

}
