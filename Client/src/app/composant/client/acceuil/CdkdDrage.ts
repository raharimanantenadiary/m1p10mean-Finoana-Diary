import { Todo } from './Todo';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

export interface CdkDrage extends CdkDragDrop<Todo[],any,any> {
  data: any;
}