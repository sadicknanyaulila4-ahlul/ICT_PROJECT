import React, { useMemo, useState } from 'react';
import { Alert, Button, Card, Input, Select, Space, Table, Tag, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
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

export default function Modules({
    module = 'documents',
    project = null,
    rows = [],
    projects = [],
    selectedProject = null,
    requiredDocuments = [],
    documentStatus = {},
    documents = null,
    filters = {},
}) {
    const [search, setSearch] = useState('');
    const title = titles[module] || titles.documents;
    const visibleRows = useMemo(() => rows.filter((row) => JSON.stringify(row).toLowerCase().includes(search.toLowerCase())), [rows, search]);
    const columns = Object.keys(visibleRows[0] || {}).filter((key) => !['id', 'project_id'].includes(key)).map((key) => ({
        title: key.replaceAll('_', ' ').toUpperCase(),
        dataIndex: key,
        render: (value) => value || '-',
    }));
    const libraryDocuments = documents?.data || [];

    const loadDocumentLibrary = (nextFilters = {}) => {
        const params = {
            ...(filters.project_id ? { project_id: filters.project_id } : {}),
            ...(filters.search ? { search: filters.search } : {}),
            ...nextFilters,
        };
        Object.keys(params).forEach((key) => {
            if (params[key] === '' || params[key] === null || params[key] === undefined) delete params[key];
        });
        router.get('/project-pages/documents', params, { preserveState: true, preserveScroll: true });
    };

    const libraryColumns = [
        { title: 'Document', dataIndex: 'document_type', render: (value) => <Typography.Text strong>{value}</Typography.Text> },
        ...(!selectedProject ? [{ title: 'Project', dataIndex: ['project', 'name'] }] : []),
        { title: 'File name', dataIndex: 'original_filename' },
        { title: 'Phase', dataIndex: 'phase' },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (value) => <Tag color={value === 'Approved' ? 'green' : value === 'Returned' ? 'red' : 'gold'}>{value}</Tag>,
        },
        { title: 'Uploaded by', dataIndex: ['uploader', 'name'], render: (value) => value || '—' },
        { title: 'Uploaded', dataIndex: 'created_at', render: (value) => value ? new Date(value).toLocaleDateString() : '—' },
        { title: 'Downloads', dataIndex: 'downloads_count', render: (value) => value || 0 },
        {
            title: 'Last downloaded',
            dataIndex: ['latest_download', 'downloaded_at'],
            render: (value, document) => value
                ? `${document.latest_download.user?.name || 'Unknown user'} · ${new Date(value).toLocaleString()}`
                : 'Not downloaded',
        },
        { title: 'Download', render: (_, document) => <Button size="small" icon={<DownloadOutlined />} href={`/project/documents/${document.id}/download`}>Download</Button> },
    ];

    return <PortalLayout activeKey={module}>
        <div className="page-heading">
            <div>
                <Typography.Text className="eyebrow">{title[0]}</Typography.Text>
                <Typography.Title level={1}>{title[1]}</Typography.Title>
                <Typography.Paragraph type="secondary">
                    {module === 'reports' ? 'Download project data and tracker reports.' : 'Only records belonging to the selected project are displayed here.'}
                </Typography.Paragraph>
            </div>
            {project && <Tag color="blue">Project #{project.id}</Tag>}
        </div>
        {module === 'documents' ? <>
            <Card
                className="mb-5"
                title="Required documents"
                extra={<Select
                    allowClear
                    showSearch
                    optionFilterProp="label"
                    placeholder="Select a project"
                    value={selectedProject?.id}
                    options={projects.map((item) => ({ value: item.id, label: item.name }))}
                    onChange={(value) => loadDocumentLibrary({ project_id: value || '', page: 1 })}
                    style={{ width: 260, maxWidth: '100%' }}
                />}
            >
                {selectedProject ? <>
                    <Typography.Paragraph type="secondary">
                        {selectedProject.name} · Current phase: <Tag color="blue">{selectedProject.phase}</Tag>
                    </Typography.Paragraph>
                    <Space wrap>
                        {requiredDocuments.map((name) => {
                            const status = documentStatus[name];
                            const label = status === 'Approved' ? 'Approved' : status === 'Returned' ? 'Returned' : status === 'Pending Review' ? 'Pending review' : 'Not uploaded';
                            const color = status === 'Approved' ? 'green' : status === 'Returned' ? 'red' : status ? 'gold' : 'default';
                            return <Tag key={name} color={color}>{name}: {label}</Tag>;
                        })}
                    </Space>
                    <Alert
                        className="mt-4"
                        type="info"
                        showIcon
                        message="Upload or review project documents from the project workflow."
                        description="Open the project from the Dashboard, then use its phase document section. Approved documents will be marked here."
                    />
                </> : <Typography.Text type="secondary">Select a project to see the documents required for its current phase.</Typography.Text>}
            </Card>
            <Card
                title={selectedProject ? `Uploaded documents — ${selectedProject.name}` : 'All uploaded project documents'}
                extra={<Input.Search
                    allowClear
                    defaultValue={filters.search}
                    placeholder="Search documents or projects"
                    onSearch={(value) => loadDocumentLibrary({ search: value, page: 1 })}
                    onChange={(event) => { if (!event.target.value) loadDocumentLibrary({ search: '', page: 1 }); }}
                    style={{ width: 240, maxWidth: '100%' }}
                />}
            >
                <Table
                    dataSource={libraryDocuments}
                    columns={libraryColumns}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                    pagination={documents ? {
                        current: documents.current_page,
                        pageSize: documents.per_page,
                        total: documents.total,
                        onChange: (page) => loadDocumentLibrary({ page }),
                    } : false}
                    locale={{ emptyText: 'No documents have been uploaded yet. Select a project to check its required documents, then upload files from the project workflow.' }}
                />
            </Card>
        </> : module === 'reports' ? <Card title="Project downloads">
            {projects.length ? projects.map((item) => <div className="report-download-row" key={item.id}>
                <div><Typography.Text strong>{item.name}</Typography.Text><br /><Typography.Text type="secondary">Project #{item.id} · {item.phase || 'Initiation'}</Typography.Text></div>
                <Space wrap>
                    <Button icon={<DownloadOutlined />} href={`/project/${item.id}/tracker/excel`}>Tracker CSV</Button>
                    <Button icon={<DownloadOutlined />} href={`/project/${item.id}/tracker/pdf`}>Tracker PDF</Button>
                    <Button icon={<DownloadOutlined />} href={`/project/${item.id}/report/download`}>Project data</Button>
                    <Button icon={<DownloadOutlined />} href={`/project/${item.id}/lessons-learned/report/download`}>Lessons learned</Button>
                </Space>
            </div>) : <Typography.Text type="secondary">No projects are available to export.</Typography.Text>}
        </Card> : <Card title={project?.name || 'Project records'} extra={<Input.Search allowClear placeholder="Search records" onChange={(event) => setSearch(event.target.value)} style={{ width: 220 }} />}>
            <Table dataSource={visibleRows} columns={columns} rowKey="id" locale={{ emptyText: 'No records have been added yet.' }} scroll={{ x: 800 }} />
        </Card>}
    </PortalLayout>;
}
