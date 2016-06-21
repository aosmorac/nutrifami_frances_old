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

namespace Util;

/*
 * Clase para llamados estaticos
 * 
 * 
 */
class UserSession {
    
    public static function getCurrentSessionID(){
        $sm = new \Zend\Session\SessionManager();
        return $sm->getId();
    }
    
    
}
