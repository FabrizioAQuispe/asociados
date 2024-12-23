export interface Pagos {
    cd_turn: string,
    cd_pago?: string,
    cd_event: string,
    id_ped: number,
    idpers: number,
    do_tipo: string,
    do_seri: string,
    do_corr: string,
    fe_docu: string,
    moneda?: string,
    mo_docu: string,
    mo_inaf: string,
    mo_afec: string,
    mo_igv: string,
    mo_desc: string,
    de_obs: string,
    fe_canc?: Date,
    in_estado?: boolean,
    fe_regi?: Date,
    cd_user: string,
    fe_actu?: Date,
    procesado?: number,
}

export interface PagosCondicion {
    cd_turn: string,
    cd_pago: string,
    cd_event: string,
    id_ped: number,
    do_tipo: number,
    do_seri: number,
    do_corr: string,
    ord: number,
    referencia?: string,
    lote?: string,
    fec_ope?: Date,
    cond_pago: string,
    monto: number,
    fecha_docu: Date,
    id_pago: number,
    /* idPagoCond?:number */
}

export interface RegistrarPago {
    id_pers: number;
    monto: number;
    est_ped: string;
    f_regi: Date;
    f_act: Date;
    userId: number;
    v_pedidos_det: {
        idconc: number;
        cantidad: number;
        monto: number;
        cd_event: string;
    }[];
}