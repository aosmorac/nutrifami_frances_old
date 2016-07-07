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
use App\Model\Tables\CapLeccionTable;
use App\Model\Tables\CapLeccionElementoTable;
use App\Model\Tables\CapUnidadinformacionTable;
use App\Model\Tables\CapUnidadinformacionTipoTable;
use App\Model\Tables\CapUnidadinformacionXOpcionTable;
use App\Model\Tables\CapUnidadinformacionOpcionTable;

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
           $data['imagen'] = Array('nombre' => $modulo['mod_imagen'], 'loaded'=>'empty');
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
    
    
    public function getLeccion ($lid = 0) {
        $leccionTable = new CapLeccionTable();
        $leccion = $leccionTable->getLeccion($lid);
        $data = Array();
        if ( isset($leccion) && isset($leccion['lec_id']) ){
            $data['id'] = $leccion['lec_id']; 
            $data['titulo'] = $leccion['lec_titulo']; 
            $data['descripcion'] = $leccion['lec_descripcion']; 
            $data['imagen'] = Array('nombre' => $leccion['lec_imagen'], 'loaded'=>'empty');
            $data['fecha'] = $leccion['lec_fecha']; 
            $data['activo'] = $leccion['lec_activo']; 
            $elementosObj = new CapLeccionElementoTable();
            $elementos = $elementosObj->getIdListByLeccion($leccion['lec_id']);           
            foreach ( $elementos AS $elemento ) {
                $orderU = substr('0'.$elemento['order'], -2).substr('0'.$elemento['father'], -2);
                $data['unidades'][$orderU] = $elemento['id'];
            }
        }
        return $data;
    }
    
    
    
    public function getUnidad ($uid = 0) {
        $unidadTable = new CapUnidadinformacionTable();
        $unidad = $unidadTable->getUnidadinformacion($uid);
        $data = Array();
        if ( isset($unidad) && isset($unidad['uni_inf_id']) ){
            $data['id'] = $unidad['uni_inf_id'];
            $tipoObj = new CapUnidadinformacionTipoTable();
            $tipoU = $tipoObj->getTipo($unidad['uni_inf_tip_id']);
            $data['tipo'] = Array('id'=>$tipoU['uni_inf_tip_id'], 'nombre'=>$tipoU['uni_inf_tip_nombre'], 'alias'=>$tipoU['uni_inf_tip_alias'], 'descripcion'=>$tipoU['uni_inf_tip_descripcion']); /* Obtenerlo de tipo */ 
            $data['titulo'] =$unidad['uni_inf_titulo'];
            $data['instruccion'] = $unidad['uni_inf_instruccion'];
            $data['texto'] = $unidad['uni_inf_texto'];
            if ( isset($unidad['uni_inf_imagen']) || $unidad['uni_inf_imagen'] != null ){
                $data['imagen'] = Array('nombre' => $unidad['uni_inf_imagen'], 'loaded'=>'empty');
            }
            if ( isset($unidad['uni_inf_audio']) || $unidad['uni_inf_audio'] != null ){
                $data['audio'] = Array('nombre' => $unidad['uni_inf_audio'], 'loaded'=>'empty');
            }
            if ( isset($unidad['uni_inf_media']) || $unidad['uni_inf_media'] != null ){
                $data['media'] = Array('nombre' => $unidad['uni_inf_media'], 'loaded'=>'empty');
            }
            
            $data['fecha'] = $unidad['uni_inf_fecha'];
            $data['activo'] = $unidad['uni_inf_activo'];
            $data['padre'] = $unidad['uni_inf_from'];
            $data['hijo'] = $unidad['uni_inf_feedback'];
            $data['opciones'] = Array(); /* OPciones tabla */ 
            
            $opcionXUnidadTable = new CapUnidadinformacionXOpcionTable();
            $opciones = $opcionXUnidadTable->getOptionsByUnidad($unidad['uni_inf_id']);
            
            if (count($opciones)>0){
                foreach ($opciones AS $opcion) {
                    $opcionTable = new CapUnidadinformacionOpcionTable();
                    $opcionInfo = $opcionTable->getOpcion($opcion['uni_inf_opc_id']);
                    $data['opciones'][$opcion['uni_inf_opc_id']] = Array(
                              'id' => $opcionInfo['uni_inf_opc_id']
                            , 'correcta' => $opcion['uni_inf_x_opc_correcta']
                            , 'orden' => $opcion['uni_inf_x_opc_orden']
                            , 'fecha' => $opcion['uni_inf_x_opc_fecha']
                            , 'visible' => $opcion['uni_inf_x_opc_visible']
                            , 'texto' => $opcionInfo['uni_inf_opc_texto']
                    );
                    if ( isset($opcionInfo['uni_inf_opc_audio']) || $opcionInfo['uni_inf_opc_audio'] != null ){
                    $data['opciones'][$opcion['uni_inf_opc_id']]['audio'] = Array('nombre' => $opcionInfo['uni_inf_opc_audio'], 'loaded'=>'empty');
                    }
                    if ( isset($opcionInfo['uni_inf_opc_media']) || $opcionInfo['uni_inf_opc_media'] != null ){
                        $data['opciones'][$opcion['uni_inf_opc_id']]['media'] = Array('nombre' => $opcionInfo['uni_inf_opc_media'], 'loaded'=>'empty');
                    }
                }
            }
        }
        return $data;
    }
   
    
}

?>