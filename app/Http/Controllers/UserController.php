<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\HttpResponses;

use App\Models\User;
use App\Http\Resources\User\AdminResource;

class UserController extends Controller
{
    use HttpResponses;
    public function index(){

         $users = User::role(['admin','admin-HR'])->get();

         return $this->success([
            'users' =>  AdminResource::collection($users),
        ]);

    }
}
