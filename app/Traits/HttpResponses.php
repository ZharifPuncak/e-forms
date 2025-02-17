<?php

namespace App\Traits;

trait HttpResponses{

    protected function success($data = null, $message = null, $code = 200){
       return response()->json([
        'status' => 'Request was successful',
        'message' => $message,
        'data'  => $data
       ],$code);
    }

    protected function error($data = null, $message = null, $code){
        return response()->json([
         'status' => 'Error occurred',
         'message' => $message,
         'data'  => $data
        ],$code);
     }
 
}
?>