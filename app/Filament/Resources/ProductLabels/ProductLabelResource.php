<?php

namespace App\Filament\Resources\ProductLabels;

use App\Filament\Resources\ProductLabels\Pages\CreateProductLabel;
use App\Filament\Resources\ProductLabels\Pages\EditProductLabel;
use App\Filament\Resources\ProductLabels\Pages\ListProductLabels;
use App\Filament\Resources\ProductLabels\Schemas\ProductLabelForm;
use App\Filament\Resources\ProductLabels\Tables\ProductLabelsTable;
use App\Models\ProductLabel;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class ProductLabelResource extends Resource
{
  protected static ?string $model = ProductLabel::class;
  protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;
  protected static ?string $recordTitleAttribute = 'name';
  protected static string|null|\UnitEnum $navigationGroup = 'Каталог';
  protected static ?string $modelLabel = 'Тег маркетинга';
  protected static ?string $pluralModelLabel = 'Теги маркетинга';


  public static function form(Schema $schema): Schema
  {
    return ProductLabelForm::configure($schema);
  }

  public static function table(Table $table): Table
  {
    return ProductLabelsTable::configure($table);
  }

  public static function getRelations(): array
  {
    return [
      //
    ];
  }

  public static function getPages(): array
  {
    return [
      'index' => ListProductLabels::route('/'),
      'create' => CreateProductLabel::route('/create'),
      'edit' => EditProductLabel::route('/{record}/edit'),
    ];
  }
}
