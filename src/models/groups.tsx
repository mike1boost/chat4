import Group from "./group";
import User from "./user";

class Groups {
    rootGroup:Group;

    constructor(){
        this.rootGroup = new Group("Manager",this.rootGroup);
        this.init_tree();
    }

    addGroup(newGroup_name:string, fatherGroup:Group){
        if (!this.unique_group(fatherGroup, newGroup_name))
            return false;
        else
        if(fatherGroup.getUsersArray().length > 0){
            return false;
        }
        let child = new Group(newGroup_name, fatherGroup);
        fatherGroup.setChildrens(child);
        return true;
    }

    removeGroup(group2delete:Group){
        let fatherGroup = group2delete.getParent();
        let child_deleted = this.rootGroup.deleteChild(fatherGroup, group2delete.getName());
        if(child_deleted){
            console.log("group deleted");
        }
    }
    searchGroupsAnd_print(name:string){
        this.rootGroup.searchAndGetPath(this.rootGroup, name);
    }

    findGroups(name:string){
        let path:Array<Group> = [];
        this.rootGroup.findInstances(this.rootGroup, name, path);
        return (path[0] === undefined ? [] : path);
    }

    printPath(groupsArr:Array<Group>){
        let path2print:Array<Group> = [];
        let printPath = null;

        for (let i = 0; i < groupsArr.length; i++){
            path2print = this.rootGroup.buildPath(groupsArr[i]);
            if(path2print.length > 1) {
                printPath = path2print[0].name + "->";
                for (let j = 1; j < path2print.length - 1; j++) {
                    printPath += path2print[j].name + "->";
                }
                printPath+= path2print[path2print.length-1].name;
            }
            else printPath = path2print[0].name;
            console.log("type " + i + " for: " + printPath);
        }
    }

    unique_group(group:Group, name:string) {
        let children:Array<Group> = [];
        children = group.getChildrens();

        for (let i = 0; i < children.length; i++) {
            if (children[i].name === name) {
                return false;
            }
        }
        return true;
    }

    can_have_children(groups:Array<Group>) {
        let groups_:Array<Group> = [];
        for (let i = 0; i < groups.length; i++) {
            if (!groups[i].childrens[0]) {
                groups_.push(groups[i]);
            }
        }
        return groups_;
    }

    addUser(user_:User, group:Group){
        let groupUsers = group.users.get_users();
        let userExist = false;
        for (let i = 0; i < groupUsers.length; i++){
            if(groupUsers[i].name === user_.name) {
                userExist = true;
            }
        }
        if(userExist) {
            console.log("user exist ");
        }
        else {
            group.users.get_users().push(user_);
            group.updateUsersCount_add(group);
        }
    }

    findGroups_userActive(userName:string){
        let path:Array<Group> = [];
        this.rootGroup.findInstances_By_user(this.rootGroup, userName, path);
        console.log(path);
    }

    flatting(group:Group){
        if (group.parent.getChildrens().length === 1 && group.parent){
            if(group.getUsersArray().length > 0){
                let parent = group.parent;
                for (let i = 0; i < group.getUsersArray().length; i++)
                    this.addUser(group.getUsersArray()[i], parent);
                this.removeGroup(group);
            }
        }
    }


    init_tree(){
        this.rootGroup.childrens[0] = new Group('B', this.rootGroup);
        this.rootGroup.childrens[1] = new Group('C', this.rootGroup);
        this.rootGroup.childrens[2] = new Group('D', this.rootGroup);
        this.rootGroup.childrens[0].childrens[0] = new Group('E', this.rootGroup.childrens[0]);
        this.rootGroup.childrens[0].childrens[1] = new Group('F', this.rootGroup.childrens[0]);
        this.rootGroup.childrens[2].childrens[0] = new Group('G', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[1] = new Group('H', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[2] = new Group('I', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[3] = new Group('J', this.rootGroup.childrens[2]);
        this.rootGroup.childrens[2].childrens[3].childrens[0] = new Group('Q', this.rootGroup.childrens[2].childrens[3]);
    }

    print_groups_Users() {
        this.printGroup(this.rootGroup, 0);
    }

    printGroup(currGroup:Group, level:number) {
        console.log(this.helpPrint(level) + currGroup.name + " (" + currGroup.user_count +  ")");
        currGroup.getUsersArray().forEach(user => console.log(this.helpPrint(level + 1) + user.name));
        currGroup.getChildrens().forEach(group => this.printGroup(group, level + 1));
    }

    helpPrint(level:number) {
        var str = '';
        if (level > 0) {
            if (level > 1) {
                str += '| '.repeat(level - 1);
            }
            str += '|-';
        }
        return str
    }
}

export default Groups;


