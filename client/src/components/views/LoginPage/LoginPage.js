import Axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';


function LoginPage(props) {

    //[Redux-01-DARS] dispatch
    const dispatch = useDispatch();



    // const [Email, setEmail] = useState(initialState);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();//preventDefault()안하면 refresh되어 버린다.

        // console.log('Email', Email);
        // console.log('Password', Password);

        let body = {
            email: Email,
            password: Password
        }

        //[Redux-01-DARS] dispatch
        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
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
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>
                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default withRouter(LoginPage)
