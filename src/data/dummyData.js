export const branches = [
    {
        id: 'IT',
        name: 'Information Technology',
        shortName: 'IT',
        description: 'OS, DBMS, Web Tech, and Networking resources.',
        resourceCount: '1,240+',
        tag: 'Tech',
        color: 'blue',
        bgColor: 'bg-blue-600',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeXhp8OlP3H1Q6nKfVfP1CDqpDjqf5pA5Jn4cVF71KJxWITlCKlIxnrN-OCj4Rvp69iBB2mxuZaFoOKLJY2akH8aa5YA_nNC0zjxIs4O7Me1g886PNuXamXCRd0yvLljDZ3v8D3tussIL0TWUQdRCJ1yZGdc4pciaHXN7tazCeQgHUfQXLHrFx-Lv7Sz7RSCHLVVe2Jc8hD00XIxuOwMWyfxbngBHR7mCoA_zE1otk5AlSYo8krdvpNgwFhzkzWkf6_xArwtC9hOc',
    },
    {
        id: 'CE',
        name: 'Computer Engineering',
        shortName: 'CE',
        description: 'Algorithms, Architecture, and Hardware design.',
        resourceCount: '2,100+',
        tag: 'Systems',
        color: 'slate',
        bgColor: 'bg-slate-800',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRUF7lJ3xmfqxaJae9ueM0FQLD27q5qzcScFdDzyTnOcb-VSrhj3HhwSyS2_TKSAawmh_4ueX5Iz6iHOcXompGnTMjDF7J05_5rQ5aD-zidTbKd2OJ-GCu0ofWVWVN6hsjm-82xDFP18PLwQN-emS3CR1pw5cyPezkMrpkchun27sWz27_j88-j9BjYsrv8GOYXccZGwKAhbCDwM5baoy5mj93anZVBIctbHj44hJVAg95XghwHnnBnsAMM2C7xPaBNuUban7TWPw',
    },
    {
        id: 'CSE',
        name: 'CSE (Cloud & CS)',
        shortName: 'CSE',
        description: 'Specialized materials for Cloud, AI, and Cybersecurity.',
        resourceCount: '850+',
        tag: 'Science',
        color: 'indigo',
        bgColor: 'bg-indigo-700',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG2eDdjUgE_y9Kvp-ZSEyC94ncQ-0a0JIE5_t6BbadkwlhFbM2NxWuXg7eedrOGXCKak0WR8c2-icBMjZvi1CJTVsdUjxHjCPX0pu425OL_4lAyyrliTXGCHQbR5ff_yRBR5pxVh7DB4JDWLlLtdqqHYFk6VVkUr4UzL7rbpvIdK4qOwFNax3kdae8gPs1WFZyYI-3mPuaWsmDVWvQQRXqoQvrF3ZYze4-fRsKRLJCGwHOunOvoCIwGQAW6nJTnf_-zGm1558fvg0',
    },
];

export const semesters = [
    { id: 1, label: 'Semester I', shortLabel: 'Sem 1', phase: 'foundation', description: 'Basic Mathematics, Physics, and Civil Engineering basics.', courses: 6 },
    { id: 2, label: 'Semester II', shortLabel: 'Sem 2', phase: 'foundation', description: 'Communication Skills, Programming in C, and Applied Sciences.', courses: 7 },
    { id: 3, label: 'Semester III', shortLabel: 'Sem 3', phase: 'foundation', description: 'Data Structures, Digital Electronics, and Database Systems.', courses: 6 },
    { id: 4, label: 'Semester IV', shortLabel: 'Sem 4', phase: 'foundation', description: 'OS, Discrete Mathematics, and Computer Networks.', courses: 6 },
    { id: 5, label: 'Semester V', shortLabel: 'Sem 5', phase: 'specialization', description: 'Software Engineering, Cyber Security, and Cloud Computing.', courses: 5 },
    { id: 6, label: 'Semester VI', shortLabel: 'Sem 6', phase: 'specialization', description: 'Web Tech, Dot Net, and Professional Elective I.', courses: 5 },
    { id: 7, label: 'Semester VII', shortLabel: 'Sem 7', phase: 'specialization', description: 'Mobile Computing, Information Security, and Project phase I.', courses: 4 },
    { id: 8, label: 'Semester VIII', shortLabel: 'Sem 8', phase: 'specialization', description: 'Cyber Laws, Industrial Internship, and Final Project Thesis.', courses: 3 },
];

export const subjectsBySemester = {
    1: [
        { id: 'math1', name: 'Engineering Mathematics I', icon: 'calculate', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'physics', name: 'Applied Physics', icon: 'science', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'civil', name: 'Elements of Civil Engineering', icon: 'engineering', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'eme', name: 'Elements of Mechanical Engineering', icon: 'precision_manufacturing', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    2: [
        { id: 'math2', name: 'Engineering Mathematics II', icon: 'functions', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'cprog', name: 'Programming in C', icon: 'code', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'comm', name: 'Communication Skills', icon: 'record_voice_over', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'eee', name: 'Environmental Engineering', icon: 'eco', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    3: [
        { id: 'ds', name: 'Data Structures', icon: 'account_tree', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'dbms', name: 'Database Management Systems', icon: 'database', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'dld', name: 'Digital Logic Design', icon: 'memory', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'oop', name: 'Object Oriented Programming', icon: 'data_object', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    4: [
        { id: 'os', name: 'Operating Systems', icon: 'terminal', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'cn', name: 'Computer Networks', icon: 'lan', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'dm', name: 'Discrete Mathematics', icon: 'functions', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'aad', name: 'Analysis & Design of Algorithms', icon: 'analytics', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    5: [
        { id: 'se', name: 'Software Engineering', icon: 'bug_report', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'webtech', name: 'Web Technology', icon: 'language', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'dotnet', name: '.NET Technology', icon: 'code_blocks', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'aj', name: 'Advanced Java', icon: 'coffee', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    6: [
        { id: 'ai', name: 'Artificial Intelligence', icon: 'psychology', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'ns', name: 'Network Security', icon: 'shield', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'mad', name: 'Mobile Application Dev', icon: 'smartphone', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'cc', name: 'Cloud Computing', icon: 'cloud', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    7: [
        { id: 'iot', name: 'Internet of Things', icon: 'sensors', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'bd', name: 'Big Data Analytics', icon: 'bar_chart', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'is', name: 'Information Security', icon: 'security', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
        { id: 'mp1', name: 'Major Project Phase I', icon: 'science', iconBg: 'bg-error-container', iconColor: 'text-error' },
    ],
    8: [
        { id: 'cl', name: 'Cyber Laws & Ethics', icon: 'gavel', iconBg: 'bg-primary-fixed', iconColor: 'text-primary' },
        { id: 'intern', name: 'Industrial Internship', icon: 'work', iconBg: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
        { id: 'mp2', name: 'Major Project Phase II', icon: 'school', iconBg: 'bg-secondary-fixed', iconColor: 'text-secondary' },
    ],
};

export const materialCategories = [
    { id: 'syllabus', name: 'Syllabus', icon: 'list_alt', description: 'Detailed module-wise breakdown of topics.', iconBg: 'bg-primary-container/10', iconColor: 'text-primary' },
    { id: 'papers', name: 'Previous Year Papers', icon: 'history_edu', description: 'Access question papers from 2018-2024.', iconBg: 'bg-surface-container-highest', iconColor: 'text-on-surface' },
    { id: 'notes', name: 'Class Notes', icon: 'menu_book', description: 'Curated handwritten and digital notes.', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary' },
    { id: 'playlists', name: 'YouTube Playlists', icon: 'play_circle', description: 'Handpicked video lectures from top educators.', iconBg: 'bg-error/10', iconColor: 'text-error' },
    { id: 'solutions', name: 'Paper Solutions', icon: 'fact_check', description: 'Step-by-step verified solutions.', iconBg: 'bg-primary', iconColor: 'text-white' },
    { id: 'books', name: 'Recommended Books', icon: 'auto_stories', description: 'Top textbooks for the subject.', iconBg: 'bg-secondary-container', iconColor: 'text-primary' },
];

export const materialsByCategory = {
    syllabus: [
        { id: 1, title: 'Complete Syllabus 2024', type: 'PDF', size: '1.2 MB' },
        { id: 2, title: 'Module-wise Topic List', type: 'PDF', size: '0.8 MB' },
        { id: 3, title: 'Exam Pattern Overview', type: 'PDF', size: '0.5 MB' },
    ],
    papers: [
        { id: 4, title: 'Winter 2023 Question Paper', type: 'PDF', size: '2.4 MB' },
        { id: 5, title: 'Summer 2023 Question Paper', type: 'PDF', size: '2.1 MB' },
        { id: 6, title: 'Winter 2022 Question Paper', type: 'PDF', size: '1.9 MB' },
        { id: 7, title: 'Summer 2022 Question Paper', type: 'PDF', size: '2.3 MB' },
    ],
    notes: [
        { id: 8, title: 'Unit 1: Introduction & Basics', type: 'PDF', size: '3.1 MB' },
        { id: 9, title: 'Unit 2: Core Concepts', type: 'PDF', size: '4.5 MB' },
        { id: 10, title: 'Unit 3: Advanced Topics', type: 'PDF', size: '5.2 MB' },
        { id: 11, title: 'Complete Handwritten Notes', type: 'PDF', size: '12 MB' },
    ],
    playlists: [
        { id: 12, title: 'MIT OpenCourseWare Series', type: 'Link', url: 'https://youtube.com' },
        { id: 13, title: "Abdul Bari's Complete Lectures", type: 'Link', url: 'https://youtube.com' },
        { id: 14, title: "Striver's A2Z Sheet Playlist", type: 'Link', url: 'https://youtube.com' },
    ],
    solutions: [
        { id: 15, title: 'Winter 2023 Solutions', type: 'PDF', size: '3.8 MB' },
        { id: 16, title: 'Summer 2023 Solutions', type: 'PDF', size: '3.5 MB' },
        { id: 17, title: 'Winter 2022 Solutions', type: 'PDF', size: '3.2 MB' },
    ],
    books: [
        { id: 18, title: 'Introduction to Algorithms (CLRS)', type: 'Link', url: 'https://example.com' },
        { id: 19, title: 'Data Structures using C++ – Robert Sedgewick', type: 'Link', url: 'https://example.com' },
        { id: 20, title: 'Computer Networking: A Top-Down Approach', type: 'Link', url: 'https://example.com' },
    ],
};

export const features = [
    { icon: 'cloud_download', title: 'Free Access', description: 'Unlimited access to all resources. No paywalls, no hidden fees. Just pure education for everyone.', bgColor: 'bg-blue-100', iconColor: 'text-primary' },
    { icon: 'category', title: 'Branch-wise', description: 'Materials sorted by specific engineering departments. Find relevant content in seconds.', bgColor: 'bg-tertiary-fixed', iconColor: 'text-tertiary' },
    { icon: 'upload', title: 'Upload/Share', description: 'Contribute your notes and help fellow students grow. Community-driven platform.', bgColor: 'bg-green-100', iconColor: 'text-green-700' },
    { icon: 'verified', title: 'Verified Content', description: 'Every document is checked by top-performing students to ensure accuracy and relevance.', bgColor: 'bg-blue-50', iconColor: 'text-primary', featured: true },
];
