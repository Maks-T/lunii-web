<?php

namespace App\Filament\Resources\ProductLabels\Pages;

use App\Filament\Resources\ProductLabels\ProductLabelResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListProductLabels extends ListRecords
{
    protected static string $resource = ProductLabelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
