Nutrifami
=======================

Aplicación Web responsive para nutrifami.

Una vez descargados los archivos se debe configurar el servidor virtual.

VirtualHost
--------------
 A continuación un ejemplo de la configuración del host virtual.
 
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
