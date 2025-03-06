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

        $manuals = ManualFile::orderBy('id','desc')->get();

        return $this->success([
            'data' =>  FileResource::collection($manuals)
        ]);

    }
}
