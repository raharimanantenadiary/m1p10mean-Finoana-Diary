import { Component, OnInit, TemplateRef ,  ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { SvoitureService } from './../../../service/svoiture.service';
import { SgarageService } from './../../../service/sgarage.service';
import { SfincancierService } from './../../../service/sfincancier.service';
import { Chart } from 'chart.js';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {

  searchText = '';
  annee = '';
  loading = false;
  loading_garage = false;
  emplist_noumena: any;
  user_actif: any;

  lineChart!: Chart;
  pieChart!: Chart ;

 
  verifierBS(idvoiture:any){
    this.loading_garage = true;
     this.service_financier.verifieBS(idvoiture).subscribe(response => {
          console.log(response);
          return true;
  });
}


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

  constructor(private service_financier: SfincancierService,private service: SvoitureService,private depot_service: SgarageService,private router:Router, private cdr: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit() {
    this.getListeVoitureClient();
    this.getListevoitureDansGarage();
    this.user_actif = localStorage.getItem("mail");

    
  }

  getListeVoitureClient(){
    this.loading = true;
    return  this.service.voitureById(localStorage.getItem("id")).subscribe(response => {
      this.message = response;
      // console.log(this.message);
      this.loading = false;
      this.listevoitures = this.message;
      // console.log("voiture 1", this.listevoitures);
    });
  }
  
  getListevoitureDansGarage(){
      this.loading_garage = true;
    return  this.service.voitureByIdDansGarage(this.idclient).subscribe(response => {
      this.message = response;
      this.loading_garage = false;
      this.liste_voiture_garage = this.message;
      console.log("voiture 1", this.listevoitures);
    });
  }
 
  

  drop(event: CdkDragDrop<any[]>) {
    console.log(event.item.data.voiture._id);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if( event.item.data.voiture.etat == 0){
                  transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex,
                    );
                    const now = new Date();

              this.depot_service.ajoutDeposition({
                "idvoiture": event.item.data.voiture._id,"idclient": localStorage.getItem("id") ,"date": now.toString() 
              }).subscribe(response => {
                this.message = response;
              this.showSuccess();
              });

            }
        if( event.item.data.voiture.etat == 1){

          //si true ----> mety
          //false tsy mety

          let verifierBS = true;
          let verfi = this.verifierBS(event.item.data.voiure._id);
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex,
            );
            console.log(verfi);
            // this.depot_service.recuperarationVoiture(event.item.data.voiture._id).subscribe(response => {
            //   this.showRecuperation();
            //   this.getListeVoitureClient();
            //   this.getListevoitureDansGarage();
            // });
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

     showSuccess() {
        this.toastr.success('Effectuée avec success!','Déplacement effectuer');
    } 
      showRecuperation() {
        this.toastr.success('Effectuée avec success!','Récupération effectuer');
    } 
      showErreur() {
        this.toastr.warning('Bon de sortie non valider par le mécanicien!','Déplacement non effectuer');
    }

}
