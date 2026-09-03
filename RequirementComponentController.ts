import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
*/
export const index = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/requirements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
*/
index.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
*/
index.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
*/
const indexForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
*/
indexForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::index
* @see app/Http/Controllers/RequirementComponentController.php:15
* @route '/api/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementComponentController::store
* @see app/Http/Controllers/RequirementComponentController.php:26
* @route '/api/projects/{project}/requirements'
*/
export const store = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/requirements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RequirementComponentController::store
* @see app/Http/Controllers/RequirementComponentController.php:26
* @route '/api/projects/{project}/requirements'
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
* @see \App\Http\Controllers\RequirementComponentController::store
* @see app/Http/Controllers/RequirementComponentController.php:26
* @route '/api/projects/{project}/requirements'
*/
store.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::store
* @see app/Http/Controllers/RequirementComponentController.php:26
* @route '/api/projects/{project}/requirements'
*/
const storeForm = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::store
* @see app/Http/Controllers/RequirementComponentController.php:26
* @route '/api/projects/{project}/requirements'
*/
storeForm.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
export const getOverallPercentage = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOverallPercentage.url(args, options),
    method: 'get',
})

getOverallPercentage.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/requirements/overall-percentage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
getOverallPercentage.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return getOverallPercentage.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
getOverallPercentage.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getOverallPercentage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
getOverallPercentage.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getOverallPercentage.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
const getOverallPercentageForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getOverallPercentage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
getOverallPercentageForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getOverallPercentage.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::getOverallPercentage
* @see app/Http/Controllers/RequirementComponentController.php:104
* @route '/api/projects/{project}/requirements/overall-percentage'
*/
getOverallPercentageForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getOverallPercentage.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getOverallPercentage.form = getOverallPercentageForm

/**
* @see \App\Http\Controllers\RequirementComponentController::update
* @see app/Http/Controllers/RequirementComponentController.php:57
* @route '/api/requirements/{requirement}/update'
*/
export const update = (args: { requirement: number | { id: number } } | [requirement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/api/requirements/{requirement}/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RequirementComponentController::update
* @see app/Http/Controllers/RequirementComponentController.php:57
* @route '/api/requirements/{requirement}/update'
*/
update.url = (args: { requirement: number | { id: number } } | [requirement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { requirement: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { requirement: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            requirement: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        requirement: typeof args.requirement === 'object'
        ? args.requirement.id
        : args.requirement,
    }

    return update.definition.url
            .replace('{requirement}', parsedArgs.requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RequirementComponentController::update
* @see app/Http/Controllers/RequirementComponentController.php:57
* @route '/api/requirements/{requirement}/update'
*/
update.post = (args: { requirement: number | { id: number } } | [requirement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::update
* @see app/Http/Controllers/RequirementComponentController.php:57
* @route '/api/requirements/{requirement}/update'
*/
const updateForm = (args: { requirement: number | { id: number } } | [requirement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RequirementComponentController::update
* @see app/Http/Controllers/RequirementComponentController.php:57
* @route '/api/requirements/{requirement}/update'
*/
updateForm.post = (args: { requirement: number | { id: number } } | [requirement: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, options),
    method: 'post',
})

update.form = updateForm

const RequirementComponentController = { index, store, getOverallPercentage, update }

export default RequirementComponentController