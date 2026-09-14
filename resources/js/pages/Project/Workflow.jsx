import React, { useMemo, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select, Space, Steps, Table, Tag, Typography, Upload, message } from 'antd';
import { CheckCircleOutlined, CloudUploadOutlined, DownloadOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import PortalLayout from '@/Layouts/PortalLayout';

const documentsByPhase = {
    Initiation: ['Approved Concept Note', 'e-Government Authority Letter'],
    Planning: ['Project Proposal', 'Project Charter', 'BRD', 'SRS', 'SDD', 'Risk Management Plan', 'Change Management Plan', 'QA Management Plan', 'Procurement Management Plan'],
    Execution: ['FAT Report', 'UAT Report', 'Stakeholder Form', 'Installation Plan'],
    Closure: ['System Implementation Form', 'User Manual', 'Data Migration Report', 'Integration Report', 'Training Report', 'Final Report', 'Post Go-Live Tracker', 'Updated SRS Document', 'Updated SDD Document'],
};

const statusColor = { Approved: 'green', Returned: 'red', 'Pending Review': 'gold', Pending: 'gold', Ongoing: 'blue', Completed: 'green', 'Not Started': 'default' };

async function xsrfHeaders() {
    try {
        await fetch('/sanctum/csrf-cookie', { credentials: 'same-origin' });
    } catch {
        // CSRF cookie refresh is best-effort; POST/PATCH/DELETE will surface errors.
    }
    const token = decodeURIComponent(
        (document.cookie.match(/(?:^|; )XSRF-TOKEN=([^;]*)/) || [])[1] || '',
    );

    return token ? { 'X-XSRF-TOKEN': token } : {};
}

async function request(path, method = 'POST', body) {
    const headers = body instanceof FormData ? { Accept: 'application/json' } : { Accept: 'application/json', 'Content-Type': 'application/json' };
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        Object.assign(headers, await xsrfHeaders());
    }
    const response = await fetch(`/api${path}`, {
        method,
        credentials: 'same-origin',
        headers,
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : undefined,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || 'The action could not be completed.');
    return payload;
}

function refresh(success) {
    message.success(success);
    router.reload({ only: ['project'] });
}

function DocumentPanel({ project, phase, role, perms = {} }) {
    const phaseDocuments = documentsByPhase[phase] || [];
    const [type, setType] = useState(phaseDocuments[0]);
    const documents = project.documents || [];
    const canReview = perms.can_review_documents ?? role === 'supervisor';
    const canUpload = phase === 'Initiation'
        ? (perms.can_upload_initiation ?? role === 'supervisor')
        : (perms.can_upload_other ?? ['analyst', 'supervisor'].includes(role));
    const upload = async ({ file, onSuccess, onError }) => {
        try {
            const data = new FormData();
            data.append('document_type', type);
            data.append('phase', phase);
            data.append('file', file);
            await request(`/projects/${project.id}/documents`, 'POST', data);
            onSuccess?.();
            refresh('Document uploaded for review.');
        } catch (error) {
            message.error(error.message);
            onError?.(error);
        }
    };
    const review = async (document, status) => {
        const comments = status === 'Returned' ? window.prompt('Enter comments for the analyst:') : '';
        if (status === 'Returned' && !comments) return message.warning('Comments are required when returning a document.');
        try {
            await request(`/documents/${document.id}/review`, 'PATCH', { status, reviewer_comments: comments });
            refresh(`Document ${status.toLowerCase()}.`);
        } catch (error) { message.error(error.message); }
    };

    return <Card className="mt-4" title={`${phase} documents`} extra={canUpload && phaseDocuments.length > 0 ? <Space><Select value={type} onChange={setType} options={phaseDocuments.map((value) => ({ value, label: value }))} style={{ minWidth: 220 }} /><Upload customRequest={upload} showUploadList={false} accept=".pdf,.doc,.docx,.xls,.xlsx"><Button icon={<CloudUploadOutlined />}>Upload</Button></Upload></Space> : <Tag>View only</Tag>}>
        <Table size="small" rowKey="id" pagination={false} dataSource={documents.filter((document) => document.phase === phase)} locale={{ emptyText: 'No documents uploaded yet.' }} columns={[
            { title: 'Document', dataIndex: 'document_type' },
            { title: 'File', dataIndex: 'original_filename' },
            { title: 'Download', render: (_, document) => <Button size="small" href={`/api/documents/${document.id}/download`}>Download</Button> },
            { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> },
            { title: 'Comments', dataIndex: 'reviewer_comments', render: (value) => value || '—' },
            ...(canReview ? [{ title: 'Review', render: (_, document) => document.status === 'Pending Review' ? <Space><Button size="small" type="primary" onClick={() => review(document, 'Approved')}>Approve</Button><Button size="small" danger onClick={() => review(document, 'Returned')}>Return</Button></Space> : '—' }] : []),
        ]} />
    </Card>;
}

function AddActivity({ project }) {
    const [form] = Form.useForm();
    const submit = async (values) => {
        try {
            await request(`/projects/${project.id}/activities`, 'POST', {
                ...values,
                planned_start_date: values.planned_start_date.format('YYYY-MM-DD'),
                planned_end_date: values.planned_end_date.format('YYYY-MM-DD'),
            });
            form.resetFields();
            refresh('Activity added to the implementation plan.');
        } catch (error) { message.error(error.message); }
    };
    return <Card title="Add implementation activity"><Form form={form} layout="vertical" onFinish={submit}><Row gutter={12}><Col xs={24} md={7}><Form.Item name="activity_name" label="Activity" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={24} md={5}><Form.Item name="expected_deliverable" label="Deliverable"><Input /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="planned_start_date" label="Planned start" rules={[{ required: true }]}><DatePicker className="w-full" /></Form.Item></Col><Col xs={12} md={4}><Form.Item name="planned_end_date" label="Planned end" rules={[{ required: true }]}><DatePicker className="w-full" /></Form.Item></Col><Col xs={24} md={4}><Form.Item name="responsible_person" label="Responsible"><Input /></Form.Item></Col></Row><Button htmlType="submit" type="primary" icon={<PlusOutlined />}>Add activity</Button></Form></Card>;
}

function AddRequirement({ project }) {
    const [form] = Form.useForm();
    const submit = async (values) => {
        try {
            await request(`/projects/${project.id}/requirements`, 'POST', {
                ...values,
                planned_start_date: values.planned_start_date.format('YYYY-MM-DD'),
                planned_end_date: values.planned_end_date.format('YYYY-MM-DD'),
            });
            form.resetFields();
            refresh('Requirement added to the traceability matrix.');
        } catch (error) { message.error(error.message); }
    };
    return <Card title="Add requirement from SRS"><Form form={form} layout="vertical" onFinish={submit}><Row gutter={12}><Col xs={24} md={12}><Form.Item name="requirement_description" label="Requirement" rules={[{ required: true }]}><Input.TextArea rows={1} /></Form.Item></Col><Col xs={12} md={5}><Form.Item name="planned_start_date" label="Planned start" rules={[{ required: true }]}><DatePicker className="w-full" /></Form.Item></Col><Col xs={12} md={5}><Form.Item name="planned_end_date" label="Planned end" rules={[{ required: true }]}><DatePicker className="w-full" /></Form.Item></Col></Row><Button htmlType="submit" type="primary" icon={<PlusOutlined />}>Add requirement</Button></Form></Card>;
}

function Activities({ project, role, perms = {} }) {
    const save = async (activity, dates) => {
        try {
            await request(`/activities/${activity.id}/progress`, 'POST', dates);
            refresh('Activity progress saved.');
        } catch (error) { message.error(error.message); }
    };
    const canUpdate = perms.can_update_progress ?? role === 'analyst';
    const canEditPlan = (perms.can_plan ?? role === 'analyst') && project.phase === 'Planning';
    const columns = [
        { title: 'Activity', dataIndex: 'activity_name' }, { title: 'Deliverable', dataIndex: 'expected_deliverable' },
        { title: 'Plan', render: (_, row) => `${row.planned_start_date} – ${row.planned_end_date}` },
        { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> },
        ...(canUpdate ? [{ title: 'Update progress', render: (_, row) => <ActivityUpdate activity={row} onSave={save} /> }] : []),
        ...(canEditPlan ? [{ title: 'Plan action', render: (_, row) => <PlanActivityActions activity={row} /> }] : []),
    ];
    return <Card className="mt-4" title="Implementation activities"><Table rowKey="id" size="small" dataSource={project.activities || []} columns={columns} pagination={false} /></Card>;
}

function PlanActivityActions({ activity }) {
    const rename = async () => {
        const activity_name = window.prompt('Activity name:', activity.activity_name);
        if (!activity_name || activity_name === activity.activity_name) return;
        try { await request(`/activities/${activity.id}`, 'PATCH', { activity_name }); refresh('Implementation plan updated; Supervisor review is required again.'); } catch (error) { message.error(error.message); }
    };
    const remove = async () => {
        if (!window.confirm(`Remove “${activity.activity_name}”?`)) return;
        try { await request(`/activities/${activity.id}`, 'DELETE'); refresh('Activity removed; Supervisor review is required again.'); } catch (error) { message.error(error.message); }
    };
    return <Space><Button size="small" onClick={rename}>Edit</Button><Button size="small" danger onClick={remove}>Delete</Button></Space>;
}

function ActivityUpdate({ activity, onSave }) {
    const [start, setStart] = useState(activity.actual_start_date ? dayjs(activity.actual_start_date) : null);
    const [end, setEnd] = useState(activity.actual_end_date ? dayjs(activity.actual_end_date) : null);
    const [remarks, setRemarks] = useState(activity.remarks || '');
    return <Space wrap><DatePicker placeholder="Actual start" value={start} onChange={setStart} /><DatePicker placeholder="Actual end" value={end} onChange={setEnd} /><Input placeholder="Remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} style={{ width: 150 }} /><Button size="small" onClick={() => onSave(activity, { actual_start_date: start?.format('YYYY-MM-DD'), actual_end_date: end?.format('YYYY-MM-DD'), remarks })}>Save</Button></Space>;
}

function Requirements({ project, role, perms = {} }) {
    const save = async (requirement, values) => {
        try { await request(`/requirements/${requirement.id}/update`, 'POST', values); refresh('Requirement updated.'); } catch (error) { message.error(error.message); }
    };
    const canUpdate = perms.can_update_progress ?? role === 'analyst';
    const canReviewReq = perms.can_review_requirements ?? role === 'supervisor';
    const columns = [
        { title: 'Requirement', dataIndex: 'requirement_description' }, { title: 'Plan', render: (_, row) => `${row.planned_start_date} – ${row.planned_end_date}` },
        { title: 'Implementation', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> }, { title: 'Supervisor review', dataIndex: 'review_status', render: (value) => <Tag color={statusColor[value]}>{value || 'Pending Review'}</Tag> }, { title: 'UAT', dataIndex: 'test_score', render: (value) => value || 'Not recorded' },
        ...(canUpdate ? [{ title: 'Update', render: (_, row) => <RequirementUpdate requirement={row} onSave={save} /> }] : []),
        ...(canReviewReq ? [{ title: 'Review', render: (_, row) => <RequirementReview requirement={row} /> }] : []),
    ];
    return <Card className="mt-4" title="Requirements traceability matrix"><Table rowKey="id" size="small" dataSource={project.requirements || []} columns={columns} pagination={false} /></Card>;
}

function RequirementReview({ requirement }) {
    const review = async (status) => {
        const review_comments = status === 'Returned' ? window.prompt('Enter comments for the analyst:') : '';
        if (status === 'Returned' && !review_comments) return message.warning('Comments are required when returning a requirement.');
        try { await request(`/requirements/${requirement.id}/review`, 'PATCH', { status, review_comments }); refresh(`Requirement ${status.toLowerCase()}.`); } catch (error) { message.error(error.message); }
    };
    if (requirement.review_status === 'Approved') return 'Approved';
    return <Space><Button size="small" type="primary" onClick={() => review('Approved')}>Approve</Button><Button size="small" danger onClick={() => review('Returned')}>Return</Button></Space>;
}

function RequirementUpdate({ requirement, onSave }) {
    const [start, setStart] = useState(requirement.actual_start_date ? dayjs(requirement.actual_start_date) : null);
    const [end, setEnd] = useState(requirement.actual_end_date ? dayjs(requirement.actual_end_date) : null);
    const [score, setScore] = useState(requirement.test_score || null);
    return <Space wrap><DatePicker placeholder="Actual start" value={start} onChange={setStart} /><DatePicker placeholder="Actual end" value={end} onChange={setEnd} /><Select allowClear placeholder="UAT" value={score} onChange={setScore} options={['Pass', 'Fail'].map((value) => ({ value, label: value }))} style={{ width: 90 }} /><Button size="small" onClick={() => onSave(requirement, { actual_start_date: start?.format('YYYY-MM-DD'), actual_end_date: end?.format('YYYY-MM-DD'), test_score: score })}>Save</Button></Space>;
}

function ProjectDetails({ project, canViewFinancials }) {
    const items = [
        { label: 'Status', value: project.status || 'Not Started' },
        { label: 'Phase', value: project.phase || 'Initiation' },
        { label: 'Category', value: project.project_source || '—' },
        { label: 'Nature', value: project.project_nature || '—' },
        { label: 'Activity type', value: project.project_activity || '—' },
        { label: 'Supervisor', value: project.supervisor?.name || 'Not assigned' },
        { label: 'Analyst', value: project.analyst?.name || 'Not assigned' },
        { label: 'Implementation progress', value: `${project.overall_implementation ?? 0}%` },
    ];
    if (canViewFinancials) items.push({ label: 'Budget', value: project.budget ?? '—' });
    return <Card className="mt-4" title="Project details"><Typography.Paragraph type="secondary">{project.description || 'No project description was provided during registration.'}</Typography.Paragraph><Row gutter={[16, 12]}>{items.map((item) => <Col xs={12} md={6} key={item.label}><Typography.Text type="secondary">{item.label}</Typography.Text><br /><strong>{item.value}</strong></Col>)}</Row></Card>;
}

function Assignment({ project, analysts }) {
    const [analyst, setAnalyst] = useState(project.assigned_analyst_id || null);
    const assign = async () => {
        if (!analyst) return message.warning('Select an Analyst first.');
        try { await request(`/projects/${project.id}/assign-analyst`, 'POST', { assigned_analyst_id: analyst }); refresh('Project assigned to Analyst.'); } catch (error) { message.error(error.message); }
    };
    return <Card className="mt-4" title="Supervisor task: assign Analyst"><Space wrap><Select value={analyst} onChange={setAnalyst} placeholder="Select Analyst" options={analysts.map((user) => ({ value: user.id, label: `${user.name} (${user.email})` }))} style={{ minWidth: 260 }} /><Button type="primary" onClick={assign}>Assign / re-assign</Button></Space></Card>;
}

function ChangeRequestForm({ project }) {
    const [form] = Form.useForm();
    const submit = async (values) => {
        try { await request(`/projects/${project.id}/change-requests`, 'POST', values); form.resetFields(); refresh('Change request submitted.'); } catch (error) { message.error(error.message); }
    };
    return <Card className="mt-4" title="Analyst task: record approved project change"><Form form={form} layout="vertical" onFinish={submit}><Row gutter={12}><Col xs={24} md={8}><Form.Item name="title" label="Change title" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={24} md={6}><Form.Item name="impact_level" label="Impact"><Select options={['Low', 'Medium', 'High'].map((value) => ({ value, label: value }))} /></Form.Item></Col><Col xs={24} md={10}><Form.Item name="description" label="Description" rules={[{ required: true }]}><Input /></Form.Item></Col></Row><Button htmlType="submit">Submit change</Button></Form></Card>;
}

function ChangeRequests({ project, role, perms = {} }) {
    const decide = async (change, status) => {
        const approval_comments = status === 'Rejected' ? window.prompt('Enter rejection comments:') : '';
        if (status === 'Rejected' && !approval_comments) return message.warning('Comments are required when rejecting a change.');
        try { await request(`/change-requests/${change.id}/${status.toLowerCase()}`, 'POST', { approval_comments }); refresh(`Change request ${status.toLowerCase()}.`); } catch (error) { message.error(error.message); }
    };
    return <Card className="mt-4" title="Approved changes register"><Table size="small" rowKey="id" pagination={false} dataSource={project.change_requests || project.changeRequests || []} locale={{ emptyText: 'No change requests recorded.' }} columns={[{ title: 'Title', dataIndex: 'title' }, { title: 'Impact', dataIndex: 'impact_level' }, { title: 'Status', dataIndex: 'status', render: (value) => <Tag color={statusColor[value]}>{value}</Tag> }, { title: 'Decision comments', dataIndex: 'approval_comments', render: (value) => value || '—' }, ...((perms.can_decide_change ?? role === 'supervisor') ? [{ title: 'Decision', render: (_, row) => row.status === 'Pending' ? <Space><Button size="small" type="primary" onClick={() => decide(row, 'Approved')}>Approve</Button><Button size="small" danger onClick={() => decide(row, 'Rejected')}>Reject</Button></Space> : '—' }] : [])]} /></Card>;
}

function LessonsPanel({ project, role, perms = {} }) {
    const [form] = Form.useForm();
    const submit = async (values) => {
        try { await request(`/projects/${project.id}/lessons-learned`, 'POST', values); form.resetFields(); refresh('Lesson learned saved.'); } catch (error) { message.error(error.message); }
    };
    const review = async (lesson, status) => {
        const review_comments = status === 'Returned' ? window.prompt('Enter review comments:') : '';
        try { await request(`/lessons-learned/${lesson.id}/review`, 'PATCH', { status, review_comments }); refresh(`Lesson ${status.toLowerCase()}.`); } catch (error) { message.error(error.message); }
    };
    const submitForReview = async (lesson) => {
        try { await request(`/lessons-learned/${lesson.id}/submit`); refresh('Lesson submitted to Supervisor.'); } catch (error) { message.error(error.message); }
    };
    const canLesson = perms.can_lesson ?? role === 'analyst';
    const canReviewLesson = perms.can_review_lesson ?? role === 'supervisor';
    return <Card className="mt-4" title="Lessons learned"><>{canLesson && <Form form={form} layout="vertical" onFinish={submit}><Row gutter={12}><Col xs={24} md={6}><Form.Item name="category" label="Category" rules={[{ required: true }]}><Input placeholder="e.g. Planning" /></Form.Item></Col><Col xs={24} md={9}><Form.Item name="lesson_description" label="Lesson" rules={[{ required: true }]}><Input /></Form.Item></Col><Col xs={24} md={9}><Form.Item name="recommendations" label="Recommendation"><Input /></Form.Item></Col></Row><Button htmlType="submit">Save lesson</Button></Form>}<Table className="mt-4" size="small" rowKey="id" pagination={false} dataSource={project.lessons_learned || project.lessonsLearned || []} columns={[{ title: 'Category', dataIndex: 'category' }, { title: 'Lesson', dataIndex: 'lesson_description' }, { title: 'Status', dataIndex: 'status' }, ...(canLesson ? [{ title: 'Submit', render: (_, row) => row.status === 'Draft' || row.status === 'Returned' ? <Button size="small" onClick={() => submitForReview(row)}>Submit review</Button> : '—' }] : []), ...(canReviewLesson ? [{ title: 'Review', render: (_, row) => row.status === 'Submitted' ? <Space><Button size="small" onClick={() => review(row, 'Approved')}>Approve</Button><Button size="small" danger onClick={() => review(row, 'Returned')}>Return</Button></Space> : '—' }] : [])]} /></></Card>;
}

function AttestationPanel({ project, role, perms = {} }) {
    const [managerRole, setManagerRole] = useState('SDMM');
    const canAttestManager = perms.can_attest_manager ?? role === 'manager';
    const canAttestDict = perms.can_attest_dict ?? role === 'dict';
    const attest = async () => {
        const path = canAttestManager ? `/projects/${project.id}/attest-manager` : `/projects/${project.id}/attest-dict`;
        const body = canAttestManager ? { attestation_role: managerRole } : {};
        try { await request(path, 'POST', body); refresh('Attestation recorded.'); } catch (error) { message.error(error.message); }
    };
    if (!canAttestManager && !canAttestDict) return null;
    return <Card className="mt-4" title={canAttestManager ? 'Manager task: attest project details' : 'DICT task: attest Manager-approved details'}><Space wrap>{canAttestManager && <Select value={managerRole} onChange={setManagerRole} options={['SDMM', 'IDMM'].map((value) => ({ value, label: value }))} style={{ width: 120 }} />}<Button type="primary" onClick={attest}>Attest</Button><Typography.Text type="secondary">Manager: {project.manager_attested ? 'attested' : 'pending'} · DICT: {project.dict_attested ? 'attested' : 'pending'}</Typography.Text></Space></Card>;
}

export default function Workflow({ project, analysts = [] }) {
    const role = usePage().props.auth?.user?.role;
    const phase = project?.phase || 'Initiation';
    const perms = project?.permissions || {};
    const can = (key, fallbackRoles = []) => perms[key] ?? fallbackRoles.includes(role);
    const current = ['Initiation', 'Planning', 'Execution', 'Closure'].indexOf(phase);
    const action = async (path, label, body) => {
        try { await request(path, 'POST', body); refresh(label); } catch (error) { message.error(error.message); }
    };
    const buttons = useMemo(() => {
        if (phase === 'Initiation' && can('can_transition', ['supervisor'])) return <Button type="primary" icon={<SendOutlined />} onClick={() => action(`/projects/${project.id}/transition-to-planning`, 'Project moved to Planning.')}>Move to planning</Button>;
        if (phase === 'Planning' && can('can_transition', ['supervisor'])) return <Space><Button onClick={() => action(`/projects/${project.id}/activities/plan/review`, 'Implementation plan approved.', { status: 'Approved' })}>Approve plan</Button><Button type="primary" icon={<SendOutlined />} onClick={() => action(`/projects/${project.id}/transition-to-execution`, 'Project moved to Execution.')}>Move to execution</Button></Space>;
        if (phase === 'Execution' && can('can_transition', ['supervisor'])) return <Button type="primary" icon={<SendOutlined />} onClick={() => action(`/projects/${project.id}/transition-to-closure`, 'Project moved to Closure.')}>Move to closure</Button>;
        if (phase === 'Closure' && can('can_close', ['supervisor'])) return <Button type="primary" icon={<CheckCircleOutlined />} onClick={() => action(`/projects/${project.id}/close`, 'Project closed successfully.')}>Close project</Button>;
        return null;
    }, [phase, project?.id]);

    if (!project) {
        return <PortalLayout activeKey="dashboard"><Alert type="warning" showIcon message="Project data is unavailable. Return to the dashboard and reopen the workflow." /></PortalLayout>;
    }

    return <PortalLayout activeKey="dashboard"><div className="page-heading"><div><Typography.Text className="eyebrow">PROJECT MANAGEMENT</Typography.Text><Typography.Title level={1}>{project.name}</Typography.Title><Typography.Paragraph type="secondary">Project #{project.id} · {project.project_source} · {project.project_activity}</Typography.Paragraph></div><Space><Tag color={project.status === 'Completed' ? 'green' : 'blue'}>{project.status}</Tag>{buttons}</Space></div><Card><Steps current={current} items={['Initiation', 'Planning', 'Execution', 'Closure'].map((title, index) => ({ title, status: index < current ? 'finish' : index === current ? 'process' : 'wait' }))} /></Card>
        <ProjectDetails project={project} canViewFinancials={can('can_view_financials', ['supervisor', 'manager', 'dict', 'admin'])} />
        {phase === 'Initiation' && can('can_assign', ['supervisor']) && <Assignment project={project} analysts={analysts} />}
        {phase === 'Planning' && can('can_plan', ['analyst']) && <AddActivity project={project} />} {phase === 'Planning' && <Activities project={project} role={role} perms={perms} />}
        {phase === 'Execution' && can('can_change', ['analyst']) && <AddRequirement project={project} />} {phase === 'Execution' && <><Activities project={project} role={role} perms={perms} /><Requirements project={project} role={role} perms={perms} />{can('can_change', ['analyst']) && <ChangeRequestForm project={project} />}<ChangeRequests project={project} role={role} perms={perms} /></>}
        {phase === 'Closure' && <><Requirements project={project} role={role} perms={perms} /><LessonsPanel project={project} role={role} perms={perms} /></>}
        <DocumentPanel project={project} phase={phase} role={role} perms={perms} />
        <AttestationPanel project={project} role={role} perms={perms} />
        {(phase === 'Closure' || can('can_view_financials', ['supervisor', 'manager', 'dict', 'admin'])) && <Card className="mt-4"><Button icon={<DownloadOutlined />} href={`/api/projects/${project.id}/report`}>Download project data</Button></Card>}
        <Alert className="mt-4" type="info" showIcon message="Every button on this page saves to the project database. Phase changes are still protected by the required document, approval, activity, and UAT checks." />
    </PortalLayout>;
}
