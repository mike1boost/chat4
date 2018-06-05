
class StateStoreService{
    listeners: Function[] = [];

    public get() {
        return StateStore.getInstance();
    }

    public getPanel(){
        return StateStore.getInstance().getPanel();
    }

    public setPanel(showLogin:boolean){
        return StateStore.getInstance().setPanel(showLogin);
    }

    public getUserNameLogin(){
        return StateStore.getInstance().getUserNameLogin()
    }

    public setUserNameLogin(userName:any){
        StateStore.getInstance().setUserNameLogin(userName);
    }


    public getItems() {
        return StateStore.getInstance().getItems();
    }

    public getSelectedToChat(){
        StateStore.getInstance().getSelectedToChat();
    }

    public setSelectedToChat(item:any){
        StateStore.getInstance().setSelectedToChat(item);
        this.onStoreChanged();
    }

    public getMsg() {
        return StateStore.getInstance().getMassage();
    }

    public setMsg(val: any) {
        StateStore.getInstance().setMassage(val);
        this.onStoreChanged();
    }

    public subscribe(listener: any){
        this.listeners.push(listener);
    }

    private onStoreChanged(){
        for(const listener of this.listeners){
            listener();
        }
    }
}


export interface IStateStore {
    items: Array<any>;
    selectedToChat:object;
    userNameLogin: any;
    showLoginPanel:boolean
    getMassage():any;
    getItems():any;
    setMassage(val:any):any;
    getSelectedToChat():any
    setSelectedToChat(item:any):any
    getUserNameLogin():any
    setUserNameLogin(userName:any):void
    getPanel():boolean
    setPanel(showLogin:boolean):void
}

class StateStore implements IStateStore {
    items = [
        {
            "type": "group",
            "name": "Friends",
            "massage": [],
            "items": [
                {
                    "type": "group",
                    "name": "Best Friends",
                    "massage": [],
                    "items": [
                        {
                            "type": "user",
                            "name": "Tommy",
                            "massage": []
                        }
                    ]
                }
            ]
        },
        {
            "type": "user",
            "name": "Ori",
            "massage": []
        },
        {
            "type": "user",
            "name": "Roni",
            "massage": []
        }
    ];
    selectedToChat =  {
        "type": "group",
        "name": "Friends",
        "massage": [],
        "items": [
            {
                "type": "group",
                "name": "Best Friends",
                "massage": [],
                "items": [
                    {
                        "type": "user",
                        "name": "Tommy",
                        "massage": []
                    }
                ]
            }
        ]
    };
    userNameLogin = null;
    showLoginPanel = false;

    static instance: IStateStore;

    public getUserNameLogin(){
        return this.userNameLogin;
    }

    public setUserNameLogin(userName:any){
        this.userNameLogin = userName;
    }

    public getMassage(){
        return this.selectedToChat.massage;
    }

    setMassage(val:any){
        this.selectedToChat.massage = this.selectedToChat.massage.concat(val);
    }

    getItems(){return this.items}

    getSelectedToChat(){return this.selectedToChat}
    setSelectedToChat(item:any){
        this.selectedToChat = item;
    }

    public getPanel(){
        return this.showLoginPanel;
    }

    public setPanel(showLogin:boolean){
        this.showLoginPanel = showLogin;
    }

    static getInstance() {
        if (!StateStore.instance) {
            StateStore.instance = new StateStore();
        }
        return StateStore.instance;
    }
}
export const stateStoreService = new StateStoreService();