import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { AuthService } from '../../../auth/utils/auth.service';
import { RequestsService } from '../../../core/utils/requests.service';
import { EmployeeService } from '../../../core/utils/employee.service';
import { CpfMaskPipe, AddressPipePipe } from '../../../core/utils/pipes';
import { EquipCategoryService } from '../../../core/utils/equip-category.service';
import { Request, Customer, EquipCategory, requestUpdate } from '../../../core/types';
import { ModalService, ModalType, ModalResponse } from '../../../core/components/modal';
import { ButtonComponent, NavbarComponent, FooterComponent } from '../../../core/components';
import { FormInputComponent } from '../../../core/components/form-input/form-input.component';
import { StatusStepperComponent } from "../../../customer/components/status-stepper/status-stepper.component";

@Component({
  selector: 'app-visualize-service-employee',
  standalone: true,
  imports: [ButtonComponent, NavbarComponent, FooterComponent, CommonModule, FormInputComponent, StatusStepperComponent, CpfMaskPipe, ReactiveFormsModule, AddressPipePipe],
  providers: [RequestsService, EquipCategoryService, EmployeeService, AuthService],
  templateUrl: './visualize-service-employee.component.html',
  styleUrl: './visualize-service-employee.component.css'
})
export class VisualizeServiceEmployeeComponent {
  private serviceId!: number;
  open: boolean = false;
  approved: boolean = false;
  paid: boolean = false;
  orcamento: FormGroup;
  value: FormControl;
  request: Request;
  customer: Customer;
  equipCategory: EquipCategory;

  @ViewChild(StatusStepperComponent) statusStepper!: StatusStepperComponent;

  constructor(private modal: ModalService,
    private view: ViewContainerRef,
    private route: ActivatedRoute,
    private requestsService: RequestsService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.request = {} as Request;
    this.customer = {} as Customer;
    this.equipCategory = {} as EquipCategory;
    this.loadData();

    this.orcamento = new FormGroup({
      value: new FormControl('')
    });
    this.value = this.orcamento.get('value') as FormControl;
  }

  async loadData() {
    try {
      this.serviceId = Number.parseInt(this.route.snapshot.paramMap.get("id") || '');
      this.request = await lastValueFrom(this.requestsService.getRequestById(this.serviceId));
      this.customer = this.request.customer;
      this.equipCategory = this.request.equipCategory;
      this.checkStatus();
    } catch (error) {
      console.error(error);
    }
  }

  checkStatus() {
    this.statusStepper.setStatusSteps(this.request.status);
    switch (this.request.status[this.request.status.length - 1].category) {
      case 'open':
        this.open = true;
        break;
      case 'approved':
      case 'redirected':
        this.approved = true;
        break;
      case 'paid':
        this.paid = true;
        break;
      default:
        this.open = false;
        this.approved = false;
        this.paid = false;
        break;
    }
  }

  onFix = () => {
    const data = {
      title: 'Realizar manutenção',
      message: 'Informe a descrição do serviço realizado',
      label: 'Confirmar',
    };
    this.modal.open(this.view, ModalType.INPUT, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const repairDesc = value.message as string;
        const newData = {
          title: 'Orientações',
          message: 'Informe as orientações para o cliente',
          label: 'Enviar',
        }
        this.modal.open(this.view, ModalType.INPUT, newData).subscribe((value: ModalResponse) => {
          if (value.assert) {
            const currentStatus = this.request.status[this.request.status.length - 1].category;
            const update = new requestUpdate(this.request.requestId, currentStatus, "fixed", Date.now());
            update.repairDesc = repairDesc;
            update.customerOrientations = value.message as string;
            update.inChargeEmployeeId = Number.parseInt(this.authService.getCurrentUser().sub);
            this.requestsService.updateRequestStatus(update).subscribe(() => {
              this.loadData();
            });
          }
        });
      }
    });
  };

  onRedirect = () => {
    this.employeeService.getEmployeeList().then((employeeList) => {
      const data = {
        title: 'Serviço Redirecionado',
        message: 'Por favor, informe o nome do funcionario a redirecionar',
        label: 'Redirecionar',
        employeeList: employeeList,
        user: this.authService.getCurrentUser().name
      };
      this.modal.open(this.view, ModalType.SELECT_EMPLOYEE, data).subscribe((value: ModalResponse) => {
        if (value.assert) {
          const update = new requestUpdate(this.request.requestId, "approved", "redirected", Date.now());
          update.senderEmployeeId = Number.parseInt(this.authService.getCurrentUser().sub);
          update.inChargeEmployeeId = Number.parseInt(value.message || '');
          this.requestsService.updateRequestStatus(update).subscribe(() => {
            this.loadData();
            this.router.navigate(['/funcionario/solicitacoes']);
          });
        }
      });
    }
    )
  };

  onBudget = () => {
    if (this.orcamento.valid) {
      const data = {
        title: 'Orçamento',
        message: 'Por favor, confira o valor do orçamento',
        label: 'Orçar',
      };
      this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
        if (value.assert) {
          const update = new requestUpdate(this.request.requestId, "open", "budgeted", Date.now());
          update.budget = this.value.value;
          update.inChargeEmployeeId = Number.parseInt(this.authService.getCurrentUser().sub);
          this.requestsService.updateRequestStatus(update).subscribe(() => {
            this.loadData();
          });
        }
      });
    }
  };

  onPaid = () => {
    const data = {
      title: 'Finalização',
      message: 'Você confirma a finalização do serviço? Tem certeza mesmo?',
      label: 'Finalizar'
    };
    this.modal.open(this.view, ModalType.CONFIRM, data).subscribe((value: ModalResponse) => {
      if (value.assert) {
        const update = new requestUpdate(this.request.requestId, "paid", "finalized", Date.now());
        update.inChargeEmployeeId = Number.parseInt(this.authService.getCurrentUser().sub);
        this.requestsService.updateRequestStatus(update).subscribe(() => {
          this.loadData();
        });
      }
    });
  };

  styles = {
    main: 'container mx-auto p-4 max-w-4xl min-h-screen flex flex-col items-center bg-gray-100 min-w-full', // Adiciona max-width
    submain: 'mb-4 px-8 p-4 border rounded-lg shadow-sm flex flex-wrap bg-white w-full max-w-4xl', // Adiciona flex-wrap
    submain2: 'mb-4 p-4 border rounded-lg shadow-sm bg-white  w-full max-w-4xl',
    title: 'text-2xl font-bold mb-4 text-center',
    subtitle: 'text-2xl font-bold mb-4 basis-full',
    basisHalf: 'basis-1/2 mb-4',
    basisFull: 'basis-full mb-4',
    semibold: 'font-semibold mb-2',
    textWrap: 'break-words overflow-hidden', // Adiciona quebra de texto e oculta o excesso
    textContainer: 'max-w-full', // Define a largura máxima do contêiner de texto
    form: 'flex flex-col gap-2',
  }
}
