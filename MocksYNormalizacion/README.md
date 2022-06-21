# Mocks y normalizacion

## Para ejecutar el proyecto

1. Ejecutar DBscript para crear o resetear tabla 'products' en SQLite3: ` npm run DBscript `

2. Definir api key de firebase en archivo .env como se muestra en .env.example: 

```
FIREBASE_KEY =
  '{"type": "service_account" ...}'

```

3. Ejecutar ` npm run dev ` para iniciar el proyecto.

### Consigna 1

- Lista de 5 productos para test en endpoint: /api/products/test
- Ruta donde se muestra la vista con los productos: /test/products

### Consigna 2

- Porcentaje de reduccion con normalizacion de datos en el Chat.
- Nuevo formato de mensajes y persistencia en database usando Firebase.