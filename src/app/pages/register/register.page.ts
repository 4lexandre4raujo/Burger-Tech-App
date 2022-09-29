import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Validate } from '../../util/validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: any = {};

  email: string = '';
  senha = '';
  senhaRepetida = '';
  habilitaSalvar = false;
  
  constructor(
    private router: Router,
    /*private afa: AngularFireAuth,
    private afs: AngularFirestore*/
  ) { }

  ngOnInit() {
    setInterval(()=>{
      this.habilitaSalvar=!this.habilitaSalvar;
    }, 500);
  }
  /*async register() {
    try {
      const newUser = await this.afa.authState.createUserWhithEmailAndPassword(this.user.nome, this.user.sobrenome, this.user.email, this.user.senha);
      await this.afs.collection('usuarios').doc(newUser.user.uid).set(this.user);
      console.log('Cadastro efetuado com sucesso!');
    } catch (error) {
      console.error(error);
    }
  }
  */

  registrar(){
    console.log('cadastrando...');
    console.log(this.email, this.senha, this.senhaRepetida);
    if(Validate.validateEmail(this.email) && this.senha === this.senhaRepetida)
      this.router.navigateByUrl('login');
    else
      alert('Dados incorretos');
  }

  canSave(): boolean{
    return Validate.validateEmail(this.email)  && 
    this.senha===this.senhaRepetida && 
    this.senha.length >= 3
  }

}