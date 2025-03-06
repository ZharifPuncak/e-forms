<?php

namespace App\Models\Manual;

use Illuminate\Database\Eloquent\Model;

class ManualFile extends Model
{
    protected $fillable = ['title','file_name','file_path','file_size','file_ext'];
}
