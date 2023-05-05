export class ClienteModel{
    cliente?:string;
    identificacion: string;
    razonSocial: string;
    fechaRegistro: Date;
    estado: string;

    constructor(identificacion: string,razonSocial: string, estado: string){
        this.identificacion=identificacion;
        this.razonSocial=razonSocial;
        this.fechaRegistro=new Date();
        this.estado=estado;
    }
}