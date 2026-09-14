<?php

declare(strict_types=1);

/**
 * Database Connection Factory
 */

function db(): PDO
{
    static $pdo = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $host = app_env('DB_HOST', 'localhost');
    $port = app_env('DB_PORT', '3306');
    $dbName = app_env('DB_NAME', 'mansolutionsny');
    $user = app_env('DB_USER', 'root');
    $password = app_env('DB_PASS', '');

    $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8mb4";

    try {
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        error_log('Database connection error: ' . $e->getMessage());
        throw $e;
    }

    return $pdo;
}
