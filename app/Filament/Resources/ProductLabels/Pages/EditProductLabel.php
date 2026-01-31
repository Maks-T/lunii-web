<?php

namespace App\Filament\Resources\ProductLabels\Pages;

use App\Filament\Resources\ProductLabels\ProductLabelResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditProductLabel extends EditRecord
{
    protected static string $resource = ProductLabelResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
