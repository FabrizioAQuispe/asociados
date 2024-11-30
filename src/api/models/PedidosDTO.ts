export interface PedidosDTO{
    cd_event:string,
    id_ped:number,
    id_pers:number,
    monto:number,
    est_ped:string,
    f_regi:Date,
    f_act:Date,
    userId:number
}

export interface ResponseList{
    message:string,
    code:number,
    data?: PedidosDTO[] | []
}