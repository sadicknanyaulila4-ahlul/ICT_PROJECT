import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message } from 'antd';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const { Option } = Select;

export default function Register({ systems, infrastructure }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        budget: '',
        project_source: 'System Development',
        project_nature: 'Planned',
        project_activity: 'New Implementation (Major)',
        existing_system_id: null,
        existing_infrastructure_id: null,
        custom_system_name: '',
        custom_infrastructure_name: '',
    });

    const handleSubmit = () => {
        post('/project', {
            onSuccess: () => message.success('Project registered successfully!'),
            onError: () => message.error('There was an error.'),
        });
    };

    const isExistingRequired = () => {
        const activity = data.project_activity;
        return ['Change Request', 'Additional Requirements', 'Review/Enhancement'].includes(activity);
    };

    return (
        <AuthenticatedLayout>
            <Card title="Register New Project">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Project Name" required>
                        <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea value={data.description} onChange={e => setData('description', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Budget">
                        <Input type="number" value={data.budget} onChange={e => setData('budget', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Project Source" required>
                        <Select value={data.project_source} onChange={val => setData('project_source', val)}>
                            <Option value="System Development">System Development</Option>
                            <Option value="Infrastructure Development">Infrastructure Development</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Project Nature" required>
                        <Select value={data.project_nature} onChange={val => setData('project_nature', val)}>
                            <Option value="Planned">Planned</Option>
                            <Option value="Adhoc">Adhoc</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Project Activity" required>
                        <Select value={data.project_activity} onChange={val => setData('project_activity', val)}>
                            <Option value="New Implementation (Major)">New Implementation (Major)</Option>
                            <Option value="New Implementation (Minor)">New Implementation (Minor)</Option>
                            <Option value="Change Request">Change Request</Option>
                            <Option value="Additional Requirements">Additional Requirements</Option>
                            <Option value="Review/Enhancement">Review/Enhancement</Option>
                            <Option value="Integration">Integration</Option>
                        </Select>
                    </Form.Item>

                    {/* Dynamic fields based on source and activity */}
                    {data.project_source === 'System Development' && (
                        <>
                            {isExistingRequired() ? (
                                <Form.Item label="Existing System" required>
                                    <Select
                                        value={data.existing_system_id}
                                        onChange={val => setData('existing_system_id', val)}
                                        placeholder="Select system"
                                    >
                                        {systems.map(sys => <Option key={sys.id} value={sys.id}>{sys.name}</Option>)}
                                    </Select>
                                    {errors.existing_system_id && <div style={{ color: 'red' }}>{errors.existing_system_id}</div>}
                                </Form.Item>
                            ) : (
                                <Form.Item label="New System Name">
                                    <Input value={data.custom_system_name} onChange={e => setData('custom_system_name', e.target.value)} />
                                </Form.Item>
                            )}
                        </>
                    )}

                    {data.project_source === 'Infrastructure Development' && (
                        <>
                            {isExistingRequired() ? (
                                <Form.Item label="Existing Infrastructure" required>
                                    <Select
                                        value={data.existing_infrastructure_id}
                                        onChange={val => setData('existing_infrastructure_id', val)}
                                        placeholder="Select infrastructure"
                                    >
                                        {infrastructure.map(inf => <Option key={inf.id} value={inf.id}>{inf.name}</Option>)}
                                    </Select>
                                    {errors.existing_infrastructure_id && <div style={{ color: 'red' }}>{errors.existing_infrastructure_id}</div>}
                                </Form.Item>
                            ) : (
                                <Form.Item label="New Infrastructure Name">
                                    <Input value={data.custom_infrastructure_name} onChange={e => setData('custom_infrastructure_name', e.target.value)} />
                                </Form.Item>
                            )}
                        </>
                    )}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing}>Register Project</Button>
                    </Form.Item>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
}