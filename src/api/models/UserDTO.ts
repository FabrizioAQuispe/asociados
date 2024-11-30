/*DATA FOR THE ADMINNISTRATOR*/

enum TIPO_ASOCIADO{
    ADMINISTRADOR = 1,
    PERSONA = 2,
    SOCIO = 3
}


export interface LoginAdminDTO {
    usuario: string,
    password: string,
    type: TIPO_ASOCIADO
}

export interface DataAdminDTO {
    token:string,
    data: {
        id: number,
        nomb: string,
        correo: string,
        f_creacion: Date,
        f_update: Date,
        isAdmin:boolean,
        isPers:boolean,
        isSoc:boolean
    }
}

/*DATA FOR THE ASOCIATED*/
export interface LoginAsociatedDTO {
    codigo?: number,
    dni: string
}

/*DATA FOR THE ASOCIATED*/
export interface LoginPersonasDTO {
    codigo?: string,
    dni: string
}

export interface DataAsociatedDTO {
    id: number,
    idpers: number,
    idpost: number,
    cod: number,
    tiposoc: number,
    ubignac: number,
    ubigdir: number,
    genero: string,
    fnac: Date,
    fing: Date,
    estado: string,
    f_estado: Date,
    profesion: number,
    ocupacion: number,
    lugartrabajo: number,
    estcivil: number,
    telf: string,
    condasoc: number,
    dni: string
}