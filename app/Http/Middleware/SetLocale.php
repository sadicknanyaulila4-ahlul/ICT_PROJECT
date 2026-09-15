<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $locale = $request->input('locale', $request->query('lang', Session::get('locale', config('app.locale', 'en'))));

        if (! in_array($locale, ['en', 'sw'], true)) {
            $locale = 'en';
        }

        Session::put('locale', $locale);
        App::setLocale($locale);

        return $next($request);
    }
}
