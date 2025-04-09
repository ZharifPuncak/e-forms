<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\Manual\ManualFile;
use App\Http\Resources\File\FileResource;

class ManualController extends Controller
{
    use HttpResponses;
    public function index(){

        $manual = ManualFile::orderBy('id','desc')->first();

        return  asset('storage/' .$manual->file_path);

        // return $this->success([
        //     // 'data' =>  new FileResource($manuals)
        // ]);

    }
}
