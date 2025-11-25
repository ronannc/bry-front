# BRY Frontend

Este projeto é um frontend Angular 17 para gestão de empresas e pessoas, integrado ao backend Laravel. Utiliza Angular Material para UI moderna, navegação, tabelas, formulários, paginação e filtros dinâmicos.

## Funcionalidades
- CRUD completo para empresas e pessoas
- Visualização cruzada: empresas vinculadas a pessoas e vice-versa
- Paginação e filtros dinâmicos integrados ao backend
- Tema escuro, footer personalizado, feedback visual
- Componente reutilizável para exibição de erros da API
- Estrutura organizada em `src/app/screens` por domínio

## Estrutura do Projeto
```
front-bry/
├── src/
│   ├── app/
│   │   ├── screens/
│   │   │   ├── company/
│   │   │   └── person/
│   │   ├── models/
│   │   ├── services/
│   │   └── shared/
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/ronannc/bry-front.git
   cd bry-front/front-bry
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Executando em modo desenvolvimento
```sh
npm start
```
Acesse [http://localhost:4200](http://localhost:4200) no navegador.

## Build para produção
```sh
ng build
```
Os artefatos serão gerados em `dist/front-bry`.

## Configuração de ambiente
Edite os arquivos em `src/environments` para configurar URLs da API e variáveis globais.

## Observações
- O backend deve estar rodando e acessível conforme configurado em `environment.ts`.
- Para dúvidas sobre comandos Angular CLI, consulte [Angular CLI Docs](https://angular.io/cli).

---

Desenvolvido por Ronan.
