import React, { useState } from 'react';
import { Button, Drawer, Layout, Menu, Space, Tag, Typography } from 'antd';
import { BellOutlined, DashboardOutlined, FileDoneOutlined, FileTextOutlined, MenuOutlined, ProjectOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const { Header, Sider, Content } = Layout;

export default function PortalLayout({ children, activeKey = 'dashboard' }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const items = [
        { key: 'dashboard', icon: <DashboardOutlined />, label: <Link href="/">Home / Dashboard</Link> },
        { key: 'initiation', icon: <ProjectOutlined />, label: <Link href="/project-pages/initiation">1. Initiation</Link> },
        { key: 'planning', icon: <FileTextOutlined />, label: <Link href="/project-pages/planning">2. Planning</Link> },
        { key: 'execution', icon: <FileDoneOutlined />, label: <Link href="/project-pages/execution">3. Execution</Link> },
        { key: 'closure', icon: <TeamOutlined />, label: <Link href="/project-pages/closure">4. Closure</Link> },
        { key: 'documents', icon: <FileTextOutlined />, label: <Link href="/project-pages/documents">Document library</Link> },
        { key: 'changes', icon: <ProjectOutlined />, label: <Link href="/project-pages/changes">Change requests</Link> },
        { key: 'reports', icon: <FileDoneOutlined />, label: <Link href="/project-pages/reports">Reports</Link> },
        { key: 'notifications', icon: <BellOutlined />, label: <Link href="/project-pages/notifications">Notifications</Link> },
        { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    ];
    const navigation = <Menu mode="inline" selectedKeys={[activeKey]} items={items} onClick={() => setMobileOpen(false)} />;

    return (
        <Layout className="portal-layout">
            <Sider width={248} className="portal-sider" breakpoint="lg" collapsedWidth="0" trigger={null}>
                <div className="portal-brand"><div className="brand-mark">NS</div><div><strong>NSSF Portal</strong><span>Project operations</span></div></div>
                <div className="portal-nav-label">WORKSPACE</div>{navigation}
                <div className="sider-footer"><Tag color="gold">TEST MODE</Tag><span>v1.0 workspace</span></div>
            </Sider>
            <Layout>
                <Header className="portal-header">
                    <Button className="mobile-menu" type="text" icon={<MenuOutlined />} onClick={() => setMobileOpen(true)} />
                    <div className="header-context"><Typography.Text>Project Management System</Typography.Text><span>›</span><Typography.Text strong>Operations</Typography.Text></div>
                    <Space size="middle"><Button type="text" shape="circle" icon={<BellOutlined />} /><div className="user-chip"><span className="avatar">AM</span><span className="user-name">Admin Manager</span></div></Space>
                </Header>
                <Content className="portal-content">{children}</Content>
            </Layout>
            <Drawer title="Navigation" placement="left" onClose={() => setMobileOpen(false)} open={mobileOpen} width={280}>{navigation}</Drawer>
        </Layout>
    );
}
