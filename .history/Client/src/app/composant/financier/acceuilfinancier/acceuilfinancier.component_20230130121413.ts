import { Component , OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { SfincancierService } from './../../../service/sfincancier.service';

@Component({
  selector: 'app-acceuilfinancier',
  templateUrl: './acceuilfinancier.component.html',
  styleUrls: ['./acceuilfinancier.component.scss']
})
export class AcceuilfinancierComponent implements OnInit {

  affichage: boolean = false;

  formData = { daty: '' };

  daty_default = new Date();

  
  mois:any;
  total_facture_mois : any;
  tableau_benefice:any;
  tableau_chiffre:any;
  moiss: any;
  moiss_encours: any;
  
  ngOnInit(): void {
      this.mois = this.route_actuel.snapshot.paramMap.get('mois');
      this.moiss = [1,2,3,4,5,6,7,8,9,10,11,12];
      console.log(this.moiss);
  } 
  constructor(private service: SfincancierService,private route_actuel: ActivatedRoute){}


  click_afficher(){
      this.affichage = true;
      this.getChiffreMois();
      this.getBeneficeMois();
      this.formData = { daty: '' };
  }


  

  getChiffreMois(){
    console.log( this.formData.daty.split("-")[1]);
    this.moiss_encours = new Date(this.formData.daty);
    //2023-01-01
    return  this.service.chiffremois(this.formData.daty.split("-")[1]).subscribe(response => {
      this.tableau_chiffre = response;
      console.log('chiffre', this.tableau_chiffre);
      let sommefacture =0;
      for(let i=0;i<  this.tableau_chiffre.length; i++){
          sommefacture = sommefacture +  this.tableau_chiffre[i].total;
      }
      this.total_facture_mois = sommefacture;
  });
  }
 
  getBeneficeMois(){
    return  this.service.beneficeMois(this.formData.daty.split("-")[1]).subscribe(response => {
      this.tableau_benefice = response;
      console.log('benefice', this.tableau_benefice);
  });
  }







}
