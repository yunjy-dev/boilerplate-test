import Axios from 'axios';
import React, {useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null){


    //options
    //null  Pages that anyone can access
    //true  Pages for login user
    //false Pages for not login user


    function AuthenticationCheck(props){

        const dispatch = useDispatch();

        useEffect(() => {
        
            dispatch(auth()).then(response => {
                console.log(response)

                
                if(!response.payload.isAuth){
                //로그인 하지 않은 상태
                    if(option){
                        //option이 true인 페이지는 못들어간다.
                        props.history.push('/login');
                    }
                } else {
                    //로그인한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/');
                    } else {
                            if(option === false){
                                props.history.push('/')
                            }
                    }
                }
            })
            // Axios.get('/api/users/auth');
            
        }, [])

        return (
            <SpecificComponent/>
        )

    }

    return AuthenticationCheck;
}