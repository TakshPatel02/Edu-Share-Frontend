const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000').replace(/\/$/, '');

const buildUrl = (path, query = {}) => {
    const url = new URL(`${API_BASE_URL}${path}`);

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            url.searchParams.set(key, String(value));
        }
    });

    return url.toString();
};

const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data?.message || 'Request failed');
    }

    return data;
};

const request = async ({ path, method = 'GET', body, query, token }) => {
    const isFormData = body instanceof FormData;
    const headers = {};

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(buildUrl(path, query), {
        method,
        headers,
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    return parseResponse(response);
};

export const authApi = {
    signup: (payload) => request({ path: '/api/auth/signup', method: 'POST', body: payload }),
    login: (payload) => request({ path: '/api/auth/login', method: 'POST', body: payload }),
    me: (token) => request({ path: '/api/auth/me', token }),
};

export const materialsApi = {
    list: (query) => request({ path: '/api/materials', query }),
    create: ({ token, formData }) => request({ path: '/api/materials', method: 'POST', body: formData, token }),
};

export const adminApi = {
    getMaterials: ({ token, status = 'pending' }) =>
        request({ path: '/api/admin/materials', query: { status }, token }),
    approveMaterial: ({ token, materialId }) =>
        request({ path: `/api/admin/materials/${materialId}/approve`, method: 'PATCH', token }),
    rejectMaterial: ({ token, materialId }) =>
        request({ path: `/api/admin/materials/${materialId}/reject`, method: 'PATCH', token }),
};

export const studyGuideApi = {
    // Generate personalized study plan (no auth required)
    generatePlan: (payload) =>
        request({ path: '/api/study-guide/generate-plan', method: 'POST', body: payload }),

    // Get chat responses for study guidance
    chat: (payload) =>
        request({ path: '/api/study-guide/chat', method: 'POST', body: payload }),

    // Get guidance for a specific chapter
    getChapterGuidance: (payload) =>
        request({ path: '/api/study-guide/chapter-guidance', method: 'POST', body: payload }),

    // Answer student questions about a subject
    answerQuestion: (payload) =>
        request({ path: '/api/study-guide/answer-question', method: 'POST', body: payload }),

    // Get user's study plans (auth required)
    getUserPlans: (token) =>
        request({ path: '/api/study-guide/my-plans', token }),

    // Get specific study plan details (auth required)
    getPlanDetails: ({ planId, token }) =>
        request({ path: `/api/study-guide/plan/${planId}`, token }),

    // Update study plan status (auth required)
    updatePlanStatus: ({ planId, status, token }) =>
        request({ path: `/api/study-guide/plan/${planId}/status`, method: 'PATCH', body: { status }, token }),
};
