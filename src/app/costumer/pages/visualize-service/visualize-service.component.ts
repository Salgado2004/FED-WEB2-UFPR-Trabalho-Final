import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { ButtonComponent } from '../../../core/components/button/button.component';
import { StatusStepperComponent } from '../../components/status-stepper/status-stepper.component';
import { Request } from '../../../core/types/request';
import { ModalService } from '../../../core/utils/modal.service';
import { ModalType } from '../../../core/types/modal-type';
import { ModalResponse } from '../../../core/types/modal-response';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../../core/utils/requests.service';

@Component({
  selector: 'app-visualize-service',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    ButtonComponent,
    CommonModule,
    StatusStepperComponent,
  ],
  providers: [RequestsService],
  templateUrl: './visualize-service.component.html',
  styleUrl: './visualize-service.component.css',
})
export class VisualizeServiceComponent {
  serviceId!: number;
  budgeted: boolean = false;
  finalized: boolean = false;
  rejected: boolean = false;
  pageTitle: string = '';
  request: Request;
  @ViewChild(StatusStepperComponent) statusStepper!: StatusStepperComponent;

  constructor(
    private modal: ModalService, 
    private view: ViewContainerRef, 
    private route: ActivatedRoute,
    private requestsService: RequestsService) {
      try{
        this.serviceId = Number.parseInt(this.route.snapshot.paramMap.get("id") || '');
        this.requestsService.getRequestById(this.serviceId).then((data: Request) => {
          this.request = data;
          this.checkStatus();
        });
      } catch(error){
        console.error(error);
      }
      this.request = {} as Request;
  }

  styles = {
    container: "bg-gray-100 text-center py-10 min-h-screen",
    card: "max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8",
    title: "text-3xl font-bold mb-6 text-gray-800",
    contentSection: "space-y-6",
    labelText: "font-semibold text-gray-700 text-left",
    valueText: "text-gray-600 text-right",
    rowFlex: "flex justify-between items-center",
    gridSection: "grid grid-cols-1 gap-4",
    descriptionText: "break-words max-w-md",
    defectSection: "flex flex-col items-start",
    finalSection: "mt-6",
    budgetText: "font-bold text-2xl text-green-600",
    buttonContainer: "mt-6 flex justify-around",
    button: "secondary-4",
    tableContainer: "relative overflow-x-auto mt-10",
    table: "w-full text-sm text-left text-gray-700",
    tableHeader: "text-xs text-gray-700 uppercase bg-gray-200",
    tableRow: "bg-white border-b",
    tableCell: "px-6 py-4",
    footer: "mt-10",
    stepperContainer: "pt-10 max-w-3xl mx-auto"
  };
  

  onReject = () => {
    const data = {
      title: 'Serviço Recusado',
      message: 'Por favor, informe o motivo da rejeição',
      label: 'Recusar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value: ModalResponse) => {
      //TEST: Adicionar o status de rejeitado ao nosso serviço
      if(value.assert) {
        this.request.status.push({
          requestStatusId: '2',
          dateTime: new Date(),
          category: 'rejected',
          senderEmployee: '',
          inChargeEmployee: 'Alisson Gabriel',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  }

  onApprove = () => {
    //Adicionar o Modal que aprova o nosso orçamento.
    const data = {
      title: 'Serviço Aprovado',
      message: 'Serviço aprovado no valor de R$ ' + this.request.budget + '.',
      label: 'Aprovar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      //TEST: Adicionar o status de aprovado ao nosso serviço.
      if(value.assert) {
        this.request.status.push({
          requestStatusId: '3',
          dateTime: new Date(),
          category: 'approved',
          senderEmployee: '',
          inChargeEmployee: 'Alisson Gabriel',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  }

  onPay = () => {
    //Adicioanr o Modal que paga.
    const data = {
      title: 'Pagar serviço',
      message: 'Confirmar pagamento?',
      label: 'Pagar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      //TEST: Adicionar o status de pago ao nosso serviço.
      if(value.assert) {
        this.request.status.push({
          requestStatusId: '6',
          dateTime: new Date(),
          category: 'paid',
          senderEmployee: '',
          inChargeEmployee: 'Mateus Bazan',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  };

  onRescue = () => {
    //Adicionar o Modal que resgata
    const data = {
      title: 'Resgatar Serviço',
      message: 'Deseja resgatar e aprovar esse serviço?',
      label: 'Resgatar',
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      //TEST: Adicionar o status de resgatado ao nosso serviço.
      if(value.assert) {
        this.request.status.push({
          requestStatusId: '4',
          dateTime: new Date(),
          category: 'approved',
          senderEmployee: 'Alisson Gabriel',
          inChargeEmployee: 'Mateus Bazan',
          request: {} as Request
        });
        this.checkStatus();
      }
    });
  }

  checkStatus() {
    this.statusStepper.setStatusSteps(this.request.status);
    let status = this.request.status[this.request.status.length - 1].category;
    switch (status) {
      case 'fixed':
        this.finalized = true;
        this.budgeted = false;
        this.rejected = false;
        this.pageTitle = 'Pagar Serviço';
        break;
      case 'budgeted':
        this.budgeted = true;
        this.finalized = false;
        this.rejected = false;
        this.pageTitle = 'Serviço orçado';
        break;
      case 'rejected':
        this.rejected = true;
        this.finalized = false;
        this.budgeted = false;
        this.pageTitle = 'Orçamento rejeitado';
        break;
      default:
        this.rejected = false;
        this.finalized = false;
        this.budgeted = false;
        this.pageTitle = 'Visualizar Serviço';
        break;
    }
  }
}
