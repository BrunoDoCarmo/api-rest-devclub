📌 Backend Node.js — Guia de Configuração

Este projeto utiliza Node.js, TypeScript, Express, Prisma, JWT, Zod, entre outras dependências essenciais para criação de APIs modernas.

🚀 Tecnologias Utilizadas

Node.js

TypeScript

Express

Prisma ORM

PostgreSQL

Zod

bcryptjs

CORS

JSON Web Token (JWT)

TSX / ts-node-dev

📂 Criar o Projeto
npm init -y

📦 Instalar Dependências
🟦 TypeScript
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init

🟩 Express
npm install express
npm install -D @types/express

🟪 Prisma + PostgreSQL
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv

npx prisma init --datasource-provider postgresql --output ../generated/prisma

🟧 Zod
npm install zod

🔐 bcryptjs
npm install bcryptjs
# Tipagens opcionais
# npm install --save-dev @types/bcrypt
# npm install --save-dev @types/bcryptjs

🔓 CORS
npm install cors
npm i --save-dev @types/cors

🔑 JWT
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

🚀 TSX
npm install tsx

📝 Configurar package.json

Adicione ou ajuste:

{
  "type": "module",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}

🔐 Gerar Secret do JWT
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

▶️ Rodar o Projeto
🧪 Ambiente de Desenvolvimento
npm run dev

🚀 Ambiente de Produção
npm run build
npm start

📁 Estrutura Recomendada do Projeto
/src
 ┣ controllers/
 ┣ services/
 ┣ repositories/
 ┣ middlewares/
 ┣ utils/
 ┣ prisma/
 ┣ server.ts
 ┗ app.ts
