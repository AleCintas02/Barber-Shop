<?php

use App\Http\Controllers\BarberosController;
use App\Http\Controllers\InventarioController;
use App\Http\Controllers\PedidosController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiciosController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //servicios
    Route::get('/nuevo-servicio', [ServiciosController::class, 'create'])->name('nuevo-servicio');
    Route::post('/agregar-servicio', [ServiciosController::class, 'store'])->name('agregar-servicio');
    Route::get('/listar-servicios', [ServiciosController::class, 'index']);
    Route::delete('/eliminar-servicio/{id}', [ServiciosController::class, 'destroy']);
    Route::put('/editar-servicio/{id}', [ServiciosController::class, 'update']);
    Route::get('/buscar-servicio/{id}', [ServiciosController::class, 'show']);

    //barberos
    Route::get('/listar-barberos', [BarberosController::class, 'index'])->name('gestion-barberos');
    Route::get('/gestion-barberos', [BarberosController::class, 'create'])->name('gestion-barberos');
    Route::post('/agregar-barbero', [BarberosController::class, 'store']);
    Route::put('/editar-barbero/{id}', [BarberosController::class, 'update']);
    Route::delete('/eliminar-barbero/{id}', [BarberosController::class, 'destroy']);

    //pedidos
    Route::get('/pedidos', [PedidosController::class, 'create'])->name('pedidos');


    //inventario
    Route::get('/inventario', [InventarioController::class, 'index'])->name('inventario');
});




require __DIR__ . '/auth.php';
