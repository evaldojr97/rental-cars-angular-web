import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';

export interface Aluguel {
  dataAluguel: string;
  modeloCarro: string;
  kmCarro: number;
  nomeCliente: string;
  telefoneCliente: string;
  dataDevolucao: string;
  valor: number;
  pago: 'SIM' | 'NAO';
}

export interface ListarAlugueisResponse {
  alugueis: Aluguel[];
  valorTotalNaoPago?: number;
}

export interface Carro {
  id: number;
  modelo: string;
}

@Injectable({
  providedIn: 'root'
})
export class RentalDataService {
  private apiUrl = '/api'; 
  private timeout = 15000;

  constructor(private http: HttpClient) {    
  }
  
  listarAlugueis(): Observable<ListarAlugueisResponse> {
    const url = `${this.apiUrl}/alugueis/listar`;    

    return this.http.get<ListarAlugueisResponse>(url).pipe(
      tap(response => {        
      }),
      catchError(error => {
        console.error('Erro ao buscar aluguéis:', error);
        throw error;
      })
    );
  }

    listarCarros(): Observable<Carro[]> { // Método para listar carros
    const url = `${this.apiUrl}/carros`;  

    return this.http.get<Carro[]>(url).pipe(
      timeout(this.timeout),
      tap(carros => {        
      }),
      catchError(error => {        
        throw error; // Propagar o erro para ser tratado pelo componente
      })
    );
  }

  /**
   * Converter data YYYY-MM-DD para DD/MM/YYYY
   */
  private formatarDataParaBackend(dataISO: string): string {
    try {
      const [ano, mes, dia] = dataISO.split('-');
      return `${dia}/${mes}/${ano}`;
    } catch (error) {
      console.warn('Erro ao formatar data, usando original:', dataISO);
      return dataISO;
    }
  }

  /**
   * Processar arquivo de aluguéis
   * Rota: /api/alugueis/processar
   */
  processarArquivo(fileData: FormData): Observable<any> {
    const url = `${this.apiUrl}/alugueis/processar`;    

    return this.http.post(url, fileData).pipe(
      tap((response) => {        
      }),
      catchError((error) => {        
        throw error;
      })
    );
  }
}