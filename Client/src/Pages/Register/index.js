import React, { useEffect } from "react";
import { Link , useNavigate} from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { HideLoader, ShowLoader } from "../../redux/loaderSlice";


// the follwing is a react function that we created and inside thi function we are using a hook function called "useState"
// useState get the values of the component under it, in our current case we need 3 values as its a register functon 
// these are the basics attribute for a register page we can have as many as we want not sure if bool will be available here. 
// need to find out 
function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, setuser] = React.useState({
        name: '',
        email: '',
        password: '',

    });
    useEffect(()=>{
        if(localStorage.getItem("token")){
          navigate('/')
        }  
      },[])

    const registerUser = async () => {
        try {
            dispatch(ShowLoader())
            const response = await RegisterUser(user);
            dispatch(HideLoader())
            if (response.success) {
                toast.success(response.success)
            } else {
                toast.error(response.message)
            }
        } catch (error) {
            dispatch(HideLoader())
            toast.error(error.message);
        }
    }
    // below is the return fun which has heading input filed and a button deatils, we are also ref these values to the values in our
    // hook function example value = user.email 
    // onchange function is called when the value in the text field is changed, and on onChange we are calling setUser which
    // sets the value of the user.name or user.email respective to the field 

    return (
        <div className="h-screen bg-primary flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w96">
                <h1 className="text-2xl  uppercase font-semibold text-primary"> Buddy Connect Register</h1>
                <hr />
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setuser({ ...user, name: e.target.value })}
                    placeholder="Enter Your Name"
                />
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setuser({ ...user, email: e.target.value })}
                    placeholder="Enter Your Email"
                />
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setuser({ ...user, password: e.target.value })}
                    placeholder="Enter Your Password"
                />
                <button className="contained-btn" onClick={registerUser}>Register</button>
                {/* here the Link keyword is used and it will take us to the login page */}
                <Link
                    to="/login"
                    className="underline">
                    Already have an account? Login here
                </Link>
            </div>
        </div>
    )
}

export default Register