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
Route::get('/dashboard', [ProjectController::class, 'index'])->middleware('role:analyst,supervisor,manager,dict')->name('dashboard');
Route::get('/profile', fn () => Inertia::render('Profile'))->middleware('role:analyst,supervisor,manager,dict')->name('profile');
Route::get('/projects/{project}/workflow', [ProjectController::class, 'workflow'])->middleware('role:analyst,supervisor,manager,dict')->name('project.workflow');
Route::get('/requirements-tracker-preview', function () {
	return Inertia::render('Project/Execution/Traceability');
})->middleware('role:analyst,supervisor')->name('requirements.preview');
Route::get('/project-workflow-preview', function () {
    return Inertia::render('Project/Workflow');
})->middleware('role:analyst,supervisor')->name('project.workflow.preview');
Route::get('/project-pages/documents', fn () => Inertia::render('Project/Modules', ['module' => 'documents']))->middleware('role:supervisor,manager,dict')->name('project.documents.preview');
Route::get('/project-pages/changes', fn () => Inertia::render('Project/Modules', ['module' => 'changes']))->middleware('role:supervisor,manager,dict')->name('project.changes.preview');
Route::get('/project-pages/reports', fn () => Inertia::render('Project/Modules', ['module' => 'reports']))->middleware('role:supervisor,manager,dict')->name('project.reports.preview');
Route::get('/project-pages/notifications', fn () => Inertia::render('Project/Modules', ['module' => 'notifications']))->middleware('role:analyst,supervisor,manager,dict')->name('project.notifications.preview');
Route::get('/project-pages/closure', fn () => Inertia::render('Project/Modules', ['module' => 'closure']))->middleware('role:supervisor,manager,dict')->name('project.closure.preview');
Route::get('/project-pages/{module}', function (string $module) {
	abort_unless(in_array($module, ['initiation', 'planning', 'execution'], true), 404);

	return Inertia::render('Project/Modules', ['module' => $module]);
})->middleware('role:analyst,supervisor')->name('project.module.preview');
});

// Project Initiation
Route::middleware(['auth', 'role:analyst,supervisor'])->group(function () {
	Route::get('/project/register', [ProjectController::class, 'create'])->name('project.create');
	Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
	Route::resource('projects.activities', ActivityController::class)->only(['index', 'store', 'update', 'destroy']);
	Route::resource('projects.requirements', RequirementController::class)->only(['index', 'store', 'update', 'destroy']);
});
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::get('/project/{project}/documents', [ProjectController::class, 'showDocuments'])->name('project.initiation.documents');
	Route::post('/project/{project}/assign', [ProjectController::class, 'assignAnalyst'])->name('project.assign');
});

// Project Planning - Activities
// Documents
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::post('/project/{project}/documents', [DocumentController::class, 'upload'])->name('documents.upload');
	Route::patch('/documents/{document}/review', [DocumentController::class, 'review'])->name('documents.review');
	Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});

// Reports
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::get('/project/{project}/tracker/excel', [ReportController::class, 'exportTrackerExcel'])->name('tracker.excel');
	Route::get('/project/{project}/tracker/pdf', [ReportController::class, 'exportTrackerPdf'])->name('tracker.pdf');
});
