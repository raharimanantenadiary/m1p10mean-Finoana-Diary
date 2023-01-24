import { TestService } from './../../../testservice/test.service';
import { Component , OnInit , TemplateRef} from '@angular/core';
import {CdkDragDrop,CdkDropList, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { Fiara } from '../../Fiara';
// import { CdkDrage } from './CdkdDrage';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.scss']
})

export class AcceuilComponent implements OnInit {
  all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even = [10];

  searchText = '';
  annee = '';

  emplist_noumena: any;

  

  constructor(private service: TestService){}

  ngOnInit(){
     this.service.getListe_Nomena().subscribe(result => {  this.emplist_noumena = result; });
     console.log(this.emplist_noumena);
  }
    
  voitures: Fiara[] = [
    new Fiara('Toyota', 'Camry', 2020, 1),
    new Fiara('Honda', 'Civic', 2021, 2),
    new Fiara('Ford', 'Mustang', 2019, 3),
    new Fiara('Chevrolet', 'Camaro', 2018, 4),
    new Fiara('Tesla', 'Model S', 2017, 5),
    new Fiara('Nissan', 'Altima', 2016, 6),
    new Fiara('Hyundai', 'Sonata', 2015, 7),
    new Fiara('Kia', 'Optima', 2014, 8),
    new Fiara('Subaru', 'Outback', 2013, 9)
];
garage: Fiara[] = [
  new Fiara('Kangoo', 'Renault', 2020, 1),
];
  
  
drop(event: CdkDragDrop<Fiara[]>) {
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

  evenPredicate() {
    return true;
  }
  

  verifieranne(item: CdkDrag<Fiara>){
    return item.data.year > 2016;
  }

  noReturnPredicate() {
    return true;
  }
 
  }
