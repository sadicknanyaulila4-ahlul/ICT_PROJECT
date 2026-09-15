import { Button, Card, Form, Input, Typography, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ForgotPassword({ errors = {} }) {
    const flash = usePage().props.flash || {};
    const { data, setData, post, processing } = useForm({ email: '' });
    useEffect(() => { if (flash.success) message.success(flash.success); }, [flash.success]);
    const submit = () => post('/forgot-password', {
        onError: () => message.error('Rekebisha email yako.'),
    });
    return (
        <main className="auth-page">
            <section className="auth-hero">
                <img className="auth-logo" src="/images/nssf%20logo.png" alt="NSSF logo" />
                <Typography.Text className="auth-kicker">ICT MANAGEMENT SYSTEM (ICTMS)</Typography.Text>
                <Typography.Title>Forgot password?</Typography.Title>
                <Typography.Paragraph>Weka active email yako — tutakutumia link ya ku-reset password hadi ufanikiwe kuingia.</Typography.Paragraph>
            </section>
            <section className="auth-panel">
                <Card bordered={false}>
                    <Typography.Title level={2}>Reset password</Typography.Title>
                    <Typography.Paragraph type="secondary">Link itatumwa kwenye email yako.</Typography.Paragraph>
                    <Form layout="vertical" onFinish={submit}>
                        <Form.Item label="Active email" validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                            <Input prefix={<MailOutlined />} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="name@organization.go.tz" />
                        </Form.Item>
                        <Button block type="primary" htmlType="submit" loading={processing}>Tuma reset link</Button>
                    </Form>
                    <p className="account-notice"><Link href="/login">Rudi kwenye Sign in</Link></p>
                </Card>
            </section>
        </main>
    );
}
