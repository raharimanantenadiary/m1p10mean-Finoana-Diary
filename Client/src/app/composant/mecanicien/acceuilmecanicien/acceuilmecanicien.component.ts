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


  emplist_noumena: any;
  listevoitures: any;
  garage: any = [];
  fin: any = [];
  message: any;
  chart: any;

  constructor(private service: SgarageService) { }

  

  ngOnInit() {
    this.getListeVoitureDepot();
    this.getListeVoitureReparation();
    this.getListeVoitureFin();

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
      this.garage = this.message;
    });
  }

  //mbola ovaina le fonction maka an leiz
  getListeVoitureFin() {
    return this.service.listeReparationFin().subscribe(response => {
      this.message = response;
      this.fin = this.message;
      // console.log('fin',response);
    });
  }



  drop(event: CdkDragDrop<any[]>) {
    console.log(event.item.data);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // si depot etat == 0 
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
        if( event.item.data.depot.etat == 1  && event.item.data.sumAvanc == 100 ){
          console.log('reparation',event.item.data._id);
          console.log('depot',event.item.data.depot._id);
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
          );

          this.service.transfertDansFin({"idreparation": event.item.data._id ,"iddepot": event.item.data.depot._id}).subscribe(response => {
                this.getListeVoitureReparation();
        });
      }
        if( event.item.data.depot.etat == 1  && event.item.data.sumAvanc < 100 ){
          alert("La répration n'est pas encore achevé");
          return;
        }

    }
  }


 

 


}
