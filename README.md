# TaskFlow  
Aplicação web para gerenciamento de tarefas (frontend + backend)

## 🚀 Sobre  
O TaskFlow é uma aplicação simples de lista de tarefas com autenticação de usuários. Permite ao usuário se registrar, fazer login, e gerenciar suas tarefas (criar, editar, excluir, marcar como concluída).  
O projeto está dividido em duas partes: **frontend** (React) e **backend** (Node.js + Express).

## 🧩 Tecnologias  
- Frontend: React, React Router, axios, Tailwind CSS  
- Backend: Node.js, Express.js, MongoDB (ou outro banco dependendo da sua implementação)  
- Autenticação: JWT (JSON Web Token)  
- Estilização: Tailwind CSS para oferecer um visual moderno e responsivo  

## 🔧 Funcionalidades  
- Registro de usuários com nome, e-mail e senha  
- Login e gerenciamento de sessão com JWT  
- Criação, listagem, edição e remoção de tarefas  
- Marcar tarefas como concluídas  
- Interface responsiva e estilizada com gradientes e bordas arredondadas  

## 🎨 Layout  
O design segue um padrão moderno:  
- Tela de login com fundo em gradiente e container centralizado  
- Inputs com borda, borda-focada com efeito `ring`, botão estilizado  
- Mensagens de erro/sucesso destacadas com cores apropriadas  
- Tela de registro com o mesmo estilo para manter consistência  

## 📁 Estrutura do Projeto  

/taskflow
├── backend/ # Servidor Node.js + Express
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── app.js
└── frontend/ # Aplicação React
├── src/
│ ├── pages/
│ ├── components/
│ └── App.jsx
└── tailwind.config.js


## 🛠️ Começando  
### Pré-requisitos  
- Node.js instalado  
- (Opcional) MongoDB ou outro banco de dados configurado  
- Yarn ou npm  

### Instalação  
1. Clone o repositório:  
   ```bash
        git clone https://github.com/Felipe-Araujo-duck/taskflow.git
        cd taskflow
        cd backend
        npm install
        # ou
        yarn install

        node src/server.js

        cd ../frontend
        npm install
        # ou
        yarn install

        npm run dev

    ```
### ✅ Contribuições

Sinta-se à vontade para abrir issues ou pull requests. Qualquer sugestão de funcionalidade, correção de bugs ou melhorias visuais são bem-vindas!