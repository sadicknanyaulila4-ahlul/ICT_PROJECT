import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
const index966906d74a9d7003517bfe0503c223f6 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'get',
})

index966906d74a9d7003517bfe0503c223f6.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/change-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
index966906d74a9d7003517bfe0503c223f6.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index966906d74a9d7003517bfe0503c223f6.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
index966906d74a9d7003517bfe0503c223f6.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
index966906d74a9d7003517bfe0503c223f6.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
const index966906d74a9d7003517bfe0503c223f6Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
index966906d74a9d7003517bfe0503c223f6Form.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/projects/{project}/change-requests'
*/
index966906d74a9d7003517bfe0503c223f6Form.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index966906d74a9d7003517bfe0503c223f6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index966906d74a9d7003517bfe0503c223f6.form = index966906d74a9d7003517bfe0503c223f6Form
/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
const indexeeeee50e8c0f5d59237f46ceb1c2e99d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'get',
})

indexeeeee50e8c0f5d59237f46ceb1c2e99d.definition = {
    methods: ["get","head"],
    url: '/api/change-requests',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
indexeeeee50e8c0f5d59237f46ceb1c2e99d.url = (options?: RouteQueryOptions) => {
    return indexeeeee50e8c0f5d59237f46ceb1c2e99d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
indexeeeee50e8c0f5d59237f46ceb1c2e99d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
indexeeeee50e8c0f5d59237f46ceb1c2e99d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
const indexeeeee50e8c0f5d59237f46ceb1c2e99dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
indexeeeee50e8c0f5d59237f46ceb1c2e99dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::index
* @see app/Http/Controllers/ChangeRequestController.php:16
* @route '/api/change-requests'
*/
indexeeeee50e8c0f5d59237f46ceb1c2e99dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexeeeee50e8c0f5d59237f46ceb1c2e99d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexeeeee50e8c0f5d59237f46ceb1c2e99d.form = indexeeeee50e8c0f5d59237f46ceb1c2e99dForm

/**
* Multiple routes resolve to \App\Http\Controllers\ChangeRequestController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/projects/{project}/change-requests': index966906d74a9d7003517bfe0503c223f6,
    '/api/change-requests': indexeeeee50e8c0f5d59237f46ceb1c2e99d,
}

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/projects/{project}/change-requests'
*/
const store966906d74a9d7003517bfe0503c223f6 = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'post',
})

store966906d74a9d7003517bfe0503c223f6.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/change-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/projects/{project}/change-requests'
*/
store966906d74a9d7003517bfe0503c223f6.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store966906d74a9d7003517bfe0503c223f6.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/projects/{project}/change-requests'
*/
store966906d74a9d7003517bfe0503c223f6.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/projects/{project}/change-requests'
*/
const store966906d74a9d7003517bfe0503c223f6Form = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/projects/{project}/change-requests'
*/
store966906d74a9d7003517bfe0503c223f6Form.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store966906d74a9d7003517bfe0503c223f6.url(args, options),
    method: 'post',
})

store966906d74a9d7003517bfe0503c223f6.form = store966906d74a9d7003517bfe0503c223f6Form
/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/change-requests'
*/
const storeeeeee50e8c0f5d59237f46ceb1c2e99d = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'post',
})

storeeeeee50e8c0f5d59237f46ceb1c2e99d.definition = {
    methods: ["post"],
    url: '/api/change-requests',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/change-requests'
*/
storeeeeee50e8c0f5d59237f46ceb1c2e99d.url = (options?: RouteQueryOptions) => {
    return storeeeeee50e8c0f5d59237f46ceb1c2e99d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/change-requests'
*/
storeeeeee50e8c0f5d59237f46ceb1c2e99d.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/change-requests'
*/
const storeeeeee50e8c0f5d59237f46ceb1c2e99dForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::store
* @see app/Http/Controllers/ChangeRequestController.php:32
* @route '/api/change-requests'
*/
storeeeeee50e8c0f5d59237f46ceb1c2e99dForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeeeeee50e8c0f5d59237f46ceb1c2e99d.url(options),
    method: 'post',
})

storeeeeee50e8c0f5d59237f46ceb1c2e99d.form = storeeeeee50e8c0f5d59237f46ceb1c2e99dForm

/**
* Multiple routes resolve to \App\Http\Controllers\ChangeRequestController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/projects/{project}/change-requests': store966906d74a9d7003517bfe0503c223f6,
    '/api/change-requests': storeeeeee50e8c0f5d59237f46ceb1c2e99d,
}

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
export const getApprovedChanges = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getApprovedChanges.url(args, options),
    method: 'get',
})

getApprovedChanges.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/change-requests/approved',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
getApprovedChanges.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getApprovedChanges.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
getApprovedChanges.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getApprovedChanges.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
getApprovedChanges.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getApprovedChanges.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
const getApprovedChangesForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getApprovedChanges.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
getApprovedChangesForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getApprovedChanges.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::getApprovedChanges
* @see app/Http/Controllers/ChangeRequestController.php:127
* @route '/api/projects/{project}/change-requests/approved'
*/
getApprovedChangesForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getApprovedChanges.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getApprovedChanges.form = getApprovedChangesForm

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
export const show = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/change-requests/{change_request}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
show.url = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { change_request: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { change_request: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            change_request: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        change_request: typeof args.change_request === 'object'
        ? args.change_request.id
        : args.change_request,
    }

    return show.definition.url
            .replace('{change_request}', parsedArgs.change_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
show.get = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
show.head = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
const showForm = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
showForm.get = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::show
* @see app/Http/Controllers/ChangeRequestController.php:57
* @route '/api/change-requests/{change_request}'
*/
showForm.head = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
export const update = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/change-requests/{change_request}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
update.url = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { change_request: args }
    }

    if (Array.isArray(args)) {
        args = {
            change_request: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        change_request: args.change_request,
    }

    return update.definition.url
            .replace('{change_request}', parsedArgs.change_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
update.put = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
update.patch = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
const updateForm = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
updateForm.put = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::update
* @see app/Http/Controllers/ChangeRequestController.php:0
* @route '/api/change-requests/{change_request}'
*/
updateForm.patch = (args: { change_request: string | number } | [change_request: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ChangeRequestController::destroy
* @see app/Http/Controllers/ChangeRequestController.php:109
* @route '/api/change-requests/{change_request}'
*/
export const destroy = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/change-requests/{change_request}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::destroy
* @see app/Http/Controllers/ChangeRequestController.php:109
* @route '/api/change-requests/{change_request}'
*/
destroy.url = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { change_request: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { change_request: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            change_request: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        change_request: typeof args.change_request === 'object'
        ? args.change_request.id
        : args.change_request,
    }

    return destroy.definition.url
            .replace('{change_request}', parsedArgs.change_request.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::destroy
* @see app/Http/Controllers/ChangeRequestController.php:109
* @route '/api/change-requests/{change_request}'
*/
destroy.delete = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::destroy
* @see app/Http/Controllers/ChangeRequestController.php:109
* @route '/api/change-requests/{change_request}'
*/
const destroyForm = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::destroy
* @see app/Http/Controllers/ChangeRequestController.php:109
* @route '/api/change-requests/{change_request}'
*/
destroyForm.delete = (args: { change_request: number | { id: number } } | [change_request: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ChangeRequestController::approve
* @see app/Http/Controllers/ChangeRequestController.php:65
* @route '/api/change-requests/{changeRequest}/approve'
*/
export const approve = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: '/api/change-requests/{changeRequest}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::approve
* @see app/Http/Controllers/ChangeRequestController.php:65
* @route '/api/change-requests/{changeRequest}/approve'
*/
approve.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { changeRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { changeRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            changeRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        changeRequest: typeof args.changeRequest === 'object'
        ? args.changeRequest.id
        : args.changeRequest,
    }

    return approve.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::approve
* @see app/Http/Controllers/ChangeRequestController.php:65
* @route '/api/change-requests/{changeRequest}/approve'
*/
approve.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::approve
* @see app/Http/Controllers/ChangeRequestController.php:65
* @route '/api/change-requests/{changeRequest}/approve'
*/
const approveForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::approve
* @see app/Http/Controllers/ChangeRequestController.php:65
* @route '/api/change-requests/{changeRequest}/approve'
*/
approveForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approve.url(args, options),
    method: 'post',
})

approve.form = approveForm

/**
* @see \App\Http\Controllers\ChangeRequestController::reject
* @see app/Http/Controllers/ChangeRequestController.php:87
* @route '/api/change-requests/{changeRequest}/reject'
*/
export const reject = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/api/change-requests/{changeRequest}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChangeRequestController::reject
* @see app/Http/Controllers/ChangeRequestController.php:87
* @route '/api/change-requests/{changeRequest}/reject'
*/
reject.url = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { changeRequest: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { changeRequest: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            changeRequest: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        changeRequest: typeof args.changeRequest === 'object'
        ? args.changeRequest.id
        : args.changeRequest,
    }

    return reject.definition.url
            .replace('{changeRequest}', parsedArgs.changeRequest.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChangeRequestController::reject
* @see app/Http/Controllers/ChangeRequestController.php:87
* @route '/api/change-requests/{changeRequest}/reject'
*/
reject.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::reject
* @see app/Http/Controllers/ChangeRequestController.php:87
* @route '/api/change-requests/{changeRequest}/reject'
*/
const rejectForm = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ChangeRequestController::reject
* @see app/Http/Controllers/ChangeRequestController.php:87
* @route '/api/change-requests/{changeRequest}/reject'
*/
rejectForm.post = (args: { changeRequest: number | { id: number } } | [changeRequest: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: reject.url(args, options),
    method: 'post',
})

reject.form = rejectForm

const ChangeRequestController = { index, store, getApprovedChanges, show, update, destroy, approve, reject }

export default ChangeRequestController