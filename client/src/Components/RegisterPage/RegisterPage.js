import React, { Fragment, useState } from 'react'
import '../RegisterPage/RegisterPage.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value });
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {name, email, password};

            const response = await fetch('http://localhost:4000/auth/register', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            const parseResponse = await response.json();

            if(parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);

                setAuth(true);
                toast.success("Registered Sucessfully!");
                
            } else {
                setAuth(false);
                toast.error(parseResponse);
            }

            

        } catch (err) {
            console.error(err.message);
        }
    }


  return (<Fragment>
  <div className='nav-bar'>
        <div className='navigation-bar'>
            <div className='navigation-bar-logo'>
                <h1>ABC School Name</h1>
            </div>
        </div>
    </div>

    <div className='login-box'>
        <form className='login-form' onSubmit={onSubmitForm}>
            <h3>Register</h3>

            <div className='login-input-box'>
                <label htmlFor='name'>Name</label>
                <input type='text' placeholder='Name' name='name' value={name} onChange={e => onChange(e)}/>
            </div>

            <div className='login-input-box'>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='Email' name='email' value={email} onChange={e => onChange(e)}/>
            </div>

            <div className='login-input-box'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='Password' name='password' value={password} onChange={e => onChange(e)}/>
            </div>

            <button type='submit'>Create Account</button>            

            <p>Already have an account? <Link to='/login'>Login here</Link></p>
        </form>

    </div>
  
  </Fragment>
  )
}

export default RegisterPage;