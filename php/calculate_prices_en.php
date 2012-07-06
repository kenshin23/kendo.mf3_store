<?php
/* ----------------------------------------------------------------------------
    calcular_precios.php
    Este archivo contiene el calculo de todos los precios de los productos,
    junto con los pesos de los mismos.
	
    Actualizado por última vez el: 01-05-2012
----------------------------------------------------------------------------- */

/* Funcion para manejo de flotantes - inicio */
function ParseFloat($floatString){ 
    $LocaleInfo  = localeconv(); 
    $floatString = str_replace($LocaleInfo["mon_thousands_sep"] , "", $floatString); 
    $floatString = str_replace($LocaleInfo["mon_decimal_point"] , ".", $floatString); 
    $floatString = str_replace(",", "", $floatString);
    return floatval($floatString); 
} 
/*   Funcion para manejo de flotantes - fin  */

function set_precio_str ( $multiplicador = 1, 
                          $usar_variable = 1, 
                          $combinar_con  = "", 
                          $descuento     = 1,
                          $combinar_base = true) {
                            
    $caps_box           = 25.00;
    $euf_base           = 259.95;
    $hp_base            = 235.95;
    $vp_vial_base       = 289.95;
    $pe_base            = 204.95 - $caps_box;   
    $vp_caps_base       = 219.95 - $caps_box;

    $qty_euf_base       = 20;
    $qty_hp_base        = 50;
    $qty_vp_vial_base   = 10;
    
    $parche_plus_base   = 89.95;
    $parche_sample_base = (($parche_plus_base / 30) * 4) - 1.043;
    $bluecell_base      = 196.95;
    $kimi_base          = 49.95;
    
    $ideal_euf          = ceil(($euf_base / 2) * $qty_euf_base);
    $ideal_hp           = ceil(($hp_base / 4) * $qty_hp_base);
    $ideal_vp           = ceil(($vp_vial_base / 1) * $qty_vp_vial_base);
    
    //Asignar la variable adecuada para combinar:
    switch($combinar_con):
        case 'euf': {
            $extra  = $euf_base;
            break;
        }
        case 'hp': {
            $extra  = $hp_base;
            break;
        }
        case 'vpamps': {
            $extra  = $vp_vial_base;
            break;
        }
        case 'pe': {
            $extra  = $pe_base;
            break;
        }
        case 'vpcaps': {
            $extra  = $vp_caps_base;
            break;
        }
        default: {
            $extra = 0;
        }
    endswitch;
    
    //Asignar la variable principal para el calculo de precio:
    switch($usar_variable):
        case 'euf': {
            $precio  = $euf_base;
            break;
        }
        case 'hp': {
            $precio  = $hp_base;
            break;
        }
        case 'vpamps': {
            $precio  = $vp_vial_base;
            break;
        }
        case 'pe': {
            $precio  = $pe_base;
            break;
        }
        case 'vpcaps': {
            $precio  = $vp_caps_base;
            break;
        }
        case 'bluecell': {
            $precio  = $bluecell_base;
            break;
        }
        case 'parcheplus': {
            $precio  = $parche_plus_base;
            break;
        }
        case 'parchesample': {
            $precio  = $parche_sample_base;
            break;
        }
        case 'kimi': {
            $precio  = $kimi_base;
            break;
        }
        case 'idealeuf': {
            $precio  = $ideal_euf;
            break;
        }
        case 'idealhp': {
            $precio  = $ideal_hp;
            break;
        }
        case 'idealvp': {
            $precio  = $ideal_vp;
            break;
        }
    endswitch;

    if($combinar_base):
        $number	=   ((($precio * $multiplicador) + $extra) * $descuento);
    else:
        $number	=   ((($precio + $extra) * $multiplicador) * $descuento);
    endif;
setlocale(LC_MONETARY, 'en_US');
if (function_exists('money_format')):
	return (string) money_format('%!i', $number);
else:
	return number_format($number, 2, '.', ',');
endif;
}

function set_precio($multiplicador, 
                    $usar_variable, 
                    $combinar_con = "", 
                    $descuento = 1, 
                    $combinar_base = true)
{
	$precio_en_string	= set_precio_str($multiplicador, 
                                                 $usar_variable, 
                                                 $combinar_con, 
                                                 $descuento,
                                                 $combinar_base);
	$precio                 = ParseFloat($precio_en_string);
	
	return $precio;
}

function set_ampollas_gratis($tipo_producto, $descuento = 1)
{
    switch($descuento):
	case 0.95:
            if($tipo_producto == "hp") 
                return "<br>Plus 7 vials extra for free.";
            elseif($tipo_producto == "vp")
		return "<br>Plus 1 MFIII VP (capsules) extra for free.";
            else
		return "<br>Plus 4 vials extra for free.";
            break;
	case 0.92:
            if($tipo_producto == "hp")
                return "<br>Plus 11 vials extra for free.";
            else if($tipo_producto == "vp")
		return "<br>Plus 2 MFIII VP (capsules) extra gratis.";
            else
		return "<br>Plus 5 vials extra for free.";
            break;
	case 0.90:
            if($tipo_producto == "hp")
                return "<br>Plus 14 vials extra for free.";
            elseif($tipo_producto == "vp")
		return "<br>Plus 1 VP vial and 1 MFIII VP (capsules) extra for free.";
            else
		return "<br>Plus 7 vials extra for free.";
            break;
	case 0.88:
            if($tipo_producto == "hp")
		return "<br>Plus 16 vials extra for free.";
            elseif($tipo_producto == "vp")
		return "<br>Plus 2 vials extra for free.";
            else
		return "<br>Plus 8 vials extra for free.";
            break;
	default:		//Para descuentos no definidos.
            return "";
            break;
	endswitch;
}


//TODO: Adaptar el nuevo funcionamiento a esta funcion, donde $usar_variable ya no es un numero,
//sino el identificador en string del producto a usar, para mayor entendimiento.
function set_peso($multiplicador, $usar_variable, $usar_extra = "none", $combinado = false)
{
/*
    Paquete Estandar MFIII (capsulas o ampollas, no combinado) pesa: 0.5 libras.
    Blue Cell pesa: 0.5 libras.
    Parche combinado: 1.5 libras.
    Parche Muestra: 0.5 libras.
    Paquete Ideal: 4 libras.
    Kimi: 0.5 libras.
*/
$var1       =   0.5;        //Paquetes Estandar
$var2       =   0.5;        //Blue Cell
$var3       =   1.5;        //Parche Completo
$var4       =   0.5;        //Parche Muestra
$var5       =   0.5;        //Kimi
$var6       =   4.5;        //Paquete Ideal
$extra      =   0;          //Define si es un producto combinado o no.

switch($usar_extra):
    case "blue_cell":
        $var_extra   =   $var2;
        break;
    case "parche_plus":
        $var_extra   =   $var3;
        break;
    case "kimi":
        $var_extra   =   $var6;
        break;
    default:
        break;
endswitch;

if($combinado):
    $extra  =   $var_extra;
endif;

    switch($usar_variable)
    {
        case 1:                     //Paquetes base, combinados o no
            $peso_base = $var1;
            break;
        case 2:                     //Blue Cell como paquete solo
            $peso_base = $var2;
            break;
        case 3:                     //Parche completo como paquete
            $peso_base = $var3;
            break;
        case 4:                     //Parche muestra como paquete
            $peso_base = $var4;
            break;
        case 5:                     //Kimi como paquete
            $peso_base = $var5;
            break;
        case 6:                     //Paquete Ideal
            $peso_base = $var6;
            break;
    }

$number	=   (($peso_base * $multiplicador) + $extra);

return $number; 
}
?>
