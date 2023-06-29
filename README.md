# Documentacion

Les damos la bienvenida a nuestra pagina donde nos econtraremos un dashboard agradable con multiple formularios que se conectan a una base de datos por medio de leguajes como javascript, php, mysql. a continuacion tendremos con unos requisitos previos, los pasos a seguir para su ejecucion  y cosas a tener en cuenta para el buen funcionamiento.

### Requisitos Previos

1. Servidor web local (Xampp, Apache).
2. PHP (versión 7.0 o superior) instalado y configurado correctamente.
3. Un sistema de gestión de bases de datos compatible, como MySQL.
4. Navegador web actualizado.
5. Tener instalado Composer 

### Pasos a seguir

1. Clona este repositorio en tu entorno de desarrollo local o descarga el código fuente como un archivo ZIP:

   - Si estás familiarizado con el control de versiones Git, puedes clonar el repositorio ejecutando el siguiente comando en tu terminal:

     ```bash
     bashCopy code
     git clone <URL_del_repositorio>
     ```

     Esto creará una copia local del repositorio en tu máquina.  **IMPORTANTE**: la copia local debe estar en la carpeta htdogs de nuestro Xampp.

   - Si prefieres descargar el código fuente como un archivo ZIP, ve al repositorio en la plataforma de alojamiento (por ejemplo, GitHub) y busca el botón "Descargar" o "Download". Haz clic en él y guarda el archivo ZIP en tu equipo. **IMPORTANTE**: la copia local debe estar en la carpeta htdogs de nuestro Xampp.

2. Configura tu entorno de desarrollo para que apunte al directorio raíz del repositorio clonado o al directorio descomprimido:

   - Abre tu entorno de desarrollo (por ejemplo, Visual Studio Code).
   - En el entorno, selecciona la opción "Abrir proyecto" o "Abrir carpeta" y navega hasta el directorio raíz del repositorio clonado o descomprimido. Haz clic en "Abrir" para cargar el proyecto en tu entorno.

3. Crea una base de datos llamada "campusland":

   - Abre tu sistema de gestión de bases de datos preferido (por ejemplo, MySQL).
   - Crea una nueva base de datos y asígnale el nombre "campusland".
   - Asegúrate de tener las credenciales correctas (nombre de usuario y contraseña) para acceder a la base de datos. Ten en cuenta estas credenciales, ya que las necesitarás en los pasos posteriores.

4. Importa el archivo SQL proporcionado con cada CRUD para crear la estructura de la base de datos y poblarla con datos de ejemplo:

   - Ubica el archivo SQL correspondiente a cada CRUD. Este archivo se encuentra en la carpeta "scripts/db/campusland.sql" del repositorio.
   - Abre tu sistema de gestión de bases de datos y asegúrate de tener acceso a la base de datos "campusland".
   - Importa el archivo SQL en la base de datos. La forma exacta de hacerlo depende del sistema de gestión de bases de datos que estés utilizando. Por lo general, hay una opción en la interfaz para importar archivos SQL. Selecciona el archivo SQL correspondiente al CRUD y ejecútalo en la base de datos.

5. Abre el archivo de conexión a la base de datos:

   - Navega hasta la ruta "script/db/credentials" en el repositorio clonado o descomprimido.
   - Abre el archivo de conexión a la base de datos con un editor de texto.
   - Configura los parámetros de conexión de acuerdo con tu entorno. Por ejemplo, asegúrate de que el nombre de usuario y la contraseña coincidan con tus credenciales de acceso a la base de datos.

6. Abre el navegador web y accede a la URL correspondiente a cada CRUD:

   - Inicia tu servidor web local o utiliza una herramienta de desarrollo de servidor integrada en tu entorno de desarrollo.
   - Abre un navegador web y accede a la URL correspondiente al CRUD que deseas probar. Por ejemplo, si estás utilizando un servidor local en tu máquina, la URL podría ser algo como "http://localhost/Prueba-piloto/index.html".
   - Asegúrate de que el servidor web esté correctamente configurado y en funcionamiento para que puedas ver y utilizar la aplicación en tu navegador.

### IMPORTANTE

En la carpeta frontend/API/ debemos cambiar en cada uno de los archivos .js las URL ya que las URL deben concordar con el URL de sus servidores web.

### Contacto

Nombre: Carlos Villafrades Pinilla

Email: cavillafrades@gmail.com