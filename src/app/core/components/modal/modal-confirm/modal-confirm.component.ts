import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal.component';

@Component({
  selector: 'app-modal-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../modal.component.html',
})
export class ModalConfirmComponent extends ModalComponent implements OnInit{

  ngOnInit(): void {
    this.showCancel = true;
  }

  override checkModal(): { [key: string]: boolean; } {
    return { [this.modal]: true, 'border-yellow-400': true };
  }

  override resolve(): boolean {
    return true;
  }

}