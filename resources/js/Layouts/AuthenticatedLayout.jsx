import React from 'react';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-8">
                    <Link href="/" className="font-semibold text-slate-900">Project Operations</Link>
                    <span className="text-sm text-slate-500">Workspace</span>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">{children}</div>
        </div>
    );
}