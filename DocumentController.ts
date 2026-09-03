import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/projects/{project}/documents'
*/
const storeea50a8c251896d7ef1d5a03805d15f35 = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'post',
})

storeea50a8c251896d7ef1d5a03805d15f35.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/projects/{project}/documents'
*/
storeea50a8c251896d7ef1d5a03805d15f35.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeea50a8c251896d7ef1d5a03805d15f35.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/projects/{project}/documents'
*/
storeea50a8c251896d7ef1d5a03805d15f35.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/projects/{project}/documents'
*/
const storeea50a8c251896d7ef1d5a03805d15f35Form = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/projects/{project}/documents'
*/
storeea50a8c251896d7ef1d5a03805d15f35Form.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'post',
})

storeea50a8c251896d7ef1d5a03805d15f35.form = storeea50a8c251896d7ef1d5a03805d15f35Form
/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/documents'
*/
const store3dd930ebb387828a922eefb0321b2369 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'post',
})

store3dd930ebb387828a922eefb0321b2369.definition = {
    methods: ["post"],
    url: '/api/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/documents'
*/
store3dd930ebb387828a922eefb0321b2369.url = (options?: RouteQueryOptions) => {
    return store3dd930ebb387828a922eefb0321b2369.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/documents'
*/
store3dd930ebb387828a922eefb0321b2369.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/documents'
*/
const store3dd930ebb387828a922eefb0321b2369Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::store
* @see app/Http/Controllers/DocumentController.php:36
* @route '/api/documents'
*/
store3dd930ebb387828a922eefb0321b2369Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'post',
})

store3dd930ebb387828a922eefb0321b2369.form = store3dd930ebb387828a922eefb0321b2369Form

/**
* Multiple routes resolve to \App\Http\Controllers\DocumentController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/projects/{project}/documents': storeea50a8c251896d7ef1d5a03805d15f35,
    '/api/documents': store3dd930ebb387828a922eefb0321b2369,
}

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
const indexea50a8c251896d7ef1d5a03805d15f35 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'get',
})

indexea50a8c251896d7ef1d5a03805d15f35.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
indexea50a8c251896d7ef1d5a03805d15f35.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return indexea50a8c251896d7ef1d5a03805d15f35.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
indexea50a8c251896d7ef1d5a03805d15f35.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
indexea50a8c251896d7ef1d5a03805d15f35.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
const indexea50a8c251896d7ef1d5a03805d15f35Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
indexea50a8c251896d7ef1d5a03805d15f35Form.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea50a8c251896d7ef1d5a03805d15f35.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/projects/{project}/documents'
*/
indexea50a8c251896d7ef1d5a03805d15f35Form.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: indexea50a8c251896d7ef1d5a03805d15f35.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

indexea50a8c251896d7ef1d5a03805d15f35.form = indexea50a8c251896d7ef1d5a03805d15f35Form
/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
const index3dd930ebb387828a922eefb0321b2369 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'get',
})

index3dd930ebb387828a922eefb0321b2369.definition = {
    methods: ["get","head"],
    url: '/api/documents',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
index3dd930ebb387828a922eefb0321b2369.url = (options?: RouteQueryOptions) => {
    return index3dd930ebb387828a922eefb0321b2369.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
index3dd930ebb387828a922eefb0321b2369.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
index3dd930ebb387828a922eefb0321b2369.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
const index3dd930ebb387828a922eefb0321b2369Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
index3dd930ebb387828a922eefb0321b2369Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3dd930ebb387828a922eefb0321b2369.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::index
* @see app/Http/Controllers/DocumentController.php:17
* @route '/api/documents'
*/
index3dd930ebb387828a922eefb0321b2369Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index3dd930ebb387828a922eefb0321b2369.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index3dd930ebb387828a922eefb0321b2369.form = index3dd930ebb387828a922eefb0321b2369Form

/**
* Multiple routes resolve to \App\Http\Controllers\DocumentController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/projects/{project}/documents': indexea50a8c251896d7ef1d5a03805d15f35,
    '/api/documents': index3dd930ebb387828a922eefb0321b2369,
}

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
export const getRequiredDocuments = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRequiredDocuments.url(args, options),
    method: 'get',
})

getRequiredDocuments.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/documents/{phase}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
getRequiredDocuments.url = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
            project: args[0],
            phase: args[1],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        project: typeof args.project === 'object'
        ? args.project.id
        : args.project,
        phase: args.phase,
    }

    return getRequiredDocuments.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{phase}', parsedArgs.phase.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
getRequiredDocuments.get = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getRequiredDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
getRequiredDocuments.head = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getRequiredDocuments.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
const getRequiredDocumentsForm = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRequiredDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
getRequiredDocumentsForm.get = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRequiredDocuments.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::getRequiredDocuments
* @see app/Http/Controllers/DocumentController.php:130
* @route '/api/projects/{project}/documents/{phase}'
*/
getRequiredDocumentsForm.head = (args: { project: number | { id: number }, phase: string | number } | [project: number | { id: number }, phase: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: getRequiredDocuments.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

getRequiredDocuments.form = getRequiredDocumentsForm

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
export const show = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/documents/{document}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
show.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return show.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
show.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
show.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
const showForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
showForm.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::show
* @see app/Http/Controllers/DocumentController.php:70
* @route '/api/documents/{document}'
*/
showForm.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
export const update = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/documents/{document}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
update.url = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: args.document,
    }

    return update.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
update.put = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
update.patch = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
const updateForm = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
updateForm.put = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::update
* @see app/Http/Controllers/DocumentController.php:0
* @route '/api/documents/{document}'
*/
updateForm.patch = (args: { document: string | number } | [document: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/api/documents/{document}'
*/
const destroy9bec13e231f5d0f8415e47c417f516a9 = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9bec13e231f5d0f8415e47c417f516a9.url(args, options),
    method: 'delete',
})

destroy9bec13e231f5d0f8415e47c417f516a9.definition = {
    methods: ["delete"],
    url: '/api/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/api/documents/{document}'
*/
destroy9bec13e231f5d0f8415e47c417f516a9.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return destroy9bec13e231f5d0f8415e47c417f516a9.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/api/documents/{document}'
*/
destroy9bec13e231f5d0f8415e47c417f516a9.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy9bec13e231f5d0f8415e47c417f516a9.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/api/documents/{document}'
*/
const destroy9bec13e231f5d0f8415e47c417f516a9Form = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy9bec13e231f5d0f8415e47c417f516a9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/api/documents/{document}'
*/
destroy9bec13e231f5d0f8415e47c417f516a9Form.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy9bec13e231f5d0f8415e47c417f516a9.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy9bec13e231f5d0f8415e47c417f516a9.form = destroy9bec13e231f5d0f8415e47c417f516a9Form
/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/documents/{document}'
*/
const destroy31fcaabd29cb1f797972cec330c8fe14 = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy31fcaabd29cb1f797972cec330c8fe14.url(args, options),
    method: 'delete',
})

destroy31fcaabd29cb1f797972cec330c8fe14.definition = {
    methods: ["delete"],
    url: '/documents/{document}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/documents/{document}'
*/
destroy31fcaabd29cb1f797972cec330c8fe14.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return destroy31fcaabd29cb1f797972cec330c8fe14.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/documents/{document}'
*/
destroy31fcaabd29cb1f797972cec330c8fe14.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy31fcaabd29cb1f797972cec330c8fe14.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/documents/{document}'
*/
const destroy31fcaabd29cb1f797972cec330c8fe14Form = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy31fcaabd29cb1f797972cec330c8fe14.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::destroy
* @see app/Http/Controllers/DocumentController.php:115
* @route '/documents/{document}'
*/
destroy31fcaabd29cb1f797972cec330c8fe14Form.delete = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy31fcaabd29cb1f797972cec330c8fe14.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy31fcaabd29cb1f797972cec330c8fe14.form = destroy31fcaabd29cb1f797972cec330c8fe14Form

/**
* Multiple routes resolve to \App\Http\Controllers\DocumentController::destroy, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `destroy['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const destroy = {
    '/api/documents/{document}': destroy9bec13e231f5d0f8415e47c417f516a9,
    '/documents/{document}': destroy31fcaabd29cb1f797972cec330c8fe14,
}

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/api/documents/{document}/review'
*/
const review23213a9d4d47a967552d6a02cb00b8e6 = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review23213a9d4d47a967552d6a02cb00b8e6.url(args, options),
    method: 'patch',
})

review23213a9d4d47a967552d6a02cb00b8e6.definition = {
    methods: ["patch"],
    url: '/api/documents/{document}/review',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/api/documents/{document}/review'
*/
review23213a9d4d47a967552d6a02cb00b8e6.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return review23213a9d4d47a967552d6a02cb00b8e6.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/api/documents/{document}/review'
*/
review23213a9d4d47a967552d6a02cb00b8e6.patch = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review23213a9d4d47a967552d6a02cb00b8e6.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/api/documents/{document}/review'
*/
const review23213a9d4d47a967552d6a02cb00b8e6Form = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review23213a9d4d47a967552d6a02cb00b8e6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/api/documents/{document}/review'
*/
review23213a9d4d47a967552d6a02cb00b8e6Form.patch = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review23213a9d4d47a967552d6a02cb00b8e6.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

review23213a9d4d47a967552d6a02cb00b8e6.form = review23213a9d4d47a967552d6a02cb00b8e6Form
/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/documents/{document}/review'
*/
const review414263a72fb806b1bc52c8cae377156b = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review414263a72fb806b1bc52c8cae377156b.url(args, options),
    method: 'patch',
})

review414263a72fb806b1bc52c8cae377156b.definition = {
    methods: ["patch"],
    url: '/documents/{document}/review',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/documents/{document}/review'
*/
review414263a72fb806b1bc52c8cae377156b.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return review414263a72fb806b1bc52c8cae377156b.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/documents/{document}/review'
*/
review414263a72fb806b1bc52c8cae377156b.patch = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review414263a72fb806b1bc52c8cae377156b.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/documents/{document}/review'
*/
const review414263a72fb806b1bc52c8cae377156bForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review414263a72fb806b1bc52c8cae377156b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::review
* @see app/Http/Controllers/DocumentController.php:78
* @route '/documents/{document}/review'
*/
review414263a72fb806b1bc52c8cae377156bForm.patch = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review414263a72fb806b1bc52c8cae377156b.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

review414263a72fb806b1bc52c8cae377156b.form = review414263a72fb806b1bc52c8cae377156bForm

/**
* Multiple routes resolve to \App\Http\Controllers\DocumentController::review, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `review['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const review = {
    '/api/documents/{document}/review': review23213a9d4d47a967552d6a02cb00b8e6,
    '/documents/{document}/review': review414263a72fb806b1bc52c8cae377156b,
}

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
export const download = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/api/documents/{document}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
download.url = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { document: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { document: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            document: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        document: typeof args.document === 'object'
        ? args.document.id
        : args.document,
    }

    return download.definition.url
            .replace('{document}', parsedArgs.document.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
download.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
download.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
const downloadForm = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
downloadForm.get = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\DocumentController::download
* @see app/Http/Controllers/DocumentController.php:101
* @route '/api/documents/{document}/download'
*/
downloadForm.head = (args: { document: number | { id: number } } | [document: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: download.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

download.form = downloadForm

/**
* @see \App\Http\Controllers\DocumentController::upload
* @see app/Http/Controllers/DocumentController.php:0
* @route '/project/{project}/documents'
*/
export const upload = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/project/{project}/documents',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DocumentController::upload
* @see app/Http/Controllers/DocumentController.php:0
* @route '/project/{project}/documents'
*/
upload.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return upload.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DocumentController::upload
* @see app/Http/Controllers/DocumentController.php:0
* @route '/project/{project}/documents'
*/
upload.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::upload
* @see app/Http/Controllers/DocumentController.php:0
* @route '/project/{project}/documents'
*/
const uploadForm = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DocumentController::upload
* @see app/Http/Controllers/DocumentController.php:0
* @route '/project/{project}/documents'
*/
uploadForm.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: upload.url(args, options),
    method: 'post',
})

upload.form = uploadForm

const DocumentController = { store, index, getRequiredDocuments, show, update, destroy, review, download, upload }

export default DocumentController