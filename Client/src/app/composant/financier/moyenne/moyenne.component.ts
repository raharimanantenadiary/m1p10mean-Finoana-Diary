import { Component, OnInit } from '@angular/core';

import { SgarageService } from './../../../service/sgarage.service';

@Component({
  selector: 'app-moyenne',
  templateUrl: './moyenne.component.html',
  styleUrls: ['./moyenne.component.scss']
})
export class MoyenneComponent implements OnInit {

  liste_moyenne: any;

  constructor(private service: SgarageService){}

  ngOnInit(): void {
        this.getListeNonValide();
  }

  getListeNonValide(){
    return  this.service.listemoyenneparvoiture().subscribe(response => {
        this.liste_moyenne = response;
        console.log(this.liste_moyenne);
    });
  }

}
