import { useState } from 'react';
import { Button, Card, Descriptions, Form, Input, List, Modal, Select, Space, Tag, Typography, message } from 'antd';
import { MailOutlined, PhoneOutlined, SendOutlined, MessageOutlined } from '@ant-design/icons';
import { router, useForm, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

const contacts = [
    { name: 'ICT Support Desk', detail: 'support@nssf.go.tz', tag: 'Email' },
    { name: 'Help line', detail: '+255 22 000 0000', tag: 'Phone' },
    { name: 'Working hours', detail: 'Mon–Fri, 08:00–17:00', tag: 'Hours' },
];

const faqs = [
    { q: 'Nimesahau password, nifanye nini?', a: 'Msimamizi wa system (admin) ndiye anayeweza kukuwekea password mpya kwenye User Management.' },
    { q: 'Project haionekani kwenye dashboard?', a: 'Hakikisha umepewa role sahihi na project iko kwenye phase inayolingana na kazi yako.' },
    { q: 'Document upload inagoma?', a: 'Hakikisha uko kwenye phase sahihi ya project na file ni PDF/DOC/XLS/PNG chini ya 10MB.' },
];

const statusColor = { Open: 'red', 'In Progress': 'gold', Resolved: 'green', Closed: 'default' };

function AdminTickets({ tickets = [] }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(null);
    const replyForm = useForm({ admin_reply: '', status: 'Resolved' });
    const openReply = (ticket) => {
        setActive(ticket);
        replyForm.setData({ admin_reply: ticket.admin_reply || '', status: ticket.status === 'Open' ? 'Resolved' : ticket.status });
        setOpen(true);
    };
    const submitReply = () => {
        if (!active) return;
        router.post(`/support/${active.id}/reply`, replyForm.data, {
            preserveScroll: true,
            onSuccess: () => { setOpen(false); setActive(null); replyForm.reset(); message.success('Jibu limetumwa kwa user.'); router.reload({ only: ['tickets'] }); },
            onError: () => message.error('Rekebisha jibu kabla ya kutuma.'),
        });
    };
    return (
        <>
            <div className="page-heading">
                <div>
                    <Typography.Text className="eyebrow">SUPPORT DESK — ADMIN</Typography.Text>
                    <Typography.Title level={1}>Changamoto za watumiaji</Typography.Title>
                    <Typography.Paragraph type="secondary">Unaona changamoto zote za users (pamoja na Need Help). Huna sehemu ya kuandika changamoto — kazi yako ni kujibu kupitia Reply.</Typography.Paragraph>
                </div>
                <Tag color="red">{tickets.length} tickets</Tag>
            </div>
            <Card className="dashboard-table" title="Challenges zilizotumwa na users">
                <List dataSource={tickets} locale={{ emptyText: 'Hakuna changamoto kwa sasa.' }} renderItem={(t) => (
                    <List.Item actions={[<Button key="reply" type="primary" icon={<MessageOutlined />} onClick={() => openReply(t)}>Reply / Tuma solution</Button>]}>
                        <List.Item.Meta title={<>{t.subject} <Tag color={statusColor[t.status] || 'blue'}>{t.status}</Tag> <Tag>{t.priority}</Tag> {t.is_need_help ? <Tag color="purple">Need Help</Tag> : null}</>} description={<><div><strong>{t.name}</strong> · {t.email} · {t.category} · {t.created_at}</div><div style={{ marginTop: 6 }}>{t.message}</div>{t.admin_reply && <div style={{ marginTop: 8, background: '#f6ffed', border: '1px solid #b7eb8f', padding: 8, borderRadius: 6 }}><strong>Jibu lako:</strong> {t.admin_reply}</div>}</>} />
                    </List.Item>
                )} />
            </Card>
            <Modal title={active ? `Reply — ${active.subject}` : 'Reply'} open={open} onCancel={() => setOpen(false)} onOk={submitReply} okText="Tuma solution" confirmLoading={replyForm.processing} destroyOnClose>
                {active && <div style={{ marginBottom: 12 }}><div><strong>From:</strong> {active.name} ({active.email})</div><div style={{ marginTop: 6 }}>{active.message}</div></div>}
                <Form layout="vertical">
                    <Form.Item label="Solution / Jibu kwa user" validateStatus={replyForm.errors.admin_reply ? 'error' : ''} help={replyForm.errors.admin_reply}>
                        <Input.TextArea rows={4} value={replyForm.data.admin_reply} onChange={(e) => replyForm.setData('admin_reply', e.target.value)} placeholder="Andika solution hapa..." />
                    </Form.Item>
                    <Form.Item label="Status">
                        <Select value={replyForm.data.status} onChange={(v) => replyForm.setData('status', v)} options={['Open', 'In Progress', 'Resolved', 'Closed'].map((s) => ({ value: s, label: s }))} />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}


export default function Support({ tickets = [], isAdmin = false }) {
    const user = usePage().props.auth?.user;
    const [form] = Form.useForm();
    const [sent, setSent] = useState([]);
    const submitChallenge = (values) => {
        const ticket = { id: Date.now(), ...values, name: user?.name || 'User', date: new Date().toLocaleString() };
        setSent([ticket, ...sent]);
        try { localStorage.setItem(`support-tickets-${user?.email || 'guest'}`, JSON.stringify([ticket, ...sent])); } catch { /* best-effort */ }
        window.location.href = `mailto:support@nssf.go.tz?subject=${encodeURIComponent(`[ICTMS] ${values.category} — ${values.subject}`)}&body=${encodeURIComponent(`Jina: ${ticket.name}\nCategory: ${values.category}\nUzito: ${values.priority}\n\n${values.message}`)}`;
        form.resetFields();
        message.success('Changamoto yako imetumwa kwenye Support Desk.');
    };
    return (
        <PortalLayout activeKey="support">
            <div className="page-heading">
                <div>
                    <Typography.Text className="eyebrow">SUPPORT DESK</Typography.Text>
                    <Typography.Title level={1}>Msaada na mawasiliano</Typography.Title>
                    <Typography.Paragraph type="secondary">Andika changamoto unayoiface — itatumwa moja kwa moja kwa support@nssf.go.tz.</Typography.Paragraph>
                </div>
                <Tag color="red">Mon–Fri · 08:00–17:00</Tag>
            </div>
            <Card className="dashboard-table" title="Andika changamoto unayoiface">
                <Form form={form} layout="vertical" onFinish={submitChallenge} initialValues={{ category: 'Login / Account', priority: 'Normal' }}>
                    <Form.Item label="Aina ya changamoto (select)" name="category" rules={[{ required: true, message: 'Chagua aina ya changamoto' }]}>
                        <Select placeholder="Chagua aina" options={['Login / Account', 'Project Registration', 'Documents Upload', 'Activities / Plan', 'Requirements / RTM', 'Change Request', 'Reports', 'Nyingine'].map((c) => ({ value: c, label: c }))} />
                    </Form.Item>
                    <Form.Item label="Uzito (priority)" name="priority" rules={[{ required: true }]}>
                        <Select options={['Low', 'Normal', 'High', 'Urgent'].map((p) => ({ value: p, label: p }))} />
                    </Form.Item>
                    <Form.Item label="Kichwa cha changamoto" name="subject" rules={[{ required: true, message: 'Andika kichwa kifupi' }]}>
                        <Input placeholder="Mf: Siwezi ku-upload SRS kwenye Planning" />
                    </Form.Item>
                    <Form.Item label="Eleza changamoto kwa urefu" name="message" rules={[{ required: true, message: 'Eleza changamoto unayoikutana nayo' }]}>
                        <Input.TextArea rows={5} placeholder="Eleza hatua ulizofanya, project husika, na ujumbe wa error unaouona..." />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" icon={<SendOutlined />}>Tuma changamoto</Button>
                </Form>
            </Card>
            <Card className="dashboard-table" title="Changamoto ulizotuma" style={{ marginTop: 20 }}>
                <List dataSource={sent} locale={{ emptyText: 'Hujatuma changamoto yoyote bado.' }} renderItem={(t) => <List.Item><List.Item.Meta title={<>{t.subject} <Tag color="green">Sent</Tag> <Tag>{t.priority}</Tag></>} description={<>{t.category} · {t.date}<br />{t.message}</>} /></List.Item>} />
            </Card>
            <Card title="Wasiliana nasi" style={{ marginTop: 20 }}>
                <List
                    dataSource={contacts}
                    renderItem={(item) => (
                        <List.Item actions={[<Tag key="tag">{item.tag}</Tag>]}>
                            <List.Item.Meta title={item.name} description={item.detail} />
                        </List.Item>
                    )}
                />
                <Descriptions column={1} bordered style={{ marginTop: 16 }}>
                    <Descriptions.Item label="Email"><Button type="link" icon={<MailOutlined />} href="mailto:support@nssf.go.tz">support@nssf.go.tz</Button></Descriptions.Item>
                    <Descriptions.Item label="Simu"><Button type="link" icon={<PhoneOutlined />} href="tel:+255220000000">+255 22 000 0000</Button></Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title="Maswali yanayoulizwa mara nyingi" style={{ marginTop: 20 }}>
                <List
                    dataSource={faqs}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta title={item.q} description={item.a} />
                        </List.Item>
                    )}
                />
            </Card>
        </PortalLayout>
    );
}
