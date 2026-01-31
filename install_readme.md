Installation Guide

Стек: Laravel 12 + Filament v4 + Inertia + React 19 + Tailwind CSS v4 + shadcn/ui
Среда: Docker (WSL2 + Ubuntu 24.04)

1. Установка ядра Laravel

Так как папка проекта не пуста (уже есть папка docker), устанавливаем Laravel в текущую директорию:
code Bash

composer create-project laravel/laravel .

2. Установка Frontend-стека (Inertia + React)

Используем Laravel Breeze для быстрой настройки Inertia и React 19.
code Bash

composer require laravel/breeze --dev
php artisan breeze:install react --typescript --dark

3. Решение проблем с зависимостями (React 19 / Vite 7)

В Laravel 12 возникают конфликты версий типов Node.js и React 19. Исправляем их:
code Bash

# Обновляем типы Node.js для совместимости с Vite 7

npm install --save-dev @types/node@^22.0.0 --legacy-peer-deps

# Принудительная установка Tailwind v4 и плагинов

npm install tailwindcss@4 @tailwindcss/vite@4 tailwindcss-animate --save-dev --legacy-peer-deps

# Установка всех остальных зависимостей

npm install --legacy-peer-deps

4. Настройка Tailwind CSS v4

В v4 синтаксис изменился. Основной файл стилей resources/css/app.css должен выглядеть так:
code CSS

@import "tailwindcss";
@plugin "tailwindcss-animate";

@custom-variant dark (&:is(.dark *));

@theme {
--color-background: hsl(var(--background));
--color-foreground: hsl(var(--foreground));
--color-border: hsl(var(--border));
/* ... остальные переменные для shadcn (см. в коде проекта) */
}

@layer base {
:root {
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--border: 0 0% 89.8%;
/* ... переменные shadcn */
}
}

@layer base {

* { @apply border-border; }
  body { @apply bg-background text-foreground; }
  }

Важно: Удалите или очистите postcss.config.js, чтобы он не конфликтовал с Tailwind v4:
code JavaScript

export default {
plugins: {
autoprefixer: {},
},
};

5. Настройка Vite для Docker (WSL2)

Отредактируйте vite.config.ts, чтобы порт пробрасывался наружу и HMR работал корректно:
code TypeScript

export default defineConfig({
plugins: [
tailwindcss(),
laravel({
input: 'resources/js/app.tsx',
refresh: true,
}),
react(),
],
server: {
host: '0.0.0.0', // Важно для Docker
hmr: {
host: 'localhost',
},
},
});

6. Установка shadcn/ui

Инициализация компонентов:
code Bash

npx shadcn-ui@latest init

Настройки: Style: New York, Base Color: Slate, CSS: resources/css/app.css.

7. Установка Filament v4 (Админка)
   code Bash

composer require filament/filament:"^4.0" -W
php artisan filament:install --panels

8. База данных и Администратор

   Настройте .env (DB_HOST=mysql или как в твоем докере).

   Запустите миграции и создайте сида для админа:

code Bash

php artisan migrate

Создайте DatabaseSeeder.php:
code PHP

public function run(): void
{
User::create([
'name' => 'Admin',
'email' => 'admin@admin.com',
'password' => Hash::make('password'),
]);
}

Запуск сида: php artisan db:seed

9. Запуск проекта
   code Bash

# В одном терминале (внутри контейнера)

php artisan serve --host=0.0.0.0

# В другом терминале (внутри контейнера)

npm run dev

Частые ошибки (Troubleshooting)

    Пустая страница: Проверь консоль браузера. Если есть ошибки ERR_EMPTY_RESPONSE, проверь, проброшен ли порт 5173 в docker-compose.yml.

    Unknown utility class border-border: Проверь, что в app.css определен блок @theme и в нем есть переменная --color-border.

    Postcss error: Проверь, что в postcss.config.js не вызывается tailwindcss напрямую (v4 работает через плагин Vite).

Команды для создания ресурсов магазина:
code Bash

php artisan make:model Category -m
php artisan make:model Product -m
php artisan make:filament-resource Category --generate
php artisan make:filament-resource Product --generate
