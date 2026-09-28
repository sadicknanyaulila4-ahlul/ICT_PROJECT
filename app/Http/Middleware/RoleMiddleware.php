<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        abort_unless(
            $request->user()?->hasRole($roles),
            403,
            'This action requires one of these roles: '.implode(', ', $roles).'.',
        );

        return $next($request);
    }
}
