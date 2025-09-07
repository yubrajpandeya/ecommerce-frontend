@echo off
echo Starting Laravel Backend Server...
echo.
echo This will start the Laravel backend at http://127.0.0.1:8000
echo.

REM Check if we're in the right directory (look for Laravel files)
if not exist "../ecommerce-backend" (
    echo Error: Laravel backend directory not found at ../ecommerce-backend
    echo Please make sure your Laravel backend is in the correct location.
    echo.
    pause
    exit /b 1
)

echo Changing to Laravel backend directory...
cd /d "../ecommerce-backend"

echo Starting Laravel development server...
php artisan serve --host=127.0.0.1 --port=8000

pause
