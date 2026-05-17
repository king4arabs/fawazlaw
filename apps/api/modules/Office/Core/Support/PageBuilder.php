<?php

namespace Modules\Office\Core\Support;

class PageBuilder
{
    /**
     * @param  array<int, array<string, mixed>>  $stats
     * @param  array<int, array<string, mixed>>  $charts
     * @return array<string, mixed>
     */
    public static function dashboard(string $path, string $title, string $subtitle, array $stats, array $charts): array
    {
        return compact('path', 'title', 'subtitle', 'stats', 'charts') + [
            'pageType' => 'dashboard',
        ];
    }

    /**
     * @param  array<int, string>  $filters
     * @param  array<int, string>  $actions
     * @param  array<int, array<string, mixed>>  $board
     * @return array<string, mixed>
     */
    public static function board(string $path, string $title, string $subtitle, array $filters, array $actions, array $board): array
    {
        return compact('path', 'title', 'subtitle', 'filters', 'actions', 'board') + [
            'pageType' => 'board',
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $events
     * @return array<string, mixed>
     */
    public static function calendar(string $path, string $title, string $subtitle, string $month, array $events): array
    {
        return compact('path', 'title', 'subtitle') + [
            'pageType' => 'calendar',
            'calendar' => compact('month', 'events'),
        ];
    }

    /**
     * @param  array<int, string>  $filters
     * @param  array<int, string>  $actions
     * @param  array<int, array<string, string>>  $columns
     * @param  array<int, array<string, string>>  $rows
     * @return array<string, mixed>
     */
    public static function table(string $path, string $title, string $subtitle, array $filters, array $actions, array $columns, array $rows): array
    {
        return compact('path', 'title', 'subtitle', 'filters', 'actions', 'columns', 'rows') + [
            'pageType' => 'table',
        ];
    }

    /**
     * @param  array<int, array<string, string>>  $conversations
     * @param  array<int, array<string, string>>  $messages
     * @return array<string, mixed>
     */
    public static function chat(string $path, string $title, string $subtitle, array $conversations, array $messages): array
    {
        return compact('path', 'title', 'subtitle') + [
            'pageType' => 'chat',
            'chat' => compact('conversations', 'messages'),
        ];
    }

    /**
     * @param  array<int, array<string, string>>  $folders
     * @param  array<int, array<string, string>>  $recent
     * @return array<string, mixed>
     */
    public static function archive(string $path, string $title, string $subtitle, array $folders, array $recent): array
    {
        return compact('path', 'title', 'subtitle') + [
            'pageType' => 'archive',
            'archive' => compact('folders', 'recent'),
        ];
    }

    /**
     * @param  array<int, array<string, string|bool>>  $features
     * @param  array<int, array<string, string>>  $metrics
     * @return array<string, mixed>
     */
    public static function overview(string $path, string $title, string $subtitle, array $metrics, array $features): array
    {
        return compact('path', 'title', 'subtitle') + [
            'pageType' => 'overview',
            'overview' => compact('metrics', 'features'),
        ];
    }

    /**
     * @return array<int, array<string, string>>
     */
    public static function columns(array $columns): array
    {
        return array_map(
            fn (array $column): array => [
                'key' => $column['key'],
                'label' => $column['label'],
            ],
            $columns,
        );
    }
}
