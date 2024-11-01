# Etapa 1: Instalação de Dependências
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Etapa 2: Compilação do Código
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .   # Copia o código-fonte para o diretório de trabalho
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Etapa 3: Configuração do Ambiente de Produção
FROM node:18-alpine AS production
WORKDIR /app

# Define a variável de ambiente para produção
ENV NODE_ENV production

# Copia apenas os arquivos necessários para o ambiente de produção
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Exponha a porta que o Next.js vai rodar
EXPOSE 3000

# Define o comando padrão para iniciar a aplicação
CMD ["npm", "start"]
