import Users from "./users";
import User from "./user";


class Group {

    name:string;
    users:Users;
    parent:Group;
    childrens:Group[];
    user_count:number;

    constructor(name:string, parent:Group){
        this.name = name;
        this.users = new Users();
        this.parent = parent;
        this.childrens = [];
        this.user_count = 0;
    }

    getName(){return this.name}
    getUsersArray(){return this.users.get_users()}
    getUsersClass(){return this.users}
    getParent(){return this.parent}
    getChildrens(){return this.childrens}
    getCount(){return this.user_count}

    setChildrens(child:Group){
        this.childrens.push(child);
    }

    updateCount(group:Group, number:number){
        if(group) {
            group.user_count = group.user_count - number;
            this.updateCount(group.parent, number);
        }
    }
    updateUsersCount_add(group:Group){
        if(group) {
            group.user_count = group.user_count + 1;
            this.updateUsersCount_add(group.parent)
        }
    }
    updateUsersCount_delete(group:Group){
        if(group) {
            group.user_count = group.user_count - 1;
            this.updateUsersCount_delete(group.parent)
        }
    }

    deleteChild(group:Group, childName:string){
        for (var i = 0; i < group.childrens.length; i++) {
            if(group.childrens[i].name === childName){
                group.childrens.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    searchAndGetPath(root:Group, name:string){
        let path:Array<Group> = [];
        let path2print = [];
        let printPath = null;
        this.findInstances(root, name, path);
        for (let i = 0; i < path.length; i++){
            path2print = this.buildPath(path[i]);
            if(path2print.length > 1) {
                printPath = path2print[0].name + "->";
                for (let j = 1; j < path2print.length - 1; j++) {
                    printPath += path2print[j].name + "->";
                }
                printPath+= path2print[path2print.length-1].name;
            }
            else printPath = path2print[0].name;
            console.log(printPath);
        }
    }

    findInstances(root:Group, groupName:string, path:Array<Group>){
        if(root.name === groupName) {
            path.push(root);
        }
        if (root.childrens[0] === undefined) return;

        for (let i = 0; i < root.childrens.length; i++){
            this.findInstances(root.childrens[i], groupName, path);
        }
    }

    findInstances_By_user(root:Group, userName:string, path:Array<Group>){
        if(root.findUser(userName) != undefined) {
            path.push(root);
        }
        if (root.childrens[0] === undefined) return;

        for (let i = 0; i < root.childrens.length; i++){
            this.findInstances_By_user(root.childrens[i], userName, path);
        }
    }
    buildPath(element:Group){
        let path:Array<Group> = [];
        if(!element.parent) {
            path.push(element);
            return path;
        }
        path = this.buildPath(element.parent);
        path.push(element);
        return path;
    }
    addUser(user:User){
        this.users.add_user(user);
    }
    findUser(name:string){
        // var user = this.users.filter(user => user.name == name);
        // return user[0];
        return this.users.find_user(name)
    }

}

export default Group;

