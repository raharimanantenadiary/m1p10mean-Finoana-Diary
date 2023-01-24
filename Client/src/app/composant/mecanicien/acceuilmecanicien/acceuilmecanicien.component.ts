import { SgarageService } from './../../../service/sgarage.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
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
  listevoitures: any;
  garage: any;
  fin: any;
  listevoituresdansgarage: any;
  message: any;

  constructor(private service: SgarageService) { }

  ngOnInit() {

    this.getListeVoitureDepot();

  }
  getListeVoitureDepot() {
    return this.service.listedepot().subscribe(response => {
      this.message = response;
      console.log(this.message);
      this.listevoitures = this.message;
    });
  }




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



}
