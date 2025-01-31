<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Spatie\Permission\Models\Permission;

class CheckModulePermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next,$permission, $module, $subModule = null): Response
    {
        $query = Permission::where('name', $permission)
        ->where('guard_name', $module);

        if ($subModule) {
        $query->where('sub_module', $subModule);
        }

        $permission = $query->first();

        if (!$permission || !auth()->user()->can($permission->name)) {
             abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
