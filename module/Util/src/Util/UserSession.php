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

namespace Util;

/*
 * Clase para llamados estaticos
 * 
 * 
 */

class UserSession {

    public static function getCurrentSessionID() {
        $sm = new \Zend\Session\SessionManager();
        return $sm->getId();
    }

    public static function buildToken($documento, $codigo) {

        $sid = \Util\UserSession::getCurrentSessionID();

        $token = md5(substr($sid, 0, 4) . substr($documento, 0, 4) . substr($sid, 4, 4) . substr($codigo, 0, 4) . substr($sid, 8, 4));

        //$token = md5(uniqid(microtime(), true));

        return $token;
    }

}
