<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Modules\Office\Catalog\Application\CatalogPageProvider;
use Modules\Office\Core\Contracts\OfficePageProvider;
use Modules\Office\Core\OfficePageRegistry;
use Modules\Office\Crm\Application\CrmPageProvider;
use Modules\Office\Dashboard\Application\DashboardPageProvider;
use Modules\Office\Documents\Application\DocumentsPageProvider;
use Modules\Office\Finance\Application\FinancePageProvider;
use Modules\Office\Hr\Application\HrPageProvider;
use Modules\Office\Settings\Application\SettingsPageProvider;
use Modules\Office\Support\Application\SupportPageProvider;
use Modules\Office\Tasks\Application\TasksPageProvider;

class OfficeModulesServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(OfficePageRegistry::class, function (): OfficePageRegistry {
            return new OfficePageRegistry([
                new DashboardPageProvider(),
                new TasksPageProvider(),
                new CrmPageProvider(),
                new SupportPageProvider(),
                new DocumentsPageProvider(),
                new HrPageProvider(),
                new FinancePageProvider(),
                new CatalogPageProvider(),
                new SettingsPageProvider(),
            ]);
        });
    }

    public function boot(): void
    {
        $this->loadRoutesFrom(base_path('modules/Office/Core/routes/api.php'));
    }
}
