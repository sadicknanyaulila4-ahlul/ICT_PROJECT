import React, { useMemo, useState } from 'react';
import { Card, Input, Table, Tag, Typography } from 'antd';
import PortalLayout from '@/Layouts/PortalLayout';

const titles = {
    documents: ['DOCUMENT MANAGEMENT', 'Project document library'],
    changes: ['APPROVED CHANGES', 'Change request register'],
    reports: ['PROJECT REPORTING', 'Reports and exports'],
    notifications: ['PROJECT NOTIFICATIONS', 'Notifications and deadlines'],
    planning: ['PROJECT PLANNING', 'Implementation plan'],
    execution: ['PROJECT EXECUTION', 'Execution and traceability'],
    closure: ['PROJECT CLOSURE', 'Closure and handover'],
};

export default function Modules({ module = 'documents', project = null, rows = [] }) {
    const [search, setSearch] = useState('');
    const title = titles[module] || titles.documents;
    const visibleRows = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase())), [rows, search]);
    const columns = Object.keys(visibleRows[0] || {}).filter((key) => !['id', 'project_id'].includes(key)).map((key) => ({
        title: key.replaceAll('_', ' ').toUpperCase(),
        dataIndex: key,
        render: (value) => value || '-',
    }));

    return <PortalLayout activeKey={module}><div className="page-heading"><div><Typography.Text className="eyebrow">{title[0]}</Typography.Text><Typography.Title level={1}>{title[1]}</Typography.Title><Typography.Paragraph type="secondary">Only records belonging to the selected project are displayed here.</Typography.Paragraph></div>{project && <Tag color="blue">Project #{project.id}</Tag>}</div><Card title={project?.name || 'Project records'} extra={<Input.Search allowClear placeholder="Search records" onChange={(event) => setSearch(event.target.value)} style={{ width: 220 }} />}><Table dataSource={visibleRows} columns={columns} rowKey="id" locale={{ emptyText: 'No records have been added yet.' }} scroll={{ x: 800 }} /></Card></PortalLayout>;
}
