import { Component, Input } from '@angular/core';
import { Request, RequestStatus } from '../../../core/types/request';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ButtonProps } from "../../../core/components/button/button.component";
import { ButtonStatusComponent } from "../../../core/components/button-status/button-status.component";
import { LimitedDescriptionPipe } from '../../../core/utils/limited-description.pipe';
@Component({
  selector: 'app-request-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ButtonStatusComponent, LimitedDescriptionPipe],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css'
})
export class RequestCardComponent {
  @Input() request: Request = {
    id: 0,
    title: 'Default Title',
    description: 'Default Description',
    status: 'open',
    created_at: '2021-01-01',
    image: 'https://via.placeholder.com/150'
  };

  debugRequest(request: Request) {
  }

    /* export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'paid' | "canceled" | "fixed" | "budgeted" | "redirected" | undefined; */

 
  getColorbyStatus(status: RequestStatus):string {
    let color: string;

    switch (status) {
      case 'open':
        color = 'bg-yellow-300';
        break;
      case 'approved':
        color = 'bg-green-300';
        break;
      case 'rejected':
        color = 'bg-red-300';
        break;
      case 'finalized':
        color = 'bg-gray-300';
        break;
      case 'paid':
        color = 'bg-blue-300';
        break;
      case 'fixed':
        color = 'bg-teal-300';
        break;
      case 'budgeted':
        color = 'bg-orange-300';
        break;
      case 'redirected':
        color = 'bg-purple-300';
        break;
      default:
        color = 'bg-gray-300';
    }
    return color;
  }

  getStatusText(status: RequestStatus): string {
    switch(status) {
      case 'open':
        return 'Aberta';
      case 'budgeted':
        return 'Orçada';
      case 'rejected':
        return 'Rejeitada';
      case 'approved':
        return 'Aprovada';
      case 'redirected':
        return 'Redirecionada';
      case 'fixed':
        return 'Arrumada';
      case 'paid':
        return 'Paga';
      case 'finalized':
        return 'Finalizada';
      default:
        return 'Indefinido';
    }
  }
  
  

  style = {
    cardContainer: "w-80 h-96 border rounded-lg overflow-hidden shadow-md flex flex-col align-middle justify-center items-center",
    cardHeader: `flex w-full items-center justify-between p-3 w-full`,	
    title: "text-md text-default-black font-bold",	
    statusText: "text-xs text-default-black",
    cardContentContainer: "flex flex-col w-full justify-between flex-1",
    cardImageContainer: "flex justify-center h-1/2 overflow-hidden",
    cardImage: "h-4/6 ",
    cardDataContainer: "flex flex-col p-4 flex-1 border-t justify-between",
    cardData: "flex flex-col gap-4",
    cardDescription: "text-sm text-default-black",
    cardDate: "text-xs text-default-black font-semibold",
    cardButtonSection: "flex justify-between justify-self-end aling-self-end items-center",
    cardButton: "text-xs p-2 cursor-pointer text-default-black font-semibold rounded",
  }

    buttonPropColor: string = "";
    ngOnInit(): void {
      this.buttonPropColor = this.getColorbyStatus(this.request.status);
    }
  button: ButtonProps = {
    text: 'Visualizar',
    color: this.buttonPropColor,
    size: 'medium',
    textColor: 'default-black',
    onClick: () => this.debugRequest(this.request),
    extraClasses: 'cursor-pointer',
  }
}
