import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  usuarios: any;
  constructor(
    private router: Router,
    public firestore: AngularFirestore
  ) {
    console.log(router.url);
      this.usuarios = firestore.collection('usuarios').valueChanges();
      console.log(this.usuarios);
    }

  ngOnInit() {
  }

}
