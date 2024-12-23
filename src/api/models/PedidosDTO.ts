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

export interface PedidosComboDTO{
    idpedcombo :number,
    cd_event   :string,
    id_ped     :number,
    id_ped_det :number,
    idconc     :number,
    cd_1pla    :number,
    cd_2pla    :number,
    cd_aper    :number,
    cd_beb     :number,
    cd_bar     :string,
    iscombo    :number,
    cd_asie    :number
  }


export interface ResponseList{
    message:string,
    code:number,
    data?: PedidosDTO[] | []
}

export interface EventPedidosList{
    cd_event:number,
    id:number,
    NoIdentidad:string,
    RazonSocial:string,
    Evento:string,
    FEvento:Date,
    monto:number
}