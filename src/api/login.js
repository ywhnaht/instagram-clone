// src/api/login.js
export const fetchLogin = async (usernameOrEmail, password) => {
    try {
        // Giả sử API hỗ trợ login với username hoặc email
        const response = await fetch(`http://localhost:3001/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Kiểm tra nếu usernameOrEmail là email hợp lệ (bạn có thể sử dụng regex hoặc thư viện để kiểm tra)
        const user = data.find((user) => 
            user.username === usernameOrEmail || user.email === usernameOrEmail
        );

        if (!user) {
            throw new Error('Rất tiếc, tên người dùng hoặc email của bạn không đúng. Vui lòng kiểm tra lại.');
        }

        // Kiểm tra mật khẩu (giả sử password trong response là hash hoặc plaintext)
        if (user.password === password) {
            return user;
        } else {
            throw new Error('Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.');
        }
    } catch (error) {
        console.error('Error fetching login:', error);
        throw error;
    }
};
