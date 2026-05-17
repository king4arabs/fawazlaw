<?php

namespace Modules\Office\Core\Contracts;

interface OfficePageProvider
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function pages(): array;
}
