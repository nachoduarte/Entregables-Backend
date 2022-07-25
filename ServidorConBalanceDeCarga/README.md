# Servidor con balance de carga 
## Ejecucion del proyecto

Al iniciar los servidores tener en cuenta: 

-p <numero del puerto>
-m <modo cluster o modo fork>

En caso de no indicar valores se iniciara en puerto 8080 en modo Fork.

* Inicio en modo Fork: ` nodemon server.js ` 
* Inicio en modo Cluster: ` nodemon server.js -m cluster `
* Inicio con forever: ` forever server.js `

### Trabajando con pm2 

* Inicio en modo Fork: ` pm2 start server.js --name="Server 1" --watch -- 8081 `
* Inicio en modo Cluster: 

```
pm2 start server.js --name="Server 2" --watch -i max -- 8082
pm2 start server.js --name="Server 3" --watch -i max -- 8083
pm2 start server.js --name="Server 4" --watch -i max -- 8084
pm2 start server.js --name="Server 5" --watch -i max -- 8085


```

* Listado de los servidores: ` pm2 list `
* Monitoreo de informacion: ` pm2 monit `