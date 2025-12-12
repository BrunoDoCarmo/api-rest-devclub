# Configuração para um back-end em NOJE.js

## Iniciar o projeto

npm init -y

## Dependências principais

npm install express
npm install jsonwebtoken
npm install bcryptj
npm i cors

## Dependências de desenvolvimento

npm install -D typescript ts-node-dev @types/express @types/node
npm i --save-dev @types/bcryptj
npm i --save-dev @types/jsonwebtoken
npm i --save-dev @types/cors

## Criar o arquivo de configuração do TypeScript

npx tsc --init

## Altere o package.json

"type": "module"
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"

## JWT SECRET

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

### Desenvolvimento:

npm run dev

### Produção:

npm run build
npm start
