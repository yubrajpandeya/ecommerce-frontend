Write-Host "Starting Laravel Backend Server..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start the Laravel backend at https://api.chooseyourcart.com" -ForegroundColor Yellow
Write-Host ""

# Check if we're in the right directory (look for Laravel files)
if (-not (Test-Path "../ecommerce-backend")) {
    Write-Host "Error: Laravel backend directory not found at ../ecommerce-backend" -ForegroundColor Red
    Write-Host "Please make sure your Laravel backend is in the correct location." -ForegroundColor Red
    Write-Host ""
    Read-Host "Press Enter to continue..."
    exit 1
}

Write-Host "Changing to Laravel backend directory..." -ForegroundColor Cyan
Set-Location "../ecommerce-backend"

Write-Host "Starting Laravel development server..." -ForegroundColor Cyan
php artisan serve --host=127.0.0.1 --port=8000

Read-Host "Press Enter to continue..."
