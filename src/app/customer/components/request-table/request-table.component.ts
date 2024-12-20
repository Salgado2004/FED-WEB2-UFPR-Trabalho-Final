import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonStatusComponent } from '../../../core/components/button-status/button-status.component';
import { RequestItem } from '../../../core/types';
import { LimitedDescriptionPipe, StatusTextPipe, StatusColorPipe } from '../../../core/utils/pipes';
import { GlobalTableComponent } from '../../../core/components/global-table/global-table.component';

@Component({
  selector: 'app-request-table',
  standalone: true,
  imports: [
    CommonModule,
    ButtonStatusComponent,
    StatusColorPipe,
    GlobalTableComponent,
  ],
  providers: [StatusTextPipe, DatePipe, LimitedDescriptionPipe],
  templateUrl: './request-table.component.html',
  styleUrl: './request-table.component.css',
})
export class RequestTableComponent implements OnInit, OnChanges {
  @Input() requests: RequestItem[] = [];
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() nextPage: () => void = () => {};
  @Input() previousPage: () => void = () => {};
  @Input() reportData: RequestItem[] = [];

  constructor(
    private statusTextPipe: StatusTextPipe,
    private datePipe: DatePipe,
    private limitedDescriptionPipe: LimitedDescriptionPipe
  ) {}

  formattedRequests: {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
    image: string;
    formattedStatus: string;
  }[] = [];

  formattedReportData: {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
    image: string;
    formattedStatus: string;
  }[] = [];

  updateRequests = () => {
    this.formattedRequests = this.requests.map((req) => {
      return {
        ...req,
        description: this.limitedDescriptionPipe.transform(req.description, 30),
        created_at: this.datePipe.transform(req.created_at, 'dd/MM/yyyy') || '',
        formattedStatus: this.statusTextPipe.transform(req.status),
      };
    });
    
    this.formattedReportData = this.reportData.map((req) => {
      return {
        ...req,
        description: this.limitedDescriptionPipe.transform(req.description, 30),
        created_at: this.datePipe.transform(req.created_at, 'dd/MM/yyyy') || '',
        formattedStatus: this.statusTextPipe.transform(req.status),
      };
    });
  };

  ngOnInit(): void {
    this.updateRequests();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['requests']) {
      this.updateRequests();
    }
  }

  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'EQUIPAMENTO' },
    { key: 'description', label: 'DESC. SOLICITAÇÃO' },
    { key: 'created_at', label: 'DATA SOLICITAÇÃO' },
    { key: 'formattedStatus', label: 'STATUS' },
  ];

  style = {
    table:
      'table-auto border min-w-full border-gray-400 rounded-lg divide-gray-400 shadow',
    head: 'bg-gray-50',
    col: 'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    body: 'bg-white divide-y divide-gray-200',
    idRow: 'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
    commomRow: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
  };

  handleNextPage = () => {
    this.nextPage();
    this.updateRequests();
  };

  handlePreviousPage = () => {
    this.previousPage();
    this.updateRequests();
  };
}
