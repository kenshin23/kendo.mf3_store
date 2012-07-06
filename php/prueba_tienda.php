<?php
    include "funciones_tienda.php";
    include "productos.php";
    
    $contador_global            = 1;
    $product_multiplier         = 1;
    $cart_link                  = "";
    $delimiter                  = "|";
    $euf_type                   = "1";
    $tipo_envio                 = "WEIGHT";
    $base_qty_euf               = 1;
    $quantity                   = 1;
    $discount_description       = "blah";
    $product_to_combine         = "blue_cell";
    
    $producto_optimum_plus_1    = (object) array(
                                "paquete_tipo"              =>  "Estandar",
                                "imagen_enlace"				=>	"http://www.mf3la.com/images/euf.jpg",
                                "imagen_alternativo"		=>	"http://www.mf3la.com/images/euf.jpg",
                                "imagen_ancho"				=>	123,
                                "imagen_alto"				=>	120,
                                "producto_tipo"				=>	"Paquete Est&aacute;ndar",
                                "producto_nombre"			=>	"Eco-UltraFiltrados",
                                "producto_tipo_terapia"		=>	"Terapia bebible",
                                "producto_uso_recomendado"	=>	$product_multiplier * $base_qty_euf . " ampollas al mes",
                                "producto_precio"			=>	20,
                                "producto_precio_descuento"	=>	17.6,
                                "producto_peso"				=>	1,
                                "usar_select"				=>	"euf",
                                "producto_combinado"		=>	0,								
                                "cantidad_combinar_euf"		=>	1,
                                "agrupado"                  =>  "single",
                                "carrito_enlace"			=>	$cart_link .
                                                                $delimiter .
                                                                rawurlencode("Paquete Estandar Bebible:<br>Eco UltraFiltrados" . $euf_type . "<br>(". $product_multiplier * $base_qty_euf. " ampollas)" . $discount_description) .
                                                                $delimiter .
                                                                "1" .
                                                                $delimiter .
                                                                $quantity .
                                                                $delimiter .
                                                                $delimiter .
                                                                $delimiter .
                                                                "ZONES" .
                                                                $delimiter .
                                                                "1"
                                );
                                
    //Agrupacion de productos por separado:
    $separate_estandar          = (object) array(
                                );
                                
    $separate_estandar          = (object) array(
                                );
                                
    $separate_estandar          = (object) array(
                                );
                                
    $separate_estandar          = (object) array(
                                );
                                
    //Agrupacion de productos por paquete:
    $productos_estandar         = (object) array(
                                "combined_item"             =>  "",
                                "separate_items"            =>  "",
                                "ideal_item"                =>  ""
                                );
                                
    $productos_premium          = (object) array(
                                "combined_item"             =>  "",
                                "separate_items"            =>  "",
                                "ideal_item"                =>  ""
                                );
                                
    $productos_optimum          = (object) array(
                                "combined_item"             =>  "",
                                "separate_items"            =>  "",
                                "ideal_item"                =>  ""
                                );
                                
    $productos_optimum_plus     = (object) array(
                                "combined_item"             =>  "",
                                "separate_items"            =>  "",
                                "ideal_item"                =>  ""
                                );

    //Agrupación de paquetes:
    $paquete_estandar           = (object) array(
                                "class"                     =>  "standard",
                                "name"                      =>  "Estandar",
                                "products"                  =>  $productos_estandar
                                );
                                
    $paquete_premium            = (object) array(
                                "class"                     =>  "premium",
                                "name"                      =>  "Premium",
                                "products"                  =>  $productos_premium
                                );
                                
    $paquete_optimum            = (object) array(
                                "class"                     =>  "optimum",
                                "name"                      =>  "Optimum",
                                "products"                  =>  $productos_optimum
                                );
                                
    $paquete_optimum_plus       = (object) array(
                                "class"                     =>  "optimum_plus",
                                "name"                      =>  "Optimum Plus",
                                "products"                  =>  $productos_optimum_plus
                                );
                                
    //Conjunto completo de paquetes:
    $paquetes                   = (object) array(   
                                $paquete_estandar, 
                                $paquete_premium, 
                                $paquete_optimum, 
                                $paquete_optimum_plus
                                );
                                
    buildSelectGroup ($producto->agrupado, 'discount', $producto);
    echo "<div style=\"clear: both;\"></div>". PHP_EOL;                             
    buildSelectGroup ($producto->agrupado, 'combined', $producto);
?>