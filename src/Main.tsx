import * as React from 'react';
import './Main.css';
import {stateStoreService} from "./state/StateStore";

class Main extends React.Component<{},any>{
    constructor(props:any){
        super(props);
        this.state= {
            input: ''
        }
    }

    public addMassage2List = ()=>{
        stateStoreService.setMsg(this.state.input);
        this.setState({input:' '});
    };

    public addMassage = (event:any)=>{
    this.setState({input:event.target.value});
    };

    public render(){
        let list;
        const messages = stateStoreService.getMsg();
        if(messages){
            list = messages.map((message:string, idx:number)=>{
                return <li  key={idx} > <div className="Me">{message}</div> </li>
            })
        }
        return (
            <div className="MainContent">
                <header className="Header">hello chat</header>
                <ul className="massageBox">
                    {list}
                </ul>
                <footer>
                    <input id="inputMassage" onChange={this.addMassage} value={this.state.input} type="text" placeholder="Type a message"/>
                    <button id="sendBtn" onClick={this.addMassage2List}>Send</button>
                </footer>
            </div>
        )
    }
}
export default Main;