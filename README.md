Nutrifami
=======================

Aplicación Web responsive para nutrifami.

Una vez descargados los archivos se debe configurar el servidor virtual.

Instalación de de modulos con Node
----------------------------------

1. Instalar Node global
2. En el root del proyecto ejecutar el comando "npm install"


Instalación de librerias con Bower.
-----------------------------------

Una vez instalados los modulos con node, se debe ejecutar:

1. Instalar bower globalmente con "npm install -g bower"
2. Instalar las librerias usadas en el prouecto con el comando "bower install"

VirtualHost
--------------
 A continuación un ejemplo de la configuración del host virtual, en windows.
 
    Listen 83
    NameVirtualHost *:83
    <VirtualHost *:83>
    Alias /NutrifamiDEV "C:\nutrifamiapp\public"
    DocumentRoot "C:\nutrifamiapp\public"
      <Directory "C:\nutrifamiapp\public">
       AllowOverride All
       Allow from all
      </Directory>
    </VirtualHost>


Caracterizticas tecnicas
------------------------

 1. Zend Framework
 2. bootstrap
 3. jquery, angularjs
 4. Manejo de objetos en el cliente
 5. Comunicación cliente servidor a traves de API (nutrifami.js), RestFul.


Distribución de Archivos
------------------------

    /
    /public
    /public/js/                                        ->  Todos los archivos javascript
    /public/lib                                        ->  Todas las Librerias
    /public/css/                                       ->  Todos los archivos de las hojas de estilo
    /module/                                           ->  Modulos de la aplicacion
    /module/App                                        ->  Modulo por defecto, inicial.
    /module/App/src/App/Controller                     ->  Controladores del modulo App
    /module/App/src/App/Controller/IndexController     ->  Controlador por defecto del modulo App.
    /module/App/view/app/index/                        ->  Vistas para el controlador index del modulo App
    /module/Application/view/layout/                   ->  Plantillas HTML de la aplicacion

Al ingresar por un explorador Web la aplicacion abrira la accion index del controlador Index del modulo App.

