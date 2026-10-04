<?php
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectActivityController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ChangeRequestController;
use App\Http\Controllers\RequirementComponentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\LessonsLearnedController;
use App\Models\Project;
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
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');
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
Route::get('/notifications/data', [NotificationController::class, 'index'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('notifications.data');
Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('notifications.mark-read');
Route::get('/project/documents/{document}/download', [DocumentController::class, 'download'])
    ->middleware('role:admin,analyst,supervisor,manager,dict')
    ->name('project.documents.download');
Route::get('/project/{project}/report/download', [ReportController::class, 'exportProjectData'])
    ->middleware('role:admin,analyst,supervisor,manager,dict')
    ->name('project.report.download');
Route::get('/project/{project}/lessons-learned/report/download', [ReportController::class, 'exportLessonsLearned'])
    ->middleware('role:admin,analyst,supervisor,manager,dict')
    ->name('project.lessons-learned.report.download');
Route::get('/support', [SupportController::class, 'index'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('support');
Route::post('/support', [SupportController::class, 'store'])->middleware('role:analyst,supervisor,manager,dict')->name('support.store');
Route::post('/support/{ticket}/reply', [SupportController::class, 'reply'])->middleware('role:admin')->name('support.reply');
Route::get('/admin/users', [AdminUserController::class, 'index'])->middleware('role:admin')->name('admin.users.index');
Route::post('/admin/users', [AdminUserController::class, 'store'])->middleware('role:admin')->name('admin.users.store');
Route::patch('/admin/users/{user}', [AdminUserController::class, 'update'])->middleware('role:admin')->name('admin.users.update');
Route::delete('/admin/users/{user}', [AdminUserController::class, 'destroy'])->middleware('role:admin')->name('admin.users.destroy');
Route::get('/projects/{project}/workflow', [ProjectController::class, 'workflow'])->middleware('role:admin,analyst,supervisor,manager,dict')->name('project.workflow');
Route::get('/project-pages/documents', [DocumentController::class, 'library'])->middleware('role:supervisor,manager,dict')->name('project.documents.preview');
Route::get('/project-pages/changes', fn () => Inertia::render('Project/Modules', ['module' => 'changes']))->middleware('role:supervisor,manager,dict')->name('project.changes.preview');
Route::get('/project-pages/reports', fn () => Inertia::render('Project/Modules', [
    'module' => 'reports',
    'projects' => Project::query()->orderBy('name')->get(['id', 'name', 'phase']),
]))->middleware('role:supervisor,manager,dict')->name('project.reports.preview');
Route::get('/project-pages/notifications', fn () => Inertia::render('Project/Modules', ['module' => 'notifications']))->middleware('role:analyst,supervisor,manager,dict')->name('project.notifications.preview');
Route::get('/project-pages/closure', fn () => Inertia::render('Project/Modules', ['module' => 'closure']))->middleware('role:supervisor,manager,dict')->name('project.closure.preview');
});

// Project Initiation
Route::middleware(['auth', 'role:analyst,supervisor'])->group(function () {
	Route::get('/project/register', [ProjectController::class, 'create'])->name('project.create');
	Route::post('/project', [ProjectController::class, 'store'])->name('project.store');
	Route::post('/project/{project}/lessons-learned', [LessonsLearnedController::class, 'storeForProject'])
		->middleware('role:analyst')
		->name('project.lessons-learned.store');
	Route::post('/project/lessons-learned/{lessonLearned}/submit', [LessonsLearnedController::class, 'submit'])
		->middleware('role:analyst')
		->name('project.lessons-learned.submit');
	Route::delete('/project/{project}', [ProjectController::class, 'destroy'])->middleware('role:supervisor')->name('project.destroy');
	Route::post('/project/{project}/assign-analyst', [ProjectController::class, 'assignAnalyst'])->middleware('role:admin,supervisor')->name('project.assign.analyst');
	Route::post('/project/{project}/transition-to-planning', [ProjectController::class, 'transitionToPlanning'])->middleware('role:supervisor')->name('project.transition.planning');
	Route::post('/project/{project}/transition-to-execution', [ProjectController::class, 'transitionToExecution'])->middleware('role:supervisor')->name('project.transition.execution');
	Route::post('/project/{project}/transition-to-closure', [ProjectController::class, 'transitionToClosure'])->middleware('role:supervisor')->name('project.transition.closure');
	Route::post('/project/{project}/activities/plan/review', [ProjectController::class, 'reviewImplementationPlan'])->middleware('role:supervisor')->name('project.activities.plan.review');
	Route::post('/project/{project}/activities', [ProjectActivityController::class, 'storeForProject'])->middleware('role:analyst')->name('project.activities.store');
	Route::post('/project/{project}/change-requests', [ChangeRequestController::class, 'storeForProject'])->middleware('role:analyst')->name('project.change-requests.store');
	Route::patch('/project/activities/{activity}', [ProjectActivityController::class, 'update'])->middleware('role:analyst')->name('project.activities.update');
	Route::delete('/project/activities/{activity}', [ProjectActivityController::class, 'destroy'])->middleware('role:analyst')->name('project.activities.destroy');
	Route::post('/project/activities/{activity}/progress', [ProjectActivityController::class, 'recordProgress'])->middleware('role:analyst')->name('project.activities.progress');
	Route::post('/project/{project}/documents', [DocumentController::class, 'storeForProject'])->middleware('role:analyst,supervisor')->name('project.documents.store');
	Route::patch('/project/documents/{document}/review', [DocumentController::class, 'review'])->middleware('role:supervisor')->name('project.documents.review');
	Route::post('/projects/{project}/requirements', [RequirementComponentController::class, 'storeForProject'])->middleware('role:analyst')->name('project.requirements.store');
	Route::post('/requirements/{requirementComponent}/update', [RequirementComponentController::class, 'update'])->middleware('role:analyst')->name('project.requirements.update');
	Route::patch('/requirements/{requirementComponent}/review', [RequirementComponentController::class, 'review'])->middleware('role:supervisor')->name('project.requirements.review');
});
Route::middleware(['auth', 'role:admin'])->group(function () {
	Route::post('/project/{project}/assign-supervisor', [ProjectController::class, 'assignSupervisor'])->name('project.assign.supervisor');
	Route::post('/admin/projects/{project}/assign-supervisor', [AdminUserController::class, 'assignSupervisor'])->name('admin.project.assign.supervisor');
	Route::post('/admin/projects/{project}/assign-analyst', [AdminUserController::class, 'assignAnalyst'])->name('admin.project.assign.analyst');
});
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::get('/project/{project}/documents', [ProjectController::class, 'showDocuments'])->name('project.initiation.documents');
	Route::post('/project/{project}/assign', [ProjectController::class, 'assignAnalyst'])->name('project.assign');
});
Route::middleware(['auth', 'role:supervisor'])->group(function () {
	Route::post('/project/{project}/close', [ProjectController::class, 'closeProject'])->name('project.close');
	Route::patch('/project/lessons-learned/{lessonLearned}/review', [LessonsLearnedController::class, 'review'])->name('project.lessons-learned.review');
	Route::post('/project/change-requests/{changeRequest}/approve', [ChangeRequestController::class, 'approve'])->name('project.change-requests.approve');
	Route::post('/project/change-requests/{changeRequest}/reject', [ChangeRequestController::class, 'reject'])->name('project.change-requests.reject');
});
Route::middleware(['auth', 'role:manager'])->group(function () {
	Route::post('/project/{project}/attest-manager', [ProjectController::class, 'attestByManager'])->name('project.attest.manager');
});
Route::middleware(['auth', 'role:dict'])->group(function () {
	Route::post('/project/{project}/attest-dict', [ProjectController::class, 'attestByDICT'])->name('project.attest.dict');
});

// Project Planning - Activities
// Documents
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::patch('/documents/{document}/review', [DocumentController::class, 'review'])->name('documents.review');
	Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
});

// Reports
Route::middleware(['auth', 'role:supervisor,manager,dict'])->group(function () {
	Route::get('/project/{project}/tracker/excel', [ReportController::class, 'exportTrackerExcel'])->name('tracker.excel');
	Route::get('/project/{project}/tracker/pdf', [ReportController::class, 'exportTrackerPdf'])->name('tracker.pdf');
});