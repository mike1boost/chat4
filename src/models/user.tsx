
class User {

    name:string;
    age:string;
    password:string;

    constructor(name:string, age:string, password:string){
        this.name = name;
        this.age = age;
        this.password = password;
    }

    set_name(name:string){
        this.name = name;
    }

    set_age(age:string){
        this.age = age;
    }

    set_password(password:string){
        this.password = password;
    }

    get_name(){
        return this.name;
    }

    get_age(){
        return this.age;
    }

    get_password(){
        return this.password;
    }

}


export default User;