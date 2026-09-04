import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form, Input, DatePicker, Space, message } from 'antd';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import dayjs from 'dayjs';

export default function Activities({ project, activities }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        activity_name: '',
        expected_deliverable: '',
        planned_start_date: '',
        planned_end_date: '',
        responsible_person: '',
    });

    const handleAdd = () => {
        post(`/projects/${project.id}/activities`, {
            onSuccess: () => {
                message.success('Activity added');
                setIsModalVisible(false);
                resetForm();
            },
        });
    };

    const resetForm = () => {
        setData({
            activity_name: '',
            expected_deliverable: '',
            planned_start_date: '',
            planned_end_date: '',
            responsible_person: '',
        });
    };

    const columns = [
        { title: 'Activity', dataIndex: 'activity_name' },
        { title: 'Deliverable', dataIndex: 'expected_deliverable' },
        { title: 'Planned Start', dataIndex: 'planned_start_date' },
        { title: 'Planned End', dataIndex: 'planned_end_date' },
        { title: 'Actual Start', dataIndex: 'actual_start_date' },
        { title: 'Actual End', dataIndex: 'actual_end_date' },
        { title: 'Status', dataIndex: 'status' },
        { title: 'Responsible', dataIndex: 'responsible_person' },
    ];

    return (
        <AuthenticatedLayout>
            <Card title={`Activities for Project: ${project.name}`}
                  extra={<Button type="primary" onClick={() => setIsModalVisible(true)}>Add Activity</Button>}>
                <Table dataSource={activities} columns={columns} rowKey="id" />
            </Card>

            <Modal title="Add Activity" open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                <Form layout="vertical" onFinish={handleAdd}>
                    <Form.Item label="Activity Name" required>
                        <Input value={data.activity_name} onChange={e => setData('activity_name', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Expected Deliverable">
                        <Input value={data.expected_deliverable} onChange={e => setData('expected_deliverable', e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Planned Start Date" required>
                        <DatePicker
                            value={data.planned_start_date ? dayjs(data.planned_start_date) : null}
                            onChange={(date) => setData('planned_start_date', date ? date.format('YYYY-MM-DD') : '')}
                        />
                    </Form.Item>
                    <Form.Item label="Planned End Date" required>
                        <DatePicker
                            value={data.planned_end_date ? dayjs(data.planned_end_date) : null}
                            onChange={(date) => setData('planned_end_date', date ? date.format('YYYY-MM-DD') : '')}
                        />
                    </Form.Item>
                    <Form.Item label="Responsible Person">
                        <Input value={data.responsible_person} onChange={e => setData('responsible_person', e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing}>Add</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </AuthenticatedLayout>
    );
}