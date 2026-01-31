<?php

namespace App\Filament\Resources\ProductLabels\Pages;

use App\Filament\Resources\ProductLabels\ProductLabelResource;
use Filament\Resources\Pages\CreateRecord;

class CreateProductLabel extends CreateRecord
{
    protected static string $resource = ProductLabelResource::class;
}
