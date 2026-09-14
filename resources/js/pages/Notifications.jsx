import React, { useEffect, useState } from 'react';
import { Button, Card, List, Tag, Typography, message } from 'antd';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const load = async () => {
        try {
            const response = await fetch('/api/notifications', { credentials: 'same-origin', headers: { Accept: 'application/json' } });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Could not load notifications.');
            setNotifications(data.notifications.data || []);
        } catch (error) { message.error(error.message); } finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);
    const markRead = async (notification) => {
        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' }).catch(() => undefined);
            const xsrf = decodeURIComponent((document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/) || [])[1] || '');
            const response = await fetch(`/api/notifications/${notification.id}/read`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json', ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}) },
            });
            if (!response.ok) throw new Error('Could not update notification.');
            setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, status: 'Read' } : item));
        } catch (error) { message.error(error.message); }
    };
    return <PortalLayout activeKey="notifications"><div className="page-heading"><div><Typography.Text className="eyebrow">PROJECT NOTIFICATIONS</Typography.Text><Typography.Title level={1}>Deadlines and approvals</Typography.Title></div></div><Card><List loading={loading} dataSource={notifications} locale={{ emptyText: 'You have no notifications.' }} renderItem={(notification) => <List.Item actions={notification.status === 'Unread' ? [<Button key="read" onClick={() => markRead(notification)}>Mark as read</Button>] : []}><List.Item.Meta title={<>{notification.title} <Tag color={notification.status === 'Unread' ? 'blue' : 'default'}>{notification.status}</Tag></>} description={notification.message} /></List.Item>} /></Card></PortalLayout>;
}
