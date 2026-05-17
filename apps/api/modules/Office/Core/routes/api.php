<?php

use Illuminate\Support\Facades\Route;
use Modules\Office\Core\Http\Controllers\OfficePageController;
use Modules\Office\Crm\Http\Controllers\CaseCrudController;
use Modules\Office\Crm\Http\Controllers\ClientCrudController;

Route::prefix('api/office')->group(function (): void {
    Route::get('/page-data', OfficePageController::class);
    Route::get('/cases', [CaseCrudController::class, 'index']);
    Route::post('/cases', [CaseCrudController::class, 'store']);
    Route::put('/cases/{caseRecord}', [CaseCrudController::class, 'update']);
    Route::delete('/cases/{caseRecord}', [CaseCrudController::class, 'destroy']);
    Route::get('/clients', [ClientCrudController::class, 'index']);
    Route::post('/clients', [ClientCrudController::class, 'store']);
    Route::put('/clients/{clientRecord}', [ClientCrudController::class, 'update']);
    Route::delete('/clients/{clientRecord}', [ClientCrudController::class, 'destroy']);
});
