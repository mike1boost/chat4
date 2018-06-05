import * as React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom"
import ChatTree from "./ChatTree";
import Main from "./Main";
import {stateStoreService} from "./state/StateStore";
import BarLogin from "./BarLogin";
import LoginPanel from "./LoginPanel";

class App extends React.Component<{},any> {
    constructor(props:any){
        super(props);
        this.state={};

        stateStoreService.subscribe(()=>{
            this.forceUpdate();
        })
    }

    public chatRender = () => (
        <div className='App'>
            <BarLogin/>
            <div className="SideBar"><ChatTree /> </div>
            <div className="Main"><Main /></div>
        </div>
    )

    // public loginRender =() =>(stateStoreService.getPanel()?<Redirect to={{pathname:'/chat'}}/>: <LoginPanel />);
    public render() {
        return (
            <>
                <Route exact={true} path='/login' component={LoginPanel}/>
                <Switch>
                    <Route exact={true} path='/chat' render={this.chatRender}/>
                    <Route exact={true} path='/' render={this.chatRender}/>
                </Switch>
            </>
        );
    }
}

export default App;
