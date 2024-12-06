export const login = async (email: string, password: string) => {
    const users = [
        { email: "ben@sa.com", password: "1234", name: "Ben Humburger" },
        { email: "admin@sa.com", password: "1234", name: "Admin HQ" },
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find((u) => u.email === email && u.password === password);
            if (user) {
                resolve({ token: "mock-token-123", user: { id: 1, name: user.name } });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 2000); // Simulate a delay
    });
};
