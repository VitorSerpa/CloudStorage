FROM node:16

# Crie o diretório da aplicação
WORKDIR /app

# Crie um usuário normal
RUN useradd -ms /bin/bash appuser

# Copie os arquivos de dependência
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante da aplicação
COPY . .

# Altere a propriedade da pasta para o novo usuário
RUN chown -R appuser:appuser /app

# Troque para o usuário normal
USER appuser

EXPOSE 5000

CMD ["npx", "nodemon", "app.js"]