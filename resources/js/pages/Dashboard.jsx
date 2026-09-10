import React from 'react';
import { Button, Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import { ArrowRightOutlined, PlusOutlined, ProjectOutlined } from '@ant-design/icons';
import { Link, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Dashboard({ projects }) {
    const role = usePage().props.auth?.user?.role;
    const rows = projects?.data || [];
    const activeProjects = rows.filter((project) => project.status === 'Ongoing').length;
    const awaitingReview = rows.filter((project) => project.status === 'Not Started' || !project.is_approved).length;
    const planningProjects = rows.filter((project) => project.phase === 'Planning').length;
    const completedProjects = rows.filter((project) => project.status === 'Completed').length;
    const columns = [
        { title: 'Project', dataIndex: 'name', render: (value, row) => <Space><ProjectOutlined className="text-red-700" /><span><strong>{value}</strong><small className="block text-slate-400">{row.code || 'Project reference'}</small></span></Space> },
        { title: 'Phase', dataIndex: 'phase', render: (value) => <Tag color="blue">{value || 'Initiation'}</Tag> },
        { title: 'Progress', render: (_, project) => <Progress percent={project.requirements?.length ? Math.round((project.requirements.filter((item) => item.status === 'Completed').length / project.requirements.length) * 100) : 0} size="small" strokeColor="#9e292f" /> },
        { title: 'Owner', render: (_, project) => project.analyst?.name || project.supervisor?.name || 'Unassigned' },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'Ongoing' ? 'processing' : value === 'Completed' ? 'green' : 'gold'}>{value || 'Not Started'}</Tag> },
        { title: '', render: (_, project) => <Link href={`/projects/${project.id}/workflow`}><Button type="link" icon={<ArrowRightOutlined />}>Open</Button></Link> },
    ];

    return <PortalLayout><div className="page-heading"><div><Typography.Text className="eyebrow">NSSF PROJECT OPERATIONS</Typography.Text><Typography.Title level={1}>Project dashboard</Typography.Title><Typography.Paragraph type="secondary">Monitor projects and move work forward with controlled approvals.</Typography.Paragraph></div>{['analyst', 'supervisor'].includes(role) && <Link href="/project/register" className="register-project-link"><Button type="primary" icon={<PlusOutlined />}>Register project</Button></Link>}</div><Row gutter={[16, 16]} className="stat-row"><Col xs={24} sm={12} lg={6}><Card><Statistic title="Active projects" value={activeProjects} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Awaiting review" value={awaitingReview} valueStyle={{ color: '#b45309' }} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Projects in planning" value={planningProjects} valueStyle={{ color: '#2563eb' }} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Completed projects" value={completedProjects} valueStyle={{ color: '#166534' }} /></Card></Col></Row><Card title="Project register" extra={rows.length ? <Typography.Text type="secondary">{projects.total} total projects</Typography.Text> : null}><Table dataSource={rows} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 850 }} locale={{ emptyText: 'No projects have been registered yet.' }} /></Card></PortalLayout>;
}
