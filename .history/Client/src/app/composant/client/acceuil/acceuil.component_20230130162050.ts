import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
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
  searchTextGarage = '';
  annee = '';
  loading = false;
  loading_garage = false;
  emplist_noumena: any;
  user_actif: any;

  lineChart!: Chart;
  pieChart!: Chart;
  liste_bon: any;

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

  constructor(private service_financier: SfincancierService, private service: SvoitureService, private depot_service: SgarageService, private router: Router, private cdr: ChangeDetectorRef, private toastr: ToastrService) { }

  ngOnInit() {
    this.getListeVoitureClient();
    this.getListevoitureDansGarage();
    this.user_actif = localStorage.getItem("nom");


  }

  getListeVoitureClient() {
    this.loading = true;
    return this.service.voitureById(localStorage.getItem("id")).subscribe(response => {
      this.message = response;
      // console.log(this.message);
      this.loading = false;
      this.listevoitures = this.message;
      // console.log("voiture 1", this.listevoitures);
    });
  }

  getListevoitureDansGarage() {
    this.loading_garage = true;
    return this.service.voitureByIdDansGarage(this.idclient).subscribe(response => {
      this.message = response;
      this.loading_garage = false;
      this.liste_voiture_garage = this.message;
      // console.log("voiture 1", this.listevoitures);
    });
  }

  verifierBS(idvoiture: any) {
    return this.service_financier.verifieBS(idvoiture).subscribe(response => {
      console.log(response);
    });
  }




  drop(event: CdkDragDrop<any[]>) {
    console.log("etat", event.item.data.voiture.etat);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.item.data.voiture.etat == 0) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
        const now = new Date();

        this.depot_service.ajoutDeposition({
          "idvoiture": event.item.data.voiture._id, "idclient": localStorage.getItem("id"), "date": now.toString()
        }).subscribe(response => {
          this.message = response;
          this.getListeVoitureClient();
          this.getListevoitureDansGarage();
          this.showSuccess();
        });

      }
      if (event.item.data.voiture.etat == 1) {

        this.service_financier.verifieBS(event.item.data.voiture._id).subscribe(response => {
            console.log(response);
            this.liste_bon = response;
            if (this.liste_bon == true) {
              transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
              );
    
              // this.depot_service.recuperarationVoiture(event.item.data.voiture._id).subscribe(response => {
              //   this.showRecuperation();
              //   this.getListeVoitureClient();
              //   this.getListevoitureDansGarage();
              // });
              this.showSuccess();
            } else {
              this.showErreur();
              this.getListeVoitureClient();
              this.getListevoitureDansGarage();
              return;
            }
          });
      }
    }
  }
  // lala
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
    console.log('form', this.formData);
    if (!this.formData.marque && !this.formData.designation && !this.formData.matricule) {
      this.showErreur();
      return;
    } else if (this.formData.marque && this.formData.designation && this.formData.matricule) {
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
    }
  };


  showErreurAjoutVoiture() {
    this.toastr.warning('Erreur!', 'Veuillez completer les champs!');
  }



  Pas_de_retour() {
    return true;
  }

  interdireDepot(item: any) {
    return true;
  }

  showSuccess() {
    this.toastr.success('Effectuée avec success!', 'Déplacement effectuer');
  }
  showRecuperation() {
    this.toastr.success('Effectuée avec success!', 'Récupération effectuer');
  }
  showErreur() {
    this.toastr.warning('Bon de sortie non valider par le mécanicien!', 'Déplacement non effectuer');
  }

}
