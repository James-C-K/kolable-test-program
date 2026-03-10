export const mockProjects = [
    {
        id: "proj-1",
        title: "AI Code Assistant for Senior Developers",
        subtitle: "Boost your productivity with advanced AI integrations.",
        targetAmount: 1000000,
        currentAmount: 450000,
        referralRatio: 0.1,
        plans: [
            {
                id: "plan-1",
                title: "Early Bird Access",
                description: "Get lifetime access to the beta version.",
                listPrice: 5000,
                salePrice: 2999,
                onSale: true,
                pictureUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
            },
        ],
    },
    {
        id: "proj-2",
        title: "Eco-Friendly Smart Home Hub",
        subtitle: "Manage your energy consumption with ease.",
        targetAmount: 500000,
        currentAmount: 120000,
        referralRatio: 0.05,
        plans: [],
    },
];

export const mockPrograms = [
    {
        id: "prog-1",
        title: "Mastering Next.js 14 & App Router",
        description: "Deep dive into the latest Next.js features with hands-on projects.",
        list_price: 12000,
        sale_price: 8800,
        cover_url: "https://images.unsplash.com/photo-1618477247222-acbac0e159b3?auto=format&fit=crop&q=80&w=800",
        instructor_data: {
            name: "Jane Doe",
            title: "Senior Full Stack Engineer",
        },
    },
    {
        id: "prog-2",
        title: "Advanced Tailwind CSS Techniques",
        description: "Learn how to build beautiful, responsive UIs with Tailwind CSS.",
        list_price: 8000,
        sale_price: 5600,
        cover_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
        instructor_data: {
            name: "John Smith",
            title: "UI/UX Designer",
        },
    },
];
