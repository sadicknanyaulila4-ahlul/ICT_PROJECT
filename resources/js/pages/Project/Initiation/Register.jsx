import { Alert, Button, Card, Form, Input, Select, Space, message } from 'antd';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import PortalLayout from '@/Layouts/PortalLayout';

const { Option } = Select;

export default function Register({ systems = [], infrastructure = [] }) {
    const systemNameInput = useRef(null);
    const availableSystems = Array.isArray(systems)
        ? systems.filter(system => system && system.id != null && typeof system.name === 'string')
        : [];
    const availableInfrastructure = Array.isArray(infrastructure)
        ? infrastructure.filter(item => item && item.id != null && typeof item.name === 'string')
        : [];
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        budget: '',
        implementation_team_type: 'Internal',
        implementation_team_names: '',
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
            onError: () => message.error('Please correct the highlighted fields and try again.'),
        });
    };

    const isExistingRequired = () => {
        const activity = data.project_activity;
        return ['Change Request', 'Additional Requirements', 'Review/Enhancement'].includes(activity);
    };

    const fieldError = (field) => errors[field] ? { validateStatus: 'error', help: errors[field] } : {};
    const matchingSystem = data.project_source === 'System Development' && data.custom_system_name.trim()
        ? availableSystems.find(system => system.name.trim().toLocaleLowerCase() === data.custom_system_name.trim().toLocaleLowerCase())
        : null;

    const useExistingSystem = () => {
        if (!matchingSystem) {
            message.error('The matching system is no longer available. Refresh the page and try again.');
            return;
        }
        setData('project_activity', 'Review/Enhancement');
        setData('existing_system_id', matchingSystem.id);
        setData('custom_system_name', '');
        message.info('The project is now linked to the existing system.');
    };

    const handleSourceChange = (value) => {
        setData('project_source', value);
        setData('existing_system_id', null);
        setData('existing_infrastructure_id', null);
        setData('custom_system_name', '');
        setData('custom_infrastructure_name', '');
    };

    const handleActivityChange = (value) => {
        setData('project_activity', value);
        setData('existing_system_id', null);
        setData('existing_infrastructure_id', null);
        setData('custom_system_name', '');
        setData('custom_infrastructure_name', '');
    };

    return (
        <PortalLayout activeKey="initiation">
            <Card title="Register New Project">
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Project Name" required {...fieldError('name')}>
                        <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <Input.TextArea value={data.description} onChange={e => setData('description', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Budget" {...fieldError('budget')}>
                        <Input type="number" value={data.budget} onChange={e => setData('budget', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Implementation Team" required>
                        <Select value={data.implementation_team_type} onChange={val => setData('implementation_team_type', val)}>
                            <Option value="Internal">Internal</Option>
                            <Option value="External">External</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Team Member Names" required {...fieldError('implementation_team_names')}>
                        <Input value={data.implementation_team_names} onChange={e => setData('implementation_team_names', e.target.value)} placeholder="Enter names separated by commas" />
                    </Form.Item>
                    <Form.Item label="Project Source" required>
                        <Select value={data.project_source} onChange={handleSourceChange}>
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
                        <Select value={data.project_activity} onChange={handleActivityChange}>
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
                                <Form.Item label="Existing System" required {...fieldError('existing_system_id')}>
                                    <Select
                                        value={data.existing_system_id}
                                        onChange={val => setData('existing_system_id', val)}
                                        placeholder="Select system"
                                    >
                                        {availableSystems.map(sys => <Option key={sys.id} value={sys.id}>{sys.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            ) : (
                                <>
                                    <Form.Item label="New System Name" required {...fieldError('custom_system_name')}>
                                        <Input ref={systemNameInput} value={data.custom_system_name} onChange={e => setData('custom_system_name', e.target.value)} />
                                    </Form.Item>
                                    {matchingSystem && (
                                        <Alert
                                            className="mb-4"
                                            type="warning"
                                            showIcon
                                            message={`"${matchingSystem.name}" already exists.`}
                                            description={
                                                <Space direction="vertical" size="small">
                                                    <span>Choose the existing system for a review/enhancement project, or rename this new system to avoid duplicates.</span>
                                                    <Space wrap>
                                                        <Button size="small" type="primary" onClick={useExistingSystem}>Use existing system</Button>
                                                        <Button size="small" onClick={() => systemNameInput.current?.focus()}>Rename new system</Button>
                                                    </Space>
                                                </Space>
                                            }
                                        />
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {data.project_source === 'Infrastructure Development' && (
                        <>
                            {isExistingRequired() ? (
                                <Form.Item label="Existing Infrastructure" required {...fieldError('existing_infrastructure_id')}>
                                    <Select
                                        value={data.existing_infrastructure_id}
                                        onChange={val => setData('existing_infrastructure_id', val)}
                                        placeholder="Select infrastructure"
                                    >
                                        {availableInfrastructure.map(inf => <Option key={inf.id} value={inf.id}>{inf.name}</Option>)}
                                    </Select>
                                </Form.Item>
                            ) : (
                                <Form.Item label="New Infrastructure Name" required {...fieldError('custom_infrastructure_name')}>
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
        </PortalLayout>
    );
}
