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

  daty_default = new Date().toLocaleDateString();

  
  mois:any;
  total_facture_mois : any;
  tableau_benefice:any;
  tableau_chiffre:any;
  moiss_encours: any;
  
  
  tableau_benefice_default:any;
  tableau_chiffre_default:any;
  moiss_encours_default: any;
  total_facture_mois_default : any;
  
  ngOnInit(): void {
      this.mois = this.route_actuel.snapshot.paramMap.get('mois');
      // this.tableau_benefice_default();
      // this.tableau_chiffre_default();
      console.log(this.daty_default);
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
      // console.log('chiffre', this.tableau_chiffre);
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
      // console.log('benefice', this.tableau_benefice);
  });
  }


  // getChiffreMoisDefault(){
  //   console.log("default date",this.daty_default);
  //   // console.log( this.formData.daty.split("-")[1]);
  //   //2023-01-01
  //   return  this.service.chiffremois(this.daty_default.split("-")[1]).subscribe(response => {
  //     this.tableau_chiffre_default = response;
  //     // console.log('chiffre', this.tableau_chiffre_default);
  //     let sommefacture =0;
  //     for(let i=0;i<  this.tableau_chiffre_default.length; i++){
  //         sommefacture = sommefacture +  this.tableau_chiffre_default[i].total;
  //     }
  //     this.total_facture_mois_default = sommefacture;
  // });
  // }
 
  // getBeneficeMoisDefault(){
  //   return  this.service.beneficeMois(this.daty_default.split("-")[1]).subscribe(response => {
  //     this. tableau_benefice_default = response;
  //     console.log('benefice', this. tableau_benefice_default);
  // });
  // }







}
