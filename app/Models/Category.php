<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Kalnoy\Nestedset\NodeTrait;

class Category extends Model
{
  use NodeTrait;

  protected $fillable = ['name', 'slug', 'parent_id', 'is_active'];

  public function products(): HasMany
  {
    return $this->hasMany(Product::class);
  }

  public function images(): MorphMany
  {
    return $this->morphMany(Image::class, 'imageable');
  }
}
