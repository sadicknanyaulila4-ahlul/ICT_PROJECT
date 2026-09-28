import { useState } from 'react';
import { Button, Card, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { router, useForm, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

const roleLabels = { admin: 'Administrator', analyst: 'Project Planner', supervisor: 'Project Reviewer', manager: 'Manager', dict: 'DICT' };

export default function Users({ users, roles, projects = [], supervisors = [], analysts = [] }) {
    const currentUser = usePage().props.auth?.user;
    const [editing, setEditing] = useState(null);
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({ name: '', email: '', role: 'analyst', password: '' });
    const close = () => { setOpen(false); setEditing(null); reset(); };
    const submit = () => {
        if (editing) {
            router.patch(`/admin/users/${editing.id}`, data, { preserveScroll: true, onSuccess: () => { close(); message.success('Role updated successfully.'); }, onError: () => message.error('Please correct the highlighted fields.') });
        } else {
            post('/admin/users', { preserveScroll: true, onSuccess: () => { close(); message.success('User created.'); }, onError: () => message.error('Please correct the highlighted fields.') });
        }
    };
    const remove = (user) => {
        router.delete(`/admin/users/${user.id}`, { preserveScroll: true, onSuccess: () => message.success(`${user.name} deleted.`), onError: () => message.error('User could not be deleted.') });
    };
    const openEditor = (user = null) => { setEditing(user); setData(user ? { name: user.name, email: user.email, role: user.role, password: '' } : { name: '', email: '', role: 'analyst', password: '' }); setOpen(true); };
    const columns = [
        { title: 'Name', dataIndex: 'name' }, { title: 'Email address', dataIndex: 'email' },
        { title: 'Assigned role', dataIndex: 'role', render: (role) => <Tag color={role === 'admin' ? 'red' : 'blue'}>{roleLabels[role] || role}</Tag> },
        { title: 'Action', width: 140, render: (_, user) => <Button type="link" icon={<EditOutlined />} onClick={() => openEditor(user)}>Edit</Button> },
    ];
    const assign = (path, data, success) => router.post(path, data, { preserveScroll: true, onSuccess: () => message.success(success), onError: (formErrors) => message.error(Object.values(formErrors)[0] || 'Assignment failed.') });
    const teamColumns = [
        { title: 'Project', dataIndex: 'name', render: (name, project) => <a href={`/projects/${project.id}/workflow`}>{name}</a> },
        { title: 'Phase', dataIndex: 'phase', render: (phase) => <Tag>{phase}</Tag> },
        { title: 'Supervisor', render: (_, project) => <Select style={{ minWidth: 210 }} value={project.supervisor_id || undefined} placeholder="Select Supervisor" options={supervisors.map((user) => ({ value: user.id, label: user.name }))} onChange={(value) => assign(`/admin/projects/${project.id}/assign-supervisor`, { supervisor_id: value }, 'Supervisor assigned.')} /> },
        { title: 'Analyst', render: (_, project) => <Select style={{ minWidth: 210 }} value={project.assigned_analyst_id || undefined} placeholder="Select Analyst" options={analysts.map((user) => ({ value: user.id, label: user.name }))} onChange={(value) => assign(`/admin/projects/${project.id}/assign-analyst`, { assigned_analyst_id: value }, 'Analyst assigned.')} /> },
    ];
    return <PortalLayout activeKey="users"><section className="users-page"><div className="page-title"><div><Typography.Title level={2}>User Management</Typography.Title><Typography.Text type="secondary">Create accounts, add/change roles, or delete users.</Typography.Text></div><Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>Add user / role</Button></div><Card title="Project team assignment" className="user-table" style={{ marginBottom: 24 }}><Typography.Paragraph type="secondary">Assign the Supervisor and Analyst responsible for each registered project.</Typography.Paragraph><Table dataSource={projects} columns={teamColumns} rowKey="id" pagination={{ pageSize: 8 }} scroll={{ x: 900 }} /></Card><Card className="user-table"><Table dataSource={users} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 760 }} /></Card><Modal title={editing ? `Edit user — ${editing.name}` : 'Add user / role'} open={open} onCancel={close} footer={null} destroyOnClose><Form layout="vertical"><Form.Item label="Full name" validateStatus={errors.name ? 'error' : ''} help={errors.name}><Input value={data.name} onChange={(event) => setData('name', event.target.value)} /></Form.Item><Form.Item label="Email address" validateStatus={errors.email ? 'error' : ''} help={errors.email}><Input value={data.email} onChange={(event) => setData('email', event.target.value)} /></Form.Item><Form.Item label="Role — chagua role ya user (select)" validateStatus={errors.role ? 'error' : ''} help={errors.role || 'Role ndiyo inaamua anachoweza kuona na kufanya.'}><Select value={data.role} onChange={(value) => setData('role', value)} placeholder="Chagua role" options={roles.map((role) => ({ value: role, label: roleLabels[role] || role }))} /></Form.Item><Form.Item label={editing ? 'New password (leave empty to retain)' : 'Temporary password'} validateStatus={errors.password ? 'error' : ''} help={errors.password}><Input.Password value={data.password} onChange={(event) => setData('password', event.target.value)} /></Form.Item><Space style={{ display: 'flex', justifyContent: 'flex-end' }}><Button onClick={close}>Cancel</Button>{editing && editing.id !== currentUser?.id ? <Popconfirm title={`Delete ${editing.name}?`} description="User huyu atapoteza access mara moja." okText="Delete" cancelText="Cancel" okType="danger" onConfirm={() => remove(editing)}><Button danger icon={<DeleteOutlined />} loading={processing}>Delete user</Button></Popconfirm> : null}<Button type="primary" loading={processing} onClick={submit}>{editing ? 'Save changes' : 'Create account'}</Button></Space></Form></Modal></section></PortalLayout>;
}
