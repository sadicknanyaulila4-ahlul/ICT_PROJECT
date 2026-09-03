import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
*/
export const index = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/projects/{project}/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
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
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
*/
index.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
*/
index.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
*/
const indexForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
*/
indexForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ActivityController::index
* @see app/Http/Controllers/ActivityController.php:11
* @route '/projects/{project}/activities'
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
* @see \App\Http\Controllers\ActivityController::store
* @see app/Http/Controllers/ActivityController.php:20
* @route '/projects/{project}/activities'
*/
export const store = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/projects/{project}/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ActivityController::store
* @see app/Http/Controllers/ActivityController.php:20
* @route '/projects/{project}/activities'
*/
store.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityController::store
* @see app/Http/Controllers/ActivityController.php:20
* @route '/projects/{project}/activities'
*/
store.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivityController::store
* @see app/Http/Controllers/ActivityController.php:20
* @route '/projects/{project}/activities'
*/
const storeForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivityController::store
* @see app/Http/Controllers/ActivityController.php:20
* @route '/projects/{project}/activities'
*/
storeForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
export const update = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/projects/{project}/activities/{activity}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
update.url = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            activity: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: args.project,
        activity: typeof args.activity === 'object'
        ? args.activity.id
        : args.activity,
    }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
update.put = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
update.patch = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
const updateForm = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
updateForm.put = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivityController::update
* @see app/Http/Controllers/ActivityController.php:34
* @route '/projects/{project}/activities/{activity}'
*/
updateForm.patch = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ActivityController::destroy
* @see app/Http/Controllers/ActivityController.php:62
* @route '/projects/{project}/activities/{activity}'
*/
export const destroy = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/projects/{project}/activities/{activity}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ActivityController::destroy
* @see app/Http/Controllers/ActivityController.php:62
* @route '/projects/{project}/activities/{activity}'
*/
destroy.url = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            activity: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: args.project,
        activity: typeof args.activity === 'object'
        ? args.activity.id
        : args.activity,
    }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{activity}', parsedArgs.activity.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityController::destroy
* @see app/Http/Controllers/ActivityController.php:62
* @route '/projects/{project}/activities/{activity}'
*/
destroy.delete = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ActivityController::destroy
* @see app/Http/Controllers/ActivityController.php:62
* @route '/projects/{project}/activities/{activity}'
*/
const destroyForm = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ActivityController::destroy
* @see app/Http/Controllers/ActivityController.php:62
* @route '/projects/{project}/activities/{activity}'
*/
destroyForm.delete = (args: { project: string | number, activity: number | { id: number } } | [project: string | number, activity: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const ActivityController = { index, store, update, destroy }

export default ActivityController