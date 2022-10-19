# PROGRAMACION BACKEND

# Comisión #32095

# Desafio 10

## Consigna:

---

Implementar sobre el entregable que venimos realizando, un mecanismo de autenticación. Para ello:

- Se incluirá una vista de registro, en donde se pidan email y c ontraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la libredía bcrypt)

- Una vista de login, donde se pida el email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local

- Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra

- Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y su botón para desloguearse.

- Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo

- Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado)

- El resto de las funciones, deben quedar tal cual el proyecto original

### Ejemplos:

---

Se adjuntan tres screenshot con las vistas anteriormente mencionadas.

![Ejemplo 1](./assets/example-1.jpg)

![Ejemplo 2](./assets/example-2.jpg)

![Ejemplo 3](./assets/example-3.jpg)

### Método de entrega:

---

Link a un repositorio en Github con el proyecto cargado

No inluir los node_modules
