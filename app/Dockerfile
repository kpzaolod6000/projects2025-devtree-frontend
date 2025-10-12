FROM node:20-bookworm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Crear directorio de trabajo
WORKDIR /app

# Configurar npm para mejor rendimiento
RUN npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-retry-mintimeout 10000

# Exponer puerto de Vite
EXPOSE 5173

# Comando por defecto
CMD ["bash"]