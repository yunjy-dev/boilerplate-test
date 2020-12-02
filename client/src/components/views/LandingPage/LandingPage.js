import React, { useEffect } from 'react'
import axios from 'axios'

function LandingPage() {
    // console.log("LandingPage");
    useEffect( () => {
        // console.log("before axios");
        // axios.get('http://localhost:3000/api/hello').then(response => console.log(response.data));
        axios.get('/api/hello').then(response => console.log(response.data));
        // console.log("after axios");
    }, []);
    // console.log("after useEffect");


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}
        }>
            LandingPage
        </div>
    )
}

export default LandingPage
