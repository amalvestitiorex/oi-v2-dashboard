# Usa una imagen base de Node
FROM --platform=linux/amd64 node:20-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia todo el código fuente al contenedor
COPY . .

ENV VITE_TYPE=production

# Instala las dependencias
RUN npm ci

# Compila la aplicación de React
RUN npm run build


# Usa una imagen ligera de Nginx para servir la aplicación compilada
FROM --platform=linux/amd64 nginx:alpine

# Copia los archivos de build al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY "./certs/fullchain.pem" "/etc/nginx/ssl/fullchain.pem"
COPY "./certs/privkey.pem" "/etc/nginx/ssl/privkey.pem"

# Exponer puertos HTTP y HTTPS
EXPOSE 80 443

# Comando para ejecutar Nginx
CMD ["sh", "-c", "nginx -t && nginx -g 'daemon off;'"]