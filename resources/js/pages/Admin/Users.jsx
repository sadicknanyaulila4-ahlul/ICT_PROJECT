import { useState } from 'react';
import { Button, Card, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag, Typography, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { router, useForm, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

const roleLabels = { admin: 'Administrator', analyst: 'Project Planner', supervisor: 'Project Reviewer', manager: 'Manager', dict: 'DICT' };

export default function Users({ users, roles }) {
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
    return <PortalLayout activeKey="users"><section className="users-page"><div className="page-title"><div><Typography.Title level={2}>User Management</Typography.Title><Typography.Text type="secondary">Create accounts, add/change roles, or delete users.</Typography.Text></div><Button type="primary" icon={<PlusOutlined />} onClick={() => openEditor()}>Add user / role</Button></div><Card className="user-table"><Table dataSource={users} columns={columns} rowKey="id" pagination={{ pageSize: 10 }} scroll={{ x: 760 }} /></Card><Modal title={editing ? `Edit user — ${editing.name}` : 'Add user / role'} open={open} onCancel={close} footer={null} destroyOnClose><Form layout="vertical"><Form.Item label="Full name" validateStatus={errors.name ? 'error' : ''} help={errors.name}><Input value={data.name} onChange={(event) => setData('name', event.target.value)} /></Form.Item><Form.Item label="Email address" validateStatus={errors.email ? 'error' : ''} help={errors.email}><Input value={data.email} onChange={(event) => setData('email', event.target.value)} /></Form.Item><Form.Item label="Role — chagua role ya user (select)" validateStatus={errors.role ? 'error' : ''} help={errors.role || 'Role ndiyo inaamua anachoweza kuona na kufanya.'}><Select value={data.role} onChange={(value) => setData('role', value)} placeholder="Chagua role" options={roles.map((role) => ({ value: role, label: roleLabels[role] || role }))} /></Form.Item><Form.Item label={editing ? 'New password (leave empty to retain)' : 'Temporary password'} validateStatus={errors.password ? 'error' : ''} help={errors.password}><Input.Password value={data.password} onChange={(event) => setData('password', event.target.value)} /></Form.Item><Space style={{ display: 'flex', justifyContent: 'flex-end' }}><Button onClick={close}>Cancel</Button>{editing && editing.id !== currentUser?.id ? <Popconfirm title={`Delete ${editing.name}?`} description="User huyu atapoteza access mara moja." okText="Delete" cancelText="Cancel" okType="danger" onConfirm={() => remove(editing)}><Button danger icon={<DeleteOutlined />} loading={processing}>Delete user</Button></Popconfirm> : null}<Button type="primary" loading={processing} onClick={submit}>{editing ? 'Save changes' : 'Create account'}</Button></Space></Form></Modal></section></PortalLayout>;
}
