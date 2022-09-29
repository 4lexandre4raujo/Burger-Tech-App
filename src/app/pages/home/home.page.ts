import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.1,
    autoplay: true
  };
  
  constructor(

  ) {}

  ngOnInit() {
  }

}