import React, { useState } from 'react';
import { Button, Drawer, Dropdown, Layout, Menu, Tooltip } from 'antd';
import { BellOutlined, CheckSquareOutlined, CloseCircleOutlined, DashboardOutlined, FileDoneOutlined, FileTextOutlined, FormOutlined, FundOutlined, HomeOutlined, LogoutOutlined, MenuOutlined, ProjectOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';

const { Header, Sider, Content } = Layout;

export default function PortalLayout({ children, activeKey = 'dashboard' }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const user = usePage().props.auth?.user;
    const role = user?.role;
    const initials = user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'US';
    const photoUrl = user?.profile_photo_url || null;
    const allowed = { dashboard: ['admin', 'analyst', 'supervisor', 'manager', 'dict'], support: ['admin', 'analyst', 'supervisor', 'manager', 'dict'], initiation: ['analyst', 'supervisor'], planning: ['analyst', 'supervisor'], execution: ['analyst', 'supervisor'], closure: ['supervisor', 'manager', 'dict'], documents: ['supervisor', 'manager', 'dict'], notifications: ['analyst', 'supervisor', 'manager', 'dict'], reports: ['supervisor', 'manager', 'dict'], users: ['admin'] };
    const items = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: <Link href="/dashboard">Dashboard</Link> },
        { key: 'support', icon: <HomeOutlined />, label: <Link href="/support">Support Desk</Link> },
        { key: 'initiation', icon: <ProjectOutlined />, label: <Link href="/project/register">Initiate Registration</Link> },
        { key: 'planning', icon: <FileTextOutlined />, label: <Link href="/dashboard?phase=Planning">Prepare Plan</Link> },
        { key: 'execution', icon: <CheckSquareOutlined />, label: <Link href="/dashboard?phase=Execution">Prepare RTM</Link> },
        { key: 'notifications', icon: <FundOutlined />, label: <Link href="/notifications">Notifications</Link> },
        { key: 'documents', icon: <FileDoneOutlined />, label: <Link href="/dashboard">Documents</Link> },
        { key: 'closure', icon: <CloseCircleOutlined />, label: <Link href="/dashboard?phase=Closure">Close Project</Link> },
        { key: 'reports', icon: <FormOutlined />, label: <Link href="/dashboard">Reports</Link> },
        { key: 'users', icon: <TeamOutlined />, label: <Link href="/admin/users">User Management</Link> },
    ].filter((item) => allowed[item.key]?.includes(role));
    const menu = <Menu mode="inline" selectedKeys={[['dashboard', 'support', 'users'].includes(activeKey) ? activeKey : 'dashboard']} items={items} onClick={() => setMobileOpen(false)} />;
    const profileMenu = { items: [{ key: 'profile', label: <Link href="/profile">My profile</Link> }, { type: 'divider' }, { key: 'logout', icon: <LogoutOutlined />, label: <Link href="/logout" method="post" as="button" className="menu-logout">Sign out</Link> }] };

    return <Layout className="ict-layout"><Header className="ict-header"><div className="ict-titlebar"><Link href="/dashboard" className="ict-brand"><img src="/images/nssf%20logo.png" alt="NSSF" /><strong>ICT MANAGEMENT SYSTEM (ICTMS)</strong></Link><div className="header-actions"><Tooltip title="Theme"><Button shape="circle" type="text">◔</Button></Tooltip><Tooltip title="Notifications"><Link href="/notifications"><Button shape="circle" type="text" icon={<BellOutlined />} /></Link></Tooltip><Dropdown menu={profileMenu} trigger={['click']}><button type="button" className="profile-trigger">{photoUrl ? <img src={photoUrl} alt={user?.name || 'profile'} className="avatar-img" /> : <span className="avatar">{initials}</span>}<span>{user?.name || 'User'}</span></button></Dropdown></div></div><div className="ict-subbar"><Link href="/dashboard" className="subbar-link"><strong>Project Management</strong></Link><Link href="/support" className="subbar-link"><span><HomeOutlined /> Support Desk</span></Link></div></Header><Layout className="ict-workspace"><Sider width={290} className="ict-sider" breakpoint="lg" collapsedWidth="0"><div className="role-select">{role === 'admin' ? 'System Administrator' : `Project ${role ? role[0].toUpperCase() + role.slice(1) : 'User'}`}<span>⌄</span></div>{menu}</Sider><Content className="ict-content"><div className="content-toolbar"><Button className="mobile-menu" icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} /><div className="breadcrumb"><Link href="/dashboard" className="breadcrumb-link breadcrumb-home" title="Home"><HomeOutlined /><span>Home</span></Link><span className="breadcrumb-sep">›</span><Link href="/dashboard" className="breadcrumb-link"><ProjectOutlined /><strong>Project Management</strong></Link><span className="breadcrumb-sep">›</span><span className="breadcrumb-current">{activeKey === 'dashboard' ? 'Dashboard' : activeKey === 'support' ? 'Support Desk' : activeKey === 'users' ? 'User Management' : activeKey}</span></div></div>{children}</Content></Layout><Drawer title="ICTMS menu" placement="left" onClose={() => setMobileOpen(false)} open={mobileOpen} width={290}>{menu}</Drawer></Layout>;
}
