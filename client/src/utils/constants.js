// Insurance categories
export const INSURANCE_CATEGORIES = [
    {
        id: 'term-life',
        name: 'Term Life Insurance',
        icon: '🛡️',
        description: 'Protect your family\'s financial future',
        color: 'bg-blue-500',
    },
    {
        id: 'health',
        name: 'Health Insurance',
        icon: '❤️',
        description: 'Comprehensive health coverage for you and your family',
        color: 'bg-red-500',
    },
    {
        id: 'investment',
        name: 'Investment Plans',
        icon: '📈',
        description: 'Grow your wealth with smart investment plans',
        color: 'bg-green-500',
    },
    {
        id: 'car',
        name: 'Car Insurance',
        icon: '🚗',
        description: 'Complete protection for your vehicle',
        color: 'bg-purple-500',
    },
    {
        id: 'bike',
        name: 'Bike Insurance',
        icon: '🏍️',
        description: 'Two-wheeler insurance at best prices',
        color: 'bg-orange-500',
    },
    {
        id: 'family-health',
        name: 'Family Health',
        icon: '👨‍👩‍👧‍👦',
        description: 'Family floater health insurance plans',
        color: 'bg-pink-500',
    },
    {
        id: 'travel',
        name: 'Travel Insurance',
        icon: '✈️',
        description: 'Travel worry-free with comprehensive coverage',
        color: 'bg-cyan-500',
    },
    {
        id: 'home',
        name: 'Home Insurance',
        icon: '🏠',
        description: 'Protect your home and belongings',
        color: 'bg-yellow-500',
    },
];

// User roles
export const USER_ROLES = {
    CUSTOMER: 'customer',
    PARTNER: 'partner',
    EMPLOYEE: 'employee',
    MANAGEMENT: 'management',
};

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
    },
    PRODUCTS: {
        ALL: '/products',
        BY_ID: (id) => `/products/${id}`,
        BY_CATEGORY: (category) => `/products/category/${category}`,
    },
    ENQUIRIES: {
        CREATE: '/enquiries',
        MY: '/enquiries/my-enquiries',
        ALL: '/enquiries',
    },
    TESTIMONIALS: {
        ALL: '/testimonials',
        ACTIVE: '/testimonials/active',
    },
};
