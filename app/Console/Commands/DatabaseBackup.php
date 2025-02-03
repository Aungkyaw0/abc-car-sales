<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class DatabaseBackup extends Command
{
    protected $signature = 'db:backup';
    protected $description = 'Create database backup';

    public function handle()
    {
        try {
            // Set backup file name with date
            $fileName = 'abc_car_sales_backup_' . Carbon::now()->format('Y-m-d_H-i-s') . '.sql';
            
            // Set backup file path (storage/app/backups)
            $backupPath = storage_path('app/backups');
            
            // Create backups directory if it doesn't exist
            if (!file_exists($backupPath)) {
                mkdir($backupPath, 0755, true);
            }

            // Get database configuration
            $dbName = config('database.connections.mysql.database');
            $dbUser = config('database.connections.mysql.username');
            $dbPass = config('database.connections.mysql.password');

            // Create backup command
            $command = "mysqldump --user={$dbUser} --password={$dbPass} {$dbName} > {$backupPath}/{$fileName}";
            
            // Execute backup command
            exec($command);

            // Keep only last 7 days of backups
            $this->cleanOldBackups($backupPath);

            Log::info('Database backup completed successfully: ' . $fileName);
            $this->info('Database backup completed successfully!');
            
        } catch (\Exception $e) {
            Log::error('Database backup failed: ' . $e->getMessage());
            $this->error('Database backup failed: ' . $e->getMessage());
        }
    }

    private function cleanOldBackups($backupPath)
    {
        // Get all backup files
        $files = glob($backupPath . '/*.sql');
        
        // Keep only last 7 days of backups
        if (count($files) > 7) {
            // Sort files by date
            usort($files, function($a, $b) {
                return filemtime($a) - filemtime($b);
            });

            // Remove older files
            $filesToDelete = array_slice($files, 0, count($files) - 7);
            foreach ($filesToDelete as $file) {
                unlink($file);
            }
        }
    }
} 