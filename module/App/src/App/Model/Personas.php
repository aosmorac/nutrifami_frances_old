<?php
/**********************************************************
 * CLIENTE: PMA Colombia
* ========================================================
*
* @copyright PMA Colombia 2016
* @updated 
* @version 1
* @author {Abel Oswaldo Moreno Acevedo} <{moreno.abel@gmail.com}>
**********************************************************/
namespace App\Model;

use App\Model\Tables\FampersonasTable;
use Doctrine\Common\Util\Debug;
/**********************************************************
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
**********************************************************/
class Personas
{
    protected $personaTable;
    
    public function __construct()
    {
        $this->personaTable = new FampersonasTable();
    }
    
    public function getFamilia ($cedula = '', $codigo = '', $token = ''){
        /*
         * Generar y comprar toke
         * Organizar nombres de campos
         */
        return $this->personaTable->getPersona($cedula, $codigo);
    }
   
    
}

?>