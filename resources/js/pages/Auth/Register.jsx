import React from 'react';
import { Button, Card, Form, Input, Typography, message } from 'antd';
import {
    IdcardOutlined,
    LockOutlined,
    MailOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Link, useForm } from '@inertiajs/react';

export default function Register({ errors = {} }) {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = () =>
        post('/register', {
            onError: () =>
                message.error('Please correct the highlighted fields.'),
        });

    return (
        <main
            className="auth-page auth-register"
            style={{ backgroundImage: "url('/images/building-2.jpg')" }}
        >
            <section className="auth-hero">
                <img
                    className="auth-logo"
                    src="/images/nssf%20logo.png"
                    alt="NSSF logo"
                />

                <Typography.Text className="auth-kicker">
                    NSSF PROJECT MANAGEMENT SYSTEM
                </Typography.Text>

                <Typography.Title>
                    Start your project workspace.
                </Typography.Title>

                <Typography.Paragraph>
                    Create your account to access the project management
                    workspace. New accounts are registered as System Analyst
                    users. Access levels can be assigned by an administrator.
                </Typography.Paragraph>

                <div className="role-rail">
                    <span>01</span>
                    <span>Register</span>
                    <span>02</span>
                    <span>Work</span>
                    <span>03</span>
                    <span>Close</span>
                </div>
            </section>

            <div className="auth-subbar">
                <strong>Project Management</strong>
            </div>

            <section className="auth-panel">
                <Card className="register-card" variant="borderless">
                    <Typography.Title level={2}>
                        Create account
                    </Typography.Title>

                    <Typography.Paragraph type="secondary">
                        Enter your personal account details.
                    </Typography.Paragraph>

                    <Form layout="vertical" onFinish={submit}>
                        <Form.Item
                            label="Full name"
                            validateStatus={errors.name ? 'error' : ''}
                            help={errors.name}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                value={data.name}
                                onChange={(event) =>
                                    setData('name', event.target.value)
                                }
                                placeholder="Enter your full name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Email address"
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                value={data.email}
                                onChange={(event) =>
                                    setData('email', event.target.value)
                                }
                                placeholder="name@organization.go.tz"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                value={data.password}
                                onChange={(event) =>
                                    setData('password', event.target.value)
                                }
                                placeholder="Minimum 8 characters"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm password"
                            validateStatus={
                                errors.password_confirmation ? 'error' : ''
                            }
                            help={errors.password_confirmation}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                value={data.password_confirmation}
                                onChange={(event) =>
                                    setData(
                                        'password_confirmation',
                                        event.target.value
                                    )
                                }
                                placeholder="Repeat your password"
                            />
                        </Form.Item>

                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            loading={processing}
                            icon={<IdcardOutlined />}
                        >
                            Create account
                        </Button>
                    </Form>

                    <div className="auth-switch">
                        Already registered?{' '}
                        <Link href="/login">Sign in</Link>
                    </div>

                    <Link className="back-home" href="/">
                        Back to portal home
                    </Link>
                </Card>
            </section>
        </main>
    );
}
