import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
const index8b46e609ff6aa5711101f5859f1d83b4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'get',
})

index8b46e609ff6aa5711101f5859f1d83b4.definition = {
    methods: ["get","head"],
    url: '/api/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
index8b46e609ff6aa5711101f5859f1d83b4.url = (options?: RouteQueryOptions) => {
    return index8b46e609ff6aa5711101f5859f1d83b4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
index8b46e609ff6aa5711101f5859f1d83b4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
index8b46e609ff6aa5711101f5859f1d83b4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
const index8b46e609ff6aa5711101f5859f1d83b4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
index8b46e609ff6aa5711101f5859f1d83b4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/api/projects'
*/
index8b46e609ff6aa5711101f5859f1d83b4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index8b46e609ff6aa5711101f5859f1d83b4.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index8b46e609ff6aa5711101f5859f1d83b4.form = index8b46e609ff6aa5711101f5859f1d83b4Form
/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
const index980bb49ee7ae63891f1d891d2fbcf1c9 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

index980bb49ee7ae63891f1d891d2fbcf1c9.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.url = (options?: RouteQueryOptions) => {
    return index980bb49ee7ae63891f1d891d2fbcf1c9.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
const index980bb49ee7ae63891f1d891d2fbcf1c9Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index980bb49ee7ae63891f1d891d2fbcf1c9.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::index
* @see app/Http/Controllers/ProjectController.php:19
* @route '/'
*/
index980bb49ee7ae63891f1d891d2fbcf1c9Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index980bb49ee7ae63891f1d891d2fbcf1c9.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index980bb49ee7ae63891f1d891d2fbcf1c9.form = index980bb49ee7ae63891f1d891d2fbcf1c9Form

/**
* Multiple routes resolve to \App\Http\Controllers\ProjectController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/projects': index8b46e609ff6aa5711101f5859f1d83b4,
    '/': index980bb49ee7ae63891f1d891d2fbcf1c9,
}

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/api/projects'
*/
const store8b46e609ff6aa5711101f5859f1d83b4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'post',
})

store8b46e609ff6aa5711101f5859f1d83b4.definition = {
    methods: ["post"],
    url: '/api/projects',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/api/projects'
*/
store8b46e609ff6aa5711101f5859f1d83b4.url = (options?: RouteQueryOptions) => {
    return store8b46e609ff6aa5711101f5859f1d83b4.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/api/projects'
*/
store8b46e609ff6aa5711101f5859f1d83b4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/api/projects'
*/
const store8b46e609ff6aa5711101f5859f1d83b4Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/api/projects'
*/
store8b46e609ff6aa5711101f5859f1d83b4Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store8b46e609ff6aa5711101f5859f1d83b4.url(options),
    method: 'post',
})

store8b46e609ff6aa5711101f5859f1d83b4.form = store8b46e609ff6aa5711101f5859f1d83b4Form
/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/project'
*/
const storea143c1931f5f1ac541e7c99f1bd84620 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea143c1931f5f1ac541e7c99f1bd84620.url(options),
    method: 'post',
})

storea143c1931f5f1ac541e7c99f1bd84620.definition = {
    methods: ["post"],
    url: '/project',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/project'
*/
storea143c1931f5f1ac541e7c99f1bd84620.url = (options?: RouteQueryOptions) => {
    return storea143c1931f5f1ac541e7c99f1bd84620.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/project'
*/
storea143c1931f5f1ac541e7c99f1bd84620.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storea143c1931f5f1ac541e7c99f1bd84620.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/project'
*/
const storea143c1931f5f1ac541e7c99f1bd84620Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea143c1931f5f1ac541e7c99f1bd84620.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::store
* @see app/Http/Controllers/ProjectController.php:57
* @route '/project'
*/
storea143c1931f5f1ac541e7c99f1bd84620Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storea143c1931f5f1ac541e7c99f1bd84620.url(options),
    method: 'post',
})

storea143c1931f5f1ac541e7c99f1bd84620.form = storea143c1931f5f1ac541e7c99f1bd84620Form

/**
* Multiple routes resolve to \App\Http\Controllers\ProjectController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/projects': store8b46e609ff6aa5711101f5859f1d83b4,
    '/project': storea143c1931f5f1ac541e7c99f1bd84620,
}

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
export const show = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
show.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
show.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
show.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
const showForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
showForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::show
* @see app/Http/Controllers/ProjectController.php:88
* @route '/api/projects/{project}'
*/
showForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:619
* @route '/api/projects/{project}'
*/
export const update = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/api/projects/{project}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:619
* @route '/api/projects/{project}'
*/
update.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:619
* @route '/api/projects/{project}'
*/
update.patch = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:619
* @route '/api/projects/{project}'
*/
const updateForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::update
* @see app/Http/Controllers/ProjectController.php:619
* @route '/api/projects/{project}'
*/
updateForm.patch = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:645
* @route '/api/projects/{project}'
*/
export const destroy = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/projects/{project}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:645
* @route '/api/projects/{project}'
*/
destroy.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:645
* @route '/api/projects/{project}'
*/
destroy.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:645
* @route '/api/projects/{project}'
*/
const destroyForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::destroy
* @see app/Http/Controllers/ProjectController.php:645
* @route '/api/projects/{project}'
*/
destroyForm.delete = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/api/projects/{project}/assign-analyst'
*/
const assignAnalyst5343aad0c7e91f81328e35ea2afc4283 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAnalyst5343aad0c7e91f81328e35ea2afc4283.url(args, options),
    method: 'post',
})

assignAnalyst5343aad0c7e91f81328e35ea2afc4283.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/assign-analyst',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/api/projects/{project}/assign-analyst'
*/
assignAnalyst5343aad0c7e91f81328e35ea2afc4283.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assignAnalyst5343aad0c7e91f81328e35ea2afc4283.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/api/projects/{project}/assign-analyst'
*/
assignAnalyst5343aad0c7e91f81328e35ea2afc4283.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAnalyst5343aad0c7e91f81328e35ea2afc4283.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/api/projects/{project}/assign-analyst'
*/
const assignAnalyst5343aad0c7e91f81328e35ea2afc4283Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAnalyst5343aad0c7e91f81328e35ea2afc4283.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/api/projects/{project}/assign-analyst'
*/
assignAnalyst5343aad0c7e91f81328e35ea2afc4283Form.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAnalyst5343aad0c7e91f81328e35ea2afc4283.url(args, options),
    method: 'post',
})

assignAnalyst5343aad0c7e91f81328e35ea2afc4283.form = assignAnalyst5343aad0c7e91f81328e35ea2afc4283Form
/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/project/{project}/assign'
*/
const assignAnalyst4f89d6529d181ad9ed5623608d33d568 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAnalyst4f89d6529d181ad9ed5623608d33d568.url(args, options),
    method: 'post',
})

assignAnalyst4f89d6529d181ad9ed5623608d33d568.definition = {
    methods: ["post"],
    url: '/project/{project}/assign',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/project/{project}/assign'
*/
assignAnalyst4f89d6529d181ad9ed5623608d33d568.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return assignAnalyst4f89d6529d181ad9ed5623608d33d568.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/project/{project}/assign'
*/
assignAnalyst4f89d6529d181ad9ed5623608d33d568.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: assignAnalyst4f89d6529d181ad9ed5623608d33d568.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/project/{project}/assign'
*/
const assignAnalyst4f89d6529d181ad9ed5623608d33d568Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAnalyst4f89d6529d181ad9ed5623608d33d568.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::assignAnalyst
* @see app/Http/Controllers/ProjectController.php:165
* @route '/project/{project}/assign'
*/
assignAnalyst4f89d6529d181ad9ed5623608d33d568Form.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: assignAnalyst4f89d6529d181ad9ed5623608d33d568.url(args, options),
    method: 'post',
})

assignAnalyst4f89d6529d181ad9ed5623608d33d568.form = assignAnalyst4f89d6529d181ad9ed5623608d33d568Form

/**
* Multiple routes resolve to \App\Http\Controllers\ProjectController::assignAnalyst, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `assignAnalyst['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const assignAnalyst = {
    '/api/projects/{project}/assign-analyst': assignAnalyst5343aad0c7e91f81328e35ea2afc4283,
    '/project/{project}/assign': assignAnalyst4f89d6529d181ad9ed5623608d33d568,
}

/**
* @see \App\Http\Controllers\ProjectController::transitionToPlanning
* @see app/Http/Controllers/ProjectController.php:333
* @route '/api/projects/{project}/transition-to-planning'
*/
export const transitionToPlanning = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToPlanning.url(args, options),
    method: 'post',
})

transitionToPlanning.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/transition-to-planning',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::transitionToPlanning
* @see app/Http/Controllers/ProjectController.php:333
* @route '/api/projects/{project}/transition-to-planning'
*/
transitionToPlanning.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transitionToPlanning.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::transitionToPlanning
* @see app/Http/Controllers/ProjectController.php:333
* @route '/api/projects/{project}/transition-to-planning'
*/
transitionToPlanning.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToPlanning.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToPlanning
* @see app/Http/Controllers/ProjectController.php:333
* @route '/api/projects/{project}/transition-to-planning'
*/
const transitionToPlanningForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToPlanning.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToPlanning
* @see app/Http/Controllers/ProjectController.php:333
* @route '/api/projects/{project}/transition-to-planning'
*/
transitionToPlanningForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToPlanning.url(args, options),
    method: 'post',
})

transitionToPlanning.form = transitionToPlanningForm

/**
* @see \App\Http\Controllers\ProjectController::transitionToExecution
* @see app/Http/Controllers/ProjectController.php:364
* @route '/api/projects/{project}/transition-to-execution'
*/
export const transitionToExecution = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToExecution.url(args, options),
    method: 'post',
})

transitionToExecution.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/transition-to-execution',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::transitionToExecution
* @see app/Http/Controllers/ProjectController.php:364
* @route '/api/projects/{project}/transition-to-execution'
*/
transitionToExecution.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transitionToExecution.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::transitionToExecution
* @see app/Http/Controllers/ProjectController.php:364
* @route '/api/projects/{project}/transition-to-execution'
*/
transitionToExecution.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToExecution.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToExecution
* @see app/Http/Controllers/ProjectController.php:364
* @route '/api/projects/{project}/transition-to-execution'
*/
const transitionToExecutionForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToExecution.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToExecution
* @see app/Http/Controllers/ProjectController.php:364
* @route '/api/projects/{project}/transition-to-execution'
*/
transitionToExecutionForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToExecution.url(args, options),
    method: 'post',
})

transitionToExecution.form = transitionToExecutionForm

/**
* @see \App\Http\Controllers\ProjectController::transitionToClosure
* @see app/Http/Controllers/ProjectController.php:401
* @route '/api/projects/{project}/transition-to-closure'
*/
export const transitionToClosure = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToClosure.url(args, options),
    method: 'post',
})

transitionToClosure.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/transition-to-closure',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::transitionToClosure
* @see app/Http/Controllers/ProjectController.php:401
* @route '/api/projects/{project}/transition-to-closure'
*/
transitionToClosure.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return transitionToClosure.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::transitionToClosure
* @see app/Http/Controllers/ProjectController.php:401
* @route '/api/projects/{project}/transition-to-closure'
*/
transitionToClosure.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: transitionToClosure.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToClosure
* @see app/Http/Controllers/ProjectController.php:401
* @route '/api/projects/{project}/transition-to-closure'
*/
const transitionToClosureForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToClosure.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::transitionToClosure
* @see app/Http/Controllers/ProjectController.php:401
* @route '/api/projects/{project}/transition-to-closure'
*/
transitionToClosureForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: transitionToClosure.url(args, options),
    method: 'post',
})

transitionToClosure.form = transitionToClosureForm

/**
* @see \App\Http\Controllers\ProjectController::closeProject
* @see app/Http/Controllers/ProjectController.php:478
* @route '/api/projects/{project}/close'
*/
export const closeProject = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: closeProject.url(args, options),
    method: 'post',
})

closeProject.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::closeProject
* @see app/Http/Controllers/ProjectController.php:478
* @route '/api/projects/{project}/close'
*/
closeProject.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return closeProject.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::closeProject
* @see app/Http/Controllers/ProjectController.php:478
* @route '/api/projects/{project}/close'
*/
closeProject.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: closeProject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::closeProject
* @see app/Http/Controllers/ProjectController.php:478
* @route '/api/projects/{project}/close'
*/
const closeProjectForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: closeProject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::closeProject
* @see app/Http/Controllers/ProjectController.php:478
* @route '/api/projects/{project}/close'
*/
closeProjectForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: closeProject.url(args, options),
    method: 'post',
})

closeProject.form = closeProjectForm

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
export const getProjectProgress = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProjectProgress.url(args, options),
    method: 'get',
})

getProjectProgress.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/progress',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
getProjectProgress.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getProjectProgress.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
getProjectProgress.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProjectProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
getProjectProgress.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProjectProgress.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
const getProjectProgressForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
getProjectProgressForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectProgress.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectProgress
* @see app/Http/Controllers/ProjectController.php:511
* @route '/api/projects/{project}/progress'
*/
getProjectProgressForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectProgress.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getProjectProgress.form = getProjectProgressForm

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
export const getProjectReport = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProjectReport.url(args, options),
    method: 'get',
})

getProjectReport.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
getProjectReport.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getProjectReport.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
getProjectReport.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getProjectReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
getProjectReport.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getProjectReport.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
const getProjectReportForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
getProjectReportForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::getProjectReport
* @see app/Http/Controllers/ProjectController.php:603
* @route '/api/projects/{project}/report'
*/
getProjectReportForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getProjectReport.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getProjectReport.form = getProjectReportForm

/**
* @see \App\Http\Controllers\ProjectController::approveBySupervisor
* @see app/Http/Controllers/ProjectController.php:537
* @route '/api/projects/{project}/approve-supervisor'
*/
export const approveBySupervisor = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveBySupervisor.url(args, options),
    method: 'post',
})

approveBySupervisor.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/approve-supervisor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::approveBySupervisor
* @see app/Http/Controllers/ProjectController.php:537
* @route '/api/projects/{project}/approve-supervisor'
*/
approveBySupervisor.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approveBySupervisor.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::approveBySupervisor
* @see app/Http/Controllers/ProjectController.php:537
* @route '/api/projects/{project}/approve-supervisor'
*/
approveBySupervisor.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveBySupervisor.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::approveBySupervisor
* @see app/Http/Controllers/ProjectController.php:537
* @route '/api/projects/{project}/approve-supervisor'
*/
const approveBySupervisorForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveBySupervisor.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::approveBySupervisor
* @see app/Http/Controllers/ProjectController.php:537
* @route '/api/projects/{project}/approve-supervisor'
*/
approveBySupervisorForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveBySupervisor.url(args, options),
    method: 'post',
})

approveBySupervisor.form = approveBySupervisorForm

/**
* @see \App\Http\Controllers\ProjectController::attestByManager
* @see app/Http/Controllers/ProjectController.php:550
* @route '/api/projects/{project}/attest-manager'
*/
export const attestByManager = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attestByManager.url(args, options),
    method: 'post',
})

attestByManager.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/attest-manager',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::attestByManager
* @see app/Http/Controllers/ProjectController.php:550
* @route '/api/projects/{project}/attest-manager'
*/
attestByManager.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attestByManager.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::attestByManager
* @see app/Http/Controllers/ProjectController.php:550
* @route '/api/projects/{project}/attest-manager'
*/
attestByManager.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attestByManager.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::attestByManager
* @see app/Http/Controllers/ProjectController.php:550
* @route '/api/projects/{project}/attest-manager'
*/
const attestByManagerForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attestByManager.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::attestByManager
* @see app/Http/Controllers/ProjectController.php:550
* @route '/api/projects/{project}/attest-manager'
*/
attestByManagerForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attestByManager.url(args, options),
    method: 'post',
})

attestByManager.form = attestByManagerForm

/**
* @see \App\Http\Controllers\ProjectController::attestByDICT
* @see app/Http/Controllers/ProjectController.php:577
* @route '/api/projects/{project}/attest-dict'
*/
export const attestByDICT = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attestByDICT.url(args, options),
    method: 'post',
})

attestByDICT.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/attest-dict',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::attestByDICT
* @see app/Http/Controllers/ProjectController.php:577
* @route '/api/projects/{project}/attest-dict'
*/
attestByDICT.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return attestByDICT.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::attestByDICT
* @see app/Http/Controllers/ProjectController.php:577
* @route '/api/projects/{project}/attest-dict'
*/
attestByDICT.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: attestByDICT.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::attestByDICT
* @see app/Http/Controllers/ProjectController.php:577
* @route '/api/projects/{project}/attest-dict'
*/
const attestByDICTForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attestByDICT.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::attestByDICT
* @see app/Http/Controllers/ProjectController.php:577
* @route '/api/projects/{project}/attest-dict'
*/
attestByDICTForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: attestByDICT.url(args, options),
    method: 'post',
})

attestByDICT.form = attestByDICTForm

/**
* @see \App\Http\Controllers\ProjectController::createImplementationPlan
* @see app/Http/Controllers/ProjectController.php:185
* @route '/api/projects/{project}/activities/plan'
*/
export const createImplementationPlan = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createImplementationPlan.url(args, options),
    method: 'post',
})

createImplementationPlan.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/activities/plan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::createImplementationPlan
* @see app/Http/Controllers/ProjectController.php:185
* @route '/api/projects/{project}/activities/plan'
*/
createImplementationPlan.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return createImplementationPlan.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::createImplementationPlan
* @see app/Http/Controllers/ProjectController.php:185
* @route '/api/projects/{project}/activities/plan'
*/
createImplementationPlan.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: createImplementationPlan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::createImplementationPlan
* @see app/Http/Controllers/ProjectController.php:185
* @route '/api/projects/{project}/activities/plan'
*/
const createImplementationPlanForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createImplementationPlan.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::createImplementationPlan
* @see app/Http/Controllers/ProjectController.php:185
* @route '/api/projects/{project}/activities/plan'
*/
createImplementationPlanForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: createImplementationPlan.url(args, options),
    method: 'post',
})

createImplementationPlan.form = createImplementationPlanForm

/**
* @see \App\Http\Controllers\ProjectController::submitRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:243
* @route '/api/projects/{project}/requirements-tracker'
*/
export const submitRequirementsTracker = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitRequirementsTracker.url(args, options),
    method: 'post',
})

submitRequirementsTracker.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/requirements-tracker',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::submitRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:243
* @route '/api/projects/{project}/requirements-tracker'
*/
submitRequirementsTracker.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return submitRequirementsTracker.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::submitRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:243
* @route '/api/projects/{project}/requirements-tracker'
*/
submitRequirementsTracker.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submitRequirementsTracker.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::submitRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:243
* @route '/api/projects/{project}/requirements-tracker'
*/
const submitRequirementsTrackerForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitRequirementsTracker.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::submitRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:243
* @route '/api/projects/{project}/requirements-tracker'
*/
submitRequirementsTrackerForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submitRequirementsTracker.url(args, options),
    method: 'post',
})

submitRequirementsTracker.form = submitRequirementsTrackerForm

/**
* @see \App\Http\Controllers\ProjectController::approveRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:276
* @route '/api/projects/{project}/requirements-tracker/approve'
*/
export const approveRequirementsTracker = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveRequirementsTracker.url(args, options),
    method: 'post',
})

approveRequirementsTracker.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/requirements-tracker/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProjectController::approveRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:276
* @route '/api/projects/{project}/requirements-tracker/approve'
*/
approveRequirementsTracker.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approveRequirementsTracker.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::approveRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:276
* @route '/api/projects/{project}/requirements-tracker/approve'
*/
approveRequirementsTracker.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveRequirementsTracker.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::approveRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:276
* @route '/api/projects/{project}/requirements-tracker/approve'
*/
const approveRequirementsTrackerForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveRequirementsTracker.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\ProjectController::approveRequirementsTracker
* @see app/Http/Controllers/ProjectController.php:276
* @route '/api/projects/{project}/requirements-tracker/approve'
*/
approveRequirementsTrackerForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: approveRequirementsTracker.url(args, options),
    method: 'post',
})

approveRequirementsTracker.form = approveRequirementsTrackerForm

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/project/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::create
* @see app/Http/Controllers/ProjectController.php:46
* @route '/project/register'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
export const showDocuments = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDocuments.url(args, options),
    method: 'get',
})

showDocuments.definition = {
    methods: ["get","head"],
    url: '/project/{project}/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
showDocuments.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return showDocuments.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
showDocuments.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
showDocuments.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showDocuments.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
const showDocumentsForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
showDocumentsForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ProjectController::showDocuments
* @see app/Http/Controllers/ProjectController.php:99
* @route '/project/{project}/documents'
*/
showDocumentsForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: showDocuments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

showDocuments.form = showDocumentsForm

const ProjectController = { index, store, show, update, destroy, assignAnalyst, transitionToPlanning, transitionToExecution, transitionToClosure, closeProject, getProjectProgress, getProjectReport, approveBySupervisor, attestByManager, attestByDICT, createImplementationPlan, submitRequirementsTracker, approveRequirementsTracker, create, showDocuments }

export default ProjectController