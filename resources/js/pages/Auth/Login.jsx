import { useEffect } from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { strings, getLocale } from '../../i18n';

export function LanguageSwitcher() {
    const locale = usePage().props.locale || getLocale();
    const switchLang = (next) => {
        try { localStorage.setItem('ictms-locale', next); } catch { /* ignore */ }
        router.post('/language', { locale: next }, { preserveScroll: true });
    };
    return (
        <div className="lang-switch" style={{ display: 'flex', gap: 8 }}>
            <Button size="small" type={locale === 'sw' ? 'primary' : 'default'} onClick={() => switchLang('sw')}>Kiswahili</Button>
            <Button size="small" type={locale === 'en' ? 'primary' : 'default'} onClick={() => switchLang('en')}>English</Button>
        </div>
    );
}

export default function Login({ errors = {} }) {
    const pageLocale = usePage().props.locale || getLocale();
    const t = strings(pageLocale);
    const flash = usePage().props.flash || {};
    const { data, setData, post, processing } = useForm({ email: '', password: '', remember: false });
    useEffect(() => { if (flash.success) message.success(flash.success); }, [flash.success]);
    const submit = () => post('/login', { onError: () => message.error(t.checkDetails) });
    return (
        <main className="auth-page">
            <section className="auth-hero">
                <img className="auth-logo" src="/images/nssf%20logo.png" alt="NSSF logo" />
                <Typography.Text className="auth-kicker">ICT MANAGEMENT SYSTEM (ICTMS)</Typography.Text>
                <Typography.Title>{t.title}</Typography.Title>
                <Typography.Paragraph>{t.subtitle}</Typography.Paragraph>
                <div className="auth-stat"><strong>{t.secure}</strong><span>{t.secureNote}</span></div>
            </section>
            <section className="auth-panel">
                <Card bordered={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <img className="auth-panel-logo" src="/images/nssf%20logo.png" alt="NSSF logo" style={{ width: 48 }} />
                        <LanguageSwitcher />
                    </div>
                    <Typography.Title level={2}>{t.signin}</Typography.Title>
                    <Typography.Paragraph type="secondary">{t.signinNote}</Typography.Paragraph>
                    <Form layout="vertical" onFinish={submit}>
                        <Form.Item label={t.email} validateStatus={errors.email ? 'error' : ''} help={errors.email}>
                            <Input prefix={<MailOutlined />} value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="name@organization.go.tz" />
                        </Form.Item>
                        <Form.Item label={t.password} validateStatus={errors.password ? 'error' : ''} help={errors.password}>
                            <Input.Password prefix={<LockOutlined />} value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Enter your password" />
                        </Form.Item>
                        <div className="auth-options" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                            <label><input type="checkbox" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} /> {t.remember}</label>
                            <span><Link href="/need-help">{t.needHelp}</Link> {' · '} <Link href="/forgot-password">{t.forgot}</Link></span>
                        </div>
                        <Button block type="primary" htmlType="submit" loading={processing}>{t.signinBtn}</Button>
                    </Form>
                    <p className="account-notice">{t.noAccount}</p>
                </Card>
            </section>
        </main>
    );
}

