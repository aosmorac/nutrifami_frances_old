<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2015 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace App\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

use App\Model\Personas;

class ApiController extends AbstractActionController
{
    public function getSessionIdAction()
    {
        //print_r(\Util\UserSession::getCurrentSessionID());
        $data = Array();
        $data['sid'] = \Util\UserSession::getCurrentSessionID();
        echo json_encode($data);
        
        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    public function loginAction () {
        $params = $this->params()->fromQuery();
        $personasObj = new Personas();
        $data = $personasObj->getFamilia($params['d'], $params['c'], $params['t']);
        
        $personaInfo = Array();
        
        $personaInfo['nombres'] = $data['FAM_PER_NOMBRE'];
        $personaInfo['apellidos'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['documeto'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['genero'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['etnia'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['edad'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['nacimiento'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['departamento'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['municipio'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['comunidad'] = $data['FAM_PER_APELLIDO'];
        $personaInfo['avatar'] = $data['FAM_PER_APELLIDO'];
        
        echo json_encode($personaInfo);
        
        $viewModel = new \Zend\View\Model\ViewModel();
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
}
