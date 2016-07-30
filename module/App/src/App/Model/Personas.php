<?php

/* * ********************************************************
 * CLIENTE: PMA Colombia
 * ========================================================
 *
 * @copyright PMA Colombia 2016
 * @updated 
 * @version 1
 * @author {Abel Oswaldo Moreno Acevedo} <{moreno.abel@gmail.com}>
 * ******************************************************** */

namespace App\Model;

use App\Model\Tables\FampersonasTable;
use Doctrine\Common\Util\Debug;

/* * ********************************************************
 * MODELO Module
 * =======================================================
 *
 * ATRIBUTOS
 * $personaTable   // Tabla modulos
 *
 *
 * METODOS
 * getFamilia ($cedula = '', $codigo = '');
 *
 * ******************************************************** */

class Personas {

    protected $personaTable;

    public function __construct() {
        $this->personaTable = new FampersonasTable();
    }

    public function getFamilia($cedula = '', $codigo = '', $token = '') {
        /*
         * Generar y comprar toke
         * Organizar nombres de campos
         */
        return $this->personaTable->getPersona($cedula, $codigo);
    }

    public function updateUsuario($params) {

        /* < ---- Recibe el objeto usuarioActivo enviado por nutrifami.js 
         * el objeto que envia es de este estilo {"sesionId":"ru3hufqls6tcmc9dup1a3nmej7","isLogin":false,"login_documento":"0802962662","login_codigo":"79335","token":"6b79b016c56c9de5576604e2122a684a","jefe":null,"nombre":"JOHNY EDWIN","apellido":"QUIÑONES GODOY","edad":"29","genero":"M","etnia":"MESTIZO","departamento":"NARIÑO","municipio":"SAN ANDRES DE TUMACO","comunidad":"SAGUMBITA","zona":"URBANO","direccion":"-","telefono":"0","movil":"0","email":"-","avatar":null,"rango_0a2":0,"rango_2a5":1,"rango_6a17":2,"rango_18a60":2,"rango_60mas":0}
         */
        return $this->personaTable->updateUsuario($params);
    }

    public function savePersona($params) {

        /* HAY QUE VALIDAR SI LOS DATOS SON CORRECTOS PARA LUEGO INGRESARLOS */

        /* Validamos si los datos de jefe no son correctos, retornamos 0 para que el frontend muestre el mensaje */
        if ($this->personaTable->getPersona($params['documento_jefe'], $params['codigo']) == false) {
            $response = array(
                'success' => false,
                'message' => 'Error! - Los datos no fueron guardados'
            );
            return $response;
        }

        /* Validamos si el usuario ya existe, retornamos 0 para que el frontend muestre el mensaje */
        if ($this->personaTable->getPersona($params['documento']) != false) {
            $response = array(
                'success' => false,
                'message' => 'Error! - El documento ya existe'
            );
            return $response;
        }

        $data = array(
            'FAM_PER_DOCUMENTO' => $params['documento'],
            'FAM_PER_NOMBRE' => $params['nombre'],
            'FAM_PER_APELLIDO' => $params['apellido'],
            'FAM_PER_EMAIL' => $params['email'],
            'FAM_PER_PARENTESCO' => $params['parentesco'],
            'FAM_PER_BIRTHDATE' => $params['birthdate'],
            'FAM_PER_JEFE' => $params['jefe'], /* Id del jefe de hogar para crear la relación */
            'FAM_PER_CODIGO' => $params['codigo'], /* Codigo del jefe de Hogar */
                /* 'FAM_PER_TOKEN' => $params['token'] */
        );

        /* Insertarmos el usuario en la base de datos y enviamos respuesta */
        if ($this->personaTable->insertPersona($data) == 1) {
            $response = array(
                'success' => true,
                'message' => 'El familiar fue agregado con éxito'
            );
            return $response;
        }

        /* Si algo falla en el if anterior, enviamos mensaje de error */
        $response = array(
            'success' => false,
            'message' => 'Error! - Los datos no fueron guardados'
        );
        return $response;
    }

}