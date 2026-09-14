import { useState } from 'react';
import { Avatar, Button, Card, Col, Descriptions, Form, Input, Row, Tag, Typography, Upload, message } from 'antd';
import { CameraOutlined, DeleteOutlined, MailOutlined, SaveOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { router, usePage } from '@inertiajs/react';
import PortalLayout from '@/Layouts/PortalLayout';

export default function Profile() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [preview, setPreview] = useState(user?.profile_photo_url || null);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const initials = user?.name?.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() || 'US';
    const pick = (f) => {
        if (!f.type.startsWith('image/')) { message.error('Chagua file ya picha.'); return Upload.LIST_IGNORE; }
        if (f.size / 1024 / 1024 >= 2) { message.error('Picha isiwe kubwa kuliko 2MB.'); return Upload.LIST_IGNORE; }
        setFile(f);
        const r = new FileReader();
        r.onload = (e) => setPreview(e.target?.result);
        r.readAsDataURL(f);
        return false;
    };
    const upload = () => {
        if (!file) { message.warning('Chagua picha kwanza.'); return; }
        setUploading(true);
        router.post('/profile/photo', { photo: file }, { forceFormData: true, preserveScroll: true,
            onSuccess: () => { setFile(null); setUploading(false); message.success('Picha ya profile imehifadhiwa.'); },
            onError: (e) => { setUploading(false); message.error(e.photo || 'Imeshindikana kupakia picha.'); } });
    };
    const remove = () => router.delete('/profile/photo', { preserveScroll: true,
        onSuccess: () => { setPreview(null); setFile(null); message.success('Picha imeondolewa.'); } });
    const save = (v) => router.patch('/profile', v, { preserveScroll: true,
        onSuccess: () => message.success('Profile imehifadhiwa.'),
        onError: () => message.error('Rekebisha sehemu zenye hitilafu.') });
    return <PortalLayout activeKey="profile"><div className="page-heading"><div><Typography.Text className="eyebrow">ACCOUNT</Typography.Text><Typography.Title level={1}>My profile</Typography.Title><Typography.Paragraph type="secondary">Weka picha yako ya profile na sasisha taarifa zako.</Typography.Paragraph></div><Tag color="red">{user?.role || 'user'}</Tag></div><Row gutter={[20, 20]}><Col xs={24} md={10}><Card title="Profile picture"><div className="profile-photo-wrap"><Avatar size={128} src={preview || undefined} icon={!preview && <UserOutlined />} className="profile-avatar">{!preview && initials}</Avatar><div className="profile-photo-actions"><Upload accept="image/*" showUploadList={false} beforeUpload={pick} maxCount={1}><Button icon={<CameraOutlined />}>Chagua picha</Button></Upload><Button type="primary" icon={<UploadOutlined />} loading={uploading} disabled={!file} onClick={upload}>Weka profile picture</Button>{(preview || user?.profile_photo_url) && <Button danger icon={<DeleteOutlined />} onClick={remove}>Ondoa picha</Button>}</div><Typography.Text type="secondary" className="profile-hint">JPG, PNG au WebP - max 2MB - inaonekana kwenye header.</Typography.Text></div></Card></Col><Col xs={24} md={14}><Card title="Profile details" extra={<Tag color="green">Active</Tag>}><Form layout="vertical" initialValues={{ name: user?.name, email: user?.email }} onFinish={save}><Form.Item label="Full name" name="name" rules={[{ required: true, message: 'Andika jina kamili' }]}><Input prefix={<UserOutlined />} /></Form.Item><Form.Item label="Email address" name="email" rules={[{ required: true, type: 'email', message: 'Andika email sahihi' }]}><Input prefix={<MailOutlined />} /></Form.Item><Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Hifadhi mabadiliko</Button></Form><Descriptions column={{ xs: 1, sm: 2 }} bordered style={{ marginTop: 20 }}><Descriptions.Item label="Role"><Tag color="red">{user?.role || '-'}</Tag></Descriptions.Item><Descriptions.Item label="Account status"><Tag color="green">Active</Tag></Descriptions.Item></Descriptions></Card></Col></Row></PortalLayout>;
}
