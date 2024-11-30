export interface ConceptoDTO {
    idconc: number;         // Opcional, como en Prisma
    tip_conc: string;        // Cambiar a string para coincidir
    de_conc: string;
    precio: number;         // Hacerlo opcional
    est_conc: string;       // Opcional
    cd_parametro: string;   // Opcional
    iscombo: number;        // Opcional
}

export interface ConceptoDetalleDTO {
    idpeddet: number,
    cd_event: string,
    id_ped: number,
    idconc: number,
    cantidad: number,
    monto: number
}