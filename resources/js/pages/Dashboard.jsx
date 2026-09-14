import React from 'react';
import { Button, Card, Col, Row, Space, Table, Tag, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Dashboard({ projects }) {
    const role = usePage().props.auth?.user?.role;
    const rows = projects?.data || [];
    const metrics = [
        { label: 'Pending Registrations', value: rows.filter((p) => p.status === 'Not Started').length, icon: <ClockCircleOutlined />, tone: 'gold' },
        { label: 'Plans To Review', value: rows.filter((p) => p.phase === 'Planning').length, icon: <FileTextOutlined />, tone: 'red' },
        { label: 'RTM Approvals Pending', value: rows.filter((p) => p.phase === 'Execution' && !p.is_approved).length, icon: <CheckCircleOutlined />, tone: 'red' },
        { label: 'Ready To Close', value: rows.filter((p) => p.phase === 'Closure').length, icon: <CloseCircleOutlined />, tone: 'red' },
    ];
    const columns = [
        { title: 'SNo', render: (_, __, index) => index + 1, width: 70 },
        { title: 'Project', dataIndex: 'name', render: (name, record) => <Link className="project-link" href={`/projects/${record.id}/workflow`}>{name}</Link> },
        { title: 'Category', dataIndex: 'project_source', render: (value) => <Tag color="blue">{value || 'System'}</Tag> },
        { title: 'Phase', dataIndex: 'phase' },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'Completed' ? 'green' : 'gold'}>{value || 'Not Started'}</Tag> },
    ];
    const canRegister = ['analyst', 'supervisor'].includes(role);
    return <PortalLayout activeKey="dashboard"><section className="dashboard-page"><Row gutter={[20, 20]}>{metrics.map((metric) => <Col xs={24} sm={12} xl={6} key={metric.label}><Card className="metric-card"><div><Typography.Text>{metric.label}</Typography.Text><strong>{metric.value}</strong></div><span className={`metric-icon ${metric.tone}`}>{metric.icon}</span></Card></Col>)}</Row><Card className="dashboard-table" title="Project Overview" extra={<Space>{canRegister && <Link href="/project/register"><Button type="primary">Register project</Button></Link>}<span className="table-caption">{projects?.total || 0} total projects</span></Space>}><Table dataSource={rows} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 720 }} locale={{ emptyText: 'No project records found.' }} /></Card>{role === 'admin' && <Card className="admin-callout"><div><Typography.Title level={4}>User access administration</Typography.Title><Typography.Text type="secondary">Create accounts and assign roles for every system user.</Typography.Text></div><Link href="/admin/users">Manage users →</Link></Card>}</section></PortalLayout>;
}
