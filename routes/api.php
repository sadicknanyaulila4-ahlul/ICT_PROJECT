<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectActivityController;
use App\Http\Controllers\RequirementComponentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ChangeRequestController;
use App\Http\Controllers\LessonsLearnedController;
use App\Http\Controllers\ProjectAttestationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // Project Management Endpoints
    Route::prefix('/projects')->group(function () {
        // Project CRUD
        Route::get('/', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('/', [ProjectController::class, 'store'])->middleware('role:analyst,supervisor')->name('projects.store');
        Route::get('/{project}', [ProjectController::class, 'show'])->name('projects.show');
        Route::patch('/{project}', [ProjectController::class, 'update'])->middleware('role:analyst,supervisor')->name('projects.update');
        Route::delete('/{project}', [ProjectController::class, 'destroy'])->middleware('role:supervisor')->name('projects.destroy');

        // Project Operations
        Route::post('/{project}/assign-analyst', [ProjectController::class, 'assignAnalyst'])->middleware('role:supervisor')->name('projects.assignAnalyst');
        Route::post('/{project}/transition-to-planning', [ProjectController::class, 'transitionToPlanning'])->middleware('role:supervisor')->name('projects.transitionToPlanning');
        Route::post('/{project}/transition-to-execution', [ProjectController::class, 'transitionToExecution'])->middleware('role:supervisor')->name('projects.transitionToExecution');
        Route::post('/{project}/transition-to-closure', [ProjectController::class, 'transitionToClosure'])->middleware('role:supervisor')->name('projects.transitionToClosure');
        Route::post('/{project}/close', [ProjectController::class, 'closeProject'])->middleware('role:supervisor')->name('projects.closeProject');
        Route::get('/{project}/progress', [ProjectController::class, 'getProjectProgress'])->name('projects.progress');
        Route::get('/{project}/report', [ProjectController::class, 'getProjectReport'])->name('projects.report');

        // Project Approvals & Attestations
        Route::post('/{project}/approve-supervisor', [ProjectController::class, 'approveBySupervisor'])->middleware('role:supervisor')->name('projects.approveSupervisor');
        Route::post('/{project}/attest-manager', [ProjectController::class, 'attestByManager'])->middleware('role:manager')->name('projects.attestManager');
        Route::post('/{project}/attest-dict', [ProjectController::class, 'attestByDICT'])->middleware('role:dict')->name('projects.attestDICT');

        // Document Management
        Route::post('/{project}/documents', [DocumentController::class, 'storeForProject'])->middleware('role:analyst,supervisor')->name('documents.store');
        Route::get('/{project}/documents', [DocumentController::class, 'index'])->name('documents.index');
        Route::get('/{project}/documents/{phase}', [DocumentController::class, 'getRequiredDocuments'])->name('documents.required');

        // Implementation Plan / Activities
        Route::post('/{project}/activities/plan', [ProjectController::class, 'createImplementationPlan'])->middleware('role:analyst')->name('activities.plan');
        Route::post('/{project}/activities/plan/review', [ProjectController::class, 'reviewImplementationPlan'])->middleware('role:supervisor')->name('activities.plan.review');
        Route::get('/{project}/activities', [ProjectActivityController::class, 'index'])->name('activities.index');
        Route::post('/{project}/activities', [ProjectActivityController::class, 'storeForProject'])->middleware('role:analyst')->name('activities.store');

        // Requirements Tracker
        Route::post('/{project}/requirements-tracker', [ProjectController::class, 'submitRequirementsTracker'])->middleware('role:analyst')->name('requirements.submit');
        Route::post('/{project}/requirements-tracker/approve', [ProjectController::class, 'approveRequirementsTracker'])->middleware('role:supervisor')->name('requirements.approve');
        Route::get('/{project}/requirements', [RequirementComponentController::class, 'index'])->name('requirements.index');
        Route::post('/{project}/requirements', [RequirementComponentController::class, 'storeForProject'])->middleware('role:analyst')->name('requirements.store');
        Route::get('/{project}/requirements/overall-percentage', [RequirementComponentController::class, 'getOverallPercentage'])->name('requirements.percentage');

        // Change Requests
        Route::get('/{project}/change-requests', [ChangeRequestController::class, 'index'])->name('changeRequests.index');
        Route::post('/{project}/change-requests', [ChangeRequestController::class, 'storeForProject'])->middleware('role:analyst')->name('changeRequests.store');
        Route::get('/{project}/change-requests/approved', [ChangeRequestController::class, 'getApprovedChanges'])->name('changeRequests.approved');

        // Lessons Learned
        Route::get('/{project}/lessons-learned', [LessonsLearnedController::class, 'index'])->name('lessonsLearned.index');
        Route::post('/{project}/lessons-learned', [LessonsLearnedController::class, 'storeForProject'])->middleware('role:analyst')->name('lessonsLearned.store');
        Route::get('/{project}/lessons-learned/report', [LessonsLearnedController::class, 'generateReport'])->name('lessonsLearned.report');

        // Project Attestations
        Route::get('/{project}/attestations', [ProjectAttestationController::class, 'index'])->name('attestations.index');
        Route::post('/{project}/attestations', [ProjectAttestationController::class, 'store'])->middleware('role:manager,dict')->name('attestations.store');
        Route::get('/{project}/attestations/status', [ProjectAttestationController::class, 'getAttestationStatus'])->name('attestations.status');
    });

    // Individual Resource Routes (explicit to match controller signatures)
    Route::get('/documents/{document}', [DocumentController::class, 'show'])->name('documents.show');
    Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->name('documents.destroy');
    Route::get('/change-requests/{changeRequest}', [ChangeRequestController::class, 'show'])->name('changeRequests.show');
    Route::delete('/change-requests/{changeRequest}', [ChangeRequestController::class, 'destroy'])->name('changeRequests.destroy');
    Route::get('/lessons-learned/{lessonLearned}', [LessonsLearnedController::class, 'show'])->name('lessonsLearned.show');
    Route::put('/lessons-learned/{lessonLearned}', [LessonsLearnedController::class, 'update'])->name('lessonsLearned.update');
    Route::patch('/lessons-learned/{lessonLearned}', [LessonsLearnedController::class, 'update'])->name('lessonsLearned.update.patch');
    Route::delete('/lessons-learned/{lessonLearned}', [LessonsLearnedController::class, 'destroy'])->name('lessonsLearned.destroy');
    Route::get('/attestations/{attestation}', [ProjectAttestationController::class, 'show'])->name('attestations.show');
    Route::delete('/attestations/{attestation}', [ProjectAttestationController::class, 'destroy'])->name('attestations.destroy');
    Route::get('/activities/{activity}', [ProjectActivityController::class, 'show'])->name('activities.show');
    Route::get('/requirements/{requirementComponent}', [RequirementComponentController::class, 'show'])->name('requirements.show');

    // Custom Activity Operations
    Route::post('/activities/{activity}/progress', [ProjectActivityController::class, 'recordProgress'])->middleware('role:analyst')->name('activities.recordProgress');
    Route::patch('/activities/{activity}', [ProjectActivityController::class, 'update'])->middleware('role:analyst')->name('activities.update');
    Route::delete('/activities/{activity}', [ProjectActivityController::class, 'destroy'])->middleware('role:analyst')->name('activities.destroy');

    // Custom Requirement Operations
    Route::post('/requirements/{requirementComponent}/update', [RequirementComponentController::class, 'update'])->middleware('role:analyst')->name('requirements.update');
    Route::patch('/requirements/{requirementComponent}/review', [RequirementComponentController::class, 'review'])->middleware('role:supervisor')->name('requirements.review');
    Route::delete('/requirements/{requirementComponent}', [RequirementComponentController::class, 'destroy'])->middleware('role:analyst')->name('requirements.destroy');

    // Custom Document Operations
    Route::patch('/documents/{document}/review', [DocumentController::class, 'review'])->middleware('role:supervisor')->name('documents.review');
    Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->name('documents.download');

    // Custom Change Request Operations
    Route::post('/change-requests/{changeRequest}/approve', [ChangeRequestController::class, 'approve'])->middleware('role:supervisor')->name('changeRequests.approve');
    Route::post('/change-requests/{changeRequest}/reject', [ChangeRequestController::class, 'reject'])->middleware('role:supervisor')->name('changeRequests.reject');

    // Custom Lessons Learned Operations
    Route::post('/lessons-learned/{lessonLearned}/submit', [LessonsLearnedController::class, 'submit'])->middleware('role:analyst')->name('lessonsLearned.submit');
    Route::patch('/lessons-learned/{lessonLearned}/review', [LessonsLearnedController::class, 'review'])->middleware('role:supervisor')->name('lessonsLearned.review');

    // Custom Attestation Operations
    Route::post('/attestations/{attestation}/reject', [ProjectAttestationController::class, 'reject'])->name('attestations.reject');

    // User Profile & Notifications
    Route::get('/user', [UserController::class, 'profile'])->name('user.profile');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{notification}/read', [NotificationController::class, 'markAsRead'])->name('notifications.read');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
