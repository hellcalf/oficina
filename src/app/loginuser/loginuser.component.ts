import { Component, OnInit, Output, Input } from '@angular/core';
import { AutenticacionService } from './../servicios/autenticacion.service';
import { UsuariosService } from './../servicios/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent implements OnInit {

  loginForm : FormGroup;
  userdata: any;
  mensaje: any;
  usuarios: any[] = [];

    
  constructor(private formBuilder: FormBuilder,
  private autService: AutenticacionService,
  private router: Router,
  private activatedRouter: ActivatedRoute,
  public usuariosService : UsuariosService ) {
    this.usuariosService.getUserName()
    .subscribe(usuarios =>{
      for (const id_usuario$ in usuarios){
        const p = usuarios[id_usuario$];
        p.id_usuario$ = id_usuario$;
        this.usuarios.push(usuarios[id_usuario$]);
        console.log(usuarios);
      }
    })
   }

  ngOnInit() {
    this.loginForm= this.formBuilder.group({
      'email':['',[
        Validators.required,
        Validators.email
      ]    ],
      'password': ['',[
        Validators.required,
        Validators.minLength(6)
      ]]
    });
  }
 
  onSubmit(){
    this.userdata = this.saveUserdata();
    this.autService.inicioSesion(this.userdata);
    
    setTimeout(()=>{
      if (this.isAuth()===false){
        this.mensaje=true
      }
    },2000);
  }
  saveUserdata(){
    const saveUserdata = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value,
    };
    return saveUserdata;
  }
  isAuth(){
    return this.autService.isAuthenticated();
  }

}
