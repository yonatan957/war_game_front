import { addAttack, useAppDispatch } from "../redux/store";
import { socket } from "../main";
import { IAttack } from "../types/attack";

export const IO_functions = ()=>{
    const dispatch = useAppDispatch();
    socket.on("launched", (data:IAttack)=>dispatch(addAttack(data)));
}