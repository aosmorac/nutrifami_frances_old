/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(function(){
    
    $('#loginButton').click(function(){
        nutrifami.login('123456', '78910', function(){
            alert('callback ok');
        });
    });
    
    
});


