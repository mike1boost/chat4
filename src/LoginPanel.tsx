import * as React from 'react';
import './App.css';

import Iuser from './models/Iuser';
import LoginModal from "./LoginModal";
import {Redirect} from "react-router";

export
enum ERROR_MSG{
    none,
    allGood,
    credentials,
    locked
}

interface IAppState {
    loggedInUser: Iuser | null,
    errorMsg: ERROR_MSG,
    counter: number,
    redirect:boolean
}

class LoginPanel extends React.Component<{}, IAppState> {

    constructor(props:{}) {
        super(props);

        this.state = {
            loggedInUser: null,
            errorMsg: ERROR_MSG.none,
            counter: 0,
            redirect:false
        }
    }

    auth = (user: Iuser): boolean => {
        return user.name == 'batman' && user.password == 'robin';
    };

    onLoginSubmitHandler =(user:Iuser)=>{
        if(this.auth(user)){
            this.setState({
                loggedInUser: user,
                errorMsg: ERROR_MSG.allGood,
                redirect:true
            })
        }
        else{
            if(this.state.counter===2){
                this.setState({
                    loggedInUser: null,
                    errorMsg: ERROR_MSG.locked
                });
            }
            else {
                this.setState((prev) => ({
                    loggedInUser: null,
                    errorMsg: ERROR_MSG.credentials,
                    counter: prev.counter + 1
                }));
            }
        }
    };

    public loginRender=()=>(
        this.state.redirect ? <Redirect to={{pathname:'/chat'}}/> : <LoginModal loginStatus={this.state.errorMsg} onSubmit={this.onLoginSubmitHandler}/>
    )

    public render() {
        return (
            this.loginRender()
        );
    }
}

export default LoginPanel;
