import React, { useState } from 'react';
import axios from  "axios";

const Signup = () => {
    const [value, setValue] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const register = await axios.post("http://localhost:3000/register" , value);
        console.log(register.data);
        setValue({
            name: "",
            email: "",
            password: ""
        });
        alert("User Registered Successfully");
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2>Registration</h2>
                <input type="text" onChange={handleChange} value={value.name} placeholder="Name" name='name' required />
                <input type="email" onChange={handleChange} value={value.email} placeholder='Email' name='email' required />
                <input type="password" onChange={handleChange} value={value.password} placeholder="Password" name='password' required />
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;
