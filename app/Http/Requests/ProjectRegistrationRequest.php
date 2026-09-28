<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRegistrationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasRole(['analyst', 'supervisor']) ?? false;
    }

    protected function prepareForValidation(): void
    {
        $nullableFields = [
            'description',
            'budget',
            'existing_system_id',
            'existing_infrastructure_id',
            'custom_system_name',
            'custom_infrastructure_name',
        ];

        $values = [];
        foreach ($nullableFields as $field) {
            if ($this->input($field) === '') {
                $values[$field] = null;
            }
        }

        $this->merge($values);
    }

    public function rules(): array
    {
        $usesExistingComponent = in_array($this->input('project_activity'), [
            'Change Request',
            'Additional Requirements',
            'Review/Enhancement',
        ], true);

        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'budget' => 'nullable|numeric|min:0',
            'implementation_team_type' => ['required', Rule::in(['Internal', 'External'])],
            'implementation_team_names' => 'required|string|max:5000',
            'project_source' => ['required', Rule::in(['System Development', 'Infrastructure Development'])],
            'project_nature' => ['required', Rule::in(['Planned', 'Adhoc'])],
            'project_activity' => ['required', Rule::in([
                'New Implementation (Major)',
                'New Implementation (Minor)',
                'Change Request',
                'Additional Requirements',
                'Review/Enhancement',
                'Integration',
            ])],
            'existing_system_id' => [
                'nullable',
                'integer',
                Rule::requiredIf(fn () => $this->input('project_source') === 'System Development' && $usesExistingComponent),
                Rule::exists('systems', 'id'),
            ],
            'existing_infrastructure_id' => [
                'nullable',
                'integer',
                Rule::requiredIf(fn () => $this->input('project_source') === 'Infrastructure Development' && $usesExistingComponent),
                Rule::exists('infrastructure_components', 'id'),
            ],
            'custom_system_name' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(fn () => $this->input('project_source') === 'System Development' && ! $usesExistingComponent),
            ],
            'custom_infrastructure_name' => [
                'nullable',
                'string',
                'max:255',
                Rule::requiredIf(fn () => $this->input('project_source') === 'Infrastructure Development' && ! $usesExistingComponent),
            ],
        ];
    }
}
