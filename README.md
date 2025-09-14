# Pondera - Plataforma de Perguntas e Respostas

Pondera é uma plataforma moderna de perguntas e respostas construída com React, Node.js e MySQL. Permite que os usuários façam perguntas, forneçam respostas e se envolvam com o conteúdo através de sistemas de votação.

## 🌟 Funcionalidades

- **Autenticação de Usuários**: Sistema seguro de login e registro com JWT
- **Gerenciamento de Perguntas**: Criar, ler, atualizar e excluir perguntas
- **Sistema de Respostas**: Postar respostas para perguntas e participar de discussões
- **Sistema de Votação**: Curtir e não curtir perguntas e respostas
- **Categorias**: Conteúdo organizado com sistema de categorias
- **Perfis de Usuários**: Gerenciar informações pessoais e visualizar atividades
- **Design Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis
- **UI Moderna**: Interface limpa com tema escuro e animações suaves

## 🎥 Demonstração
> Criando uma conta no Pondera e se autenticando.


https://github.com/user-attachments/assets/38a83bd9-1de0-458c-bf02-79557a4a5c00



> Alterando informações pessoais na aba de visualizar seu perfil.



https://github.com/user-attachments/assets/245110db-04d8-44d9-a12e-cec8ee370905



## 🛠️ Stack Tecnológica

### Frontend

- **React 18** com React Router DOM
- **Tailwind CSS** para estilização
- **React Icons** para ícones
- **React Toastify** para notificações
- **Axios** para requisições API

### Backend

- **Node.js** com Express.js
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **MySQL** com driver mysql2
- **CORS** habilitado para requisições cross-origin

### Banco de Dados

- **MySQL** banco de dados relacional
- Tabelas: users, questions, answers, categories, question_votes

## 📦 Instalação

### Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v8.0 ou superior)
- npm ou yarn

### Configuração do Backend

1. Clone o repositório:

```bash
git clone https://github.com/luiz-matoso/pondera.git
cd pondera/backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente:

```bash
cp .env
```

Edite o `.env` com suas credenciais do banco de dados:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=pondera
JWT_SECRET=sua_chave_secreta_jwt
PORT=5000
```

4. Configure o banco de dados:

```sql
CREATE DATABASE pondera;
```

5. Execute as migrações do banco de dados (veja o schema abaixo)

6. Inicie o servidor:

```bash
npm run dev
```

### Configuração do Frontend

1. Navegue para o diretório do frontend:

```bash
cd ../frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## 🗄️ Schema do Banco de Dados

### Estrutura das Tabelas

```sql
-- Tabela de usuários
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    birthdate DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perguntas
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    likes INT DEFAULT 0,
    dislikes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de respostas
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabela de votos em perguntas
CREATE TABLE question_votes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT NOT NULL,
    user_id INT NOT NULL,
    vote_type ENUM('like', 'dislike') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_vote (question_id, user_id),
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 🚀 Endpoints da API

### Autenticação

- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário

### Perguntas

- `GET /api/questions` - Obter todas as perguntas
- `GET /api/questions/:id` - Obter pergunta específica
- `POST /api/questions` - Criar nova pergunta
- `DELETE /api/questions/:id` - Excluir pergunta
- `POST /api/questions/:id/like` - Curtir uma pergunta
- `POST /api/questions/:id/dislike` - Não curtir uma pergunta

### Respostas

- `POST /api/questions/:id/answers` - Adicionar resposta à pergunta

### Categorias

- `GET /api/questions/categories` - Obter todas as categorias

### Perfil

- `PUT /api/profile` - Atualizar perfil do usuário
- `POST /api/profile/change-password` - Alterar senha

## 🎨 Estrutura do Projeto

```
pondera/
├── backend/
│   ├── controllers/     # Controladores das rotas
│   ├── routes/         # Rotas da API
│   ├── db.js          # Conexão com o banco de dados
│   ├── services/      # Lógica de negócio
│   └── server.js      # Servidor Express
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── pages/         # Componentes de página
│   │   ├── services/      # Serviços da API
│   │   ├── assets/        # Arquivos estáticos
│   │   └── App.js         # Componente principal App
│   └── package.json
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

**Backend (.env):**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=pondera
JWT_SECRET=sua_chave_super_secreta_jwt
PORT=5000
```

**Frontend:** Atualize a URL da API nos serviços se necessário

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Se você tiver alguma dúvida ou problema, por favor abra uma issue no GitHub ou entre em contato com a equipe de desenvolvimento.
