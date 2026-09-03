import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
export const index = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
index.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
index.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
index.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
const indexForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
indexForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::index
* @see app/Http/Controllers/ProjectActivityController.php:15
* @route '/api/projects/{project}/activities'
*/
indexForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\ProjectActivityController::store
* @see app/Http/Controllers/ProjectActivityController.php:25
* @route '/api/projects/{project}/activities'
*/
export const store = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectActivityController::store
* @see app/Http/Controllers/ProjectActivityController.php:25
* @route '/api/projects/{project}/activities'
*/
store.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectActivityController::store
* @see app/Http/Controllers/ProjectActivityController.php:25
* @route '/api/projects/{project}/activities'
*/
store.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::store
* @see app/Http/Controllers/ProjectActivityController.php:25
* @route '/api/projects/{project}/activities'
*/
const storeForm = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::store
* @see app/Http/Controllers/ProjectActivityController.php:25
* @route '/api/projects/{project}/activities'
*/
storeForm.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ProjectActivityController::recordProgress
* @see app/Http/Controllers/ProjectActivityController.php:102
* @route '/api/activities/{activity}/progress'
*/
export const recordProgress = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordProgress.url(args, options),
    method: 'post',
})

recordProgress.definition = {
    methods: ["post"],
    url: '/api/activities/{activity}/progress',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectActivityController::recordProgress
* @see app/Http/Controllers/ProjectActivityController.php:102
* @route '/api/activities/{activity}/progress'
*/
recordProgress.url = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { activity: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { activity: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            activity: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        activity: typeof args.activity === 'object'
        ? args.activity.id
        : args.activity,
    }

    return recordProgress.definition.url
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectActivityController::recordProgress
* @see app/Http/Controllers/ProjectActivityController.php:102
* @route '/api/activities/{activity}/progress'
*/
recordProgress.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: recordProgress.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::recordProgress
* @see app/Http/Controllers/ProjectActivityController.php:102
* @route '/api/activities/{activity}/progress'
*/
const recordProgressForm = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordProgress.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectActivityController::recordProgress
* @see app/Http/Controllers/ProjectActivityController.php:102
* @route '/api/activities/{activity}/progress'
*/
recordProgressForm.post = (args: { activity: number | { id: number } } | [activity: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: recordProgress.url(args, options),
    method: 'post',
})

recordProgress.form = recordProgressForm

const ProjectActivityController = { index, store, recordProgress }

export default ProjectActivityController