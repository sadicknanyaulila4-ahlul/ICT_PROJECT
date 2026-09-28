import React, { useEffect, useState } from 'react';
import { Badge, Button, Dropdown, Layout, Tooltip, message } from 'antd';
import { Link, usePage } from '@inertiajs/react';

const { Header, Content } = Layout;

function getInitialTheme() {
    if (typeof window === 'undefined') return 'light';
    try {
        return window.localStorage.getItem('ictms-theme') === 'dark' ? 'dark' : 'light';
    } catch {
        return 'light';
    }
}

export default function PortalLayout({ children, activeKey = 'dashboard' }) {
    const [theme, setTheme] = useState(getInitialTheme);
    const [unreadCount, setUnreadCount] = useState(0);
    const user = usePage().props.auth?.user;
    const role = user?.role;
    const initials = user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'US';
    const photoUrl = user?.profile_photo_url || null;
    const allowed = { dashboard: ['admin', 'analyst', 'supervisor', 'manager', 'dict'], support: ['admin', 'analyst', 'supervisor', 'manager', 'dict'], initiation: ['analyst', 'supervisor'], planning: ['analyst', 'supervisor'], execution: ['analyst', 'supervisor'], closure: ['supervisor', 'manager', 'dict'], documents: ['supervisor', 'manager', 'dict'], notifications: ['admin', 'analyst', 'supervisor', 'manager', 'dict'], reports: ['supervisor', 'manager', 'dict'], users: ['admin'] };
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            window.localStorage.setItem('ictms-theme', theme);
        } catch {
            message.warning('Theme preference could not be saved in this browser.');
        }
    }, [theme]);
    useEffect(() => {
        let active = true;
        const loadUnreadCount = async () => {
            try {
                const response = await fetch('/notifications/data', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
                const data = await response.json();
                if (!response.ok) throw new Error(data.message || 'Could not load notification count.');
                if (active) setUnreadCount(data.unread_count || 0);
            } catch {
                if (active) message.error('Could not load notification count.');
            }
        };
        const updateUnreadCount = (event) => {
            const count = event.detail?.unreadCount;
            if (Number.isInteger(count) && count >= 0) setUnreadCount(count);
        };
        loadUnreadCount();
        window.addEventListener('ictms:notifications-updated', updateUnreadCount);
        return () => {
            active = false;
            window.removeEventListener('ictms:notifications-updated', updateUnreadCount);
        };
    }, []);
    const navigation = [
        { key: 'dashboard', href: '/dashboard', label: 'Dashboard' },
        { key: 'support', href: '/support', label: 'Support Desk' },
        { key: 'initiation', href: '/project/register', label: 'Initiate Registration' },
        { key: 'planning', href: '/dashboard?phase=Planning', label: 'Prepare Plan' },
        { key: 'execution', href: '/dashboard?phase=Execution', label: 'Prepare RTM' },
        { key: 'notifications', href: '/notifications', label: 'Notifications' },
        { key: 'documents', href: '/project-pages/documents', label: 'Documents' },
        { key: 'closure', href: '/dashboard?phase=Closure', label: 'Close Project' },
        { key: 'reports', href: '/project-pages/reports', label: 'Reports' },
        { key: 'users', href: '/admin/users', label: 'User Management' },
    ].filter((item) => allowed[item.key]?.includes(role));
    const profileMenu = { items: [{ key: 'profile', label: <Link href="/profile">My profile</Link> }, { type: 'divider' }, { key: 'logout', label: <Link href="/logout" method="post" as="button" className="menu-logout">Sign out</Link> }] };

    return <Layout className={`ict-layout ${theme === 'dark' ? 'ict-dark-theme' : ''}`}>
        <Header className="ict-header">
            <div className="ict-titlebar">
                <Link href="/dashboard" className="ict-brand"><img src="/images/nssf%20logo.png" alt="NSSF" /><strong>ICT MANAGEMENT SYSTEM (ICTMS)</strong></Link>
                <div className="header-actions">
                    <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><Button type="text" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Light theme' : 'Dark theme'}</Button></Tooltip>
                    <Link href="/notifications" className="notification-link">Notifications <Badge count={unreadCount} overflowCount={99} /></Link>
                    <Dropdown menu={profileMenu} trigger={['click']}><button type="button" className="profile-trigger">{photoUrl ? <img src={photoUrl} alt={user?.name || 'profile'} className="avatar-img" /> : <span className="avatar">{initials}</span>}<span>{user?.name || 'User'}</span></button></Dropdown>
                </div>
            </div>
            <div className="ict-subbar">
                <Link href="/dashboard" className="subbar-link"><strong>Project Management</strong></Link>
                <nav className="ict-nav" aria-label="Main navigation">
                    {navigation.map((item) => <Link key={item.key} href={item.href} className={`ict-nav-link${activeKey === item.key ? ' active' : ''}`} aria-current={activeKey === item.key ? 'page' : undefined}>
                        <span>{item.label}</span>{item.key === 'notifications' && unreadCount > 0 && <Badge count={unreadCount} overflowCount={99} size="small" />}
                    </Link>)}
                </nav>
            </div>
        </Header>
        <Content className="ict-content">
            <div className="content-toolbar">
                <div className="breadcrumb"><Link href="/dashboard" className="breadcrumb-link breadcrumb-home" title="Home">Home</Link><span className="breadcrumb-sep">›</span><Link href="/dashboard" className="breadcrumb-link"><strong>Project Management</strong></Link><span className="breadcrumb-sep">›</span><span className="breadcrumb-current">{activeKey === 'dashboard' ? 'Dashboard' : activeKey === 'support' ? 'Support Desk' : activeKey === 'users' ? 'User Management' : activeKey}</span></div>
            </div>
            {children}
        </Content>
    </Layout>;
}
