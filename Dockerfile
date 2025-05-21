# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copiar solo lo necesario para instalar dependencias
COPY package*.json ./
COPY prisma/ ./prisma/

# 2. Instalar dependencias DE DESARROLLO temporalmente
RUN npm ci --include=dev && \
    npx prisma generate

# 3. Copiar el código fuente y compilar
COPY . .
# COPY .env ./
RUN npm run build

# 4. Limpiar dependencias de desarrollo
RUN rm -rf node_modules && \
    npm ci --omit=dev --prefer-offline

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# 5. Copiar solo lo necesario desde el builder
# COPY --from=builder /app/.env ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["node", "dist/src/main.js"]