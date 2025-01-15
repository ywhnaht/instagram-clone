import React, { useState } from 'react';
import InputBox from '@/components/InputBox';
import LogoImage from '@/assets/images/logoimg.avif';
import BlueButton from '@/components/BlueButton';
import { ReactComponent as FBIcon } from '@/assets/icons/fb.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { fetchLogin } from '@/api/login'; // Import API function

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState(''); // Đổi thành username hoặc email
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const { isAuthenticated, login, logout } = useAuth();

    const isLoginDisabled =
        usernameOrEmail.trim() === '' || password.length < 8;

    const handleLogin = async () => {
        try {
            const user = await fetchLogin(usernameOrEmail, password); // Gọi hàm login từ API
            login(user); // Đăng nhập người dùng
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-96 h-auto my-3 items-center justify-center flex-col flex border">
                <Link to="#" className="my-6 size-16">
                    <img src={LogoImage} alt="Logo" />
                </Link>
                <div>
                    {/* Input cho Username hoặc Email */}
                    <InputBox
                        value="Tên người dùng hoặc email"
                        type="text"
                        size="w-72 h-10"
                        onChange={(e) => setUsernameOrEmail(e.target.value)} 
                        onClick={() => setError('')}
                    />
                    {/* Input cho Password */}
                    <InputBox
                        value="Mật khẩu"
                        type="password"
                        size="w-72 h-10"
                        onChange={(e) => setPassword(e.target.value)} 
                        onClick={() => setError('')}
                    />
                </div>
                <div className="my-2">
                    {/* Nút Đăng nhập */}
                    <BlueButton
                        name="Đăng nhập"
                        size={`w-72 h-10 text-white ${
                            isLoginDisabled
                                ? 'opacity-60'
                                : 'opacity-100 hover:bg-blue-500'
                        }`}
                        onClick={handleLogin} // Gọi hàm đăng nhập
                        disabled={isLoginDisabled}
                    />
                </div>
                {error && (
                    <span className="px-8 my-2 text-sm text-red-500 text-center">
                        {error} {/* Hiển thị lỗi */}
                    </span>
                )}
                <div className="flex-row flex my-2 text-sm text-gray-500 font-semibold">
                    <div>HOẶC</div>
                </div>
                <div className="my-2">
                    <BlueButton
                        name="Đăng nhập bằng facebook"
                        icon={<FBIcon />}
                        size="w-72 bg-white text-sky-500"
                    />
                </div>
                 
                {/* <div className="my-2">
                    <BlueButton
                        name="Đăng nhập bằng google"
                        icon={<FcGoogle className="size-6" />}
                        size="w-72 bg-white text-sky-500"
                    />
                </div> */}
                <div className="my-2 pb-3 text-sm cursor-pointer text-gray-600">
                    <Link to="/accounts/forgetpass">Quên mật khẩu?</Link>
                </div>
            </div>
            <div className="w-96 h-16 my-2 items-center justify-center flex-col flex border">
                <div className="text-sm text-gray-600">
                    <span>
                        Bạn chưa có tài khoản ư?{' '}
                        <Link to="/accounts/register">
                            <button className="text-sky-500 font-semibold">
                                Đăng ký
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
