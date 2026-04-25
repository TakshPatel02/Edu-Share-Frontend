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

const SUBJECT_ICONS = [
    'menu_book',
    'code',
    'memory',
    'calculate',
    'science',
    'terminal',
    'school',
    'lan',
    'engineering',
    'psychology',
];

const makeSubject = (code, name, index = 0) => {
    const icon = SUBJECT_ICONS[index % SUBJECT_ICONS.length];
    const palette = index % 4;

    const iconBg =
        palette === 0
            ? 'bg-primary-fixed'
            : palette === 1
                ? 'bg-tertiary-fixed'
                : palette === 2
                    ? 'bg-secondary-fixed'
                    : 'bg-error-container';

    const iconColor =
        palette === 0
            ? 'text-primary'
            : palette === 1
                ? 'text-tertiary'
                : palette === 2
                    ? 'text-secondary'
                    : 'text-error';

    return {
        id: code.toLowerCase(),
        code,
        name,
        icon,
        iconBg,
        iconColor,
    };
};

const COMMON_SUBJECTS = {
    1: [
        ['3110002', 'English'],
        ['3110003', 'Programming for Problem Solving'],
        ['3110014', 'Mathematics I'],
        ['3110006', 'Basic Mechanical Engineering'],
        ['3110007', 'Environmental Science'],
        ['3110018', 'Physics'],
    ],
    2: [
        ['3110012', 'Workshop'],
        ['3110005', 'Basic Electrical Engineering'],
        ['3110013', 'Engineering Graphics and Design'],
        ['3110015', 'Mathematics II'],
        ['3110016', 'Basic Electronics'],
    ],
    3: [
        ['3130004', 'Effective Technical Communication'],
        ['3130006', 'Probability and Statistics'],
        ['3130007', 'Indian Constitution'],
        ['3130702', 'Data Structures'],
        ['3130703', 'Database Management Systems'],
        ['3130704', 'Digital Fundamentals'],
    ],
    4: [
        ['3140707', 'Computer Organization and Architecture'],
        ['3140708', 'Discrete Mathematics'],
        ['3140709', 'Principles of Economics and Management'],
        ['3140702', 'Operating System'],
        ['3140705', 'Object Oriented Programming'],
    ],
};

const CE_CSE_SEM_5 = [
    ['3150005', 'Integrated Personality Development Course - 1'],
    ['3150703', 'Analysis and Design of Algorithm'],
    ['3150709', 'Professional Ethics'],
    ['3150710', 'Computer Networks'],
    ['3150711', 'Software Engineering'],
    ['3150712', 'Computer Graphics'],
    ['3150713', 'Python for Data Science'],
    ['3150714', 'Cyber Security'],
];

const CE_CSE_SEM_6 = [
    ['3160003', 'Integrated Personality Development Course - 2'],
    ['3160704', 'Theory of Computation'],
    ['3160712', 'Microprocessor and Interfacing'],
    ['3160713', 'Web Programming'],
    ['3160707', 'Advanced Java Programming'],
    ['3160716', 'IoT and Applications'],
    ['3160715', 'System Software'],
];

const CE_CSE_SEM_7 = [
    ['3170007', 'Summer Internship'],
    ['3170701', 'Compiler Design'],
    ['3170716', 'Artificial Intelligence'],
    ['3170719', 'Distributed System'],
    ['3170720', 'Information Security'],
    ['3170710', 'Mobile Computing and Wireless Communication'],
    ['3170723', 'Natural Language Processing'],
    ['3170725', 'Digital Forensics'],
    ['3170726', 'Mobile Application Development'],
];

const IT_SUBJECTS = {
    ...COMMON_SUBJECTS,
    5: [
        ['3150005', 'Integrated Personality Development Course - 1'],
        ['3150703', 'Analysis and Design of Algorithm'],
        ['3150714', 'Cyber Security'],
        ['3150710', 'Computer Networks'],
        ['3151608', 'Data Science'],
        ['3150709', 'Professional Ethics'],
        ['3151606', 'Web Development'],
    ],
    6: [
        ['3160003', 'Integrated Personality Development Course - 2'],
        ['3161610', 'Data Warehousing and Mining'],
        ['3161608', 'Artificial Intelligence'],
        ['3161611', 'Advanced Web Programming'],
        ['3161605', 'Software Engineering'],
        ['3161513', 'Data Analysis and Visualizations'],
        ['3161606', 'Cryptography and Network Security'],
        ['3161612', 'Mobile Application Development'],
    ],
    7: [
        ['3170007', 'Summer Internship'],
        ['3171608', 'Wireless Communication'],
        ['3171609', 'Software Project Management'],
        ['3171610', 'Agile Development and UI/UX Design'],
        ['3171612', 'Virtual and Augmented Reality'],
        ['3171616', 'Internetwork Security and Web Analytics'],
        ['3171618', 'Blockchain'],
    ],
    8: [['3181601', 'Internship / Project']],
};

const CE_SUBJECTS = {
    ...COMMON_SUBJECTS,
    5: CE_CSE_SEM_5,
    6: CE_CSE_SEM_6,
    7: CE_CSE_SEM_7,
    8: [['3181601', 'Internship / Project']],
};

const CSE_SUBJECTS = {
    ...COMMON_SUBJECTS,
    5: CE_CSE_SEM_5,
    6: CE_CSE_SEM_6,
    7: CE_CSE_SEM_7,
    8: [['3181601', 'Internship / Project']],
};

const toDisplaySubjects = (subjectRows = []) =>
    subjectRows.map(([code, name], index) => makeSubject(code, name, index));

export const branchSemesterSubjects = {
    IT: Object.fromEntries(
        Object.entries(IT_SUBJECTS).map(([semester, rows]) => [semester, toDisplaySubjects(rows)])
    ),
    CE: Object.fromEntries(
        Object.entries(CE_SUBJECTS).map(([semester, rows]) => [semester, toDisplaySubjects(rows)])
    ),
    CSE: Object.fromEntries(
        Object.entries(CSE_SUBJECTS).map(([semester, rows]) => [semester, toDisplaySubjects(rows)])
    ),
};

export const getSubjectsForBranchSemester = (branchId, semId) => {
    const normalizedBranch = ['IT', 'CE', 'CSE'].includes(branchId) ? branchId : 'IT';
    const semesterKey = String(Number(semId));

    return branchSemesterSubjects?.[normalizedBranch]?.[semesterKey] || [];
};

export const subjectsBySemester = Object.fromEntries(
    Object.entries(COMMON_SUBJECTS).map(([semester, rows]) => [semester, toDisplaySubjects(rows)])
);

export const isInternshipSemester = (semId) => [7, 8].includes(Number(semId));

export const internshipCategories = [
    {
        id: 'companyDirectory',
        name: 'Company Directory',
        icon: 'apartment',
        description: 'Explore internship-friendly companies and roles mapped to this semester.',
        iconBg: 'bg-primary-container/10',
        iconColor: 'text-primary',
    },
    {
        id: 'projectIdeas',
        name: 'Project Ideas',
        icon: 'tips_and_updates',
        description: 'Curated practical ideas to help you build strong industry-ready projects.',
        iconBg: 'bg-secondary-container',
        iconColor: 'text-primary',
    },
    {
        id: 'internshipChecklist',
        name: 'Internship Checklist',
        icon: 'checklist',
        description: 'Preparation checklist for resume, interview, portfolio, and internship tracking.',
        iconBg: 'bg-tertiary-fixed',
        iconColor: 'text-tertiary',
    },
];

export const getCategoriesForSemester = (semId) =>
    Number(semId) === 8 ? internshipCategories : materialCategories;

export const internshipCompanyDirectory = [
    {
        name: 'Tata Consultancy Services (TCS)',
        focus: 'Software Development, QA, Data Engineering',
        mode: 'Onsite/Hybrid',
    },
    {
        name: 'Infosys',
        focus: 'Full Stack, Testing, Cloud Support',
        mode: 'Onsite/Remote (team based)',
    },
    {
        name: 'Wipro',
        focus: 'Cyber Security, Infra, Application Support',
        mode: 'Hybrid',
    },
    {
        name: 'Cognizant',
        focus: 'Java, .NET, Data & Analytics',
        mode: 'Onsite/Hybrid',
    },
    {
        name: 'Capgemini',
        focus: 'Cloud, DevOps, Backend Engineering',
        mode: 'Hybrid',
    },
    {
        name: 'LTIMindtree',
        focus: 'Web Platforms, Enterprise Apps',
        mode: 'Onsite',
    },
];

export const internshipChecklist = [
    'Finalize resume with latest project links and role-focused summary.',
    'Prepare branch-specific top 20 interview questions and answers.',
    'Build one deployable mini-project and one major project overview.',
    'Create GitHub README documentation for all key projects.',
    'Track company deadlines, assignment links, and HR contacts.',
    'Practice mock interviews and aptitude tests weekly.',
];

export const projectIdeasByBranch = {
    IT: [
        'AI-driven study planner with notes summarization and revision reminders.',
        'Secure file-sharing portal with role-based access and audit logs.',
        'Campus event analytics dashboard using Python and Power BI.',
        'Student placement tracker with company eligibility automation.',
    ],
    CE: [
        'Compiler phase visualizer for lexical and syntax analysis.',
        'IoT-enabled lab attendance and equipment monitoring system.',
        'Network traffic analyzer for anomaly detection in LAN setup.',
        'Mobile-first bug reporting platform for college infrastructure.',
    ],
    CSE: [
        'Cloud cost optimizer for student projects deployed on free tiers.',
        'NLP-based document assistant for academic papers and reports.',
        'Distributed task scheduler with monitoring and retry strategy.',
        'Cyber incident response simulator for security training labs.',
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
