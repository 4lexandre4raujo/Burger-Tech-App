import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  handlerMessage = '';
  roleMessage = '';
  constructor(
    private gerenciadorDeRotas: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }
  

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Informações salvas com sucesso!',
      duration: 1500,
      position: position
    });

    await toast.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Você tem certeza que gostaria de sair da conta?',
      buttons: [
        {
          text: 'Não',
          role: 'cancelado',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Sim',
          role: 'confirmado',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            console.log('Saindo..');
            this.gerenciadorDeRotas.navigateByUrl('login');
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    this.roleMessage = `Dismissed with role: ${role}`;
  }
}
