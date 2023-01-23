import { TestService } from './../../../testservice/test.service';
import { Component , OnInit , TemplateRef} from '@angular/core';
import {CdkDragDrop,CdkDropList, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { _isTestEnvironment } from '@angular/cdk/platform';
import { Fiara } from '../../Fiara';


@Component({
  selector: 'app-acceuilmecanicien',
  templateUrl: './acceuilmecanicien.component.html',
  styleUrls: ['./acceuilmecanicien.component.scss']
})
export class AcceuilmecanicienComponent implements OnInit {
  all = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  even = [10];

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
];
garage: Fiara[] = [
  new Fiara('Kangoo', 'Renault', 2020, 1),
];

fin: Fiara[] = [
  new Fiara('Clio', 'Renault', 2021, 1),
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
