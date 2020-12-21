import Axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {

    
    //[Redux-01-DARS] dispatch
    const dispatch = useDispatch();



    // const [Email, setEmail] = useState(initialState);
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();//preventDefault()안하면 refresh되어 버린다.

        // console.log('Email', Email);
        // console.log('Password', Password);

        if(Password !==ConfirmPassword){
            return alert('비밀번호 확인');
        }

        let body = {
            email: Email,
            name: Name,
            password: Password
        }


        //redux를 쓰지 않으면
        // Axios.post('/api/users/register', body);


        //[Redux-01-DARS] dispatch
        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
                }
            })

        // Axios.post('/api/users/login', body).then(response =>{})
    }

    return (
            <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}
            }>
                <form style={{display:'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}>
                    <label>Email</label>
                    <input type="email" value={Email} onChange={onEmailHandler}/>

                    <label>Name</label>
                    <input type="text" value={Name} onChange={onNameHandler}/>

                    <label>Password</label>
                    <input type="password" value={Password} onChange={onPasswordHandler}/>

                    <label>Confirm Password</label>
                    <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                    <br/>
                    <button type="submit">Register</button>

                </form>
            </div>
        )
}

export default withRouter(RegisterPage)
