# Remo (Resource Monitor)
Monitor de recursos para el sistema operativo Ubuntu.

Este es un proyecto desarrollado para el curso de Sistemas Operativos Abiertos de la Universidad Mariano Gálvez de Guatemala.


## Ejecutar desde el código fuente

Para poder ejecutar la aplicación desde el código fuente, se debe tener instalado [NodeJS][node], el [Node Package Manager][npm] y para poder clonar el código se requiere [git][git].

Para instalar los parquetes requeridos desde la terminal en ubuntu, ejecutar el siguiente comando:

    sudo apt-get install nodejs nodejs-legacy npm git

Al finalizar la instalación podremos clonar el código fuente en cualquier carpeta con el siguiente comando:

    git clone https://github.com/umggt/remo.git

Luego nos dirigimos a la carpeta en la que se clonó el código fuente e instalamos las dependencias de Node requeridas, con el siguiente comando:

    npm install

Despues de todo esto ya podremos ejecutar la aplicación con:

    ./gulp run

> **NOTA:** Si no les permite ejecutar `./gulp` se debe agregar permiso de ejecución a los scripts `electron`, `electron-packager` y `gulp` que se encuentran en la carpeta del código fuente, lo pueden hacer desde la terminal con los siguientes comandos:

    chmod +x electron
    chmod +x electron-packager
    chmod +x gulp

> **NOTA:** ejecuto el comando `./gulp` ya que es un escript local que sirve para ejecutar gulp desde la carpeta bin de node_modules, pero si tienen instalado gulp a nivel global, pueden ejecutar de forma normal `gulp run`.

Si desean editar el código fuente con el mismo editor que yo lo he hecho deberían instalar [Visual Studio Code][VSCode].

[node]:   https://nodejs.org/
[npm]:    https://www.npmjs.com/
[git]:    http://git-scm.com/
[VSCode]: https://code.visualstudio.com/
