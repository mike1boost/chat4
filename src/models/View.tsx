const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

import Groups from "./groups";
import Users from "./users";
import User from "./user";
import Group from "./group";


//init
let users = new Users();
let groups = new Groups();

//start function
rootMain();

function rootMain() {
    console.log(" ");
    console.log("root Main\n" +
        "Type 1 for users\n" +
        "Type 2 for Groups\n" +
        "Type 3 for adding/removing users from a group\n" +
        "Type any different key to exit chat");
    rl.question('Your command? ', (answer:string) => {
        switch (answer) {
            case '1':
                userMain();
                break;
            case '2':
                groupMain();
                break;
            case '3':
                user2groupMain();
                break;
            default:
                console.log("Exit chat good day");
                process.exit(0);
                break;
        }
    });
}


function userMain() {
    console.log(" ");
    console.log("user Main\n" +
        "Type 1 for create user\n" +
        "Type 2 for delete user\n" +
        "Type 3 print users\n" +
        "Type 4 update user details (age & password");
    rl.question('Your command? ', (answer:string) => {
        switch (answer) {
            case '1':
                addUser();
                break;
            case '2':
                deleteUser();
                break;
            case '3':
                getUsers();
                break;
            case '4':
                updateUser();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}

function groupMain() {
    console.log(" ");
    console.log("group Main\n" +
        "Type 1 for add group\n" +
        "Type 2 for delete group\n" +
        "Type 3 print groups");
    rl.question('Your command? ', (answer:string) => {
        switch (answer) {
            case '1':
                addGroup();
                break;
            case '2':
                deleteGroup();
                break;
            case '3':
                printGroups();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}

function user2groupMain() {
    console.log(" ");
    console.log("user2group Main\n" +
        "Type 1 for add user to group\n" +
        "Type 2 for remove user from group\n" +
        "Type 3 print groups user active\n" +
        "Type 4 flatting group \n" +
        "Type 5 print groups and users (full tree)");
    rl.question('Your command? ', (answer:string) => {
        switch (answer) {
            case '1':
                adduser2group();
                break;
            case '2':
                delete_user_from_group();
                break;
            case '3':
                get_user2group();
                break;
            case '4':
                flattingGroup();
                break;
            case '5':
                printTree();
                break;
            default:
                console.log("You have typed wrong answer");
                rootMain();
                break;
        }
    });
}


//////////////////////////  user2groupMain functions  ///////////////////////////////
function adduser2group() {
    rl.question('Enter user name: ', (userName:string) => {
        rl.question('Enter group name: ', (groupName:string) => {
            var user = users.find_user(userName);
            var groups_SameName = groups.findGroups(groupName);
            if(!groups_SameName || user === undefined){
                console.log("  ");
                console.log("The group or user isn't exist");
                console.log("operation of adding user to group is canceled");
                rootMain();
            }
            else {
                var arGroups = groups.can_have_children(groups_SameName);
                groups.printPath(arGroups);
                rl.question('Type number to choose path: ', (pathIndex:number) => {
                    //// add user  /////
                    if (pathIndex < arGroups.length && pathIndex >= 0)
                        groups.addUser(user, arGroups[pathIndex]);
                    rootMain();
                });
            }
        });
    });
}

function delete_user_from_group() {
    rl.question('Enter user name (delete from group): ', (userName:string) => {
        rl.question('Enter group name: ', (groupName:string) => {
            var groups_SameName = groups.findGroups(groupName);
            if(!groups_SameName){
                console.log("  ");
                console.log("The group you trying to find isn't exist");
                console.log("operation of delete user from group is canceled");
                rootMain();
            }
            else {
                var arGroups = groups.can_have_children(groups_SameName);
                groups.printPath(arGroups);
                console.log("  ");
                rl.question('Type number to choose path: ', (pathIndex:number) => {
                    if (pathIndex < arGroups.length && pathIndex >= 0) {
                        var group = arGroups[pathIndex];
                        var users_ = group.getUsersClass();
                        //// delete user from group  /////
                        users_.remove_user(userName);
                        group.updateUsersCount_delete(group);
                    }
                    rootMain();
                });
            }
        });
    });
}

function get_user2group() {
    rl.question('Enter user name: ', (userName:string) => {
        var user = users.find_user(userName);
        if(user === undefined){
            console.log("user not exist");
            rootMain();
        }
        else {
            groups.findGroups_userActive(userName);
            rootMain();
        }
    });
}

function flattingGroup() {
    console.log(" ");
    groups.print_groups_Users();
    console.log(" ");
    rl.question('Enter group name: ', (groupName:string) => {
        let groups_:Array<Group> = groups.findGroups(groupName);
        if(groups_.length === 0){
            console.log("not exist");
            rootMain();
        }
        else {
            groups.printPath(groups_);
            console.log("  ");
            rl.question('Type number to choose path: ', (pathIndex:number) => {
                if(pathIndex < groups_.length && pathIndex >= 0) {
                    //// flat group  /////
                    groups.flatting(groups_[pathIndex]);
                }
                rootMain();
            });
        }
    });
}

function printTree(){
    console.log(" ");
    groups.print_groups_Users();
    rootMain();
}




//////////////////////////  group functions  ///////////////////////////////
function addGroup() {
    console.log("  ");
    rl.question('Enter new group name: ', (newGroupName:string) => {
        rl.question('Enter group name, where you want to add: ', (fatherGroupName:string) => {
            let groups_SameName:Array<Group> = groups.findGroups(fatherGroupName);
            if(!groups_SameName){
                console.log("  ");
                console.log("The group you trying to add new group isn't exist");
                console.log("operation of adding new group is canceled");
                rootMain();
            }
            groups.printPath(groups_SameName);
            console.log("  ");
            rl.question('Type number to choose path: ', (pathIndex:number) => {
                //// add group  /////
                if(pathIndex < groups_SameName.length && pathIndex >= 0)
                    groups.addGroup(newGroupName, groups_SameName[pathIndex]);
                rootMain();
            });
        });
    });
}

function deleteGroup() {
    console.log("  ");
    rl.question('Enter name(group to delete): ', (groupName:string) => {
        var groups_SameName = groups.findGroups(groupName);
        if(!groups_SameName){
            console.log("  ");
            console.log("The group you trying to delete isn't exist");
            console.log("operation of delete group is canceled");
            rootMain();
        }
        else {
            groups.printPath(groups_SameName);
            console.log("  ");
            rl.question('Type number to choose path: ', (pathIndex:number) => {
                ////  delete group ////
                if(pathIndex < groups_SameName.length && pathIndex >= 0) {
                    console.log(groups_SameName[pathIndex].user_count);
                    groups.rootGroup.updateCount(groups_SameName[pathIndex], groups_SameName[pathIndex].user_count);
                    groups.removeGroup(groups_SameName[pathIndex]);
                }
                rootMain();
            });
        }
    });
}

function printGroups() {
    console.log("  ");
    rl.question('Enter group name: ', (groupName:string) => {
        groups.searchGroupsAnd_print(groupName);
        rootMain();
    });
}

//////////////////////////  user functions  ///////////////////////////////
function addUser() {
    rl.question('Enter user name: ', (name:string) => {
        rl.question('Enter age: ', (age:string) => {
            rl.question('Enter password: ', (password:string) => {
                users.add_user( new User(name, age, password));
                rootMain();
            });
        });
    });
}

function deleteUser() {
    rl.question('Enter user name(user to delete): ', (name:string) => {
        users.remove_user(name);
        let path:Array<Group> = [];
        groups.rootGroup.findInstances_By_user(groups.rootGroup, name, path);
        for(let i = 0; i < path.length; i++) {
            let users_ = path[i].getUsersClass();
            users_.remove_user(name);
            path[i].updateUsersCount_delete(path[i]);
        }
        rootMain();
    });
}

function getUsers() {
    console.log(users.get_users());
    rootMain();
}

function updateUser(){
    rl.question('Enter user name you want to update: ', (name:string) => {
        rl.question('Enter new age: ', (age:string) => {
            rl.question('Enter new password: ', (password:string) => {
                var user = users.find_user(name);
                user.set_age(age);
                user.set_password(password);
                rootMain();
            });
        });
    });
}

// export default View