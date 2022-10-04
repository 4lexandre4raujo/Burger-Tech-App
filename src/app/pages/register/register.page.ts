import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Validate } from '../../util/validate';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  senha = '';
  senhaRepetida = '';
  nome = '';
  sobrenome='';
  habilitaSalvar = false;
  loading: HTMLIonLoadingElement;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    setInterval(()=>{
      this.habilitaSalvar=!this.habilitaSalvar;
    }, 500);
  }

  registrar(){
    this.presentAlert();
  }

  canSave(): boolean{
    return Validate.validateEmail(this.email)  && 
    this.senha===this.senhaRepetida && 
    this.senha.length >= 3
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmação de dados!',
      message: 'Leia seus dados atentamente e confirme: seus dados estão corretos?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Confirmação cancelada...')
          }
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            this.showLoading();
            setTimeout( async () => {
              await this.fecharLoading();
            },
            2000)
            console.log('Dados confirmado com sucesso!')
            console.log('cadastrando...');
            console.log(this.email, this.senha, this.senhaRepetida);
            if(Validate.validateEmail(this.email) && this.senha === this.senhaRepetida && this.nome.length > 3 && this.sobrenome.length > 3){
              try{
                await this.firestore.collection('usuarios').add({
                  email: this.email, 
                  senha: this.senha,
                  nome: this.nome,
                  sobrenome: this.sobrenome,
                  estaAtivo: true
                });
                this.presentToast('Bem vindo!');
                this.router.navigateByUrl('tabs/home');
              }
              catch(erro){
                console.log(erro);
                //alert(erro.message)
              }
              
            }
            else{
              this.presentToast('Dados inválidos!');
            }

          }
        },
      ],

    });

    await alert.present();
  }

  async presentToast( mensagem: string ) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    this.loading.present();
  }

  private async fecharLoading(){
    await this.loading.dismiss();
  }
}