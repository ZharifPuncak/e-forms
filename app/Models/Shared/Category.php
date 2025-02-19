<?php

namespace App\Models\Shared;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'shared_categories';

    public function scopeActive($query){
        $query->where('is_hide', 0)->orderBy('id');
    }
}
