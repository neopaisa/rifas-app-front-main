# Establecer la imagen base
FROM node:14

# Definir la carpeta de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación para producción
RUN npm run build

# Instalar un servidor http simple para servir la aplicación construida
RUN npm install -g serve

# Exponer el puerto 5000
EXPOSE 5000

# Iniciar la aplicación
CMD ["serve", "-s", "dist", "-l", "5000"]