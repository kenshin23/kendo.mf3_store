<?php

/* ----------------------------------------------------------------------------
  configurar_pagina.php
  Este archivo realiza toda la configuración de los productos correspondientes.
  Debe incluirse junto con funciones_productos.php y la respectiva página de
  productos para funcionar.

  Actualizado por última vez el: 17-04-2012
  ----------------------------------------------------------------------------- */
// Indice maestro de la pagina:
$contador_global = 1;

//Esto define el porcentaje de descuento que se va a usar:
$porcentaje_descuento = 0.85;

//Esto el tipo de envío que se usará -- a partir de 17-04-2012, unico:
$tipo_envio = "ZONES";

//Contador de paquetes para la numeracion automatica desde funciones_tienda.php
$package_counter = 1;

//Contador de productos para la numeracion automatica desde funciones_tienda.php
$product_counter = 1;

//Contador de items para la numeracion automatica desde funciones_tienda.php
$item_counter = 1;

//Contador de grupos de selects para la numeracion automatica desde funciones_tienda.php:
$select_counter = 1;

//Ubicacion de la carpeta de imagenes:
$image_path = "./images/";
?>