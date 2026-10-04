import React from 'react';
import { Button, Card, Col, Form, Input, Modal, Row, Space, Table, Tag, Typography, message } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import { Link, router, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

function DeleteProjectAction({ project }) {
    const [form] = Form.useForm();
    const [open, setOpen] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    const supervisorName = usePage().props.auth?.user?.name;

    const submit = async () => {
        try {
            const { reason } = await form.validateFields();
            router.delete(`/project/${project.id}`, {
                data: { reason },
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
                onSuccess: () => {
                    setOpen(false);
                    form.resetFields();
                    message.success('Project archived; the responsible supervisor and reason have been recorded.');
                },
                onError: (errors) => {
                    message.error(errors.project || errors.reason || 'Could not archive the project. Please try again.');
                },
            });
        } catch (error) {
            if (!error?.errorFields) {
                message.error('Could not archive the project. Please try again.');
            }
        }
    };

    return (
        <>
            <Button danger size="small" icon={<DeleteOutlined />} onClick={() => setOpen(true)}>Archive</Button>
            <Modal
                title="Archive this project?"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={submit}
                confirmLoading={processing}
                okText="Archive project"
                okButtonProps={{ danger: true }}
                destroyOnHidden
            >
                <Typography.Paragraph>
                    Only projects in Initiation can be archived. The signed-in supervisor ({supervisorName}) and the reason will be kept in the audit record.
                </Typography.Paragraph>
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="reason"
                        label="Reason for archiving"
                        rules={[
                            { required: true, message: 'Please provide a reason.' },
                            { min: 10, message: 'Enter at least 10 characters so the reason is clear.' },
                            { max: 1000, message: 'The reason cannot exceed 1000 characters.' },
                        ]}
                    >
                        <Input.TextArea rows={4} maxLength={1000} showCount placeholder="Explain why this project was registered incorrectly or must be withdrawn." />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default function Dashboard({ projects, archivedProjects, metrics: stats }) {
    const role = usePage().props.auth?.user?.role;
    const rows = projects?.data || [];
    const metrics = [
        { label: 'Pending Registrations', value: stats?.pendingRegistrations ?? 0, icon: <ClockCircleOutlined />, tone: 'gold' },
        { label: 'Plans To Review', value: stats?.plansToReview ?? 0, icon: <FileTextOutlined />, tone: 'red' },
        { label: 'RTM Approvals Pending', value: stats?.rtmApprovalsPending ?? 0, icon: <CheckCircleOutlined />, tone: 'red' },
        { label: 'Ready To Close', value: stats?.readyToClose ?? 0, icon: <CloseCircleOutlined />, tone: 'red' },
    ];
    const columns = [
        { title: 'SNo', render: (_, __, index) => index + 1, width: 70 },
        { title: 'Project', dataIndex: 'name', render: (name, record) => <Link className="project-link" href={`/projects/${record.id}/workflow`}>{name}</Link> },
        { title: 'Category', dataIndex: 'project_source', render: (value) => <Tag color="blue">{value || 'System'}</Tag> },
        { title: 'Phase', dataIndex: 'phase' },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={value === 'Completed' ? 'green' : 'gold'}>{value || 'Not Started'}</Tag> },
        ...(role === 'supervisor' ? [{
            title: 'Actions',
            key: 'actions',
            render: (_, project) => project.phase === 'Initiation' ? <DeleteProjectAction project={project} /> : '—',
        }] : []),
    ];
    const archivedColumns = [
        { title: 'Project', dataIndex: 'name' },
        { title: 'Archived by', dataIndex: ['deleted_by_user', 'name'], render: (name) => name || 'Account no longer available' },
        { title: 'Reason', dataIndex: 'deletion_reason' },
        { title: 'Archived at', dataIndex: 'deleted_at', render: (date) => date ? new Date(date).toLocaleString() : '—' },
    ];
    const canRegister = ['analyst', 'supervisor'].includes(role);
    return <PortalLayout activeKey="dashboard"><section className="dashboard-page"><Row gutter={[20, 20]}>{metrics.map((metric) => <Col xs={24} sm={12} xl={6} key={metric.label}><Card className={`metric-card metric-card-${metric.tone}`}><div><Typography.Text>{metric.label}</Typography.Text><strong>{metric.value}</strong></div><span className={`metric-icon ${metric.tone}`}>{metric.icon}</span></Card></Col>)}</Row><Card className="dashboard-table" title="Project Overview" extra={<Space>{canRegister && <Link href="/project/register" className="ant-btn ant-btn-primary">Register project</Link>}<span className="table-caption">{projects?.total || 0} total projects</span></Space>}><Table dataSource={rows} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 720 }} locale={{ emptyText: 'No project records found.' }} /></Card>{role === 'supervisor' && <Card className="dashboard-table archive-audit-table" title="Archived Project Audit History" extra={<span className="table-caption">{archivedProjects?.total || 0} archived</span>}><Table dataSource={archivedProjects?.data || []} columns={archivedColumns} rowKey="id" pagination={false} scroll={{ x: 760 }} locale={{ emptyText: 'No archived projects.' }} /></Card>}{role === 'admin' && <Card className="admin-callout"><div><Typography.Title level={4}>User access administration</Typography.Title><Typography.Text type="secondary">Create accounts and assign roles for every system user.</Typography.Text></div><Link href="/admin/users">Manage users →</Link></Card>}</section></PortalLayout>;
}
