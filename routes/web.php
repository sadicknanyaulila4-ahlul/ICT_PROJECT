<?php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\RequirementController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SupportController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

// Lugha: Kiswahili / English
Route::post('/language', function (\Illuminate\Http\Request $request) {
    $locale = $request->input('locale', 'en');
    if (! in_array($locale, ['en', 'sw'], true)) {
        $locale = 'en';
    }
    $request->session()->put('locale', $locale);

    return back();
})->name('language.switch');

// Need Help (kabla ya login) - challenge kwa admin
Route::get('/need-help', [SupportController::class, 'needHelp'])->name('need.help');
Route::post('/need-help', [SupportController::class, 'submitNeedHelp'])->name('need.help.submit');

// Forgot / Reset password
Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
Route::post('/forgot-password', [AuthController::class, 'sendResetLink'])->name('password.email');
Route::get('/reset-password/{token}', [AuthController::class, 'showResetPassword'])->name('password.reset');
Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.update');
Route::redirect('/', '/login')->name('home');
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'webLogin'])->name('web.login');
Route::post('/logout', [AuthController::class, 'webLogout'])->name('web.logout');
Route::middleware('auth')->group(function () {
Route::get('/dashboard', [ProjectController::class, 'index'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('dashboard');
Route::get('/profile', [ProfileController::class, 'show'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('profile');
Route::patch('/profile', [ProfileController::class, 'update'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('profile.update');
Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('profile.photo.update');
Route::delete('/profile/photo', [ProfileController::class, 'destroyPhoto'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('profile.photo.destroy');
Route::get('/notifications', fn () => Inertia::render('Notifications'))->middleware('role:admin,analyst,supervisor,manager,dict')->name('notifications');
Route::get('/support', [SupportController::class, 'index'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('support');
Route::post('/support', [SupportController::class, 'store'])->middleware('role:analyst,supervisor,manager,dict')->name('support.store');
Route::post('/support/{ticket}/reply', [SupportController::class, 'reply'])->middleware('role:admin')->name('support.reply');
Route::get('/admin/users', [AdminUserController::class, 'index'])->middleware('role:admin')->name('admin.users.index');
Route::post('/admin/users', [AdminUserController::class, 'store'])->middleware('role:admin')->name('admin.users.store');
Route::patch('/admin/users/{user}', [AdminUserController::class, 'update'])->middleware('role:admin')->name('admin.users.update');
Route::delete('/admin/users/{user}', [AdminUserController::class, 'destroy'])->middleware('role:admin')->name('admin.users.destroy');
Route::get('/projects/{project}/workflow', [ProjectController::class, 'workflow'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('project.workflow');
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
