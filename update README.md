# 📌 Sistema de Gestão Financeira

Este é um sistema simples de **gestão de finanças pessoais**, desenvolvido com **Fastify, Prisma e Next.js**. Ele permite **cadastrar, listar e deletar transações financeiras**, categorizadas como "Entrada" ou "Saída".

## 📂 Estrutura do Projeto

```bash
finance-management/
│── backend/          # Código do servidor Fastify
│   ├── prisma/       # Configuração do banco de dados SQLite
│   ├── server.ts     # Código principal do backend
│── frontend/         # Aplicação frontend em Next.js
│   ├── app/          # Páginas e componentes do frontend
│   ├── public/       # Arquivos estáticos
│   ├── styles/       # Estilos com Tailwind CSS
│── README.md         # Documentação do projeto
```

---

## 🔧 Como Rodar o Projeto

### 1️⃣ **Clonar o Repositório**
```sh
git clone https://github.com/guvdutra/finance-management.git
cd finance-management
```

### 2️⃣ **Rodar o Backend (Fastify + Prisma + SQLite)**
```sh
cd backend
npm install
npx prisma migrate dev # Cria as tabelas no SQLite
npx ts-node server.ts  # Inicia o servidor backend
```

> O backend será executado em: **http://localhost:3001/**

### 3️⃣ **Rodar o Frontend (Next.js + Tailwind CSS)**
```sh
cd frontend
npm install
npm run dev
```

> O frontend será acessado em: **http://localhost:3000/**

---

## 🌐 Rotas da API (Backend)

| Método | Rota | Descrição |
|--------|------|-------------|
| **GET** | `/api/transactions` | Lista todas as transações |
| **POST** | `/api/transactions` | Cria uma nova transação |
| **DELETE** | `/api/transactions/:id` | Deleta uma transação pelo ID |

### **Exemplo de Requisição (POST `/api/transactions`)**
```json
{
  "description": "Salário",
  "amount": 3500.50,
  "type": "income",
  "date": "2025-02-03"
}
```

### **Exemplo de Resposta (JSON)**
```json
{
  "id": "123abc",
  "description": "Salário",
  "amount": 3500.50,
  "type": "income",
  "date": "2025-02-03"
}
```

---

## 🛢️ Modelo do Banco de Dados (Prisma + SQLite)

O banco de dados é gerenciado pelo **Prisma ORM** e utiliza **SQLite**.

### **schema.prisma**
```prisma
model Transaction {
  id          String  @id @default(uuid())
  description String
  amount      Float
  type        String // 
  date        String
}
```

Para gerar o banco de dados SQLite, rode:
```sh
npx prisma migrate dev
```

---

## 📜 Tecnologias Utilizadas

### 🔹 **Backend**
- **Fastify** - Servidor backend rápido e eficiente
- **Prisma ORM** - Gerenciamento do banco de dados SQLite
- **Zod** - Validação de dados

### 🔹 **Frontend**
- **Next.js** - Framework React para o frontend
- **Tailwind CSS** - Estilização eficiente e responsiva
- **React Hooks** - Gerenciamento de estado

### 🔹 **Banco de Dados**
- **SQLite** - Banco de dados leve e eficiente para desenvolvimento local

---

## 🚀 Melhorias Futuras
- [ ] Autenticação de usuários
- [ ] Relatórios financeiros
- [ ] Exportação de dados (CSV, PDF)

---

© Projeto desenvolvido por Guilherme Noronha de Agostini e Gustavo Viana Avelar Dutra para a disciplina Programação Web, realizada na UFLA - Universidade Federal de Lavras.
