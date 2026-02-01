<?php

namespace App\Filament\Resources\Attributes\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

use Filament\Schemas\Schema;

class ValuesRelationManager extends RelationManager
{
  protected static string $relationship = 'values'; // Связь из модели Attribute
  protected static ?string $title = 'Значения атрибута';
  protected static ?string $modelLabel = 'значение';

  public function form(Schema $schema): Schema
  {
    return $schema->components([
      TextInput::make('value')
        ->label('Значение')
        ->required()
        ->live(onBlur: true)
        ->afterStateUpdated(fn($state, $set) => $set('slug', \Illuminate\Support\Str::slug($state))),
      TextInput::make('slug')
        ->label('Слаг (URL)')
        ->required(),
    ]);
  }

  public function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('id')->label('ID')->toggleable(isToggledHiddenByDefault: true),
        TextColumn::make('value')->label('Значение')->searchable(),
        TextColumn::make('slug')->label('Слаг'),
      ])
      ->headerActions([
        CreateAction::make(),
      ])
      ->recordActions([
        EditAction::make(),
        DeleteAction::make(),
      ]);
  }
}
