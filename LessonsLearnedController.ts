import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
const index814e321945123054402d88414a47baf4 = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index814e321945123054402d88414a47baf4.url(args, options),
    method: 'get',
})

index814e321945123054402d88414a47baf4.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/lessons-learned',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
index814e321945123054402d88414a47baf4.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return index814e321945123054402d88414a47baf4.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
index814e321945123054402d88414a47baf4.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index814e321945123054402d88414a47baf4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
index814e321945123054402d88414a47baf4.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index814e321945123054402d88414a47baf4.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
const index814e321945123054402d88414a47baf4Form = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index814e321945123054402d88414a47baf4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
index814e321945123054402d88414a47baf4Form.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index814e321945123054402d88414a47baf4.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/projects/{project}/lessons-learned'
*/
index814e321945123054402d88414a47baf4Form.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index814e321945123054402d88414a47baf4.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index814e321945123054402d88414a47baf4.form = index814e321945123054402d88414a47baf4Form
/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
const index66db5adb9d3f1bb443fb4e57ffc6457a = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'get',
})

index66db5adb9d3f1bb443fb4e57ffc6457a.definition = {
    methods: ["get","head"],
    url: '/api/lessons-learned',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
index66db5adb9d3f1bb443fb4e57ffc6457a.url = (options?: RouteQueryOptions) => {
    return index66db5adb9d3f1bb443fb4e57ffc6457a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
index66db5adb9d3f1bb443fb4e57ffc6457a.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
index66db5adb9d3f1bb443fb4e57ffc6457a.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
const index66db5adb9d3f1bb443fb4e57ffc6457aForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
index66db5adb9d3f1bb443fb4e57ffc6457aForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::index
* @see app/Http/Controllers/LessonsLearnedController.php:16
* @route '/api/lessons-learned'
*/
index66db5adb9d3f1bb443fb4e57ffc6457aForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index66db5adb9d3f1bb443fb4e57ffc6457a.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index66db5adb9d3f1bb443fb4e57ffc6457a.form = index66db5adb9d3f1bb443fb4e57ffc6457aForm

/**
* Multiple routes resolve to \App\Http\Controllers\LessonsLearnedController::index, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `index['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const index = {
    '/api/projects/{project}/lessons-learned': index814e321945123054402d88414a47baf4,
    '/api/lessons-learned': index66db5adb9d3f1bb443fb4e57ffc6457a,
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/projects/{project}/lessons-learned'
*/
const store814e321945123054402d88414a47baf4 = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store814e321945123054402d88414a47baf4.url(args, options),
    method: 'post',
})

store814e321945123054402d88414a47baf4.definition = {
    methods: ["post"],
    url: '/api/projects/{project}/lessons-learned',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/projects/{project}/lessons-learned'
*/
store814e321945123054402d88414a47baf4.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store814e321945123054402d88414a47baf4.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/projects/{project}/lessons-learned'
*/
store814e321945123054402d88414a47baf4.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store814e321945123054402d88414a47baf4.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/projects/{project}/lessons-learned'
*/
const store814e321945123054402d88414a47baf4Form = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store814e321945123054402d88414a47baf4.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/projects/{project}/lessons-learned'
*/
store814e321945123054402d88414a47baf4Form.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store814e321945123054402d88414a47baf4.url(args, options),
    method: 'post',
})

store814e321945123054402d88414a47baf4.form = store814e321945123054402d88414a47baf4Form
/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/lessons-learned'
*/
const store66db5adb9d3f1bb443fb4e57ffc6457a = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'post',
})

store66db5adb9d3f1bb443fb4e57ffc6457a.definition = {
    methods: ["post"],
    url: '/api/lessons-learned',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/lessons-learned'
*/
store66db5adb9d3f1bb443fb4e57ffc6457a.url = (options?: RouteQueryOptions) => {
    return store66db5adb9d3f1bb443fb4e57ffc6457a.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/lessons-learned'
*/
store66db5adb9d3f1bb443fb4e57ffc6457a.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/lessons-learned'
*/
const store66db5adb9d3f1bb443fb4e57ffc6457aForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::store
* @see app/Http/Controllers/LessonsLearnedController.php:35
* @route '/api/lessons-learned'
*/
store66db5adb9d3f1bb443fb4e57ffc6457aForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store66db5adb9d3f1bb443fb4e57ffc6457a.url(options),
    method: 'post',
})

store66db5adb9d3f1bb443fb4e57ffc6457a.form = store66db5adb9d3f1bb443fb4e57ffc6457aForm

/**
* Multiple routes resolve to \App\Http\Controllers\LessonsLearnedController::store, so this export is a
* dictionary keyed by URI rather than a callable. Call a specific route with `store['<uri>'](...)`,
* or import the route by name from your generated `routes/` directory.
*/
export const store = {
    '/api/projects/{project}/lessons-learned': store814e321945123054402d88414a47baf4,
    '/api/lessons-learned': store66db5adb9d3f1bb443fb4e57ffc6457a,
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
export const generateReport = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateReport.url(args, options),
    method: 'get',
})

generateReport.definition = {
    methods: ["get","head"],
    url: '/api/projects/{project}/lessons-learned/report',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
generateReport.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return generateReport.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
generateReport.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
generateReport.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateReport.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
const generateReportForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
generateReportForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateReport.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::generateReport
* @see app/Http/Controllers/LessonsLearnedController.php:153
* @route '/api/projects/{project}/lessons-learned/report'
*/
generateReportForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: generateReport.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

generateReport.form = generateReportForm

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
export const show = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/lessons-learned/{lessons_learned}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
show.url = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessons_learned: args }
    }

    if (Array.isArray(args)) {
        args = {
            lessons_learned: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lessons_learned: args.lessons_learned,
    }

    return show.definition.url
            .replace('{lessons_learned}', parsedArgs.lessons_learned.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
show.get = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
show.head = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
const showForm = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
showForm.get = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::show
* @see app/Http/Controllers/LessonsLearnedController.php:59
* @route '/api/lessons-learned/{lessons_learned}'
*/
showForm.head = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
export const update = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/api/lessons-learned/{lessons_learned}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
update.url = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessons_learned: args }
    }

    if (Array.isArray(args)) {
        args = {
            lessons_learned: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lessons_learned: args.lessons_learned,
    }

    return update.definition.url
            .replace('{lessons_learned}', parsedArgs.lessons_learned.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
update.put = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
update.patch = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
const updateForm = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
updateForm.put = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::update
* @see app/Http/Controllers/LessonsLearnedController.php:67
* @route '/api/lessons-learned/{lessons_learned}'
*/
updateForm.patch = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\LessonsLearnedController::destroy
* @see app/Http/Controllers/LessonsLearnedController.php:135
* @route '/api/lessons-learned/{lessons_learned}'
*/
export const destroy = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/lessons-learned/{lessons_learned}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::destroy
* @see app/Http/Controllers/LessonsLearnedController.php:135
* @route '/api/lessons-learned/{lessons_learned}'
*/
destroy.url = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lessons_learned: args }
    }

    if (Array.isArray(args)) {
        args = {
            lessons_learned: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lessons_learned: args.lessons_learned,
    }

    return destroy.definition.url
            .replace('{lessons_learned}', parsedArgs.lessons_learned.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::destroy
* @see app/Http/Controllers/LessonsLearnedController.php:135
* @route '/api/lessons-learned/{lessons_learned}'
*/
destroy.delete = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::destroy
* @see app/Http/Controllers/LessonsLearnedController.php:135
* @route '/api/lessons-learned/{lessons_learned}'
*/
const destroyForm = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::destroy
* @see app/Http/Controllers/LessonsLearnedController.php:135
* @route '/api/lessons-learned/{lessons_learned}'
*/
destroyForm.delete = (args: { lessons_learned: string | number } | [lessons_learned: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\LessonsLearnedController::submit
* @see app/Http/Controllers/LessonsLearnedController.php:93
* @route '/api/lessons-learned/{lesson}/submit'
*/
export const submit = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/api/lessons-learned/{lesson}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::submit
* @see app/Http/Controllers/LessonsLearnedController.php:93
* @route '/api/lessons-learned/{lesson}/submit'
*/
submit.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return submit.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::submit
* @see app/Http/Controllers/LessonsLearnedController.php:93
* @route '/api/lessons-learned/{lesson}/submit'
*/
submit.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::submit
* @see app/Http/Controllers/LessonsLearnedController.php:93
* @route '/api/lessons-learned/{lesson}/submit'
*/
const submitForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::submit
* @see app/Http/Controllers/LessonsLearnedController.php:93
* @route '/api/lessons-learned/{lesson}/submit'
*/
submitForm.post = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: submit.url(args, options),
    method: 'post',
})

submit.form = submitForm

/**
* @see \App\Http\Controllers\LessonsLearnedController::review
* @see app/Http/Controllers/LessonsLearnedController.php:112
* @route '/api/lessons-learned/{lesson}/review'
*/
export const review = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review.url(args, options),
    method: 'patch',
})

review.definition = {
    methods: ["patch"],
    url: '/api/lessons-learned/{lesson}/review',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LessonsLearnedController::review
* @see app/Http/Controllers/LessonsLearnedController.php:112
* @route '/api/lessons-learned/{lesson}/review'
*/
review.url = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { lesson: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            lesson: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        lesson: typeof args.lesson === 'object'
        ? args.lesson.id
        : args.lesson,
    }

    return review.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LessonsLearnedController::review
* @see app/Http/Controllers/LessonsLearnedController.php:112
* @route '/api/lessons-learned/{lesson}/review'
*/
review.patch = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: review.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::review
* @see app/Http/Controllers/LessonsLearnedController.php:112
* @route '/api/lessons-learned/{lesson}/review'
*/
const reviewForm = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\LessonsLearnedController::review
* @see app/Http/Controllers/LessonsLearnedController.php:112
* @route '/api/lessons-learned/{lesson}/review'
*/
reviewForm.patch = (args: { lesson: string | number | { id: string | number } } | [lesson: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: review.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

review.form = reviewForm

const LessonsLearnedController = { index, store, generateReport, show, update, destroy, submit, review }

export default LessonsLearnedController