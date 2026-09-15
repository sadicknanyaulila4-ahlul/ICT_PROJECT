import { Button, Card, Form, Input, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useForm } from '@inertiajs/react';

export default function ResetPassword({ errors = {}, token = '', email = '' }) {
    const { data, setData, post, processing } = useForm({
        token, email, password: '', password_confirmation: '',
    });
    const submit = () => post('/reset-password', {
        onSuccess: () => message.success('Password imeresetwa. Ingia sasa.'),
        onError: () => message.error('Rekebisha sehemu zenye hitilafu.'),
    });
    return (
        <main className="auth-page">
            <section className="auth-hero">
                <img className="auth-logo" src="/images/nssf%20logo.png" alt="NSSF logo" />
                <Typography.Text className="auth-kicker">ICT MANAGEMENT SYSTEM (ICTMS)</Typography.Text>
                <Typography.Title>Set new password</Typography.Title>
                <Typography.Paragraph>Weka password mpya ili uweze ku-sign in tena.</Typography.Paragraph>
            </section>
            <section className="auth-panel">
                <Card bordered={false}>
                    <Typography.Title level={2}>New password</Typography.Title>
                    <Form layout="vertical" onFinish={submit}>
                        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                            <Input prefix={<MailOutlined />} value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Password mpya" validateStatus={errors.password ? 'error' : ''} help={errors.password}>
                            <Input.Password prefix={<LockOutlined />} value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Min 8 characters" />
                        </Form.Item>
                        <Form.Item label="Rudia password">
                            <Input.Password prefix={<LockOutlined />} value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                        </Form.Item>
                        <Button block type="primary" htmlType="submit" loading={processing}>Reset password</Button>
                    </Form>
                    <p className="account-notice"><Link href="/login">Rudi kwenye Sign in</Link></p>
                </Card>
            </section>
        </main>
    );
}
