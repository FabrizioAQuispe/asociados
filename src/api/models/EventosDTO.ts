export interface EventosDTO{
    ideve:number,
    cd_event:string,
    nom_event:string,
    f_event:Date,
    f_event_ini:string,
    f_event_fin:string
    tip_event:string,
    f_regi:Date,
    user_regi:string,
    f_est:Date
    monto:number,
}
export interface ParametrosDTO{
    idparametro:number,
    cd_categoria:string,
    cd_parametro:string,
    descripcion:string
}

export interface ResponseEvents{
    ideve:number,
    cd_event:string,
    nom_event:string,
    f_event:Date,
    f_event_ini:string,
    f_event_fin:string
    tip_event:string,
    f_regi:Date,
    user_regi:string,
    f_est:Date,
    parametros: {
        idparametro:number,
        cd_categoria:string,
        cd_parametro:string,
        descripcion:string
    }
}