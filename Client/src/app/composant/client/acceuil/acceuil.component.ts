import { TestService } from './../../../testservice/test.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { Fiara } from '../../Fiara';
import { SvoitureService } from './../../../service/svoiture.service';
import { SgarageService } from './../../../service/sgarage.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {

  searchText = '';
  annee = '';

  emplist_noumena: any;

 


  message: any;

  idclient: any = localStorage.getItem("id");

  listevoitures: any;
  liste_voiture_garage: any;


  formData = {
    marque: '',
    designation: '',
    matricule: '',
    idclient: this.idclient
  };

  constructor(private service: SvoitureService,private depot_service: SgarageService) { }

  ngOnInit() {
    this.getListeVoitureClient();
    this.getListevoitureDansGarage();
  }

  getListeVoitureClient(){
    return  this.service.voitureById(localStorage.getItem("id")).subscribe(response => {
      this.message = response;
      // console.log(this.message);
      this.listevoitures = this.message;
      // console.log("voiture 1", this.listevoitures);
    });
  }
  
  getListevoitureDansGarage(){
    return  this.service.voitureByIdDansGarage(this.idclient).subscribe(response => {
      this.message = response;
      this.liste_voiture_garage = this.message;
      console.log("voiture 1", this.listevoitures);
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Si on veu faire un autre transfert on ajoute une autre condition 
      //c est tout les Noums bonne continuation la kkkkk hahahahahahah
      //affichage mbola amboariko fa afahana miasa ftsn aloh zao no atao hahahahahahhahah
      if( event.item.data.voiture.etat != null  && event.item.data.voiture.etat == 0){
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
          );
          this.depot_service.ajoutDeposition({
            "idvoiture": event.item.data.voiture._id,"idclient": localStorage.getItem("id") ,"date": "03" 
          }).subscribe(response => {
            this.message = response;
            alert("Effectué");
          });
        }
        if( event.item.data.voiture.etat != null  && event.item.data.voiture.etat == 1){
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
            );
          }
    }
}

drop_vers_parking(event: CdkDragDrop<any[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        );
  }
}

Ajouter() {
    console.log('form',this.formData);
    this.service.ajoutVoiture(this.formData).subscribe(response => {
      this.message = response;
      this.getListeVoitureClient();
    });
    this.getListeVoitureClient();
  };

  Pas_de_retour() {
    return true;
  }

  interdireDepot(item: any) {
    return true;
}

}
