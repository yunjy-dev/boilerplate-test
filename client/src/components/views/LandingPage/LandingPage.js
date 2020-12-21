import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    // console.log("LandingPage");
    useEffect( () => {
        // console.log("before axios");
        // axios.get('http://localhost:3000/api/hello').then(response => console.log(response.data));
        axios.get('/api/hello').then(response => console.log(response.data));
        // console.log("after axios");
    }, []);
    // console.log("after useEffect");


    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            console.log(response.data);
            if(response.data.success){
                props.history.push("/login");
            } else {
                alert('Failed to logout');
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}
        }>
            LandingPage

            <button onClick = {onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)
