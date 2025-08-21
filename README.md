Rental Cars Angular Web Challenge

Bem vindo ao desafio técnico Angular web Rental Cars!

Este aplicativo tem por objetivo avaliar o desenvolvimento de códigos em Angular, e funciona da seguinte maneira:

Seu objetivo é controlar os alugueis de veículos de uma locadora, lendo arquivos de entrada de dados e gerando relatórios.

Faça um fork do projeto, crie uma nova branch com seu nome a partir da Master, desenvolva as telas apresentadas nas imagens que se encontram na pasta 'telas' deste repositório e submita um pull request
no projeto.
* Seja o mais fiel possível ao layout apresentado.
* Respeite a estrutura de menus apresentada.
* Caso necessário, consuma a APi fornecida para obter os dados necessários.

## Informações Técnicas do Projeto

### Stack Tecnológica

**Framework Principal:**
- **Angular 17.1.0** - Framework SPA (Single Page Application) da Google
- **TypeScript 5.3.2** - Superset JavaScript com tipagem estática
- **SCSS** - Pré-processador CSS com recursos avançados

**Bibliotecas de Interface:**
- **PrimeNG 17.10.0** - Componentes UI ricos e responsivos
- **PrimeFlex 3.3.1** - Sistema de grid e utilitários CSS
- **PrimeIcons 6.0.1** - Biblioteca de ícones
- **Font Awesome 4.7.0** - Ícones adicionais

**Ferramentas de Desenvolvimento:**
- **Angular CLI 17.1.1** - Interface de linha de comando para Angular
- **Karma** - Framework de testes unitários
- **Jasmine** - Biblioteca de testes BDD

### Estrutura de Diretórios

```
src/
├── app/
│   ├── core/                 # Módulos core (singleton services, guards)
│   │   ├── auth/            # Guard de autenticação
│   │   ├── layout/          # Componentes de layout principal
│   │   └── template/        # Template components (header, footer, menu)
│   ├── feature/             # Módulos de funcionalidades
│   │   └── home/           # Página inicial
│   ├── relatorios/         # Módulo de relatórios
│   ├── upload/             # Módulo de upload de arquivos
│   └── shared/            # Módulos compartilhados
│       ├── components/     # Componentes reutilizáveis
│       └── services/       # Serviços compartilhados
├── assets/                # Recursos estáticos
│   ├── themes/           # Temas do PrimeNG
└── environments/         # Configurações por ambiente
```

### Configurações do Projeto

**Configuração de Build:**
- **Output Directory:** `dist/projeto-imobiliario`
- **Prefixo de Componentes:** `app`
- **Estilo Padrão:** SCSS
- **Otimização:** Configurações para produção e desenvolvimento

**Proxy Configuration:**
- **Endpoint API:** `/api`
- **Target:** `http://localhost:8080`
- **Configuração:** Suporte para CORS e desenvolvimento local

### Configuração de Autenticação

**Keycloak Configuration:**
- **URL:** `https://localhost/auth`
- **Realm:** `real`
- **Client ID:** `cliId`

### Comandos de Desenvolvimento

**Instalação de Dependências:**
```bash
npm install
```

**Execução em Desenvolvimento:**
```bash
npm start
# ou
ng serve
```
A aplicação estará disponível em `http://localhost:4200`

**Build para Produção:**
```bash
npm run build
# ou
ng build --configuration=production
```

**Execução de Testes:**
```bash
npm test
# ou
ng test
```

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Realiza o build de produção
- `npm run watch` - Build contínuo para desenvolvimento
- `npm test` - Executa os testes unitários

### Funcionalidades Implementadas

1. **Upload de Arquivos:** Interface para carregamento de arquivos RTN
2. **Relatórios:** Visualização de relatórios de aluguel
3. **Layout Responsivo:** Adaptável para desktop e mobile
4. **Menu de Navegação:** Estrutura hierárquica de menus
5. **Integração com API:** Consumo de endpoints REST

### Configuração de Ambiente

**Arquivos de Configuração:**
- `src/environments/environment.ts` - Desenvolvimento
- `src/environments/environment.prod.ts` - Produção
- `src/environments/environment.homolog.ts` - Homologação
- `src/environments/environment.development.ts` - Desenvolvimento alternativo

### Dependências Principais

**Runtime Dependencies:**
- `@angular/*` - Framework Angular completo
- `rxjs` - Programação reativa
- `zone.js` - Sistema de detecção de mudanças

**Development Dependencies:**
- `@angular-devkit/*` - Ferramentas de build
- `@types/*` - Definições de tipos TypeScript
- `karma-*` - Ferramentas de teste

### Temas e Estilos

O projeto utiliza o tema padrão do PrimeNG com customizações em SCSS. Os estilos globais estão configurados em `src/styles.scss` com importação do Font Awesome para ícones adicionais.

### Configuração de API

**Endpoints Disponíveis:**
- `/api/upload` - Upload de arquivos
- `/api/reports` - Relatórios de aluguel
- `/api/vehicles` - Gestão de veículos
- `/api/rentals` - Gestão de aluguéis

### Notas de Desenvolvimento

- O projeto está configurado com TypeScript strict mode habilitado
- Utiliza SCSS para estilização com suporte a variáveis e mixins
- Configuração de proxy para desenvolvimento local com backend
- Estrutura modular seguindo as melhores práticas do Angular
