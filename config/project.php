<?php

return [
    'required_documents' => [
        // Note: the Initiation-phase budget document (Concept Note vs Project Proposal) is
        // added dynamically in ProjectController::requiredDocuments() based on project budget,
        // per BRD: "below 50 million → concept note, above 50 million → project proposal".
        'Initiation' => ['e-Government Authority Letter'],
        'Planning' => ['Project Proposal', 'Project Charter', 'BRD', 'SRS', 'SDD', 'Risk Management Plan', 'Change Management Plan', 'QA Management Plan', 'Procurement Management Plan'],
        'Execution' => ['FAT Report', 'UAT Report', 'Stakeholder Form', 'Installation Plan'],
        'Closure' => ['System Implementation Form', 'User Manual', 'Data Migration Report', 'Integration Report', 'Training Report', 'Final Report', 'Post Go-Live Tracker', 'Updated SRS Document', 'Updated SDD Document'],
    ],
];
