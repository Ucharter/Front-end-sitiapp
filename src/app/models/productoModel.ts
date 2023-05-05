export class ProductoModel{
    ID?:string;
    nombre:string;
    estado: string;
    valorUnitario: string;


    constructor(nombre:string, estado: string,valorUnitario: string){
        this.nombre=nombre;
        this.estado=estado;
        this.valorUnitario=valorUnitario;
    }
}