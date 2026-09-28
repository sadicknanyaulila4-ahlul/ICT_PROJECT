import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, List, Pagination, Tag, Typography, message } from 'antd';
import { Link } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
    const [markingIds, setMarkingIds] = useState([]);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`/notifications/data?page=${page}`, {
                credentials: 'same-origin',
                headers: { Accept: 'application/json' },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Could not load notifications.');
            setNotifications(data.notifications?.data || []);
            setTotal(data.notifications?.total || 0);
            setUnreadCount(data.unread_count || 0);
            window.dispatchEvent(new CustomEvent('ictms:notifications-updated', { detail: { unreadCount: data.unread_count || 0 } }));
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Could not load notifications.');
        } finally {
            setLoading(false);
        }
    }, [page]);

    useEffect(() => {
        load();
    }, [load]);

    const markRead = async (notification) => {
        setMarkingIds((ids) => [...ids, notification.id]);
        try {
            const xsrf = decodeURIComponent((document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/) || [])[1] || '');
            const response = await fetch(`/notifications/${notification.id}/read`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}),
                },
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Could not update notification.');

            setNotifications((items) => items.map((item) => item.id === notification.id ? { ...item, status: 'Read' } : item));
            const nextUnreadCount = notification.status === 'Unread' ? Math.max(0, unreadCount - 1) : unreadCount;
            setUnreadCount(nextUnreadCount);
            window.dispatchEvent(new CustomEvent('ictms:notifications-updated', { detail: { unreadCount: nextUnreadCount } }));
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Could not update notification.');
        } finally {
            setMarkingIds((ids) => ids.filter((id) => id !== notification.id));
        }
    };

    return <PortalLayout activeKey="notifications">
        <div className="page-heading">
            <div>
                <Typography.Text className="eyebrow">PROJECT NOTIFICATIONS</Typography.Text>
                <Typography.Title level={1}>Deadlines and approvals</Typography.Title>
                <Typography.Text type="secondary">{unreadCount} unread notification{unreadCount === 1 ? '' : 's'}</Typography.Text>
            </div>
        </div>
        <Card>
            <List
                loading={loading}
                dataSource={notifications}
                locale={{ emptyText: 'You have no notifications.' }}
                renderItem={(notification) => {
                    const actionUrl = typeof notification.action_url === 'string' && /^\/(?!\/)/.test(notification.action_url)
                        ? notification.action_url
                        : null;

                    return <List.Item actions={[
                        ...(actionUrl ? [<Link key="open" href={actionUrl}>Open</Link>] : []),
                        ...(notification.status === 'Unread' ? [<Button key="read" loading={markingIds.includes(notification.id)} onClick={() => markRead(notification)}>Mark as read</Button>] : []),
                    ]}>
                        <List.Item.Meta
                            title={<>{notification.title} <Tag color={notification.status === 'Unread' ? 'blue' : 'default'}>{notification.status}</Tag></>}
                            description={<>{notification.message}<br /><Typography.Text type="secondary">{new Date(notification.created_at).toLocaleString()}</Typography.Text></>}
                        />
                    </List.Item>;
                }}
            />
            {total > 20 && <Pagination current={page} pageSize={20} total={total} onChange={setPage} className="mt-4 text-right" />}
        </Card>
    </PortalLayout>;
}
