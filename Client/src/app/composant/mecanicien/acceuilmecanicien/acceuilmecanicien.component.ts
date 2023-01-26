import { SgarageService } from './../../../service/sgarage.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-acceuilmecanicien',
  templateUrl: './acceuilmecanicien.component.html',
  styleUrls: ['./acceuilmecanicien.component.scss']
})
export class AcceuilmecanicienComponent implements OnInit {
  all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even = [10];

  emplist_noumena: any;
  listevoitures: any;
  garage: any = [];
  fin: any = [];
  message: any;
  chart: any;

  constructor(private service: SgarageService) { }

  

  ngOnInit() {
    console.log(this.chart);
    this.getListeVoitureDepot();
    this.getListeVoitureReparation();

  }

  getListeVoitureDepot() {
    return this.service.listedepot().subscribe(response => {
      this.message = response;
      this.listevoitures = this.message;
    });
  }
 
  //mbola ovaina le fonction maka an leiz
  getListeVoitureReparation() {
    return this.service.listeReparation().subscribe(response => {
      this.message = response;
      console.log(this.message);
      this.garage = this.message;
    });
  }
  //mbola ovaina le fonction maka an leiz
  getListeVoitureFin() {
    return this.service.listedepot().subscribe(response => {
      this.message = response;
      this.fin = this.message;
    });
  }



  drop(event: CdkDragDrop<any[]>) {
    console.log(event.item.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //si depot etat == 0 
      if(event.item.data.etat == 0){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        //changement de depot dans reparation
        this.service.ajoutDeposition_dans_reparation({ "iddepot": event.item.data._id 
        }).subscribe(response => {
          this.message = response;
          console.log("Effectué");
        });
      }
        if(event.item.data.totalAv < 100 ){
          alert("La réparation n'est pas encore achevé, il faut que tout soit réprarer");
          return;
        }
        
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


 

 


}
