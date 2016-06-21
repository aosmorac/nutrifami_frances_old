
var usuarioActivo = Object();

var familiaObj = Object();

var nutrifami = {
    
    /* nutrifami.usuarioActivoServerInfo */
    usuarioActivoServerInfo: Object(),
    
    isloginFlag: false,
    
    /*
     * nutrifami.login(documento, codigo, callback);
     * 
     * @param {type} documento
     * @param {type} codigo
     * @param {type} callback
     * @returns {undefined}
     */
    login: function(documento, codigo, callback){
        callback = callback || function(){};
        /*
         * Ajax con token (Armar con documento, codigo y sesion)
         */
        /* Inicio onSuccess Ajax */
        familiaObj.codigo = '123456';
        familiaObj.personas = Array();
        /* Información de la cabeza de hogar*/
        familiaObj.personas.cabeza = Array();
        familiaObj.personas.cabeza.nombres = 'Abel Oswaldo';
        familiaObj.personas.cabeza.apellidos = 'Moreno Acevedo';
        familiaObj.personas.cabeza.documeto = '999999';
        familiaObj.personas.cabeza.genero = 'Masculino';
        familiaObj.personas.cabeza.etnia = 'Mestizo';
        familiaObj.personas.cabeza.edad = '31';
        familiaObj.personas.cabeza.nacimiento = '10/12/1984';
        familiaObj.personas.cabeza.departamento = 'Bogotá';
        familiaObj.personas.cabeza.municipio = 'Bogotá';
        familiaObj.personas.cabeza.comunidad = '';
        familiaObj.personas.cabeza.avatar = '';
        /* Informacion de cantidad de personas */
        familiaObj.personas.cantidades = Array();
        familiaObj.personas.cantidades.rango1 = Array();
        familiaObj.personas.cantidades.rango1.descripcion = 'Entre 18 y 60 años';
        familiaObj.personas.cantidades.rango1.cantidad = 2;
        familiaObj.personas.cantidades.rango2 = Array();
        familiaObj.personas.cantidades.rango2.descripcion = 'Entre 0 y 2 años';
        familiaObj.personas.cantidades.rango2.cantidad = 1;
        /* Infomacion detallada de otras personas */
        familiaObj.personas.otros = Array();
        familiaObj.personas.otros[1] = Array();
        familiaObj.personas.otros[1].nombres = 'Pepito';
        familiaObj.personas.otros[1].apellidos = 'Moreno';
        familiaObj.personas.otros[1].documeto = '888';
        familiaObj.personas.otros[1].genero = 'Masculino';
        familiaObj.personas.otros[1].etnia = 'Mestizo';
        familiaObj.personas.otros[1].edad = '1.6';
        familiaObj.personas.otros[1].nacimiento = '10/12/2015';
        familiaObj.personas.otros[1].departamento = 'Bogotá';
        familiaObj.personas.otros[1].municipio = 'Bogotá';
        familiaObj.personas.otros[1].comunidad = '';
        familiaObj.personas.otros[1].avatar = '';
        familiaObj.personas.otros[1].parentezco = 'hijo';
        
        /* Información de usuario logueado */
        usuarioActivo.nombres = 'Abel Oswaldo';
        usuarioActivo.apellidos = 'Moreno Acevedo';
        usuarioActivo.documeto = '999999';
        usuarioActivo.genero = 'Masculino';
        usuarioActivo.etnia = 'Mestizo';
        usuarioActivo.edad = '31';
        usuarioActivo.nacimiento = '10/12/1984';
        usuarioActivo.departamento = 'Bogotá';
        usuarioActivo.municipio = 'Bogotá';
        usuarioActivo.comunidad = '';
        usuarioActivo.avatar = '';
        usuarioActivo.sesionId = 'xxxxx';
        usuarioActivo.token = 'xxxxxx';
        
        this.isloginFlag = true;
        
        msj = documento+', '+codigo;
        console.log(msj);
        callback();
        
        /* Fin onSuccess ajax */
        
    }, 
    
    /*
     * nutrifami.editarUsuarioActivo(data, callback);
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    editarUsuarioActivo: function (data, callback) {
        /*
         * data.nombres = 'Abel Oswaldo';
         * data.apellidos = 'Moreno Acevedo';
         * data.documeto = '999999';
         * data.genero = 'Masculino';
         * data.etnia = 'Mestizo';
         * data.edad = '31';
         * data.nacimiento = '10/12/1984';
         * data.departamento = 'Bogotá';
         * data.municipio = 'Bogotá';
         * data.comunidad = '';
         * data.avatar = '';
         * data.sesionId = 'xxxxx';
         * data.token = 'xxxxxx';
         */
        nutrifami.usuarioActivoServerInfo = usuarioActivo;
        usuarioActivo = data;
        callback = callback || function(){};
    },
    
    /*
     * nutrifami.subirUsuarioActivo(callback);
     */
    subirUsuarioActivo: function (callback) {
        callback = callback || function(){};
        /*
         * Funcionalidad Ajax
         * 
         */
    },
    
    /*
     * nutrifami.islogin(callback);
     */
    islogin: function(callback) {
        callback = callback || function(){};
        return this.isloginFlag;
    }
    
    
    
    
}