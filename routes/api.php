<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectActivityController;
use App\Http\Controllers\RequirementComponentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ChangeRequestController;
use App\Http\Controllers\LessonsLearnedController;
use App\Http\Controllers\ProjectAttestationController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login']);
Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Project Management Endpoints
    Route::prefix('/projects')->group(function () {
        // Project CRUD
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('/', [ProjectController::class, 'store'])->name('projects.store');
        Route::get('/{project}', [ProjectController::class, 'show'])->name('projects.show');
        Route::patch('/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        // Project Operations
        Route::post('/{project}/assign-analyst', [ProjectController::class, 'assignAnalyst'])->name('projects.assignAnalyst');
        Route::post('/{project}/transition-to-planning', [ProjectController::class, 'transitionToPlanning'])->name('projects.transitionToPlanning');
        Route::post('/{project}/transition-to-execution', [ProjectController::class, 'transitionToExecution'])->name('projects.transitionToExecution');
        Route::post('/{project}/transition-to-closure', [ProjectController::class, 'transitionToClosure'])->name('projects.transitionToClosure');
        Route::post('/{project}/close', [ProjectController::class, 'closeProject'])->name('projects.closeProject');
        Route::get('/{project}/progress', [ProjectController::class, 'getProjectProgress'])->name('projects.progress');
        Route::get('/{project}/report', [ProjectController::class, 'getProjectReport'])->name('projects.report');

        // Project Approvals & Attestations
        Route::post('/{project}/approve-supervisor', [ProjectController::class, 'approveBySupervisor'])->name('projects.approveSupervisor');
        Route::post('/{project}/attest-manager', [ProjectController::class, 'attestByManager'])->name('projects.attestManager');
        Route::post('/{project}/attest-dict', [ProjectController::class, 'attestByDICT'])->name('projects.attestDICT');

        // Document Management
        Route::post('/{project}/documents', [DocumentController::class, 'store'])->name('documents.store');
        Route::get('/{project}/documents', [DocumentController::class, 'index'])->name('documents.index');
        Route::get('/{project}/documents/{phase}', [DocumentController::class, 'getRequiredDocuments'])->name('documents.required');

        // Implementation Plan / Activities
        Route::post('/{project}/activities/plan', [ProjectController::class, 'createImplementationPlan'])->name('activities.plan');
        Route::get('/{project}/activities', [ProjectActivityController::class, 'index'])->name('activities.index');
        Route::post('/{project}/activities', [ProjectActivityController::class, 'store'])->name('activities.store');

        // Requirements Tracker
        Route::post('/{project}/requirements-tracker', [ProjectController::class, 'submitRequirementsTracker'])->name('requirements.submit');
        Route::post('/{project}/requirements-tracker/approve', [ProjectController::class, 'approveRequirementsTracker'])->name('requirements.approve');
        Route::get('/{project}/requirements', [RequirementComponentController::class, 'index'])->name('requirements.index');
        Route::post('/{project}/requirements', [RequirementComponentController::class, 'store'])->name('requirements.store');
        Route::get('/{project}/requirements/overall-percentage', [RequirementComponentController::class, 'getOverallPercentage'])->name('requirements.percentage');

        // Change Requests
        Route::get('/{project}/change-requests', [ChangeRequestController::class, 'index'])->name('changeRequests.index');
        Route::post('/{project}/change-requests', [ChangeRequestController::class, 'store'])->name('changeRequests.store');
        Route::get('/{project}/change-requests/approved', [ChangeRequestController::class, 'getApprovedChanges'])->name('changeRequests.approved');

        // Lessons Learned
        Route::get('/{project}/lessons-learned', [LessonsLearnedController::class, 'index'])->name('lessonsLearned.index');
        Route::post('/{project}/lessons-learned', [LessonsLearnedController::class, 'store'])->name('lessonsLearned.store');
        Route::get('/{project}/lessons-learned/report', [LessonsLearnedController::class, 'generateReport'])->name('lessonsLearned.report');

        // Project Attestations
        Route::get('/{project}/attestations', [ProjectAttestationController::class, 'index'])->name('attestations.index');
        Route::post('/{project}/attestations', [ProjectAttestationController::class, 'store'])->name('attestations.store');
        Route::get('/{project}/attestations/status', [ProjectAttestationController::class, 'getAttestationStatus'])->name('attestations.status');
    });

    // Individual Resource Routes
    Route::apiResources([
        'documents' => DocumentController::class,
        'change-requests' => ChangeRequestController::class,
        'lessons-learned' => LessonsLearnedController::class,
        'attestations' => ProjectAttestationController::class,
    ]);

    // Custom Activity Operations
    Route::post('/activities/{activity}/progress', [ProjectActivityController::class, 'recordProgress'])->name('activities.recordProgress');

    // Custom Requirement Operations
    Route::post('/requirements/{requirement}/update', [RequirementComponentController::class, 'update'])->name('requirements.update');

    // Custom Document Operations
    Route::patch('/documents/{document}/review', [DocumentController::class, 'review'])->name('documents.review');
    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');

    // Custom Change Request Operations
    Route::post('/change-requests/{changeRequest}/approve', [ChangeRequestController::class, 'approve'])->name('changeRequests.approve');
    Route::post('/change-requests/{changeRequest}/reject', [ChangeRequestController::class, 'reject'])->name('changeRequests.reject');

    // Custom Lessons Learned Operations
    Route::post('/lessons-learned/{lesson}/submit', [LessonsLearnedController::class, 'submit'])->name('lessonsLearned.submit');
    Route::patch('/lessons-learned/{lesson}/review', [LessonsLearnedController::class, 'review'])->name('lessonsLearned.review');

    // Custom Attestation Operations
    Route::post('/attestations/{attestation}/reject', [ProjectAttestationController::class, 'reject'])->name('attestations.reject');

    // User Profile & Notifications
    Route::get('/user', [\App\Http\Controllers\UserController::class, 'profile'])->name('user.profile');
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [\App\Http\Controllers\NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('logout');
});
