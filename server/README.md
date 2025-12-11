# BACK-END
## Configuração para um back-end em NOJE.js

### CRIAR PROJETO
npm init -y

### Dependências
#### TYPESCRIPT
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init

#### EXPRESS
npm install express
npm install -D @types/express

#### PRISMA
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
npx prisma init --datasource-provider postgresql --output ../generated/prisma

#### ZOD
npm install zod

#### BCRYPTJS
npm install bcryptjs
###### npm install --save-dev @types/bcrypt
###### npm install --save-dev @types/bcryptjs

#### CORS
npm install cors
npm i --save-dev @types/cors

#### JSONWEBTOKEN
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken

#### TSX
npm install tsx

### ALTERAR PACKAGE.json
"type": "module"
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"

### JWT SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

### RODAR PROJETO

#### Desenvolvimento:
npm run dev

#### Produção:
npm run build
npm start
