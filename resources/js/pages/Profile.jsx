import React from 'react';
import { Card, Descriptions, Tag, Typography } from 'antd';
import { usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Profile() {
    const user = usePage().props.auth?.user;

    return <PortalLayout activeKey="profile"><div className="page-heading"><div><Typography.Text className="eyebrow">ACCOUNT</Typography.Text><Typography.Title level={1}>My profile</Typography.Title><Typography.Paragraph type="secondary">Your account information and assigned access role.</Typography.Paragraph></div><Tag color="red">{user?.role || 'user'}</Tag></div><Card title="Profile details"><Descriptions column={{ xs: 1, sm: 2 }} bordered><Descriptions.Item label="Name">{user?.name || '-'}</Descriptions.Item><Descriptions.Item label="Email">{user?.email || '-'}</Descriptions.Item><Descriptions.Item label="Role"><Tag color="red">{user?.role || '-'}</Tag></Descriptions.Item><Descriptions.Item label="Account status"><Tag color="green">Active</Tag></Descriptions.Item></Descriptions></Card></PortalLayout>;
}
