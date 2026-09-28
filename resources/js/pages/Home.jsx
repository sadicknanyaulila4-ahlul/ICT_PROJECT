import { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import {
    ApartmentOutlined,
    AuditOutlined,
    BankOutlined,
    FileSearchOutlined,
    LoginOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import { Link } from '@inertiajs/react';

const backgroundImages = [
    '/images/building-1.jpg',
    '/images/building-2.jpg',
    '/images/building-3.jpg',
    '/images/building-4.jpg',
];

const services = [
    {
        icon: <ApartmentOutlined />,
        title: 'Project initiation',
        text: 'Register projects and capture initial requirements.',
    },
    {
        icon: <AuditOutlined />,
        title: 'Project planning',
        text: 'Build implementation plans and approvals.',
    },
    {
        icon: <FileSearchOutlined />,
        title: 'Project execution',
        text: 'Track activities, requirements, and UAT.',
    },
    {
        icon: <BankOutlined />,
        title: 'Project closure',
        text: 'Complete handover, reports, and attestations.',
    },
];

export default function Home() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((previous) => {
                return (previous + 1) % backgroundImages.length;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="landing-page">
            <header className="landing-header">
                <div className="landing-brand">
                    <img
                        src="/images/nssf%20logo.png"
                        alt="NSSF logo"
                        className="landing-logo"
                    />

                    <span>
                        <strong>NSSF Portal</strong>
                        <small>Project management system</small>
                    </span>
                </div>

                <Space>
                    <Link href="/login">
                        <Button icon={<LoginOutlined />}>
                            Sign in
                        </Button>
                    </Link>

                    <Link href="/register">
                        <Button type="primary" icon={<UserAddOutlined />}>
                            Register
                        </Button>
                    </Link>
                </Space>
            </header>
            <div className="auth-subbar">
                <strong>Project Management</strong>
            </div>
            <section
                className="landing-hero slideshow-hero"
                style={{
                    backgroundImage: `url("${backgroundImages[currentImage]}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    minHeight: '700px',
                }}
            >
                <div className="hero-overlay"></div>
                <img
                    src="/images/nssf%20logo.png"
                    alt=""
                    aria-hidden="true"
                    className="hero-watermark"
                />

                <div className="hero-content">
                    <div className="hero-copy">
                        <Typography.Text className="auth-kicker">
                            NSSF PROJECT OPERATIONS
                        </Typography.Text>

                        <Typography.Title>
                            One portal, one account for every project.
                        </Typography.Title>

                        <Typography.Paragraph>
                            Plan, deliver, review, and close ICT projects
                            through a clear, controlled workflow.
                        </Typography.Paragraph>

                        <Space wrap>
                            <Link href="/register">
                                <Button
                                    type="primary"
                                    size="large"
                                    icon={<UserAddOutlined />}
                                >
                                    Create an account
                                </Button>
                            </Link>

                            <Link href="/login">
                                <Button size="large">
                                    Sign in to continue
                                </Button>
                            </Link>
                        </Space>
                    </div>

                    <div className="hero-panel">
                        <span className="hero-panel-label">
                            PROJECT LIFECYCLE
                        </span>

                        <div className="lifecycle-line">
                            <span>01</span>
                            <i></i>
                            <span>02</span>
                            <i></i>
                            <span>03</span>
                            <i></i>
                            <span>04</span>
                        </div>

                        <Typography.Title level={3}>
                            From registration to closure
                        </Typography.Title>

                        <Typography.Paragraph>
                            Every phase has its own requirements,
                            documents, approvals, and accountability.
                        </Typography.Paragraph>
                    </div>
                </div>

                <div className="slide-indicators">
                    {backgroundImages.map((_, index) => (
                        <span
                            key={index}
                            className={
                                index === currentImage ? 'active' : ''
                            }
                        ></span>
                    ))}
                </div>
            </section>

            <section className="services-section">
                <Typography.Text className="eyebrow">
                    SERVICES
                </Typography.Text>

                <Typography.Title level={2}>
                    Everything your project team needs
                </Typography.Title>

                <Row gutter={[22, 22]}>
                    {services.map((service, index) => (
                        <Col
                            xs={24}
                            sm={12}
                            lg={6}
                            key={service.title}
                        >
                            <Card
                                className="service-card"
                                variant="borderless"
                            >
                                <span className="service-index-watermark" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <div className="service-card-top">
                                    <span className="service-icon">
                                        {service.icon}
                                    </span>
                                    <span className="service-step">
                                        PHASE {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <Typography.Title level={4}>
                                    {service.title}
                                </Typography.Title>

                                <Typography.Paragraph type="secondary">
                                    {service.text}
                                </Typography.Paragraph>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>

            <footer className="landing-footer">
                NSSF Project Operations
                <span>•</span>
                Secure workflow workspace
            </footer>
        </main>
    );
}
