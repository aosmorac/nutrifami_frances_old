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
    
    public function getAll() {
        $capacitaciones =  $this->capacitacionTable->getCapacitacion(16); 
        $data = Array();
        $dataCapacitacionesId = Array();
        $dataCapacitaciones = Array();
        $dataModulos = Array();
        $leccionesId = Array();
        $dataLecciones = Array();
        $unidadesId = Array();
        $dataUnidadesinformacion = Array();
        foreach ($capacitaciones AS $capacitacion) {
            $dataCapacitaciones[$capacitacion['cap_id']] = Array('id'=> $capacitacion['cap_id']
                                                , 'titulo'=> $capacitacion['cap_titulo']
                                                , 'descripcion'=> $capacitacion['cap_descripcion']
                                                , 'fecha'=> $capacitacion['cap_fecha']
                                                , 'activo'=> $capacitacion['cap_activo']
                    );
            $tipoObj = new CapCapacitacionTipoTable();
            $tipo = $tipoObj->getTipo($capacitacion['cap_tip_id'], $capacitacion['cap_tip_alias']);
            $dataCapacitaciones[$capacitacion['cap_id']]['tipo'] = Array(
                        'id'=> $tipo['cap_tip_id'],
                        'alias'=> $tipo['cap_tip_alias'],
                        'nombre'=> $tipo['cap_tip_nombre'],
                        'descripcion'=> $tipo['cap_tip_descripcion']
                    );
            $elementosObj = new CapCapacitacionElementoTable;
            $elementos = $elementosObj->getIdListByCapacitacion($capacitacion['cap_id']);
            $dataCapacitaciones[$capacitacion['cap_id']]['modulos'] = Array();
            $dataCapacitacionesId[] = $capacitacion['cap_id'];
            foreach ( $elementos AS $elemento ){ 
                $dataCapacitaciones[$capacitacion['cap_id']]['modulos'][$elemento['order']] = $elemento['id'];
                $moduloData = $this->getModulo($elemento['id'], true);
                if (count($leccionesId) > 0) {
                    $leccionesId = array_merge($leccionesId, $moduloData['leccionesId']);
                }else {
                    $leccionesId = $moduloData['leccionesId'];
                }
                $moduloData['modulo']['completo'] = false;
                $dataModulos[$elemento['id']] = $moduloData['modulo'];
            }
        }
        foreach ( $leccionesId AS $lid ) {
            $leccionData = $this->getLeccion($lid, true);
            $dataLecciones[$lid] = $leccionData['leccion'];
            $dataLecciones[$lid]['completo'] = false;
            if (count($unidadesId) > 0) {
                $unidadesId = array_merge($unidadesId, $leccionData['unidadesId']);
            }else {
                $unidadesId = $leccionData['unidadesId'];
            }
        }
        foreach ( $unidadesId AS $uid ){
            $dataUnidadesinformacion[$uid] = $this->getUnidad($uid);
            $dataUnidadesinformacion[$uid]['completo'] = false;
        }
        $data['cap_capacitacionesId'] = $dataCapacitacionesId;
        $dataCapacitaciones['completo'] = false;
        $data['cap_capacitaciones'] = $dataCapacitaciones;
        $data['cap_modulos'] = $dataModulos;
        $data['cap_lecciones'] = $dataLecciones;
        $data['cap_unidadesinformacion'] = $dataUnidadesinformacion;
        
        $file = '{ ';
        
        $file .= '"serv_capacitacionesId" : '.json_encode($dataCapacitacionesId).', ';
        $file .= '"serv_capacitaciones" : '.json_encode($dataCapacitaciones).', ';
        $file .= '"serv_modulos" : '.json_encode($dataModulos).', ';
        $file .= '"serv_lecciones" : '.json_encode($dataLecciones).', ';
        $file .= '"serv_unidades" : '.json_encode($dataUnidadesinformacion).'';
        
        $file .= ' }';
        
        
        
        return $file;
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
    
    
    public function getModulo($mid = 0, $getLecciones = false){
        $moduloTable = new CapModuloTable();
        $modulo = $moduloTable->getModulo($mid);
        $data = Array();
        if ( isset($modulo) && isset($modulo['mod_id']) ){
           $data['id'] = $modulo['mod_id']; 
           $data['titulo'] = Array('texto' => $modulo['mod_titulo'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$modulo['mod_audio'], 'nombre'=>$modulo['mod_audio'], 'loaded'=>'empty')); 
           $data['descripcion'] = Array('texto' => $modulo['mod_descripcion'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$modulo['mod_descripcion_audio'], 'nombre'=>$modulo['mod_descripcion_audio'], 'loaded'=>'empty')); 
           $data['imagen'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$modulo['mod_imagen'], 'nombre' => $modulo['mod_imagen'], 'loaded'=>'empty');
           $data['imagen2'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$modulo['mod_imagen'], 'nombre' => $modulo['mod_imagen'], 'loaded'=>'empty');
           $data['fecha'] = $modulo['mod_fecha']; 
           $data['activo'] = $modulo['mod_activo']; 
           $data['lecciones'] = Array();
           $elementosObj = new CapModuloElementoTable();
           $elementos = $elementosObj->getIdListByModulo($modulo['mod_id']);
           $aElementos = Array();
           foreach ( $elementos AS $elemento ){ 
                $aElementos[$elemento['order']] = $elemento['id'];
           }
           $leccionesId = Array();
           foreach ( $aElementos AS $elemento ){ 
                $data['lecciones'][] = $elemento;
                $leccionesId[$elemento] = $elemento;
           }
        }
        if ($getLecciones) {
            return Array('modulo' => $data, 'leccionesId' => $leccionesId );
        }else{
            return $data;
        }
    }
    
    
    public function getLeccion ($lid = 0, $getUnidades = false) {
        $leccionTable = new CapLeccionTable();
        $leccion = $leccionTable->getLeccion($lid);
        $data = Array();
        if ( isset($leccion) && isset($leccion['lec_id']) ){
            $data['id'] = $leccion['lec_id']; 
            $data['titulo'] = Array('texto' => $leccion['lec_titulo'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$leccion['lec_audio'], 'nombre'=>$leccion['lec_audio'], 'loaded'=>'empty')); 
            $data['descripcion'] = $leccion['lec_descripcion']; 
            $data['imagen'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$leccion['lec_imagen'], 'nombre' => $leccion['lec_imagen'], 'loaded'=>'empty');
            $data['icono'] = $leccion['lec_icono'];
            $data['fecha'] = $leccion['lec_fecha']; 
            $data['activo'] = $leccion['lec_activo']; 
            $elementosObj = new CapLeccionElementoTable();
            $elementos = $elementosObj->getIdListByLeccion($leccion['lec_id']);       
            $aElementos = Array();
            foreach ( $elementos AS $elemento ) {
                $orderU = substr('0'.$elemento['order'], -2).substr('0'.$elemento['father'], -2);
                $aElementos[$orderU] = $elemento['id'];
            }
            $unidadesId = Array();
            foreach ( $aElementos AS $elemento ){ 
                 $data['unidades'][] = $elemento;
                 if ($getUnidades) {
                     $unidadesId[$elemento] = $elemento;
                 }
            }
            $data['finalizado'] = Array('texto' => $leccion['lec_mensaje'], 'audio' => Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$leccion['lec_audio_final'], 'nombre' => $leccion['lec_audio_final'], 'loaded' => 'empty'));
        }
        if ($getUnidades) {
            return Array('leccion' => $data, 'unidadesId' => $unidadesId );
        }else{
            return $data;
        }
    }
    
    
    
    public function getUnidad ($uid = 0) {
        $unidadTable = new CapUnidadinformacionTable();
        $unidad = $unidadTable->getUnidadinformacion($uid);
        $data = Array();
        if ( isset($unidad) && isset($unidad['uni_inf_id']) ){
            $data['id'] = $unidad['uni_inf_id'];
            $tipoObj = new CapUnidadinformacionTipoTable();
            $tipoU = $tipoObj->getTipo($unidad['uni_inf_tip_id']);
            $data['tipo'] = Array('id'=>$tipoU['uni_inf_tip_id'], 'nombre'=>$tipoU['uni_inf_tip_nombre'], 'alias'=>$tipoU['uni_inf_tip_alias'], 'descripcion'=>$tipoU['uni_inf_tip_descripcion'], 'icono'=> $tipoU['uni_inf_tip_icono'], 'audio'=> Array('nombre'=> $tipoU['uni_inf_tip_audio'])); /* Obtenerlo de tipo */ 
            $data['titulo'] = Array('texto' => $unidad['uni_inf_titulo'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$unidad['uni_inf_audio'], 'nombre'=>$unidad['uni_inf_audio'], 'loaded'=>'empty')); 
            $data['instruccion'] = Array('texto' => $unidad['uni_inf_instruccion'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$unidad['uni_inf_instruccion_audio'], 'nombre'=>$unidad['uni_inf_instruccion_audio'], 'loaded'=>'empty')); 
            $data['texto'] = $unidad['uni_inf_texto'];
            if ( isset($unidad['uni_inf_imagen']) || $unidad['uni_inf_imagen'] != null ){
                $data['imagen'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$unidad['uni_inf_imagen'], 'nombre' => $unidad['uni_inf_imagen'], 'loaded'=>'empty');
            }
            if ( isset($unidad['uni_inf_audio']) || $unidad['uni_inf_audio'] != null ){
                $data['audio'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$unidad['uni_inf_audio'], 'nombre' => $unidad['uni_inf_audio'], 'loaded'=>'empty');
            }
            if ( isset($unidad['uni_inf_media']) || $unidad['uni_inf_media'] != null ){
                $data['media'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$unidad['uni_inf_media'], 'nombre' => $unidad['uni_inf_media'], 'loaded'=>'empty');
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
                            , 'feedback' => Array('texto' => $opcion['uni_inf_opc_feedback'], 'audio' => Array('url'=>'https://s3.amazonaws.com/nutrifami/'.$opcion['uni_inf_opc_feedback_audio'], 'nombre'=>$opcion['uni_inf_opc_feedback_audio'], 'loaded'=>'empty'))
                    );
                    if ( isset($opcionInfo['uni_inf_opc_audio']) || $opcionInfo['uni_inf_opc_audio'] != null ){
                    $data['opciones'][$opcion['uni_inf_opc_id']]['audio'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$opcionInfo['uni_inf_opc_audio'], 'nombre' => $opcionInfo['uni_inf_opc_audio'], 'loaded'=>'empty');
                    }
                    if ( isset($opcionInfo['uni_inf_opc_media']) || $opcionInfo['uni_inf_opc_media'] != null ){
                        $data['opciones'][$opcion['uni_inf_opc_id']]['media'] = Array('url' => 'https://s3.amazonaws.com/nutrifami/'.$opcionInfo['uni_inf_opc_media'], 'nombre' => $opcionInfo['uni_inf_opc_media'], 'loaded'=>'empty');
                    }
                }
            }
        }
        return $data;
    }
   
    
}

?>