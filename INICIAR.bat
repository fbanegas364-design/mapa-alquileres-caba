@echo off
echo ========================================
echo   Iniciando Mapa de Alquileres...
echo ========================================
echo.

cd /d "C:\Users\Kairos i5\OneDrive\Escritorio\prueba de concepto"

echo Abriendo navegador en 5 segundos...
start "" cmd /c "timeout /t 5 >nul && start http://localhost:5173"

echo.
echo Arrancando servidor... (no cierres esta ventana)
echo Para parar: presiona Ctrl+C
echo.

npm run dev
