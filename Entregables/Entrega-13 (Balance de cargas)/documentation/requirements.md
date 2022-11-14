# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 13

## Consigna:

---

1. Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork

- Agregar en la vista info, el número de procesadores presentes en el servidor

- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.

- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo

- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utiizando PM2 en sus modos (FORK y CLUSTER). Listar los procesos por PM2 y por sistema operativo

- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda

2. Configurar Ngix para balanciear cargas de nuestro servidor de la siguiente manera:

- Redirigir todas las consultas a '/api/randoms' a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.

- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.

- Verificar que funcione correctamente.

- Luego, modificar la configuración para que todas las consultas a '/api/randoms' sean redirigidas a un cluster de servidores gestionado desde ngix, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082,8083,8084 y 8085 respectivamente

### Observaciones:

---

### Método de entrega:

---

Link a un repositorio en Github con el proyecto cargado

No inluir los node_modules
