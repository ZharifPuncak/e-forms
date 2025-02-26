<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\Shared\Company;

class SharedController extends Controller
{
    use HttpResponses;
    public function companies(){

        $companies = Company::select('id','code','name')->get();

        return $this->success([  
            'companies' => $companies,
        ]);
    }
}
