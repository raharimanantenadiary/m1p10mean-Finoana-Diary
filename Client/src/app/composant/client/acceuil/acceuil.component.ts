import { Component, OnInit, TemplateRef ,  ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
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

  constructor(private service: SvoitureService,private depot_service: SgarageService,private router:Router, private cdr: ChangeDetectorRef) { }

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
    console.log(event.item.data.voiture._id);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if( event.item.data.voiture.etat != null){
        
          let verification_dans_la_destinataion = this.liste_voiture_garage.find( (liste_dans_garage:any) => {
              if(liste_dans_garage.voiture.etat == event.item.data.etat){return true;}
              return false;
          });
          
          if(verification_dans_la_destinataion){
                  alert("La voiture est déja dans le garage");
                }else{
                  transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex,
                    );
                    
                    alert("La voiture en cours de deposition");
              this.depot_service.ajoutDeposition({
                "idvoiture": event.item.data.voiture._id,"idclient": localStorage.getItem("id") ,"date": "03" 
              }).subscribe(response => {
                this.message = response;
                alert("Effectué");
              });
          }


        }
        if( event.item.data.voiture.etat != null  && event.item.data.voiture.etat == 1){
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
            );
            alert("ifindra");
            this.depot_service.recuperarationVoiture(event.item.data.voiture._id).subscribe(response => {
              alert("Voiture récuperer");
              this.getListeVoitureClient();
              this.getListevoitureDansGarage();
            });
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
  // this.router.navigate(['/t/acm']);
  this.service.ajoutVoiture(this.formData).subscribe(response => {
    this.getListeVoitureClient();
    this.formData = {
      marque: '',
      designation: '',
      matricule: '',
      idclient: this.idclient
    };
    });
  };



  Pas_de_retour() {
    return true;
  }

  interdireDepot(item: any) {
    return true;
}

}
