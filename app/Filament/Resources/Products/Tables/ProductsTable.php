<?php

namespace App\Filament\Resources\Products\Tables;

use App\Models\Category;
use CodeWithDennis\FilamentSelectTree\SelectTree;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Table;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Enums\FiltersLayout;
use Illuminate\Database\Eloquent\Builder;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class ProductsTable
{
  public static function configure(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('id')
          ->label('ID')
          ->sortable()
          ->toggleable(isToggledHiddenByDefault: true),
        ImageColumn::make('images.path')
          ->label('Фото')
          ->disk('public')
          ->circular()
          ->limit(1)
          ->toggleable(),

        TextColumn::make('name')
          ->label('Товар')
          ->searchable()
          ->sortable()
          ->wrap()
          ->toggleable(), // Разрешаем скрывать

        TextColumn::make('price')
          ->label('Цена')
          ->money('BYN')
          ->sortable()
          ->toggleable(), // Разрешаем скрывать

        TextColumn::make('total_stock')
          ->label('Запас')
          ->numeric()
          ->sortable()
          ->toggleable(), // Разрешаем скрывать

        // Пример колонки, которая скрыта ПО УМОЛЧАНИЮ, но её можно включить
        TextColumn::make('created_at')
          ->label('Дата создания')
          ->dateTime()
          ->sortable()
          ->toggleable(isToggledHiddenByDefault: true),
      ])
      // Настройка расположения меню переключения колонок
      // По умолчанию кнопка появится в тулбаре (справа от поиска)
      ->columnToggleFormColumns(2)
      ->filtersLayout(FiltersLayout::AboveContent)
      ->filtersFormColumns(1)
      ->filters([
        Filter::make('category_id')
          ->form([
            SelectTree::make('category_id')
              ->label('Поиск по разделам каталога')
              ->relationship('category', 'name', 'parent_id')
              ->enableBranchNode()
              ->searchable()
              ->withCount()
              ->placeholder('Выберите раздел...')
              ->defaultOpenLevel(1)
              ->multiple()
          ])
          ->query(function (Builder $query, array $data) {
            if (empty($data['category_id'])) {
              return $query;
            }

            $selectedIds = \Illuminate\Support\Arr::wrap($data['category_id']);
            $allTargetIds = collect();

            foreach ($selectedIds as $id) {
              $treeIds = Category::descendantsAndSelf($id)->pluck('id');
              $allTargetIds = $allTargetIds->merge($treeIds);
            }

            return $query->whereIn('category_id', $allTargetIds->unique()->toArray());
          })
          ->indicateUsing(function (array $data): ?string {
            if (empty($data['category_id'])) return null;
            return 'Категории: ' . count(\Illuminate\Support\Arr::wrap($data['category_id']));
          }),
      ])
      ->groups([
        \Filament\Tables\Grouping\Group::make('category.name')
          ->label('Категория')
          ->collapsible(),
      ])
      ->defaultGroup('category.name')
      ->recordActions([
        EditAction::make(),
      ])
      ->toolbarActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
        ]),
      ]);
  }
}
