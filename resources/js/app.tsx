import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'ICTMS';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true }) as Record<
            string,
            { default: React.ComponentType }
        >;
        const page = pages[`./pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Inertia page not found: ./pages/${name}.jsx`);
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#9e292f',
    },
});

