export class UserModel{
    id_usuario?:string;
    nombre:string;
    apellido: string;
    usuario: string;
    contrasena: string;

    constructor(nombre:string, apellido: string, usuario: string, contrasena:string){
        this.nombre=nombre;
        this.apellido=apellido;
        this.usuario=usuario;
        this.contrasena=contrasena;

    }
}