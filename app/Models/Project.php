<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'budget', 'project_source', 'project_nature',
        'project_activity', 'existing_system_id', 'existing_infrastructure_id',
        'custom_system_name', 'custom_infrastructure_name',
        'supervisor_id', 'assigned_analyst_id', 'status', 'phase', 
        'is_approved', 'supervisor_approved', 'manager_attested', 'dict_attested'
    ];

    protected $casts = [
        'budget' => 'decimal:2',
        'is_approved' => 'boolean',
        'supervisor_approved' => 'boolean',
        'manager_attested' => 'boolean',
        'dict_attested' => 'boolean',
    ];

    public function activities() {
        return $this->hasMany(ProjectActivity::class);
    }

    public function requirements() {
        return $this->hasMany(RequirementComponent::class);
    }

    public function documents() {
        return $this->hasMany(Document::class);
    }

    public function supervisor() {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function analyst() {
        return $this->belongsTo(User::class, 'assigned_analyst_id');
    }

    public function changeRequests() {
        return $this->hasMany(ChangeRequest::class);
    }

    public function lessonsLearned() {
        return $this->hasMany(LessonLearned::class);
    }

    public function attestations() {
        return $this->hasMany(ProjectAttestation::class);
    }

    public function requirementsTracker() {
        return $this->hasOne(ProjectRequirementsTracker::class);
    }

    // Calculate overall project implementation status
    public function getOverallImplementationPercentage() {
        $requirements = $this->requirements;
        if ($requirements->isEmpty()) {
            return 0;
        }
        
        $total = $requirements->count();
        $completed = $requirements->where('status', 'Completed')->count();
        $ongoing = $requirements->where('status', 'Ongoing')->count();
        
        return round(((($ongoing * 50) + ($completed * 100)) / ($total * 100)) * 100, 2);
    }

    // Check if all initiation documents are uploaded
    public function allInitiationDocumentsComplete() {
        $requiredDocs = ['Concept Note', 'Approval Letter', 'Project Feasibility', 'Other Documents'];
        foreach ($requiredDocs as $doc) {
            if (!$this->documents()->where('phase', 'Initiation')->where('document_type', $doc)->where('status', 'Approved')->exists()) {
                return false;
            }
        }
        return true;
    }

    // Check if all planning documents are complete
    public function allPlanningDocumentsComplete() {
        $requiredDocs = ['Project Proposal', 'Project Charter', 'BRD', 'SRS', 'SDD', 'Risk Management Plan', 'Change Management Plan', 'QA Management Plan', 'Procurement Management Plan'];
        foreach ($requiredDocs as $doc) {
            if (!$this->documents()->where('phase', 'Planning')->where('document_type', $doc)->where('status', 'Approved')->exists()) {
                return false;
            }
        }
        return true;
    }

    // Check if all execution phase documents are complete
    public function allExecutionDocumentsComplete() {
        $requiredDocs = ['FAT Report', 'UAT Report', 'Stakeholder Form', 'Installation Plan'];
        foreach ($requiredDocs as $doc) {
            if (!$this->documents()->where('phase', 'Execution')->where('document_type', $doc)->where('status', 'Approved')->exists()) {
                return false;
            }
        }
        return true;
    }

    // Helper to get project type display
    public function getSourceDisplayAttribute() {
        return ucwords(str_replace('_', ' ', $this->project_source));
    }

    public function getNatureDisplayAttribute() {
        return ucfirst($this->project_nature);
    }

    public function getActivityDisplayAttribute() {
        return ucwords(str_replace('_', ' ', $this->project_activity));
    }
}