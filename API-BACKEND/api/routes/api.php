<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\categoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ImageUpload;
use App\Http\Controllers\MyFatoorahController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ServiceCategoryController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TestController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Admin login route
Route::post('/admin/login', [AdminAuthController::class, 'login'])->name('admin.login');

Route::get('tags', [TagController::class, 'index']);
Route::get('tags/{id}', [TagController::class, 'show']);

Route::get('articles', [ArticleController::class, 'index']);
Route::get('articles/{id}', [ArticleController::class, 'show']);

Route::get('services/category/{category_id}', [ServicesController::class, 'servicesByCategory']);

Route::post('/process-payment', [MyFatoorahController::class, 'index']);
Route::get('/myfatoorah-callback', [MyFatoorahController::class, 'callback']);

Route::post('payment',[PaymentController::class,'executePayment']);

Route::post('contact-us', [ContactController::class, 'store']);
Route::middleware(['auth:sanctum'])->group(function () {

    // Admin logout route
    Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

    Route::resource('articles', ArticleController::class)->except(['show', 'index']);

    Route::resource('tags', TagController::class)->except(['show', 'index']);
    Route::post('/set-tag', [TagController::class, 'linkTagArticle']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/upload-images', [ImageUpload::class, 'upload'])->name('admin.upload.image');
    Route::apiResource('service-categories', ServiceCategoryController::class);
    Route::apiResource('services', ServicesController::class);
    Route::post('services/map', [ServicesController::class, 'mapServiceToCategory']);
    Route::post('services/unmap', [ServicesController::class, 'unmapServiceToCategory']);
    Route::put('mark-as-done/{id}', [ContactController::class, 'markAsDone']);
    Route::put('mark-as-undone/{id}', [ContactController::class, 'markAsUnDone']);
});
