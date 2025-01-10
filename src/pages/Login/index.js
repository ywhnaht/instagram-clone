import InputBtn from "@/components/Input";
import { Box, Field } from "@chakra-ui/react";
import LogoImage from '@/assets/images/logotext.png'

function Login() {
    const inputs = [
        { value: "Số điện thoại, tên người dùng hoặc email", type: "text", length: "w-72 h-9"},
        { value: "Mật khẩu", type: "password", length: "w-72 h-9"},
    ]

    return (
        <div className="flex items-center justify-center"> 
            <div className="w-96 h-auto my-3 items-center justify-center flex-col flex border">
                <div className="my-8">
                    <img src={LogoImage} />
                </div>
                <div>
                    {inputs.map((input, index) => (
                        <InputBtn 
                            key={index}
                            value={input.value}
                            type={input.type}
                            length={input.length}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Login;
