import React from 'react';
import { Button, Card, Col, Progress, Row, Space, Statistic, Table, Tag, Typography } from 'antd';
import { ArrowRightOutlined, PlusOutlined, ProjectOutlined } from '@ant-design/icons';
import { Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

const demoProjects = [
    { id: 1, code: 'PRJ-2026-014', name: 'Digital Service Portal', phase: 'Execution', status: 'Ongoing', progress: 62, owner: 'A. Mushi' },
    { id: 2, code: 'PRJ-2026-011', name: 'Network Modernisation', phase: 'Planning', status: 'Ongoing', progress: 38, owner: 'J. Banda' },
    { id: 3, code: 'PRJ-2026-008', name: 'HR Self Service Upgrade', phase: 'Closure', status: 'Pending review', progress: 91, owner: 'S. Joseph' },
];

export default function Dashboard({ projects }) {
    const rows = projects?.data?.length ? projects.data : demoProjects;
    const columns = [
        { title: 'Project', dataIndex: 'name', render: (value, row) => <Space><ProjectOutlined className="text-red-700" /><span><strong>{value}</strong><small className="block text-slate-400">{row.code || 'Project reference'}</small></span></Space> },
        { title: 'Phase', dataIndex: 'phase', render: (value) => <Tag color="blue">{value || 'Initiation'}</Tag> },
        { title: 'Progress', dataIndex: 'progress', render: (value = 0) => <Progress percent={value} size="small" strokeColor="#9e292f" /> },
        { title: 'Owner', dataIndex: 'owner' },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'Ongoing' ? 'processing' : 'gold'}>{value || 'Not Started'}</Tag> },
        { title: '', render: () => <Link href="/project-workflow-preview"><Button type="link" icon={<ArrowRightOutlined />}>Open</Button></Link> },
    ];

    return <PortalLayout><div className="page-heading"><div><Typography.Text className="eyebrow">NSSF PROJECT OPERATIONS</Typography.Text><Typography.Title level={1}>Good morning, Admin Manager</Typography.Title><Typography.Paragraph type="secondary">Monitor every project and move work forward with controlled approvals.</Typography.Paragraph></div><Link href="/project/register"><Button type="primary" icon={<PlusOutlined />}>Register project</Button></Link></div><Row gutter={[16, 16]} className="stat-row"><Col xs={24} sm={12} lg={6}><Card><Statistic title="Active projects" value={12} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Awaiting review" value={4} valueStyle={{ color: '#b45309' }} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Due this week" value={7} valueStyle={{ color: '#9e292f' }} /></Card></Col><Col xs={24} sm={12} lg={6}><Card><Statistic title="Closed this year" value={18} valueStyle={{ color: '#166534' }} /></Card></Col></Row><Card title="Project register" extra={<Link href="/project-pages/reports"><Button type="link">View reports</Button></Link>}><Table dataSource={rows} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 850 }} /></Card></PortalLayout>;
}
