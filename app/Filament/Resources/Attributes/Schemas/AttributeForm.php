<?php

namespace App\Filament\Resources\Attributes\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\KeyValue;
use Filament\Schemas\Schema;

class AttributeForm
{
  public static function configure(Schema $schema): Schema
  {
    return $schema->components([
      TextInput::make('name')->label('Название (для сайта)')->required(),
      TextInput::make('code')->label('Код (для кода/фильтра)')->required(),

      Select::make('display_type')
        ->options([
          'checkbox' => 'Чекбоксы',
          'select' => 'Список',
          'color' => 'Цвет/Иконка',
        ])->default('checkbox'),

      Toggle::make('allow_multiple')->label('Множественный выбор'),
      Toggle::make('is_filterable')->label('Показывать в фильтрах'),

      TextInput::make('sort_order')->numeric()->default(0),

      KeyValue::make('settings')
        ->label('Доп. настройки (unit, иконка)')
        ->keyLabel('Свойство')
        ->valueLabel('Значение'),
    ]);
  }
}
