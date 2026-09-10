import React, { useState } from 'react';
import { Button, Drawer, Dropdown, Layout, Menu, Space, Tag, Typography } from 'antd';
import { BellOutlined, DashboardOutlined, FileDoneOutlined, FileTextOutlined, MenuOutlined, ProjectOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const { Header, Content } = Layout;

export default function PortalLayout({ children, activeKey = 'dashboard' }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = usePage().props.auth?.user;
    const role = user?.role;
    const allowed = {
        dashboard: ['analyst', 'supervisor', 'manager', 'dict'],
        initiation: ['analyst', 'supervisor'],
        planning: ['analyst', 'supervisor'],
        execution: ['analyst', 'supervisor'],
        closure: ['supervisor', 'manager', 'dict'],
        documents: ['supervisor', 'manager', 'dict'],
        changes: ['supervisor', 'manager', 'dict'],
        reports: ['supervisor', 'manager', 'dict'],
        notifications: ['analyst', 'supervisor', 'manager', 'dict'],
        settings: ['manager', 'dict'],
    };
    const items = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: <Link href="/dashboard">Home / Dashboard</Link> },
        { key: 'initiation', icon: <ProjectOutlined />, label: <Link href="/project/register">1. Register project</Link> },
        { key: 'planning', icon: <FileTextOutlined />, label: <Link href="/project-pages/planning">2. Planning</Link> },
        { key: 'execution', icon: <FileDoneOutlined />, label: <Link href="/project-pages/execution">3. Execution</Link> },
        { key: 'closure', icon: <TeamOutlined />, label: <Link href="/project-pages/closure">4. Closure</Link> },
        { key: 'documents', icon: <FileTextOutlined />, label: <Link href="/project-pages/documents">Document library</Link> },
        { key: 'changes', icon: <ProjectOutlined />, label: <Link href="/project-pages/changes">Change requests</Link> },
        { key: 'reports', icon: <FileDoneOutlined />, label: <Link href="/project-pages/reports">Reports</Link> },
        { key: 'notifications', icon: <BellOutlined />, label: <Link href="/project-pages/notifications">Notifications</Link> },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ].filter((item) => allowed[item.key].includes(role));
    const navigation = <Menu mode="horizontal" selectedKeys={[activeKey]} items={items} onClick={() => setMobileOpen(false)} />;
    const initials = user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'US';
    const profileMenu = {
        items: [
            { key: 'profile', label: <Link href="/profile">My profile</Link> },
            { type: 'divider' },
            { key: 'logout', label: <Link href="/logout" method="post" as="button" className="menu-logout">Log out</Link> },
        ],
    };

    return (
        <Layout className="portal-layout">
            <Layout>
                <Header className="portal-header">
                    <div className="portal-header-top"><Link href="/dashboard" className="portal-brand"><img className="brand-mark" src="/images/nssf%20logo.png" alt="NSSF logo" /><span><strong>NSSF Portal</strong><small>Project operations</small></span></Link><Button className="mobile-menu" type="text" icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} /><Space size="middle"><Button type="text" shape="circle" icon={<BellOutlined />} /><Dropdown menu={profileMenu} trigger={['click']}><button type="button" className="profile-trigger"><span className="avatar">{initials}</span><span className="user-name">{user?.name || 'User'}</span><Tag color="red">{role || 'user'}</Tag></button></Dropdown></Space></div>
                    <nav className="portal-nav">{navigation}</nav>
                </Header>
                <Content className="portal-content">{children}</Content>
            </Layout>
            <Drawer title="Navigation" placement="top" onClose={() => setMobileOpen(false)} open={mobileOpen} height="auto"><div className="mobile-navigation">{navigation}</div></Drawer>
        </Layout>
    );
}
