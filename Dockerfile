# Etapa 1: Instalação de Dependências
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de configuração do projeto
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia os arquivos do projeto
COPY . .

# Compila o projeto
RUN npm run build

# Etapa 2: Configuração do Servidor Web
FROM nginx:alpine

# Copia os arquivos compilados para o servidor web
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do servidor web
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Inicia o servidor web
CMD ["nginx", "-g", "daemon off;"]

