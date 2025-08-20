import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType, HttpResponse } from '@angular/common/http';
import { RentalDataService } from '../shared/services/rental-data.service';

interface ProcessamentoResultado {
  processados: number;
  alertas: string[];
  erros: string[];
  sucesso: boolean;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef;

  // Estados do componente
  selectedFile: File | null = null;
  uploadProgress = 0;
  isUploading = false;
  uploadSuccess = false;
  uploadError = false;
  errorMessage = '';
  successMessage = '';
  isDragOver = false;

  // Resultado do processamento
  processamentoResultado: ProcessamentoResultado | null = null;
  
  constructor(private rentalDataService: RentalDataService) {}

  ngOnInit() {    
  }

  // Métodos de Drag & Drop (mantém igual)
  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }
  // Método para captura do drag leave
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }
  // Método para captura do drop de arquivo
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  // Método para seleção via botão (mantém igual)
  onFileSelect() {
    this.fileInput.nativeElement.click();
  }
  // Método para captura de mudança no input de arquivo
  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];      
    } else {
      this.selectedFile = null;
    }
  }

  // Processar arquivo selecionado (mantém igual)
  handleFileSelection(file: File) {    

    // Validar tipo de arquivo
    if (!this.isValidFileType(file)) {
      this.showError('Apenas arquivos .rtn são aceitos.');
      return;
    }

    // Validar tamanho (10MB máximo)
    if (file.size > 10 * 1024 * 1024) {
      this.showError('O arquivo deve ter no máximo 10MB.');
      return;
    }

    this.selectedFile = file;
    this.resetStates();    
  }

  // Validar tipo de arquivo (mantém igual)
  isValidFileType(file: File): boolean {
    return file.name.toLowerCase().endsWith('.rtn');
  }

  processarArquivo() {
    if (!this.selectedFile) {
      this.showError('Por favor, selecione um arquivo antes de processar.');
      return;
    } 

    // Resetar estados
    this.isUploading = true;
    this.uploadError = false;
    this.uploadSuccess = false;
    this.uploadProgress = 0;

    // Cria o FormData
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name); 
    
    this.rentalDataService.processarArquivo(formData).subscribe({
      next: (response) => {        
        
        // Simular progresso para UX
        this.uploadProgress = 100;
        
        // Processar resposta real do backend
        const resultado: ProcessamentoResultado = {
          processados: response.totalProcessados || response.processados || 0,
          alertas: response.alertas || [],
          erros: response.erros || [],
          sucesso: true
        };

        this.handleUploadSuccess(resultado);
      },
      error: (error) => { // Tratar erro de upload
        console.error('ERRO no processamento:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        
        this.uploadProgress = 0;
        this.handleUploadError(error);      
        
      }
    });
  }
  
  handleUploadSuccess(resultado: ProcessamentoResultado) { // Tratar sucesso do upload
    this.isUploading = false;
    this.uploadProgress = 100;
    this.processamentoResultado = resultado;
    
    if (resultado.sucesso && resultado.processados > 0) {
      this.uploadSuccess = true;
      this.successMessage = `${resultado.processados} registros processados e salvos no banco!`;      
    } else {
      this.uploadError = true;
      this.errorMessage = 'Nenhum registro foi processado.';
    }
  }

  
  handleUploadError(error: any) { // Tratar erro de upload
    this.isUploading = false;
    this.uploadProgress = 0;
    this.uploadError = true;
    
    // Mensagens específicas baseadas no erro
    if (error.status === 0) {
      this.errorMessage = 'Erro de conexão. Verifique se o backend está rodando na porta 8080.';
    } else if (error.status === 400) {
      this.errorMessage = 'Arquivo inválido ou formato incorreto.';
    } else if (error.status === 413) {
      this.errorMessage = 'Arquivo muito grande.';
    } else if (error.status === 500) {
      this.errorMessage = 'Erro interno do servidor.';
    } else {
      this.errorMessage = error.error?.message || error.message || 'Erro desconhecido';
    }    
  }

  // Métodos auxiliares
  showError(message: string) {
    this.uploadError = true;
    this.errorMessage = message;
  }
  // Método para remover arquivo selecionado
  removerArquivo() {
    this.selectedFile = null;
    this.resetStates();
    this.resetFileInput();
  }
  // Método para resetar estados do componente
  resetStates() {
    this.uploadProgress = 0;
    this.isUploading = false;
    this.uploadSuccess = false;
    this.uploadError = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.processamentoResultado = null;
  }
  // Método para resetar o input de arquivo
  resetFileInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
  // Método para fechar mensagem de sucesso
  fecharMensagemSucesso() {
    this.uploadSuccess = false;
    this.successMessage = '';
  }
  // Método para fechar mensagem de erro
  fecharMensagemErro() {
    this.uploadError = false;
    this.errorMessage = '';
  }
  // Método para formatar o tamanho do arquivo
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
  // Método para verificar se o upload pode ser processado
  get canProcess(): boolean {
    return this.selectedFile !== null && !this.isUploading;
  }
  // Método para obter o estado atual do componente
  get currentState(): 'initial' | 'selected' | 'uploading' | 'success' | 'error' {
    if (this.uploadSuccess) return 'success';
    if (this.uploadError) return 'error';
    if (this.isUploading) return 'uploading';
    if (this.selectedFile) return 'selected';
    return 'initial';
  }
}