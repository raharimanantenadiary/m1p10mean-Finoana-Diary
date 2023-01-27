import { Component , OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuilfinancier',
  templateUrl: './acceuilfinancier.component.html',
  styleUrls: ['./acceuilfinancier.component.scss']
})
export class AcceuilfinancierComponent implements OnInit {

  affichage: boolean = false;

  formData = { daty: '' };

  ngOnInit(): void {

  }


  click_afficher(){
      this.affichage = true;
  }




}
