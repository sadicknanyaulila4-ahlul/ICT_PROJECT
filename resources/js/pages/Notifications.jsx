import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Form, Input, List, Pagination, Select, Tag, Typography, message } from 'antd';
import { Link, useForm } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Notifications({ users = [] }) {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [unreadCount, setUnreadCount] = useState(0);
    const [markingIds, setMarkingIds] = useState([]);
    const [sending, setSending] = useState(false);
    const sendForm = useForm({ recipient_id: null, title: '', message: '' });

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

    const sendNotification = async () => {
        sendForm.clearErrors();
        setSending(true);

        try {
            await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });
            const xsrf = decodeURIComponent((document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/) || [])[1] || '');
            const response = await fetch('/notifications', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}),
                },
                body: JSON.stringify(sendForm.data),
            });
            const data = await response.json();

            if (response.status === 422 && data.errors) {
                Object.entries(data.errors).forEach(([field, errors]) => {
                    sendForm.setError(field, errors[0]);
                });
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || 'Could not send notification.');
            }

            sendForm.reset();
            message.success('Notification sent successfully.');
            await load();
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Could not send notification.');
        } finally {
            setSending(false);
        }
    };

    return <PortalLayout activeKey="notifications">
        <div className="page-heading">
            <div>
                <Typography.Text className="eyebrow">PROJECT NOTIFICATIONS</Typography.Text>
                <Typography.Title level={1}>Notifications and messages</Typography.Title>
                <Typography.Text type="secondary">{unreadCount} unread notification{unreadCount === 1 ? '' : 's'}</Typography.Text>
            </div>
        </div>
        <Card className="mb-5" title="Send a notification">
            <Form layout="vertical" onFinish={sendNotification}>
                <Form.Item
                    label="Send to"
                    validateStatus={sendForm.errors.recipient_id ? 'error' : ''}
                    help={sendForm.errors.recipient_id}
                    required
                >
                    <Select
                        showSearch
                        optionFilterProp="label"
                        placeholder="Choose a user"
                        value={sendForm.data.recipient_id}
                        onChange={(value) => sendForm.setData('recipient_id', value)}
                        options={users.map((user) => ({
                            value: user.id,
                            label: `${user.name} — ${user.role}`,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="Title"
                    validateStatus={sendForm.errors.title ? 'error' : ''}
                    help={sendForm.errors.title}
                    required
                >
                    <Input
                        maxLength={150}
                        value={sendForm.data.title}
                        onChange={(event) => sendForm.setData('title', event.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    label="Message"
                    validateStatus={sendForm.errors.message ? 'error' : ''}
                    help={sendForm.errors.message}
                    required
                >
                    <Input.TextArea
                        rows={4}
                        maxLength={2000}
                        showCount
                        value={sendForm.data.message}
                        onChange={(event) => sendForm.setData('message', event.target.value)}
                    />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={sending}>Send notification</Button>
            </Form>
        </Card>
        <Card title="Received notifications">
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
                            title={<>{notification.title} {notification.type === 'User Message' && <Tag color="purple">Direct message</Tag>} <Tag color={notification.status === 'Unread' ? 'blue' : 'default'}>{notification.status}</Tag></>}
                            description={<>{notification.message}<br />{notification.sender && <Typography.Text type="secondary">From {notification.sender.name} · </Typography.Text>}<Typography.Text type="secondary">{new Date(notification.created_at).toLocaleString()}</Typography.Text></>}
                        />
                    </List.Item>;
                }}
            />
            {total > 20 && <Pagination current={page} pageSize={20} total={total} onChange={setPage} className="mt-4 text-right" />}
        </Card>
    </PortalLayout>;
}
