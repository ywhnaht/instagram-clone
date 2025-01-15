import React, { useState } from 'react';
import InputBox from '@/components/InputBox';
import LogoImage from '@/assets/images/logoimg.avif';
import BlueButton from '@/components/BlueButton';
import { ReactComponent as FBIcon } from '@/assets/icons/fb.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import { checkExist } from '@/api/checkExist';
import { fetchRegister } from '@/api/register';

function Register() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [apiErrors, setApiErrors] = useState({
        emailExists: false,
        usernameExists: false,
    });
    const { isAuthenticated, login, logout } = useAuth();

    // Regex kiểm tra email hợp lệ
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const handleEmailBlur = async () => {
        if (!emailRegex.test(email)) {
            setError((prev) => ({
                ...prev,
                email: 'Vui lòng nhập email hợp lệ.',
            }));
        } else {
            const exists = await checkExist('email', email);
            if (exists) {
                setApiErrors((prev) => ({ ...prev, emailExists: true }));
                setError((prev) => ({ ...prev, email: 'Email đã tồn tại.' }));
            } else {
                setApiErrors((prev) => ({ ...prev, emailExists: false }));
                setError((prev) => ({ ...prev, email: '' }));
            }
        }
    };

    const handlePasswordBlur = () => {
        if (password.length < 8) {
            setError((prev) => ({
                ...prev,
                password: 'Mật khẩu phải có ít nhất 8 ký tự.',
            }));
        } else {
            setError((prev) => ({ ...prev, password: '' }));
        }
    };

    const handleUsernameBlur = async () => {
        if (!username.trim()) {
            setError((prev) => ({
                ...prev,
                username: 'Vui lòng nhập tên người dùng.',
            }));
        } else {
            const exists = await checkExist('username', username);
            if (exists) {
                setApiErrors((prev) => ({ ...prev, usernameExists: true }));
                setError((prev) => ({
                    ...prev,
                    username: 'Tên người dùng đã tồn tại.',
                }));
            } else {
                setApiErrors((prev) => ({ ...prev, usernameExists: false }));
                setError((prev) => ({ ...prev, username: '' }));
            }
        }
    };

    const handleInputFocus = (field) => {
        setError((prev) => ({ ...prev, [field]: '' }));
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const user = await fetchRegister(
                fullname,
                email,
                username,
                password
            ); // Gọi hàm login từ API
            login(user); // Đăng nhập người dùng
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const isRegisterDisabled =
        fullname.trim() === '' ||
        email.trim() === '' ||
        username.trim() === '' ||
        password.length < 8 ||
        Object.values(error).some((e) => e !== '') ||
        apiErrors.emailExists ||
        apiErrors.usernameExists;

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-96 h-auto my-3 items-center justify-center flex-col flex border">
                <Link to="#" className="my-6 size-16">
                    <img src={LogoImage} alt="Logo" />
                </Link>
                <span className="mb-2 text-gray-600 text-base font-medium">
                    Đăng ký để xem ảnh và video từ bạn bè.
                </span>
                <div className="my-2">
                    <BlueButton
                        name="Đăng nhập bằng facebook"
                        icon={<FBIcon />}
                        size="w-72 h-9 bg-sky-500 text-white"
                    />
                </div>
                <div className="my-2">
                    <BlueButton
                        name="Đăng nhập bằng google"
                        icon={<FcGoogle className="size-6" />}
                        size="w-72 bg-white text-sky-500"
                    />
                </div>
                <div className="flex-row flex my-2 text-sm text-gray-500 font-semibold">
                    <div>HOẶC</div>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <InputBox
                        value="Email"
                        type="text"
                        size={`w-72 h-10 ${
                            error.email ? 'border-red-500' : ''
                        }`}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        onFocus={() => handleInputFocus('email')}
                    />
                    {error.email && (
                        <span className="px-8 mb-1 text-xs text-red-500 text-center">
                            {error.email}
                        </span>
                    )}
                    <InputBox
                        value="Mật khẩu"
                        type="password"
                        size={`w-72 h-10 ${
                            error.password ? 'border-red-500' : ''
                        }`}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                        onFocus={() => handleInputFocus('password')}
                    />
                    {error.password && (
                        <span className="px-8 mb-1 text-xs text-red-500 text-center">
                            {error.password}
                        </span>
                    )}
                    <InputBox
                        value="Tên đầy đủ"
                        type="text"
                        size="w-72 h-10"
                        onChange={(e) => setFullname(e.target.value)}
                    />
                    <InputBox
                        value="Tên người dùng"
                        type="text"
                        size={`w-72 h-10 ${
                            error.username ? 'border-red-500' : ''
                        }`}
                        onChange={(e) => setUsername(e.target.value)}
                        onBlur={handleUsernameBlur}
                        onFocus={() => handleInputFocus('username')}
                    />
                    {error.username && (
                        <span className="px-8 mb-1 text-xs text-red-500 text-center">
                            {error.username}
                        </span>
                    )}
                </div>
                <span className="px-14 my-2 text-xs text-gray-500 text-center">
                    Bằng cách đăng ký, bạn đồng ý với{' '}
                    <Link className="text-sky-600">Điều khoản</Link>,
                    <Link className="text-sky-600">
                        {' '}
                        Chính sách quyền riêng tư
                    </Link>{' '}
                    và <Link className="text-sky-600">
                        Chính sách cookie
                    </Link>{' '}
                    của chúng tôi.
                </span>
                <div className="my-2">
                    <BlueButton
                        name="Đăng ký"
                        size={`w-72 h-10 text-white ${
                            isRegisterDisabled
                                ? 'opacity-60'
                                : 'opacity-100 hover:bg-blue-500'
                        }`}
                        onClick={handleRegister}
                        loading={loading}
                        disabled={isRegisterDisabled}
                    />
                </div>
            </div>
            <div className="w-96 h-16 my-2 items-center justify-center flex-col flex border">
                <div className="text-sm text-gray-600">
                    <span>
                        Bạn đã có tài khoản?{' '}
                        <Link to="/accounts/login">
                            <button className="text-sky-500 font-semibold">
                                Đăng nhập
                            </button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
