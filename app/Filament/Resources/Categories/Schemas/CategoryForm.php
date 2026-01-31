<?php

namespace App\Filament\Resources\Categories\Schemas;

use CodeWithDennis\FilamentSelectTree\SelectTree;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->required()
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, $set) => $set('slug', \Illuminate\Support\Str::slug($state))),

            TextInput::make('slug')->required()->unique('categories', 'slug', ignoreRecord: true),

            SelectTree::make('parent_id')
                ->label('Родительская категория')
                ->relationship('parent', 'name', 'parent_id')
                ->enableBranchNode()
                ->searchable()
                ->placeholder('Выберите корень или родителя...'),

            Toggle::make('is_active')->label('Активна')->default(true),
        ]);
    }
}
