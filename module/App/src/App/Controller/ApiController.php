<?php

/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace App\Controller;

use App\Model\Personas;
use App\Model\Capacitacion;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\Debug\Debug;

class ApiController extends AbstractActionController {

    public function getSessionIdAction() {
        $data = array();
        $data['sid'] = \Util\UserSession::getCurrentSessionID();
        echo json_encode($data);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }

    public function loginAction() {
        $params = $this->params()->fromQuery();
        $personasObj = new Personas();
        $data = $personasObj->getFamilia($params['d'], $params['c'], $params['t']);

        $personaInfo = array();

        if ($data != false) {
            $personaInfo['response'] = 1;
            $personaInfo['jefe'] = $data['FAM_PER_JEFE'];
            $personaInfo['nombre'] = $data['FAM_PER_NOMBRE'];
            $personaInfo['apellido'] = $data['FAM_PER_APELLIDO'];
            $personaInfo['edad'] = $data['FAM_PER_EDAD'];
            $personaInfo['birthdate'] = $data['FAM_PER_BIRTHDATE'];
            $personaInfo['genero'] = $data['FAM_PER_GENERO'];
            $personaInfo['etnia'] = $data['FAM_PER_ETNIA'];
            $personaInfo['departamento'] = $data['FAM_PER_DEPARTAMENTO'];
            $personaInfo['municipio'] = $data['FAM_PER_MUNICIPIO'];
            $personaInfo['comunidad'] = $data['FAM_PER_COMUNIDAD'];
            $personaInfo['zona'] = $data['FAM_PER_ZONA'];
            $personaInfo['direccion'] = $data['FAM_PER_DIRECCION'];
            $personaInfo['telefono'] = $data['FAM_PER_TELEFONO'];
            $personaInfo['movil'] = $data['FAM_PER_MOVIL'];
            $personaInfo['email'] = $data['FAM_PER_EMAIL'];
            $personaInfo['avatar'] = $data['FAM_PER_AVATAR_IMG'];
            $personaInfo['rango_0a2'] = $data['FAM_PER_RANGO_0A2'];
            $personaInfo['rango_2a5'] = $data['FAM_PER_RANGO_2A5'];
            $personaInfo['rango_6a17'] = $data['FAM_PER_RANGO_6A17'];
            $personaInfo['rango_18a60'] = $data['FAM_PER_RANGO_18A60'];
            $personaInfo['rango_60mas'] = $data['FAM_PER_RANGO_60MAS'];
        } else {
            $personaInfo['response'] = 0;
        }

        echo json_encode($personaInfo);

        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    
    
    
    
    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadCapacitacion(cid, callback);
     * 
     */
    public function getCapacitacionesAction() {
        
        $params = $this->params()->fromQuery();
        if (isset($params['cid'])){
            $cid = $params['cid'];
        }else {
            $cid = 0;
        }
        
        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getCapacitacion();
        /*
        $data = Array(
            'capacitaciones' => Array(
                '3' => Array(
                    'id'=> 3,
                    'tipo'=> Array(
                        'id'=> 1,
                        'alias'=> 'general',
                        'nombre'=> 'General',
                        'descripcion'=> 'Capacitación para el publico en general'
                    ),
                    'titulo'=> 'Participantes PMA',
                    'descripcion'=> 'Capacitacion inicial, para participantes del PMA',
                    'fecha'=> '', 
                    'activo'=> true, 
                    'modulos'=> Array( 
                        1=> 5
                    ) 
                )
            )
        );
        */
        echo json_encode($data);
        
        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    
    /*
     * Llamado desde cliente con la funcion nutrifami.training.downloadCapacitacion(mid, callback);
     * 
     */
    public function getModuloAction() {
        
        $params = $this->params()->fromQuery();
        if (isset($params['mid'])){
            $mid = $params['mid'];
        }else {
            $mid = 0;
        }
        
        $capacitacionObj = new Capacitacion();
        $data = $capacitacionObj->getModulo($mid);
        //Debug::dump($data);
        /*
        $data = Array(
            'capacitaciones' => Array(
                '3' => Array(
                    'id'=> 3,
                    'tipo'=> Array(
                        'id'=> 1,
                        'alias'=> 'general',
                        'nombre'=> 'General',
                        'descripcion'=> 'Capacitación para el publico en general'
                    ),
                    'titulo'=> 'Participantes PMA',
                    'descripcion'=> 'Capacitacion inicial, para participantes del PMA',
                    'fecha'=> '', 
                    'activo'=> true, 
                    'modulos'=> Array( 
                        1=> 5
                    ) 
                )
            )
        );
        */
        echo json_encode($data);
        
        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    

}
