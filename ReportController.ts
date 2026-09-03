import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
export const exportTrackerExcel = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTrackerExcel.url(args, options),
    method: 'get',
})

exportTrackerExcel.definition = {
    methods: ["get","head"],
    url: '/project/{project}/tracker/excel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
exportTrackerExcel.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportTrackerExcel.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
exportTrackerExcel.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTrackerExcel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
exportTrackerExcel.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTrackerExcel.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
const exportTrackerExcelForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerExcel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
exportTrackerExcelForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerExcel.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerExcel
* @see app/Http/Controllers/ReportController.php:9
* @route '/project/{project}/tracker/excel'
*/
exportTrackerExcelForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerExcel.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportTrackerExcel.form = exportTrackerExcelForm

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
export const exportTrackerPdf = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTrackerPdf.url(args, options),
    method: 'get',
})

exportTrackerPdf.definition = {
    methods: ["get","head"],
    url: '/project/{project}/tracker/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
exportTrackerPdf.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return exportTrackerPdf.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
exportTrackerPdf.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exportTrackerPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
exportTrackerPdf.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exportTrackerPdf.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
const exportTrackerPdfForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
exportTrackerPdfForm.get = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerPdf.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\ReportController::exportTrackerPdf
* @see app/Http/Controllers/ReportController.php:30
* @route '/project/{project}/tracker/pdf'
*/
exportTrackerPdfForm.head = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: exportTrackerPdf.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

exportTrackerPdf.form = exportTrackerPdfForm

const ReportController = { exportTrackerExcel, exportTrackerPdf }

export default ReportController