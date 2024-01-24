import React, { useEffect } from "react";
import { Link  , useNavigate} from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setuser] = React.useState({
        email: '',
        password: '',

    });

    const loginUser = async () => {
        try {
            dispatch(ShowLoader())
            const response = await LoginUser(user);
            dispatch(HideLoader())
            if (response.success) {
                toast.success(response.message);
                localStorage.setItem("token",response.data);
                window.location.href="/"; // here we are going to home page after successful login
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoader())
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
          navigate('/')
        }  
      },[])
    return (
        <div className="h-screen bg-primary flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w96">
                <h1 className="text-2xl  uppercase font-semibold text-primary"> Buddy Connect Login</h1>
                <hr />
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setuser({ ...user, email: e.target.value })}
                    placeholder="Provide Your Email Address Here"
                />
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setuser({ ...user, password: e.target.value })}
                    placeholder="Provide Your password here"
                />
                <button className="contained-btn" onClick={loginUser}>Login</button>
                {/* here the Link keyword is used and it will take us to the login page */}
                <Link
                    to="/register"
                    className="underline">
                    Are you new here? Click below to register
                </Link>
            </div>
        </div>
    )
}

export default Login

