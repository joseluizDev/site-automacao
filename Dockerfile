# Etapa 1: Instalar dependências
FROM node:18-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json* ./  # copia package.json e lock
RUN npm install

# Etapa 2: Compilar o código
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build

# Etapa 3: Configurar o ambiente de produção
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Copiar o código compilado do builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./

# Instalar dependências de produção
RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start"]
