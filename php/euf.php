<?php
/*------------------------------------------------------------------------------
Manejo de Eco-UltraFiltrados, v1.0

Actualizado por ultima vez el 04-12-2010

Changelog:
v1.0.0	Version inicial.
------------------------------------------------------------------------------*/
function euf_type_from_cookie()
{
	//Determino si la cookie solicitada existe:
	if(isset($_COOKIE['euf'])):
		return ": " . $_COOKIE['euf'];
	else:
		return "";
	endif;
}
?>