<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRegistrationRequest extends FormRequest
{
    public function authorize() { return auth()->user()->hasRole('supervisor'); }
    public function rules() {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'project_source' => 'required|in:system_development,infrastructure_development',
            'project_nature' => 'required|in:planned,adhoc',
            'project_activity' => 'required|in:new_implementation,change_request,additional_requirements,review_enhancement,integration',
            'existing_system_id' => 'nullable|exists:systems,id',
            'existing_infrastructure_id' => 'nullable|exists:infrastructure_components,id',
            'custom_system_name' => 'nullable|string|max:255',
            'custom_infrastructure_name' => 'nullable|string|max:255',
        ];
    }
}