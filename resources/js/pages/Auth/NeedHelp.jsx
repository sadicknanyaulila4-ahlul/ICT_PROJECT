import { Button, Card, Form, Input, Typography, message } from 'antd';
import { MailOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function NeedHelp({ errors = {} }) {
    const flash = usePage().props.flash || {};
    const { data, setData, post, processing } = useForm({ name: '', email: '', subject: '', message: '' });
    useEffect(() => { if (flash.success) message.success(flash.success); }, [flash.success]);
    const submit = () => post('/need-help', {
        onSuccess: () => message.success('Taarifa imetumwa kwa administrator.'),
        onError: () => message.error('Rekebisha sehemu zenye hitilafu.'),
    });
    return (
        <main className="auth-page">
            <section className="auth-hero">
                <img className="auth-logo" src="/images/nssf%20logo.png" alt="NSSF logo" />
                <Typography.Text className="auth-kicker">ICT MANAGEMENT SYSTEM (ICTMS)</Typography.Text>
                <Typography.Title>Need help?</Typography.Title>
                <Typography.Paragraph>Jaza fomu — taarifa itafika kwa administrator kama changamoto (challenge) na utajibiwa kupitia email yako.</Typography.Paragraph>
            </section>
            <section className="auth-panel">
                <Card bordered={false}>
                    <Typography.Title level={2}>Tuma taarifa kwa Admin</Typography.Title>
                    <Typography.Paragraph type="secondary">Huhitaji kuingia (login) kutuma taarifa hii. Tumia active email.</Typography.Paragraph>
                    <Form layout="vertical" onFinish={submit}>
                        <Form.Item label="Jina kamili" validateStatus={errors.name ? 'error' : ''} help={errors.name}>
                            <Input prefix={<UserOutlined />} value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Jina lako" />
                        </Form.Item>
                        <Form.Item label="Active email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                            <Input prefix={<MailOutlined />} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="name@example.com" />
                        </Form.Item>
                        <Form.Item label="Kichwa" validateStatus={errors.subject ? 'error' : ''} help={errors.subject}>
                            <Input value={data.subject} onChange={(e) => setData('subject', e.target.value)} placeholder="Mf: Siwezi kuingia - nimesahau password" />
                        </Form.Item>
                        <Form.Item label="Eleza shida" validateStatus={errors.message ? 'error' : ''} help={errors.message}>
                            <Input.TextArea prefix={<MessageOutlined />} rows={4} value={data.message} onChange={(e) => setData('message', e.target.value)} placeholder="Eleza kwa urefu..." />
                        </Form.Item>
                        <Button block type="primary" htmlType="submit" loading={processing}>Tuma kwa Administrator</Button>
                    </Form>
                    <p className="account-notice"><Link href="/login">Rudi kwenye Sign in</Link></p>
                </Card>
            </section>
        </main>
    );
}
