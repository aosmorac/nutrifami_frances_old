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

use App\Model\Tables\CapCapacitacionTable;
use App\Model\Tables\CapCapacitacionTipoTable;
use App\Model\Tables\CapCapacitacionElementoTable;
use App\Model\Tables\CapModuloTable;
use App\Model\Tables\CapModuloElementoTable;
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
    * 
    * getCapacitacion($cid = 0);
     * getModulo($mid = 0)
    *
    **********************************************************/
class Capacitacion
{
    protected $capacitacionTable;
    
    public function __construct()
    {
        $this->capacitacionTable = new CapCapacitacionTable();
    }
    
    /*
     * 
     */
    public function getCapacitacion($cid = 0) {
        $capacitaciones =  $this->capacitacionTable->getCapacitacion($cid); 
        $data = Array();
        foreach ($capacitaciones AS $capacitacion) {
            $data[$capacitacion['cap_id']] = Array('id'=> $capacitacion['cap_id']
                                                , 'titulo'=> $capacitacion['cap_titulo']
                                                , 'descripcion'=> $capacitacion['cap_descripcion']
                                                , 'fecha'=> $capacitacion['cap_fecha']
                                                , 'activo'=> $capacitacion['cap_activo']
                    );
            $tipoObj = new CapCapacitacionTipoTable();
            $tipo = $tipoObj->getTipo($capacitacion['cap_tip_id'], $capacitacion['cap_tip_alias']);
            $data[$capacitacion['cap_id']]['tipo'] = Array(
                        'id'=> $tipo['cap_tip_id'],
                        'alias'=> $tipo['cap_tip_alias'],
                        'nombre'=> $tipo['cap_tip_nombre'],
                        'descripcion'=> $tipo['cap_tip_descripcion']
                    );
            $elementosObj = new CapCapacitacionElementoTable;
            $elementos = $elementosObj->getIdListByCapacitacion($capacitacion['cap_id']);
            $data[$capacitacion['cap_id']]['modulos'] = Array();
            foreach ( $elementos AS $elemento ){ 
                $data[$capacitacion['cap_id']]['modulos'][$elemento['order']] = $elemento['id'];
            }
        }
        return $data;
    }
    
    
    public function getModulo($mid = 0){
        $moduloTable = new CapModuloTable();
        $modulo = $moduloTable->getModulo($mid);
        $data = Array();
        if ( isset($modulo) && isset($modulo['mod_id']) ){
           $data['id'] = $modulo['mod_id']; 
           $data['titulo'] = $modulo['mod_titulo']; 
           $data['descripcion'] = $modulo['mod_descripcion']; 
           $data['imagen'] = Array('nombre' => $modulo['mod_imagen'], 'loaded'=>false);
           $data['fecha'] = $modulo['mod_fecha']; 
           $data['activo'] = $modulo['mod_activo']; 
           $elementosObj = new CapModuloElementoTable();
           $elementos = $elementosObj->getIdListByModulo($modulo['mod_id']);
           foreach ( $elementos AS $elemento ){ 
                $data['lecciones'][$elemento['order']] = $elemento['id'];
           }
        }
        return $data;
    }
   
    
}

?>