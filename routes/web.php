<?php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\ReportController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => Inertia::render('Home'))->name('home');
Route::get('/login', [App\Http\Controllers\AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [App\Http\Controllers\AuthController::class, 'webLogin'])->name('web.login');
Route::get('/register', [App\Http\Controllers\AuthController::class, 'showRegister'])->name('register');
Route::post('/register', [App\Http\Controllers\AuthController::class, 'webRegister'])->name('web.register');
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'webLogout'])->name('web.logout');
Route::middleware('auth')->group(function () {
Route::get('/dashboard', [ProjectController::class, 'index'])->name('dashboard');
Route::get('/requirements-tracker-preview', function () {
	return Inertia::render('Project/Execution/Traceability');
})->name('requirements.preview');
Route::get('/project-workflow-preview', function () {
    return Inertia::render('Project/Workflow');
})->name('project.workflow.preview');
Route::get('/project-pages/documents', fn () => Inertia::render('Project/Modules', ['module' => 'documents']))->name('project.documents.preview');
Route::get('/project-pages/changes', fn () => Inertia::render('Project/Modules', ['module' => 'changes']))->name('project.changes.preview');
Route::get('/project-pages/reports', fn () => Inertia::render('Project/Modules', ['module' => 'reports']))->name('project.reports.preview');
Route::get('/project-pages/notifications', fn () => Inertia::render('Project/Modules', ['module' => 'notifications']))->name('project.notifications.preview');
Route::get('/project-pages/{module}', function (string $module) {
	abort_unless(in_array($module, ['initiation', 'planning', 'execution', 'closure'], true), 404);

	return Inertia::render('Project/Modules', ['module' => $module]);
})->name('project.module.preview');
});

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
