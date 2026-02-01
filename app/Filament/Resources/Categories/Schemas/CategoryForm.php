<?php

namespace App\Filament\Resources\Categories\Schemas;

use CodeWithDennis\FilamentSelectTree\SelectTree;
use Filament\Actions\Action;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
  public static function configure(Schema $schema): Schema
  {
    return $schema->components([
      Grid::make(3) // Создаем сетку на 3 колонки
      ->schema([

        // Левая часть (2 колонки из 3) - Основные данные
        Section::make('Основная информация')
          ->columnSpan(2)
          ->schema([
            Grid::make(2)->schema([
              TextInput::make('name')
                ->label('Название')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn($state, $set) => $set('slug', Str::slug($state))),

              TextInput::make('slug')
                ->label('Слаг (URL)')
                ->required()
                ->unique('categories', 'slug', ignoreRecord: true),
            ]),

            SelectTree::make('parent_id')
              ->label('Родительская категория')
              ->relationship('parent', 'name', 'parent_id')
              ->enableBranchNode()
              ->searchable()
              ->placeholder('Выберите корень или родителя...'),
          ]),

        // Правая часть (1 колонка из 3) - Статус и Изображение
        Section::make('Настройки и Медиа')
          ->columnSpan(1)
          ->schema([
            Toggle::make('is_active')
              ->label('Категория активна')
              ->default(true)
              ->onColor('success'),

            Repeater::make('images')
              ->relationship('images')
              ->label('Иконка / Пиктограмма')
              ->schema([
                FileUpload::make('path')
                  ->label('Загрузить фото')
                  ->image()
                  ->imageEditor()
                  ->disk('public')
                  ->directory('categories')
                  ->required(),

                Toggle::make('is_main')
                  ->default(true)
                  ->hidden(), // Прячем, так как оно всегда true для категорий
              ])
              ->maxItems(1)
              ->minItems(0)
              ->reorderable(false)
              ->deletable(true)
              ->addActionLabel('Добавить иконку')

          ]),
      ])->columnSpanFull(),
    ]);
  }
}
