import User from "./user";

class Users {
    users: Array<User>;

    constructor(){
        this.users = [];
    }

    add_user(user:User){
        if (this.unique_user(user.name))
            this.users.push(user);
        else
            console.log("User exist");
    }

    remove_user(name:string){
        var userId = this.users.findIndex(function (user) {
            return  user.name === name;
        });

        if (userId === -1) return false;

        this.users.splice(userId, 1);

        return true;
    }

    find_user(name:string){
        var user = this.users.filter(user => user.name == name);
        return user[0];
    }

    get_users(){return this.users}

    unique_user(name:string){
        if(this.find_user(name) === undefined){
            return true;
        }
        return false;
    }
}

export default Users;