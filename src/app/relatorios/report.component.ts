import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RentalDataService } from '../shared/services/rental-data.service';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

interface Aluguel {
  dataAluguel: string;
  modeloCarro: string;
  kmCarro: number;
  nomeCliente: string;
  telefoneCliente: string;
  dataDevolucao: string;
  valor: number;
  pago: 'SIM' | 'NAO';
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe, CurrencyPipe, DatePipe, CommonModule, HttpClientModule]
})
export class ReportComponent implements OnInit {
  reportForm: FormGroup;
  alugueis: Aluguel[] = [];
  carros: any[] = [];
  totalDebitos: number = 0;
  isLoading = false;
  showTable = false;

  constructor(
    private fb: FormBuilder, 
    private rentalDataService: RentalDataService
  ) {
    this.reportForm = this.fb.group({
      dataAluguel: [''],
      modeloCarro: ['']
    });
  }

  ngOnInit() {
    console.log('ReportComponent inicializado');
    this.loadCarros();
  }
// Método para carregar carros do backend
  loadCarros() {
    this.rentalDataService.listarCarros().subscribe({ 
      next: (carros) => {
        this.carros = carros;
        console.log('Carros carregados:', carros);
      },
      error: (error) => {
        console.error('Erro ao carregar carros:', error);
        this.carros = []; // Limpa a lista de carros em caso de erro
      }
    });
  }

  search() {
    console.log('Método search() chamado');
    console.log('Valores do formulário:', this.reportForm.value);

    this.isLoading = true;
    this.showTable = false;

    // Carregar todos os registros do backend
    this.rentalDataService.listarAlugueis().subscribe({
      next: (response) => {
        console.log('Resposta recebida do serviço:', response);

        // Aplicar filtros localmente
        const filtros = {
          dataAluguel: this.reportForm.value.dataAluguel || '',
          modeloCarro: this.reportForm.value.modeloCarro || ''
        };
        
        this.alugueis = response.alugueis 
          .map(aluguel => ({
            ...aluguel,
            dataAluguel: this.convertToISODate(aluguel.dataAluguel),
            dataDevolucao: this.convertToISODate(aluguel.dataDevolucao)
          }))
          .filter(aluguel => {
            const dataAluguelMatch = filtros.dataAluguel
              ? aluguel.dataAluguel === filtros.dataAluguel
              : true;

            const modeloCarroMatch = filtros.modeloCarro
              ? aluguel.modeloCarro === filtros.modeloCarro
              : true;

            return dataAluguelMatch && modeloCarroMatch;
          });

        this.calculateTotalDebitos();
        this.isLoading = false;
        this.showTable = true;
        console.log('Aluguéis processados após filtro:', this.alugueis);
        console.log('Total de débitos:', this.totalDebitos);
      },
      error: (error) => {
        console.error('Erro ao buscar aluguéis:', error);
        this.isLoading = false;
        this.showTable = false;
      }
    });
  }

  // Método para converter datas no formato DD/MM/YYYY para ISO (YYYY-MM-DD)
  private convertToISODate(date: string): string {
    if (!date) return '';
    const [dia, mes, ano] = date.split('/');
    return `${ano}-${mes}-${dia}`;
  }

  private calculateTotalDebitos() {
    this.totalDebitos = this.alugueis
      .filter(item => item.pago === 'NAO')
      .reduce((sum, item) => sum + item.valor, 0);
    
    console.log('Total de débitos calculado:', this.totalDebitos);
  }

  formatarDataBrasileira(dataISO: string): string {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  formatPhone(phone: string): string {
    if (!phone) return '';
    
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 11) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 7)}-${cleaned.substring(7)}`;
    } else if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 2)}) ${cleaned.substring(2, 6)}-${cleaned.substring(6)}`;
    }
    
    return phone;
  }

  trackByFn(index: number, item: Aluguel): string {
    return `${item.nomeCliente}-${item.dataAluguel}-${index}`; 
  }
}