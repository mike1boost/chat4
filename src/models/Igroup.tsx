import Iuser from "./Iuser";

interface Igroup {
    name :string,
    parent :Igroup | null,
    users:Iuser
    childrens : Igroup[],
    user_count :number,
    show:boolean
}

export default Igroup;