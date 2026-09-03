import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
*/
export const index = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/projects/{project}/requirements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
*/
index.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
*/
index.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
*/
const indexForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
*/
indexForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementController::index
* @see app/Http/Controllers/RequirementController.php:11
* @route '/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementController::store
* @see app/Http/Controllers/RequirementController.php:20
* @route '/projects/{project}/requirements'
*/
export const store = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/projects/{project}/requirements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RequirementController::store
* @see app/Http/Controllers/RequirementController.php:20
* @route '/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementController::store
* @see app/Http/Controllers/RequirementController.php:20
* @route '/projects/{project}/requirements'
*/
store.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementController::store
* @see app/Http/Controllers/RequirementController.php:20
* @route '/projects/{project}/requirements'
*/
const storeForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementController::store
* @see app/Http/Controllers/RequirementController.php:20
* @route '/projects/{project}/requirements'
*/
storeForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
export const update = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/projects/{project}/requirements/{requirement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
update.url = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            requirement: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: args.project,
        requirement: typeof args.requirement === 'object'
        ? args.requirement.id
        : args.requirement,
    }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{requirement}', parsedArgs.requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
update.put = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
update.patch = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
const updateForm = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
updateForm.put = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementController::update
* @see app/Http/Controllers/RequirementController.php:31
* @route '/projects/{project}/requirements/{requirement}'
*/
updateForm.patch = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\RequirementController::destroy
* @see app/Http/Controllers/RequirementController.php:59
* @route '/projects/{project}/requirements/{requirement}'
*/
export const destroy = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/projects/{project}/requirements/{requirement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RequirementController::destroy
* @see app/Http/Controllers/RequirementController.php:59
* @route '/projects/{project}/requirements/{requirement}'
*/
destroy.url = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            requirement: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: args.project,
        requirement: typeof args.requirement === 'object'
        ? args.requirement.id
        : args.requirement,
    }

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{requirement}', parsedArgs.requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RequirementController::destroy
* @see app/Http/Controllers/RequirementController.php:59
* @route '/projects/{project}/requirements/{requirement}'
*/
destroy.delete = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RequirementController::destroy
* @see app/Http/Controllers/RequirementController.php:59
* @route '/projects/{project}/requirements/{requirement}'
*/
const destroyForm = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementController::destroy
* @see app/Http/Controllers/RequirementController.php:59
* @route '/projects/{project}/requirements/{requirement}'
*/
destroyForm.delete = (args: { project: string | number, requirement: number | { id: number } } | [project: string | number, requirement: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const RequirementController = { index, store, update, destroy }

export default RequirementController