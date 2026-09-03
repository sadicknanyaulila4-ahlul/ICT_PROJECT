<?php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\ReportController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', [ProjectController::class, 'index'])->name('dashboard');
Route::get('/requirements-tracker-preview', function () {
	return Inertia::render('Project/Execution/Traceability');
})->name('requirements.preview');

// Project Initiation
Route::get('/project/register', [ProjectController::class, 'create'])->name('project.create');
Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
Route::get('/project/{project}/documents', [ProjectController::class, 'showDocuments'])->name('project.initiation.documents');
Route::post('/project/{project}/assign', [ProjectController::class, 'assignAnalyst'])->name('project.assign');

// Project Planning - Activities
Route::resource('projects.activities', ActivityController::class)->only(['index', 'store', 'update', 'destroy']);

// Requirements (Traceability)
Route::resource('projects.requirements', RequirementController::class)->only(['index', 'store', 'update', 'destroy']);

// Documents
Route::post('/project/{project}/documents', [DocumentController::class, 'upload'])->name('documents.upload');
Route::patch('/documents/{document}/review', [DocumentController::class, 'review'])->name('documents.review');
Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');

// Reports
Route::get('/project/{project}/tracker/excel', [ReportController::class, 'exportTrackerExcel'])->name('tracker.excel');
Route::get('/project/{project}/tracker/pdf', [ReportController::class, 'exportTrackerPdf'])->name('tracker.pdf');
