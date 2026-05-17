<?php

namespace Modules\Office\Core;

use Modules\Office\Core\Contracts\OfficePageProvider;

class OfficePageRegistry
{
    /**
     * @param  array<int, OfficePageProvider>  $providers
     */
    public function __construct(
        private readonly array $providers,
    ) {
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function all(): array
    {
        return array_values(
            array_merge(
                ...array_map(
                    fn (OfficePageProvider $provider): array => $provider->pages(),
                    $this->providers,
                ),
            ),
        );
    }

    /**
     * @return array<string, mixed>|null
     */
    public function findByPath(string $path): ?array
    {
        foreach ($this->all() as $page) {
            if (($page['path'] ?? null) === $path) {
                return $page;
            }
        }

        return null;
    }
}
