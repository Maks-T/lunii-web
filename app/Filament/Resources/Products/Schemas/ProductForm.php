<?php

namespace App\Filament\Resources\Products\Schemas;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\FileUpload;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use CodeWithDennis\FilamentSelectTree\SelectTree;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Товар')->tabs([

                Tabs\Tab::make('Основная информация')->schema([
                    SelectTree::make('category_id')
                        ->label('Категория')
                        ->relationship('category', 'name', 'parent_id')
                        ->enableBranchNode()
                        ->required(),

                    TextInput::make('name')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, $set) => $set('slug', \Illuminate\Support\Str::slug($state))),

                    TextInput::make('slug')->required()->unique('products', 'slug', ignoreRecord: true),
                    TextInput::make('sku')->label('Артикул'),
                    Textarea::make('description')->columnSpanFull(),
                ])->columns(2),

                Tabs\Tab::make('Цены и Склад')->schema([
                    TextInput::make('price')->label('Цена')->numeric()->prefix('BYN')->required(),
                    TextInput::make('old_price')->label('Старая цена (скидка)')->numeric()->prefix('BYN'),

                    Repeater::make('stocks')
                        ->relationship('stocks')
                        ->schema([
                            Select::make('warehouse_id')
                                ->relationship('warehouse', 'name')
                                ->required(),
                            TextInput::make('quantity')->label('Остаток')->numeric()->default(0),
                        ])->columns(2)->label('Наличие по складам'),
                ]),

                Tabs\Tab::make('Характеристики')->schema([
                    Select::make('attributeValues')
                        ->label('Свойства товара')
                        ->multiple()
                        ->relationship('attributeValues', 'value')
                        ->preload(),

                    Select::make('labels')
                        ->label('Метки (New, Hit, Sale)')
                        ->multiple()
                        ->relationship('labels', 'name')
                        ->preload(),
                ]),

                Tabs\Tab::make('Медиа')->schema([
                    Repeater::make('images')
                        ->relationship('images')
                        ->schema([
                            FileUpload::make('path')
                                ->image()
                                ->disk('public')
                                ->directory('products')
                                ->required(),
                            Toggle::make('is_main')->label('Главное фото'),
                            TextInput::make('sort_order')->numeric()->default(0),
                        ])->grid(2)
                ]),

                Tabs\Tab::make('SEO')->schema([
                    // Поля для полиморфной связи MorphOne
                    TextInput::make('seo.title')->label('Title'),
                    Textarea::make('seo.description')->label('Description'),
                    TextInput::make('seo.keywords')->label('Keywords'),
                ]),
            ])->columnSpanFull()
        ]);
    }
}
