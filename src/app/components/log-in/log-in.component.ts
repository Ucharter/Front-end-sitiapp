import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogInServiceService } from 'src/app/services/log-in/log-in-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  forms:FormGroup;

  constructor(private fb:FormBuilder, private _losService: LogInServiceService, private router: Router){
    this.forms= this.fb.group({
      email:['',[Validators.required,Validators.minLength(1)]],
      password:['',[Validators.required,Validators.minLength(6), Validators.maxLength(16)]],
    })
  }

  Log(){
    this._losService.getUser(this.forms.value.email).subscribe(res=>{
      console.log(res);
      if(res){
        if(res.usuario=='Admin'){
          if(res.contrasena==this.forms.value.password){
            this.router.navigateByUrl('admin');
          }
        }else{
          if(res.contrasena==this.forms.value.password){
            this.router.navigateByUrl('cajero');
          }
        }
      }else{
        this.router.navigateByUrl('admin');
        console.log("Error de crerdenciales");
      }
    });
  }



}
