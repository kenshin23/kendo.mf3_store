<?php

/* ------------------------------------------------------------------------------
  Lista de Productos, versión 2.0.0
  Contenido:
  Eco-UltraFiltrados
  MFIII HP
  MFIII Vegetal Placenta
  Blue Cell Serum
  Parche Plus
  Kimi

  Modificado por ultima vez el 01-05-2012
  v2.0.0  - Múltiples cambios para mejorar la eficiencia del código.
  - Modificada la estructura completa de los productos para adaptarse a
  la nueva tienda.
  - Agregados campos nuevos para colocar los precios en productos
  combinados, dado que ahora se calculan distinto.

  v1.7.4: - Cambiada la denominacion del MFIII Placentrex por MFIII HP.
  Agregada una nueva variable para poder combinar EUF.

  v1.7.3: - Modificados los EUF para ser asignados automaticamente.

  v1.7.2: - Cambiada la denominacion del select para combinar:
  Ahora usar "euf",
  "vp_vials",
  "vp_caps",
  "hp",
  "pe",
  "blue_cell",
  "parche_plus" y
  "kimi".
  - Realizada limpieza de codigo innecesario.

  v1.7.1: - Agregado el EUF Ideal.

  v1.7:	  - Agregado el EUF.
  - Agregado el select para combinar los productos:
  Usar "euf", "normal" o "pe" para determinar el tipo de select.
  Si se deja en blanco, el select no aparece.

  v1.6:   - Agregado el cálculo del peso automático
  - Cambiado todo el enlace a variables

  v1.5.1: - Agregado el botón con ampollas gratis del paquete ideal.

  v1.5:	  - Comenzado a llevar un changelog del codigo.
  - Variables estáticas agregadas en el enlace.
  - Descripción del paquete cambiada a formato estándar para asegurar
  mayor legibilidad.
  ------------------------------------------------------------------------------ */
//Variables estáticas e includes:
require_once("euf.php");
$cart_link  = "https://www.cartmanager.net/cgi-bin/cart.cgi?AddItem=479948";
$delimiter  = rawurlencode("|");
$quantity   = 1;
$discount   = "<br/>(Con " . round((1 - $porcentaje_descuento) * 100) . "% de descuento!)";
$box_use    = "<br/>(Capsulas sin caja)";
$discount_description   = "";
$product_to_combine     = "parche_plus";
$euf_type   = euf_type_from_cookie();

//Cantidades base para los productos:
$base_qty_euf       = 2;    //ampollas
$base_qty_hp        = 4;    //ampollas
$base_qty_vpvials   = 1;    //ampollas
$base_qty_pe        = 30;   //capsulas
$base_qty_vpcaps    = 30;   //capsulas
//Cajas completas -- ideales:
$ideal_qty_euf  = 20;
$ideal_qty_hp   = 50;
$ideal_qty_vp   = 10;

//Esta variable se cambia al peso correspondiente si se requiere enviar el
//producto combinado solo una vez; e.j.: el caso de Kimi:
$weight_of_combined = 0;

if ($porcentaje_descuento < 1):
    $discount_description = $discount;
endif;

//Promociones en descuento para los paquetes ideales:
$promotion_hp   = set_ampollas_gratis("hp", $porcentaje_descuento);
$promotion_vp   = set_ampollas_gratis("vp", $porcentaje_descuento);
$promotion_euf  = set_ampollas_gratis("euf", $porcentaje_descuento);

//Productos Basic/Estandar
$product_multiplier = 1;

$combinado_estandar = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "hp+euf.png",
            "imagen_alternativo" => $image_path . "hp+euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Est&aacute;ndar Combinado",
            "producto_nombre" => "Eco-UltraFiltrados + MFIII HP",
            "producto_tipo_terapia" => "Terapia bebible e inyectable",
            "producto_uso_recomendado"  => $product_multiplier * $base_qty_euf . " ampollas + " . 
                                           $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio"           => set_precio_str($product_multiplier, 
                                                'euf', 
                                                'hp', 
                                                1.00, 
                                                false),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          'hp', 
                                                          $porcentaje_descuento, 
                                                          false),
            /* //Commented out to combine whole package:
            "producto_precio_solo"      => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          '', 
                                                          1, 
                                                          false),
            "producto_precio_solo_descuento"    => set_precio_str($product_multiplier, 
                                                                  'euf', 
                                                                  '', 
                                                                  $porcentaje_descuento, 
                                                                  false),*/
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "combine_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 0,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Combinado Estandar:<br/>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $base_qty_euf . " ampollas + " . 
			 $product_multiplier * $base_qty_hp . " ampollas MFIII HP)" . 
                         $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', 'hp', $porcentaje_descuento, false) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_estandar_1 = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Est&aacute;ndar",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_euf . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'euf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'euf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Estandar Bebible:<br>Eco UltraFiltrados" . $euf_type . "<br>(" . $product_multiplier * $base_qty_euf . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_estandar_2 = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "hp.png",
            "imagen_alternativo" => $image_path . "hp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Est&aacute;ndar",
            "producto_nombre" => "MFIII HP",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'hp'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'hp', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "hp",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Estandar Inyectable:<br>MFIII HP<br>(" . $product_multiplier * $base_qty_hp . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'hp', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_estandar_3 = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "vpamp.png",
            "imagen_alternativo" => $image_path . "vpamp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Est&aacute;ndar",
            "producto_nombre" => "MFIII Vegetal Placenta",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_vpvials . " ampolla al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'vpamps'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'vpamps', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "vp_vials",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Estandar Inyectable:<br>MFIII Vegetal Placenta<br>(" . $product_multiplier * $base_qty_vpvials . " ampolla)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'vpamps', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_estandar_4 = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "pe.png",
            "imagen_alternativo" => $image_path . "pe.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Est&aacute;ndar",
            "producto_nombre" => "MFIII PE",
            "producto_tipo_terapia" => "Terapia en c&aacute;psulas",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_pe . " c&aacute;psulas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'pe'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'pe', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "pe",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Estandar en Capsulas:<br>" . $product_multiplier . 
                         " MFIII PE" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'pe', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$ideal_estandar = (object) array(
            "paquete_tipo" => "Estandar",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Ideal Est&aacute;ndar",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $ideal_qty_euf . 
                                            " ampollas (" . $product_multiplier . 
                                            " caja completa)",
            "producto_precio" => set_precio_str($product_multiplier, 'idealeuf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 
                                                            'idealeuf', 
                                                            '', 
                                                            $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 6),
            "usar_select" => "ideal_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Ideal Estandar:<br>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $ideal_qty_euf . 
                         " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'idealeuf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 6)
);

//Productos Promedio/Premium
$product_multiplier = 2;

$combinado_premium = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "hp+euf.png",
            "imagen_alternativo" => $image_path . "hp+euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Premium Combinado",
            "producto_nombre" => "Eco-UltraFiltrados + MFIII HP",
            "producto_tipo_terapia" => "Terapia bebible e inyectable",
            "producto_uso_recomendado"  => $product_multiplier * $base_qty_euf . " ampollas + " . 
                                           $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio"           => set_precio_str($product_multiplier, 
                                                'euf', 
                                                'hp', 
                                                1.00, 
                                                false),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          'hp', 
                                                          $porcentaje_descuento, 
                                                          false),
            /* //Commented out to combine whole package:
            "producto_precio_solo"      => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          '', 
                                                          1, 
                                                          false),
            "producto_precio_solo_descuento"    => set_precio_str($product_multiplier, 
                                                                  'euf', 
                                                                  '', 
                                                                  $porcentaje_descuento, 
                                                                  false),*/
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "combine_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Combinado Premium:<br/>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $base_qty_euf . " ampollas + " . 
			 $product_multiplier * $base_qty_hp . " ampollas MFIII HP)" . 
                         $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', 'hp', $porcentaje_descuento, false) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_premium_1 = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Premium",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_euf . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'euf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'euf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Premium Bebible:<br>Eco UltraFiltrados" . $euf_type . "<br>(" . $product_multiplier * $base_qty_euf . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_premium_2 = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "hp.png",
            "imagen_alternativo" => $image_path . "hp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Premium",
            "producto_nombre" => "MFIII HP",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'hp'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'hp', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "hp",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Premium Inyectable:<br>MFIII HP<br>(" . $product_multiplier * $base_qty_hp . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'hp', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_premium_3 = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "vpamp.png",
            "imagen_alternativo" => $image_path . "vpamp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Premium",
            "producto_nombre" => "MFIII Vegetal Placenta",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_vpvials . " ampolla al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'vpamps'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'vpamps', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "vp_vials",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Premium Inyectable:<br>MFIII Vegetal Placenta<br>(" . $product_multiplier * $base_qty_vpvials . " ampolla)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'vpamps', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_premium_4 = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "pe.png",
            "imagen_alternativo" => $image_path . "pe.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Premium",
            "producto_nombre" => "MFIII PE",
            "producto_tipo_terapia" => "Terapia en c&aacute;psulas",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_pe . " c&aacute;psulas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'pe'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'pe', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "pe",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Premium en Capsulas:<br>" . $product_multiplier . " MFIII PE" . $box_use . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'pe', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$ideal_premium = (object) array(
            "paquete_tipo" => "Premium",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Ideal Premium",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $ideal_qty_euf . " ampollas (" . $product_multiplier . " cajas completas)",
            "producto_precio" => set_precio_str($product_multiplier, 'idealeuf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'idealeuf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 6),
            "usar_select" => "ideal_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Ideal Premium Bebible:<br>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $ideal_qty_euf . 
                         " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'idealeuf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 6)
);

//Productos Pro/Optimum
$product_multiplier = 3;

$combinado_optimum = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "hp+euf.png",
            "imagen_alternativo" => $image_path . "hp+euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Combinado",
            "producto_nombre" => "Eco-UltraFiltrados + MFIII HP",
            "producto_tipo_terapia" => "Terapia bebible e inyectable",
            "producto_uso_recomendado"  => $product_multiplier * $base_qty_euf . " ampollas + " . 
                                           $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio"           => set_precio_str($product_multiplier, 
                                                'euf', 
                                                'hp', 
                                                1.00, 
                                                false),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          'hp', 
                                                          $porcentaje_descuento, 
                                                          false),
            /* //Commented out to combine whole package:
            "producto_precio_solo"      => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          '', 
                                                          1, 
                                                          false),
            "producto_precio_solo_descuento"    => set_precio_str($product_multiplier, 
                                                                  'euf', 
                                                                  '', 
                                                                  $porcentaje_descuento, 
                                                                  false),*/
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "combine_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Combinado Optimum:<br/>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $base_qty_euf . " ampollas + " . 
			 $product_multiplier * $base_qty_hp . " ampollas MFIII HP)" . 
                         $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', 'hp', $porcentaje_descuento, false) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_1 = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_euf . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'euf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'euf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Bebible:<br>Eco UltraFiltrados" . $euf_type . "<br>(" . $product_multiplier * $base_qty_euf . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_2 = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "hp.png",
            "imagen_alternativo" => $image_path . "hp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum",
            "producto_nombre" => "MFIII HP",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'hp'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'hp', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "hp",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Inyectable:<br>MFIII HP<br>(" . $product_multiplier * $base_qty_hp . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'hp', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_3 = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "vpamp.png",
            "imagen_alternativo" => $image_path . "vpamp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum",
            "producto_nombre" => "MFIII Vegetal Placenta",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_vpvials . " ampolla al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'vpamps'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'vpamps', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "vp_vials",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Inyectable:<br>MFIII Vegetal Placenta<br>(" . $product_multiplier * $base_qty_vpvials . " ampolla)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'vpamps', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_4 = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "pe.png",
            "imagen_alternativo" => $image_path . "pe.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum",
            "producto_nombre" => "MFIII PE",
            "producto_tipo_terapia" => "Terapia en c&aacute;psulas",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_pe . " c&aacute;psulas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'pe'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'pe', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "pe",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum en Capsulas:<br>" . $product_multiplier . " MFIII PE" . $box_use . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'pe', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$ideal_optimum = (object) array(
            "paquete_tipo" => "Optimum",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Ideal Optimum",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $ideal_qty_euf . " ampollas (" . $product_multiplier . " cajas completas)",
            "producto_precio" => set_precio_str($product_multiplier, 'idealeuf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'idealeuf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 6),
            "usar_select" => "ideal_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Ideal Optimum Bebible:<br>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $ideal_qty_euf . 
                         " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'idealeuf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 6)
);

//Productos Optimum Plus
$product_multiplier = 4;

$combinado_optimum_plus = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "hp+euf.png",
            "imagen_alternativo" => $image_path . "hp+euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Plus Combinado",
            "producto_nombre" => "Eco-UltraFiltrados + MFIII HP",
            "producto_tipo_terapia" => "Terapia bebible e inyectable",
            "producto_uso_recomendado"  => $product_multiplier * $base_qty_euf . " ampollas + " . 
                                           $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio"           => set_precio_str($product_multiplier, 
                                                'euf', 
                                                'hp', 
                                                1.00, 
                                                false),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          'hp', 
                                                          $porcentaje_descuento, 
                                                          false),
            /* //Commented out to combine whole package:
            "producto_precio_solo"      => set_precio_str($product_multiplier, 
                                                          'euf', 
                                                          '', 
                                                          1, 
                                                          false),
            "producto_precio_solo_descuento"    => set_precio_str($product_multiplier, 
                                                                  'euf', 
                                                                  '', 
                                                                  $porcentaje_descuento, 
                                                                  false),*/
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "combine_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Combinado Optimum Plus:<br/>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $base_qty_euf . " ampollas + " . 
			 $product_multiplier * $base_qty_hp . " ampollas MFIII HP)" . 
                         $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', 'hp', $porcentaje_descuento, false) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_plus_1 = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Plus",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_euf . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'euf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'euf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Plus Bebible:<br>Eco UltraFiltrados" . $euf_type . "<br>(" . $product_multiplier * $base_qty_euf . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'euf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_plus_2 = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "hp.png",
            "imagen_alternativo" => $image_path . "hp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Plus",
            "producto_nombre" => "MFIII HP",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_hp . " ampollas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'hp'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'hp', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "hp",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Plus Inyectable:<br>MFIII HP<br>(" . $product_multiplier * $base_qty_hp . " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'hp', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_plus_3 = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "vpamp.png",
            "imagen_alternativo" => $image_path . "vpamp.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Plus",
            "producto_nombre" => "MFIII Vegetal Placenta",
            "producto_tipo_terapia" => "Terapia inyectable",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_vpvials . " ampolla al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'vpamps'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'vpamps', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "vp_vials",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Plus Inyectable:<br>MFIII Vegetal Placenta<br>(" . $product_multiplier * $base_qty_vpvials . " ampolla)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'vpamps', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$separado_optimum_plus_4 = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "pe.png",
            "imagen_alternativo" => $image_path . "pe.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Optimum Plus",
            "producto_nombre" => "MFIII PE",
            "producto_tipo_terapia" => "Terapia en c&aacute;psulas",
            "producto_uso_recomendado" => $product_multiplier * $base_qty_pe . " c&aacute;psulas al mes",
            "producto_precio" => set_precio_str($product_multiplier, 'pe'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'pe', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 1, $product_to_combine),
            "usar_select" => "pe",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 1,
            "agrupado" => "multiple",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum Plus en Capsulas:<br>" . $product_multiplier . " MFIII PE" . $box_use . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'pe', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 1, $product_to_combine)
);

$ideal_optimum_plus = (object) array(
            "paquete_tipo" => "Optimum Plus",
            "imagen_enlace" => $image_path . "euf.png",
            "imagen_alternativo" => $image_path . "euf.png",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Paquete Ideal Optimum Plus",
            "producto_nombre" => "Eco-UltraFiltrados",
            "producto_tipo_terapia" => "Terapia bebible",
            "producto_uso_recomendado" => $product_multiplier * $ideal_qty_euf . " ampollas (" . $product_multiplier . " cajas completas)",
            "producto_precio" => set_precio_str($product_multiplier, 'idealeuf'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'idealeuf', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 6),
            "usar_select" => "ideal_euf",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 2,
            "agrupado" => "single",
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Ideal Optimum Plus Bebible:<br>Eco UltraFiltrados" . $euf_type . 
                         "<br>(" . $product_multiplier * $ideal_qty_euf . 
                         " ampollas)" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'idealeuf', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 6)
);

//XXX: Estos productos no se usan.
//TODO: Deprecate if necessary.
// Para los productos Blue Cell Serum aparte
$product_multiplier = 1;

$producto6_1 = (object) array(
            "imagen_enlace" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_alternativo" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_ancho" => 150,
            "imagen_alto" => 118,
            "producto_tipo" => "Paquete Est&aacute;ndar Blue Cell",
            "producto_nombre" => "",
            "producto_tipo_terapia" => "",
            "producto_uso_recomendado" => $product_multiplier . " Frasco de Blue Cell Serum para un mes.",
            "producto_precio" => set_precio_str($product_multiplier, 'bluecell', ''),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'bluecell', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 2),
            "usar_select" => "",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 0,
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Estandar:<br>" . $product_multiplier . " Blue Cell Serum" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'bluecell', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 2)
);

$product_multiplier = 2;

$producto6_2 = (object) array(
            "imagen_enlace" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_alternativo" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_ancho" => 150,
            "imagen_alto" => 118,
            "producto_tipo" => "Paquete Premium Blue Cell",
            "producto_nombre" => "",
            "producto_tipo_terapia" => "",
            "producto_uso_recomendado" => $product_multiplier . " Frascos de Blue Cell Serum para un mes.",
            "producto_precio" => set_precio_str($product_multiplier, 'bluecell', ''),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'bluecell', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 2),
            "usar_select" => "",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 0,
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Premium<br>" . $product_multiplier . " Blue Cell Serum" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'bluecell', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 2)
);

$product_multiplier = 3;

$producto6_3 = (object) array(
            "imagen_enlace" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_alternativo" => "http://www.mf3products.com/images/sitio/BLUECELL4.jpg",
            "imagen_ancho" => 150,
            "imagen_alto" => 118,
            "producto_tipo" => "Paquete Optimum Blue Cell",
            "producto_nombre" => "",
            "producto_tipo_terapia" => "",
            "producto_uso_recomendado" => $product_multiplier . " Frascos de Blue Cell Serum para un mes.",
            "producto_precio" => set_precio_str($product_multiplier, 'bluecell'),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'bluecell', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 2),
            "usar_select" => "",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 0,
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Paquete Optimum:<br>" . $product_multiplier . " Blue Cell Serum" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'bluecell', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 2)
);

// Para el Kimi aparte

$product_multiplier = 1;

$producto7_1 = (object) array(
            "imagen_enlace" => "http://crecermuchomas.com/images/Kimi/device.JPG",
            "imagen_alternativo" => "http://crecermuchomas.com/images/Kimi/device.JPG",
            "imagen_ancho" => 160,
            "imagen_alto" => 160,
            "producto_tipo" => "Kimi",
            "producto_nombre" => "",
            "producto_tipo_terapia" => "",
            "producto_uso_recomendado" => $product_multiplier . " par de plantillas Kimi",
            "producto_precio" => set_precio_str($product_multiplier, 'kimi', ''),
            "producto_precio_descuento" => set_precio_str($product_multiplier, 'kimi', '', $porcentaje_descuento),
            "producto_peso" => set_peso($product_multiplier, 5),
            "usar_select" => "",
            "producto_combinado" => 'none',
            "cantidad_combinar_euf" => 0,
            "carrito_enlace" => $cart_link .
            $delimiter .
            rawurlencode("Kimi" . $discount_description) .
            $delimiter .
            set_precio($product_multiplier, 'kimi', '', $porcentaje_descuento) .
            $delimiter .
            $quantity .
            $delimiter .
            $delimiter .
            $delimiter .
            $tipo_envio .
            $delimiter .
            set_peso($product_multiplier, 5)
);

/**                             Fin de definición de productos individuales                      * */
//Agrupacion de productos por separado:
//TODO: Verificar esta prueba por si a Gerardo le gusta la nueva agrupacion
$separado_estandar = (object) array($separado_estandar_4,
            $separado_estandar_1,
            $separado_estandar_2,
            $separado_estandar_3
);

$separado_premium = (object) array($separado_premium_4,
            $separado_premium_1,
            $separado_premium_2,
            $separado_premium_3
);

$separado_optimum = (object) array($separado_optimum_4,
            $separado_optimum_1,
            $separado_optimum_2,
            $separado_optimum_3
);

$separado_optimum_plus = (object) array($separado_optimum_plus_4,
            $separado_optimum_plus_1,
            $separado_optimum_plus_2,
            $separado_optimum_plus_3
);

//Agrupacion de productos por paquete:
$productos_estandar = (object) array(
            "name" => "Estandar",
            "nameHtml" => "Est&aacute;ndar",
            "combined_item" => $combinado_estandar,
            "separate_items" => $separado_estandar,
            "ideal_item" => $ideal_estandar
);

$productos_premium = (object) array(
            "name" => "Premium",
            "nameHtml" => "Premium",
            "combined_item" => $combinado_premium,
            "separate_items" => $separado_premium,
            "ideal_item" => $ideal_premium
);

$productos_optimum = (object) array(
            "name" => "Optimum",
            "nameHtml" => "Optimum",
            "combined_item" => $combinado_optimum,
            "separate_items" => $separado_optimum,
            "ideal_item" => $ideal_optimum
);

$productos_optimum_plus = (object) array(
            "name" => "Optimum Plus",
            "nameHtml" => "Optimum Plus",
            "combined_item" => $combinado_optimum_plus,
            "separate_items" => $separado_optimum_plus,
            "ideal_item" => $ideal_optimum_plus
);

//Agrupación de paquetes:
$paquete_estandar = (object) array(
            "class" => "standard",
            "name" => "Estandar",
            "nameHtml" => "Est&aacute;ndar",
            "products" => $productos_estandar
);

$paquete_premium = (object) array(
            "class" => "premium",
            "name" => "Premium",
            "nameHtml" => "Premium",
            "products" => $productos_premium
);

$paquete_optimum = (object) array(
            "class" => "optimum",
            "name" => "Optimum",
            "nameHtml" => "Optimum",
            "products" => $productos_optimum
);

$paquete_optimum_plus = (object) array(
            "class" => "optimum_plus",
            "name" => "Optimum Plus",
            "nameHtml" => "Optimum Plus",
            "products" => $productos_optimum_plus
);

//Conjunto completo de paquetes:
$paquetes = (object) array(
            $paquete_estandar,
            $paquete_premium,
            $paquete_optimum,
            $paquete_optimum_plus
);
?>