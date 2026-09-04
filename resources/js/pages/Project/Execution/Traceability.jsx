import React, { useMemo, useState } from 'react';
import { Badge, Button, Card, Input, Progress, Select, Space, Table, Tag, Typography } from 'antd';
import { Link } from '@inertiajs/react';

const sampleRequirements = [
    { id: 1, requirement_description: 'Users can sign in with their organization account', planned_start_date: '2026-09-08', planned_end_date: '2026-09-12', status: 'completed', test_score: 'pass', responsible_person: 'A. Mushi' },
    { id: 2, requirement_description: 'Project owners can assign requirements to an analyst', planned_start_date: '2026-09-15', planned_end_date: '2026-09-19', status: 'ongoing', test_score: null, responsible_person: 'J. Banda' },
    { id: 3, requirement_description: 'Supervisors can approve completed project requirements', planned_start_date: '2026-09-22', planned_end_date: '2026-09-26', status: 'pending', test_score: null, responsible_person: 'Unassigned' },
];

const statusColors = { pending: 'default', ongoing: 'processing', completed: 'success' };

export default function Traceability({ project = { id: 1, name: 'Digital Service Portal' }, requirements = sampleRequirements }) {
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');

    const visibleRequirements = useMemo(() => requirements.filter((requirement) => {
        const matchesSearch = requirement.requirement_description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = status === 'all' || requirement.status === status;

        return matchesSearch && matchesStatus;
    }), [requirements, search, status]);

    const completedCount = requirements.filter(({ status: requirementStatus }) => requirementStatus === 'completed').length;
    const completion = requirements.length ? Math.round((completedCount / requirements.length) * 100) : 0;
    const columns = [
        { title: 'Requirement', dataIndex: 'requirement_description', key: 'requirement', width: '30%' },
        { title: 'Planned start', dataIndex: 'planned_start_date', key: 'plannedStart' },
        { title: 'Planned end', dataIndex: 'planned_end_date', key: 'plannedEnd' },
        { title: 'Owner', dataIndex: 'responsible_person', key: 'owner' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => <Tag color={statusColors[value]}>{value.toUpperCase()}</Tag> },
        { title: 'Test', dataIndex: 'test_score', key: 'test', render: (value) => value ? <Badge status={value === 'pass' ? 'success' : 'error'} text={value.toUpperCase()} /> : <Typography.Text type="secondary">Not tested</Typography.Text> },
    ];

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <Typography.Text className="font-semibold uppercase tracking-[0.2em] text-cyan-700">Execution / Traceability</Typography.Text>
                        <Typography.Title level={1} className="!mb-1 !mt-2 !text-slate-900">{project.name}</Typography.Title>
                        <Typography.Paragraph className="!mb-0 text-slate-500">Track delivery, ownership, and test evidence in one view.</Typography.Paragraph>
                    </div>
                    <Space><Link href="/"><Button>Back to projects</Button></Link><Button type="primary">Add requirement</Button></Space>
                </div>
                <div className="mb-6 grid gap-4 md:grid-cols-3">
                    <Card><Typography.Text type="secondary">Total requirements</Typography.Text><Typography.Title level={2} className="!mb-0 !mt-2">{requirements.length}</Typography.Title></Card>
                    <Card><Typography.Text type="secondary">Completed</Typography.Text><Typography.Title level={2} className="!mb-0 !mt-2 text-emerald-600">{completedCount}</Typography.Title></Card>
                    <Card><div className="flex items-center justify-between"><Typography.Text type="secondary">Overall progress</Typography.Text><strong>{completion}%</strong></div><Progress percent={completion} strokeColor="#0891b2" showInfo={false} className="!mb-0 !mt-3" /></Card>
                </div>
                <Card>
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <Typography.Title level={3} className="!mb-0">Requirements register</Typography.Title>
                        <Space wrap><Input.Search placeholder="Search requirements" allowClear onChange={(event) => setSearch(event.target.value)} style={{ width: 240 }} /><Select value={status} onChange={setStatus} style={{ width: 140 }} options={[{ value: 'all', label: 'All statuses' }, { value: 'pending', label: 'Pending' }, { value: 'ongoing', label: 'Ongoing' }, { value: 'completed', label: 'Completed' }]} /></Space>
                    </div>
                    <Table dataSource={visibleRequirements} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 850 }} />
                </Card>
            </div>
        </main>
    );
}