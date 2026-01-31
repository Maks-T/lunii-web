<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Image extends Model
{
    protected $fillable = ['imageable_id', 'imageable_type', 'path', 'sort_order', 'is_main'];

    public function imageable(): MorphTo { return $this->morphTo(); }
}
