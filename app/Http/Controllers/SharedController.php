<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\Shared\Company;
use App\Models\Shared\Department;
use App\Models\Shared\Position;
use App\Models\Shared\Grade;
use App\Models\Shared\Category;

class SharedController extends Controller
{
    use HttpResponses;
    public function companies(){

        $companies = Company::select('id','code','name')->get();

        return $this->success([  
            'companies' => $companies,
        ]);
    }


    public function departments(){

        $departments = Department::select('id','name')->get();

        return $this->success([  
            'departments' => $departments,
        ]);
    }

    public function positions(){

        $positions = Position::select('id','name')->get();

        return $this->success([  
            'positions' => $positions,
        ]);
    }


    public function grades(){

        $grades = Grade::select('id','name')->get();

        return $this->success([  
            'grades' => $grades,
        ]);
    }


    public function categories(){

        $categories = Category::select('id','name')->get();

        return $this->success([  
            'categories' => $categories,
        ]);
    }

}
