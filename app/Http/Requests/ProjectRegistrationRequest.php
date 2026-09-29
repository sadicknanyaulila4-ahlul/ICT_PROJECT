<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;
use App\Models\System;

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

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            $usesExistingComponent = in_array($this->input('project_activity'), [
                'Change Request',
                'Additional Requirements',
                'Review/Enhancement',
            ], true);

            if (! $usesExistingComponent && ($this->filled('existing_system_id') || $this->filled('existing_infrastructure_id'))) {
                $validator->errors()->add('project_activity', 'Existing systems or infrastructure can only be selected for an existing-component activity.');
            }

            if ($this->filled('existing_system_id') && $this->filled('custom_system_name')) {
                $validator->errors()->add('custom_system_name', 'Choose an existing system or enter a new system name, not both.');
            }

            if ($this->filled('existing_infrastructure_id') && $this->filled('custom_infrastructure_name')) {
                $validator->errors()->add('custom_infrastructure_name', 'Choose existing infrastructure or enter a new name, not both.');
            }

            if ($this->input('project_source') !== 'System Development'
                || $this->input('existing_system_id')
                || ! is_string($this->input('custom_system_name'))) {
                return;
            }

            $name = mb_strtolower(trim($this->input('custom_system_name')));
            if ($name !== '' && System::query()->whereRaw('LOWER(TRIM(name)) = ?', [$name])->exists()) {
                $validator->errors()->add(
                    'custom_system_name',
                    'A system with this name already exists. Select the existing system or enter a different name.'
                );
            }
        });
    }
}
