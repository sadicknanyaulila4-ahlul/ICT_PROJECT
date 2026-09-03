import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
const indexb372e3c7ed025bea466e87505881ede5 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'get',
})

indexb372e3c7ed025bea466e87505881ede5.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/attestations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
indexb372e3c7ed025bea466e87505881ede5.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return indexb372e3c7ed025bea466e87505881ede5.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
indexb372e3c7ed025bea466e87505881ede5.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
indexb372e3c7ed025bea466e87505881ede5.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
const indexb372e3c7ed025bea466e87505881ede5Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
indexb372e3c7ed025bea466e87505881ede5Form.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/projects/{project}/attestations'
*/
indexb372e3c7ed025bea466e87505881ede5Form.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexb372e3c7ed025bea466e87505881ede5.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexb372e3c7ed025bea466e87505881ede5.form = indexb372e3c7ed025bea466e87505881ede5Form
/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
const index23806bccf02e8e3162b4ca5aa711043c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'get',
})

index23806bccf02e8e3162b4ca5aa711043c.definition = {
    methods: ["get","head"],
    url: '/api/attestations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
index23806bccf02e8e3162b4ca5aa711043c.url = (options?: RouteQueryOptions) => {
    return index23806bccf02e8e3162b4ca5aa711043c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
index23806bccf02e8e3162b4ca5aa711043c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
index23806bccf02e8e3162b4ca5aa711043c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
const index23806bccf02e8e3162b4ca5aa711043cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
index23806bccf02e8e3162b4ca5aa711043cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::index
* @see app/Http/Controllers/ProjectAttestationController.php:16
* @route '/api/attestations'
*/
index23806bccf02e8e3162b4ca5aa711043cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index23806bccf02e8e3162b4ca5aa711043c.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index23806bccf02e8e3162b4ca5aa711043c.form = index23806bccf02e8e3162b4ca5aa711043cForm

/**
* Multiple routes resolve to \App\Http\Controllers\ProjectAttestationController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/projects/{project}/attestations': indexb372e3c7ed025bea466e87505881ede5,
    '/api/attestations': index23806bccf02e8e3162b4ca5aa711043c,
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/projects/{project}/attestations'
*/
const storeb372e3c7ed025bea466e87505881ede5 = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'post',
})

storeb372e3c7ed025bea466e87505881ede5.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/attestations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/projects/{project}/attestations'
*/
storeb372e3c7ed025bea466e87505881ede5.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: args.project,
    }

    return storeb372e3c7ed025bea466e87505881ede5.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/projects/{project}/attestations'
*/
storeb372e3c7ed025bea466e87505881ede5.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/projects/{project}/attestations'
*/
const storeb372e3c7ed025bea466e87505881ede5Form = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/projects/{project}/attestations'
*/
storeb372e3c7ed025bea466e87505881ede5Form.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeb372e3c7ed025bea466e87505881ede5.url(args, options),
    method: 'post',
})

storeb372e3c7ed025bea466e87505881ede5.form = storeb372e3c7ed025bea466e87505881ede5Form
/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/attestations'
*/
const store23806bccf02e8e3162b4ca5aa711043c = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'post',
})

store23806bccf02e8e3162b4ca5aa711043c.definition = {
    methods: ["post"],
    url: '/api/attestations',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/attestations'
*/
store23806bccf02e8e3162b4ca5aa711043c.url = (options?: RouteQueryOptions) => {
    return store23806bccf02e8e3162b4ca5aa711043c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/attestations'
*/
store23806bccf02e8e3162b4ca5aa711043c.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/attestations'
*/
const store23806bccf02e8e3162b4ca5aa711043cForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::store
* @see app/Http/Controllers/ProjectAttestationController.php:35
* @route '/api/attestations'
*/
store23806bccf02e8e3162b4ca5aa711043cForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store23806bccf02e8e3162b4ca5aa711043c.url(options),
    method: 'post',
})

store23806bccf02e8e3162b4ca5aa711043c.form = store23806bccf02e8e3162b4ca5aa711043cForm

/**
* Multiple routes resolve to \App\Http\Controllers\ProjectAttestationController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/projects/{project}/attestations': storeb372e3c7ed025bea466e87505881ede5,
    '/api/attestations': store23806bccf02e8e3162b4ca5aa711043c,
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
export const getAttestationStatus = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAttestationStatus.url(args, options),
    method: 'get',
})

getAttestationStatus.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/attestations/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
getAttestationStatus.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { project: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            project: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
    }

    return getAttestationStatus.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
getAttestationStatus.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getAttestationStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
getAttestationStatus.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getAttestationStatus.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
const getAttestationStatusForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAttestationStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
getAttestationStatusForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAttestationStatus.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::getAttestationStatus
* @see app/Http/Controllers/ProjectAttestationController.php:79
* @route '/api/projects/{project}/attestations/status'
*/
getAttestationStatusForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getAttestationStatus.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getAttestationStatus.form = getAttestationStatusForm

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
export const show = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/attestations/{attestation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
show.url = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attestation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attestation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attestation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attestation: typeof args.attestation === 'object'
        ? args.attestation.id
        : args.attestation,
    }

    return show.definition.url
            .replace('{attestation}', parsedArgs.attestation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
show.get = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
show.head = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
const showForm = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
showForm.get = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::show
* @see app/Http/Controllers/ProjectAttestationController.php:71
* @route '/api/attestations/{attestation}'
*/
showForm.head = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
export const update = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/attestations/{attestation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
update.url = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attestation: args }
    }

    if (Array.isArray(args)) {
        args = {
            attestation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attestation: args.attestation,
    }

    return update.definition.url
            .replace('{attestation}', parsedArgs.attestation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
update.put = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
update.patch = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
const updateForm = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
updateForm.put = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::update
* @see app/Http/Controllers/ProjectAttestationController.php:0
* @route '/api/attestations/{attestation}'
*/
updateForm.patch = (args: { attestation: string | number } | [attestation: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\ProjectAttestationController::destroy
* @see app/Http/Controllers/ProjectAttestationController.php:117
* @route '/api/attestations/{attestation}'
*/
export const destroy = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/attestations/{attestation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::destroy
* @see app/Http/Controllers/ProjectAttestationController.php:117
* @route '/api/attestations/{attestation}'
*/
destroy.url = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attestation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attestation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attestation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attestation: typeof args.attestation === 'object'
        ? args.attestation.id
        : args.attestation,
    }

    return destroy.definition.url
            .replace('{attestation}', parsedArgs.attestation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::destroy
* @see app/Http/Controllers/ProjectAttestationController.php:117
* @route '/api/attestations/{attestation}'
*/
destroy.delete = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::destroy
* @see app/Http/Controllers/ProjectAttestationController.php:117
* @route '/api/attestations/{attestation}'
*/
const destroyForm = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::destroy
* @see app/Http/Controllers/ProjectAttestationController.php:117
* @route '/api/attestations/{attestation}'
*/
destroyForm.delete = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\ProjectAttestationController::reject
* @see app/Http/Controllers/ProjectAttestationController.php:97
* @route '/api/attestations/{attestation}/reject'
*/
export const reject = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/api/attestations/{attestation}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectAttestationController::reject
* @see app/Http/Controllers/ProjectAttestationController.php:97
* @route '/api/attestations/{attestation}/reject'
*/
reject.url = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attestation: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { attestation: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            attestation: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        attestation: typeof args.attestation === 'object'
        ? args.attestation.id
        : args.attestation,
    }

    return reject.definition.url
            .replace('{attestation}', parsedArgs.attestation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectAttestationController::reject
* @see app/Http/Controllers/ProjectAttestationController.php:97
* @route '/api/attestations/{attestation}/reject'
*/
reject.post = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::reject
* @see app/Http/Controllers/ProjectAttestationController.php:97
* @route '/api/attestations/{attestation}/reject'
*/
const rejectForm = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectAttestationController::reject
* @see app/Http/Controllers/ProjectAttestationController.php:97
* @route '/api/attestations/{attestation}/reject'
*/
rejectForm.post = (args: { attestation: number | { id: number } } | [attestation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

const ProjectAttestationController = { index, store, getAttestationStatus, show, update, destroy, reject }

export default ProjectAttestationController