<?php
    //--------------------------------------------------------------------------------------------------
    // Funciones de estructura de tienda -- PanelBar, TabStrip:
    //--------------------------------------------------------------------------------------------------
    function layoutPackages ($packages) { 
        global $package_counter;
    ?>
    <ul id="panelBar">
        <?php foreach($packages as $package): ?>
        <!-- Inicio<?php echo "\t". $package->name ."\t"; ?>-->
        <li<?php if ($package_counter == 1): echo " class=\"k-state-active\""; endif; ?> 
        id="panelBarItem_<?php echo $package_counter; ?>">
        <?php echo $package->nameHtml ?> Package
        <?php
        layoutProducts($package->products);
        ?>
    </li>
    <!-- Fin<?php echo "\t". $package->name ."\t"; ?>-->
    <?php $package_counter++;
    endforeach; ?>
</ul>
<?php
}

//--------------------------------------------------------------------------------------------------

function layoutProducts ($products) { 
    global $package_counter;
    global $item_counter;
?>

<div id="<?php echo "package_" . $package_counter; ?>">
    <ul>    <!-- start TabStrip tabs    -->
    <?php
        if( count($products->combined_item)     > 0 ):
    ?>
        <li id="tabStripItem_<?php echo $item_counter + 0; ?>"
            class="k-state-active">
            Purchase Combined Package (Recommended)
        </li>
    <?php
        endif;
        if( count($products->separate_items)    > 0 ):
    ?>
        <li id="tabStripItem_<?php echo $item_counter + 1; ?>">
            Purchase Separately
        </li>
    <?php
        endif;
        if( count($products->ideal_item)        > 0 ):
    ?>
        <li id="tabStripItem_<?php echo $item_counter + 2; ?>">
            Purchase Ideal Package (Recommended complete <?php echo $products->nameHtml; ?>
            treatment)
        </li>
    <?php
        endif;
    ?>
    </ul>   <!--   end TabStrip tabs    -->
    <?php
        if( count($products->combined_item)     > 0 ):
            layoutSingleProduct($products->combined_item);
        endif;
        if( count($products->separate_items)    > 0 ):
            layoutMultipleProducts($products->separate_items);
        endif;
        if( count($products->ideal_item)        > 0 ):
            layoutSingleProduct($products->ideal_item);
        endif;
    ?>
</div>
<?php
}

//--------------------------------------------------------------------------------------------------

function layoutSingleProduct ($product) { 
    global $item_counter;
    global $product_counter;
?>
<div id="<?php echo "item_". $item_counter; ?>" class="package-container">
    <div class="centered product_pad">&nbsp;</div>
    <div class="centered product_container one-product">   <!--    Combinado/Ideal   -->
        <!-- Deficion interna <?php echo "Producto ". $product_counter; ?> -->
        <div id="product_image_<?php echo $product_counter; ?>" class="image_container centered">
            <img id="image_<?php echo $product_counter; ?>" src="<?php echo $product->imagen_enlace; ?>" 
             alt="imagen" width="<?php echo $product->imagen_ancho; ?>" 
             height="<?php echo $product->imagen_alto; ?>"/>
        </div>
        <div class="clear">&nbsp;</div>     <!--  salto de linea    -->
        <div class="centered">
            <div id="product_main_type_<?php echo $product_counter; ?>">
                <?php echo $product->producto_tipo; ?>
            </div>
        <?php
            if( $product->usar_select != 'ideal_euf'                    and
                $product->usar_select != 'ideal_vp'                     and
                $product->usar_select != 'ideal_hp'                     and
                ( strpos($product->usar_select, "pe")       === false)  and
                ( strpos($product->usar_select, "vp_caps")  === false)):
        ?>  
            <div id="product_name_<?php echo $product_counter; ?>">
                <?php echo $product->producto_nombre; ?>
            </div>
        <?php
            elseif ( $product->usar_select == 'ideal_euf' or
                     $product->usar_select == 'ideal_vp'  or
                     $product->usar_select == 'ideal_hp'):
                buildSelectGroup ($product->agrupado, 'ideal_vial', $product);         ?>
            <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
        <?php
            elseif ( $product->usar_select == 'combine_euf'): ?>
            <div id="product_caps_select_<?php echo $product_counter; ?>" class="centered" style="width:100%;">
        <?php
                buildSelectGroup ($product->agrupado, 'box', $product); ?>
                
                <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
        <?php
                buildSelectGroup ($product->agrupado, 'combine_caps', $product);    ?>
            </div>
            <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
        <?php        
            else:
                buildSelectGroup ($product->agrupado, 'capsule', $product);         ?>
            <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
        <?php
            endif;
        ?>
            <div id="product_type_<?php echo $product_counter; ?>">
                (<?php echo $product->producto_tipo_terapia; ?>)
            </div>
            <div id="product_usage_<?php echo $product_counter; ?>">
                <?php echo $product->producto_uso_recomendado; ?>
            </div>
            <?php 
                if($product->producto_precio != $product->producto_precio_descuento): 
            ?>
            <div id="struck_price_<?php echo $product_counter; ?>"
            class="product_price_strikethrough">
                <?php echo $product->producto_precio; ?> US$
            </div>
            <div class="product_price_highlight">
                <strong id="product_price_<?php echo $product_counter; ?>"
                class="product_price_highlight">
                <?php echo $product->producto_precio_descuento; ?> US$
                </strong>
            </div>
            <?php
                else:
            ?>
            <div id="product_price_<?php echo $product_counter; ?>">
                <?php echo $product->producto_precio; ?> US$
            </div>
            <?php
                endif;
            ?>
        </div>
        <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
        <div id="product_select_<?php echo $product_counter; ?>" class="centered" style="width:100%;">
        <?php 
            if(  $product->paquete_tipo != "Estandar" or
                ($product->usar_select == 'ideal_euf' or
                 $product->usar_select == 'ideal_vp'  or
                 $product->usar_select == 'ideal_hp') ): 
                buildSelectGroup ($product->agrupado, 'discount', $product);        ?>
            <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
        <?php 
            endif;
            if( $product->usar_select != 'ideal_euf' and
                $product->usar_select != 'ideal_vp'  and
                $product->usar_select != 'ideal_hp' ):
                buildSelectGroup ($product->agrupado, 'autoship', $product);
                if( $product->usar_select != 'combine_euf' ):                       ?>
            <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
        <?php
                    buildSelectGroup ($product->agrupado, 'combined', $product);
                endif;
            else:
                buildSelectGroup ($product->agrupado, 'ideal_package', $product);   ?>
            <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
            <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
        <?php
                buildSelectGroup ($product->agrupado, 'ideal_combine', $product);
            endif;
        ?>
        </div>
        <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
        <div class="vertical_div">&nbsp;</div>      <!--    Espaciador      -->
        <div id="product_buy_<?php echo $product_counter; ?>" class="centered">
            <a id="product_link_<?php echo $product_counter; ?>" href="<?php echo $product->carrito_enlace; ?>" 
            class="k-button">
            Add to Cart
            </a>
        </div>
        <!-- end producto_<?php echo $product_counter; ?> -->
    </div>
    <div class="centered product_pad">&nbsp;</div>
    <div style="clear:both;"></div>
</div>  <!-- end #Item_<?php echo $item_counter; ?> -->
<?php
    $product_counter++;
    $item_counter++;
}

//--------------------------------------------------------------------------------------------------

/**
    * Crea la estructura que agrupa a multiples productos, como en la tienda antigua
    * @param   $products   El array que contiene los productos que seran agrupados.
*/
function layoutMultipleProducts ($products) { 
    global $item_counter;
    global $product_counter;
?>
<div id="<?php echo "item_". $item_counter; ?>">            <!--    Separado    -->
    <div class="package-container full-package">
        <!-- INICIO PRODUCTOS NORMALES                                          -->
        <?php foreach ($products as $product): ?>
        <!--    Inicio  product_<?php echo $product_counter; ?>                 -->
        <div id="product_<?php echo $product_counter; ?>" class="centered product_container">
            <div id="product_image_<?php echo $product_counter; ?>" class="image_container centered">
                <img id="image_<?php echo $product_counter; ?>" src="<?php echo $product->imagen_enlace; ?>" 
                alt="imagen" width="<?php echo $product->imagen_ancho; ?>" 
                height="<?php echo $product->imagen_alto; ?>"/>
            </div>
            <div class="clear">&nbsp;</div>                 <!--  salto de linea    -->
            <div class="centered">
                <div id="product_main_type_<?php echo $product_counter; ?>">
                    <?php echo $product->producto_tipo; ?>
                </div>
            <?php 
                if ($product->usar_select != 'pe'): 
            ?>
                <div class="separator_top">&nbsp;</div>     <!--    Espaciador      -->
                <div id="product_name_<?php echo $product_counter; ?>">
                    <?php echo $product->producto_nombre; ?>
                </div>
            <?php
                else: ?>
                <div id="product_caps_select_<?php echo $product_counter; ?>" class="centered" style="width:100%;">
            <?php
                buildSelectGroup ($product->agrupado, 'box', $product);     ?>
                    <div class="clear">&nbsp;</div>         <!--  salto de linea    -->
            <?php
                buildSelectGroup ($product->agrupado, 'capsule', $product); ?>
                </div>
                <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
            <?php
                endif;
            ?>
                <div id="product_type_<?php echo $product_counter; ?>">
                    (<?php echo $product->producto_tipo_terapia; ?>)
                </div>
                <div id="product_usage_<?php echo $product_counter; ?>">
                    <?php echo $product->producto_uso_recomendado; ?>
                </div>
            <?php 
                if($product->producto_precio != $product->producto_precio_descuento): 
            ?>
                <div id="struck_price_<?php echo $product_counter; ?>"
                class="product_price_strikethrough">
                    <?php echo $product->producto_precio; ?> US$
                </div>
                <div class="product_price_highlight">
                    <strong id="product_price_<?php echo $product_counter; ?>"
                    class="product_price_highlight">
                    <?php echo $product->producto_precio_descuento; ?> US$
                    </strong>
                </div>
            <?php
                else:
            ?>
                <div id="product_price_<?php echo $product_counter; ?>">
                    <?php echo $product->producto_precio; ?> US$
                </div>
            <?php 
                endif;
            ?>
            </div>
            <div class="clear">&nbsp;</div>                 <!--  salto de linea    -->
            <div id="product_select_<?php echo $product_counter; ?>" style="width:100%;">
                <?php 
                    if($product->paquete_tipo != "Estandar"): 
                        buildSelectGroup ($product->agrupado, 'discount', $product); ?>
                <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
                <?php 
                    endif; 
                    buildSelectGroup ($product->agrupado, 'autoship', $product); ?>
                <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
                <?php
                    buildSelectGroup ($product->agrupado, 'combined', $product); 
                
                    if( $product->usar_select != "pe" and
                        $product->usar_select != "vp_caps" and
                        $product->usar_select != "combine_euf"): ?>
                <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
                <?php
                        buildSelectGroup ($product->agrupado, 'box', $product);  ?>
            </div>  <!-- end product_select_<?php echo $product_counter; ?>         -->
                <?php
                    else:   ?>
                <div class="clear">&nbsp;</div>             <!--  salto de linea    -->
            </div>  <!-- end product_select_<?php echo $product_counter; ?>         -->
            <div class="separator_bottom">&nbsp;</div>      <!--    Espaciador      -->
                <?php
                    endif;  ?>
            <div class="clear">&nbsp;</div>                 <!--  salto de linea    -->
            <div class="vertical_div">&nbsp;</div>          <!--    Espaciador      -->
            <div id="product_buy_<?php echo $product_counter; ?>" class="centered">
                <a id="product_link_<?php echo $product_counter; ?>" href="<?php echo $product->carrito_enlace; ?>" 
                class="k-button">
                Add to Cart
                </a>
            </div>
        </div>
        <!--    Fin     product_<?php echo $product_counter; ?>             -->
        <?php $product_counter++; 
        endforeach; ?>
        <div style="clear: both"></div>
        <!-- FIN    PRODUCTOS NORMALES <?php echo $product->paquete_tipo; ?>-->
    </div>
</div>  <!-- end Item_<?php echo $item_counter; ?> -->
<?php
    $item_counter++;
}

//--------------------------------------------------------------------------------------------------
// Funciones de elementos internos -- selects:
//--------------------------------------------------------------------------------------------------

/**
 * Se encarga de estructurar los selects de acuerdo al tipo de select
 * @param   $classType  Especifica productos sencillos o multiples. Opciones:
 *                      'single'
 *                      'multiple'
 * @param   $selectType Especifica el tipo de select a generar. Opciones:
 *                      'autoship'
 *                      'combined'
 *                      'discount'
 *                      'capsule'
 *                      'ideal_vial'
 *                      'ideal_package'
 *                      'ideal_combine'
 *                      'combine_caps'
 *                      'box'
 * @param   $product    El producto para el cual se genera el select.
 */
function buildSelectGroup ($classType, $selectType, $product) {
    global $product_counter;
    global $select_counter;
    global $product_to_combine;
    
    $selectIndex    = $product_counter."-".$select_counter;
    $prevIndex      = $product_counter."-".($select_counter-1);
    $nextIndex      = $product_counter."-".($select_counter+1);
    $type           = $product->usar_select;
    $boxVisible     = true;
    $tooltipClass   = ""; 
   
    if( ($selectType == 'box') &&               //Si quiero colocar una caja,
        ($type != 'pe') &&                      //y el tipo de producto no es pe
        (strpos($type, 'combine_') === false)): //ni tampoco combinado:
        $boxVisible = false;
    endif;
?>
    <div class="select_left<?php if(! $boxVisible): echo " hidden"; endif; ?>" 
         id="select_left_<?php echo $selectIndex; ?>" >
<?php 
        switch ($selectType):
            case 'autoship': {
                $tooltipId      = "tooltip_text";       //Automatic shipment
                buildSelectAutoship ($product, "");
                break;
            }
            case 'combined': {
                $tooltipId      = "tooltip_combinado";  //Product combination
                $tooltipClass   = "tooltip_combinado";
                buildSelectCombine ($product, $nextIndex, $product_to_combine);
                break;
            }
            case 'discount': {
                $tooltipId      = "tooltip_descuento";  //Discount select
                $tooltipClass   = "tooltip_descuento";
                buildSelectDiscount ($product);
                break;
            }
            case 'ideal_vial': {
                $tooltipId      = "tooltip_ampollas";   //Vial select
                $tooltipClass   = "tooltip_ampollas";
                buildSelectIdealVial ($product);
                break;
            }
            case 'ideal_package': {
                $tooltipId      = "tooltip_paquete";    //Package type select
                $tooltipClass   = "tooltip_paquete";
                buildSelectIdealPackage ($product);
                break;
            }
            case 'ideal_combine': {
                $tooltipId      = "tooltip_combinado";  //Product combination
                $tooltipClass   = "tooltip_combinado";
                buildSelectIdealCombine ($product, $product->usar_select, $product->paquete_tipo);
                break;
            }
            case 'capsule': {
                $tooltipId      = "tooltip_pe_vp";      //Capsule type selection
                buildSelectCapsule ($product, $prevIndex, $product_to_combine);
                break;
            }
            case 'combine_caps': {
                $tooltipId      = "tooltip_combinado";  //Capsule type selection - combined
                $tooltipClass   = "tooltip_combinado";
                buildSelectCapsuleCombined ($product);
                break;
            }
            case 'box': {
                $tooltipId      = "tooltip_caja";       //Product with or without box
                $tooltipClass   = "tooltip_caja";
                buildSelectBox ($product);
                break;
            }
        endswitch; ?>
    </div>
    <div class="select_right<?php if(! $boxVisible): echo " hidden"; endif; ?>" 
         id="select_right_<?php echo $selectIndex; ?>" >
        <a class="helpIconLink<?php if($tooltipClass != ""): echo " $tooltipClass"; endif; ?>" 
           href="javascript:void(0)" 
           onclick="$(this).children('img').attr({src:'./images/help_icon_on.gif', 'class':'helpIconImageOn'}); 
               <?php if($tooltipClass == ""): echo "openTooltip('".$tooltipId."');"; endif; ?>">
            <img src="./images/help_icon_off.gif" border="0" alt="?" width="14" height="14" align="middle" class="helpIconImage"/>
    <?php if ($classType == 'single'): ?>
            <span class="helpButtonText">What is this?</span>
    <?php endif; ?>
        </a>
    </div>
 <?php
 //Increment select counter to id each group;
 $select_counter++;
}
    
//--------------------------------------------------------------------------------------------------

/**
 * Construye el select de envio autom�tico para los distintos productos, si aplica.
 */
function buildSelectAutoship ( ) {
    global $product_counter;
?>
<select id="<?php echo "envio_". $product_counter ; ?>"
    class="shipping"
    onchange="change_link('<?php echo "product_link_". $product_counter; ?>', this);">
    <option value="0" selected>FREE Automatic Shipping</option>
    <option value="1">Automatic Shipping e/30 Days</option>
    <option value="2">Automatic Shipping e/2 months</option>
    <option value="3">Automatic Shipping e/3 months</option>
    <option value="4">Automatic Shipping e/6 months</option>
</select>
<?php
}

//--------------------------------------------------------------------------------------------------

/**
 * Construye el select de combinación para los distintos productos, si aplica.
 * @param   $product
 * @param   $select_id          Id del grupo de selects (divs) que deberan ocultarse o mostrarse 
 *                              de acuerdo a la seleccion del usuario.
 * @param   $combined_product   El tipo de producto a combinar, de las siguientes opciones:
 *                              'parche_plus'
 *                              'kimi'
 *                              'blue_cell'
 */
function buildSelectCombine ( $product, 
                              $select_index,
                              $combined_product = "") {
    global $product_counter;
    //TODO: Obtener estos valores para colocar las cantidades de forma dinamica:
    /*
    global $qty_euf;
    global $qty_vpcaps;
    global $qty_vpamps;
    global $qty_hp;
    */
    
    $type           = $product->usar_select;
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
    
    switch($combined_product):
    case "parche_plus":
        $texto_combinar = "Pro-Sero Patch";
        $select_value	= 6;
        break;
    case "blue_cell":
        $texto_combinar = "Blue Cell Serum";
        $select_value	= 7;
        break;
    case "kimi":
        $texto_combinar = "Kimi";
        $select_value	= 8;
        break;
    default:
        break;
    endswitch;
    
    if( $type != "pe_modify" and $type != "" ):
?>
<select id="<?php echo "combinar_". $product_counter; ?>"
onchange="update_product('<?php echo $product->paquete_tipo; ?>',
    '<?php echo "descuento_". $product_counter; ?>', 
    '<?php echo "combinar_". $product_counter; ?>', 
    '<?php echo "product_link_". $product_counter; ?>', 
    '<?php echo "image_". $product_counter; ?>', 
    '<?php echo $product->usar_select; ?>',   
     <?php echo $discount; ?>, 
     <?php echo $product->producto_peso; ?>, 
     <?php echo $descuento; ?>); 
    toggleSelectBox(<?php echo "'".$product_counter."'".", '".$select_index."'"; ?>);">
    <option value="0" selected>Achieve better results!</option>
<?php
	endif;
    
	switch($type):
        case "euf": ?>
    <option value="2">Combine with HP (4 vials)</option>
    <option value="3">Combine with VP (1 vial)</option>
    <option value="4">Combine with PE (30 caps)</option>
    <option value="5">Combine with VP (30 caps)</option>
<?php
    break;
        case "normal":
        case "hp":
        case "vp_vials":
?>
    <option value="1">Combine with EUF (2 vials)</option>
<?php
    break;
    case "pe":
?>
    <option value="1">Combine with EUF (2 vials)</option>
    <option value="2">Combine with HP (4 vials)</option>
    <option value="3">Combine with VP (1 vial)</option>
    <option value="5">Combine with VP (30 caps)</option>
<?php
    break;
    //TODO: Mudar a otra funcion
    case "pe2":
    //Select 2
?>
<div class="select_left">
    <select id="<?php echo "escoger_". $product_counter; ?>">
        <option value="0" selected>Escoger c&aacute;psulas PE o VP</option>
        <option value="1">C&aacute;psulas PE</option>
        <option value="2">C&aacute;psulas VP</option>
    </select>
</div>
<div class="select_right">
	<!--
    <a href="javascript:void(0)" onmouseover="TagToTip("tooltip_pe_vp', STICKY, true, CLOSEBTN, true, CLOSEBTNTEXT,
	'Haga click aqu&iacute; para cerrar', COPYCONTENT, false, SHADOW, true, WIDTH, -300, 
	CENTERWINDOW, true, CENTERALWAYS, true, PADDING, 20, DELAY, 400, 
	FADEIN, 800);" onmouseout="UnTip()">
	-->
    <a href="javascript:void(0)" onclick="openTooltip('tooltip_pe_vp');">
        <img src="http://mf3products.com/images/sitio/help_icon.gif" alt="?" width="14" height="14" class="c16" />
        <span class="helpButtonText">What is this?</span>
    </a>
</div>
<?php
    break;
    default:
    /*	No hacer nada	*/
    break;
	endswitch;
    
	if( $type != "pe_modify" and $type != "" ):
            if( $combined_product != "" ): ?>
    <option value="<?php echo $select_value; ?>">
        Combine with <?php echo $texto_combinar; ?>
    </option>
<?php       
            endif; ?>
</select>
<?php
	endif;
}	//end buildSelectCombine

//--------------------------------------------------------------------------------------------------

/**
 * Construye el select de porcentaje para productos comprados mediante programas 
 * de compra de 2, 3 y 6 meses, otorgando descuentos de 8, 12 y 15%, respectivamente.
 * Sin embargo, si el descuento del sitio es mayor o igual al de cualquiera de las opciones,
 * dichas opciones se igualan al porcentaje de descuento del sitio.
 * @param   $product El producto (objeto PHP) al cual se le calcular� el porcentaje de descuento.
 * @return  void
*/
function buildSelectDiscount ($product) {
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
    $porcentaje     = (1 - $descuento) * 100;
?>
<select id="<?php echo "descuento_". $product_counter ?>"
onchange="update_product( '<?php echo $product->paquete_tipo; ?>',
    '<?php echo "descuento_" . $product_counter; ?>', 
    '<?php echo "combinar_" . $product_counter; ?>', 
    '<?php echo "product_link_" . $product_counter; ?>', 
    '<?php echo "image_" . $product_counter; ?>', 
    '<?php echo $product->usar_select; ?>',
     <?php echo $discount; ?>,
     <?php echo $product->producto_peso; ?>, 
     <?php echo $descuento; ?>);">

    <option value="0">Get a discount!!</option>
    <option value="1">Program for 2 months
    <?php
        echo " (". (($descuento <= 0.92) ? ($porcentaje) : ("8")) ."% disc.)". PHP_EOL; 
    ?>
    </option>
    <option value="2">Program for 3 months
	<?php
        echo " (". (($descuento <= 0.88) ? ($porcentaje) : ("12")) ."% disc.)". PHP_EOL; 
    ?>
    </option>
    <option value="3">Program for 6 months
    <?php
        echo " (". (($descuento <= 0.85) ? ($porcentaje) : ("15")) ."% disc.)". PHP_EOL; 
    ?>
    </option>
</select>
<?php
}   //end buildSelectDiscount

//--------------------------------------------------------------------------------------------------

/**
 * 
 */
function buildSelectIdealVial ($product){
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
?>
<select id="select_tipo_ampolla_ideal_<?php echo $product_counter; ?>" 
class="select_producto_ideal" onchange="setIdealProduct(this, <?php echo $descuento; ?>);">
    <option value="1">Choose vial type</option>
    <option value="1">EUF</option>
    <option value="2">HP</option>
    <option value="3">VP</option>
</select>
<?
}   //end buildSelectIdealVial

//--------------------------------------------------------------------------------------------------

/**
 * 
 */
function buildSelectIdealPackage ($product) {
    global $product_counter;

    $selected_standard      = false;
    $selected_premium       = false;
    $selected_optimum       = false;
    $selected_optimum_plus  = false;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);

    $package_type = $product->paquete_tipo;
    $product_type = $product->usar_select;

    //Habilitar la opcion seleccionada por defecto:
    switch (strtolower($package_type)):
        case 'estandar': {
            $selected_standard      = true;
            break;
        }
        case 'premium': {
            $selected_premium       = true;
            break;
        }
        case 'optimum': {
            $selected_optimum       = true;
            break;
        }
        case 'optimum plus': {
            $selected_optimum_plus  = true;
            break;
        }
    endswitch;
    ?>
    <select id="select_tipo_paquete_ideal_<?php echo $product_counter; ?>" 
    class="select_paquete_ideal" onchange="setIdealProduct(this, <?php echo $descuento; ?>);">
        <?php
        switch ($product_type):
            case 'ideal_euf': {
                switch (strtolower($package_type)) {
                    case 'estandar': {
                    ?>
                        <option value="0"<?php echo (($selected_standard) ? " selected" : ""); ?>>
                            Standard: EUF (20 vials)
                        </option>
                    <?php
                        }
                    case 'premium': {
                    ?>
                        <option value="1"<?php echo (($selected_premium) ? " selected" : ""); ?>>
                            Premium: EUF (40 vials)
                        </option>
                    <?php
                        }
                    case 'optimum': {
                    ?>
                        <option value="2"<?php echo (($selected_optimum) ? " selected" : ""); ?>>
                            Optimum: EUF (60 vials)
                        </option>
                    <?php
                        }
                    case 'optimum plus': {
                    ?>
                        <option value="3"<?php echo (($selected_optimum_plus) ? " selected" : ""); ?>>
                            Optimum Plus: EUF (80 vials)
                        </option>
                    <?php
                        }
                }
                break;
            }
            case 'ideal_hp': {
                switch (strtolower($package_type)) {
                    case 'estandar': {
                    ?>
                        <option value="4"<?php echo (($selected_standard) ? " selected" : ""); ?>>
                            Standard: 50 HP vials
                        </option>
                    <?php
                        }
                    case 'premium': {
                    ?>
                        <option value="5"<?php echo (($selected_premium) ? " selected" : ""); ?>>
                            Premium: 100 HP vials
                        </option>
                    <?php
                        }
                    case 'optimum': {
                    ?>
                        <option value="6"<?php echo (($selected_optimum) ? " selected" : ""); ?>>
                            Optimum: 150 HPvials
                        </option>
                    <?php
                        }
                    case 'optimum plus': {
                    ?>
                        <option value="7"<?php echo (($selected_optimum_plus) ? " selected" : ""); ?>>
                            Optimum Plus: 200 HP vials
                        </option>
                    <?php
                        }
                }
                break;
            }
            case 'ideal_vp': {
                switch (strtolower($package_type)) {
                    case 'estandar': {
                    ?>
                        <option value="8" <?php echo (($selected_standard) ? "selected" : ""); ?>>
                            Standard: 10 VP vials
                        </option>
                    <?php
                        }
                    case 'premium': {
                    ?>
                        <option value="9"<?php echo (($selected_premium) ? " selected" : ""); ?>>
                            Premium: 20 VP vials
                        </option>
                    <?php
                        }
                    case 'optimum': {
                    ?>
                        <option value="10"<?php echo (($selected_optimum) ? " selected" : ""); ?>>
                            Optimum: 30 VP vials
                        </option>
                    <?php
                        }
                    case 'optimum plus': {
                    ?>
                        <option value="11"<?php echo (($selected_optimum_plus) ? " selected" : ""); ?>>
                            Optimum Plus: 40 VP vials
                        </option>
                    <?php
                        }
                }
                break;
            }
        default: {
                break;
            }
    endswitch;
    ?>
    </select> 
    <?php
}   //end buildSelectIdealPackage

//--------------------------------------------------------------------------------------------------

/**
 *  
 */
function buildSelectIdealCombine($product, $ideal_type = 'ideal_euf', $from_package = 'estandar') {
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
?>
<select id="select_combinar_ideal_<?php echo $product_counter; ?>"
        class="select_combinar_ideal"
        onchange="setIdealProduct(this, <?php echo $descuento; ?>);">
    <option value="0" selected>
        Optimize to achieve better results.
    </option>
<?php
    switch($ideal_type):
        case 'ideal_euf':
            switch(strtolower($from_package)):
                case 'estandar':
?>
    <option value="1">
        Standard: 20 EUF vials + 4 MFIII PE boxes
    </option>
<?php
                case 'premium':
?>
    <option value="2">
        Premium: 40 EUF vials + 8 MFIII PE boxes
    </option>
<?php
                case 'optimum':
?>
    <option value="3">
        Optimum: 60 EUF vials + 12 MFIII PE boxes
    </option>
<?php
                case 'optimum plus':
?>
    <option value="4">
        Optimum Plus: 80 EUF vials + 16 MFIII PE boxes
    </option>
<?php
            endswitch;
        break;
        case 'ideal_hp':
            switch(strtolower($from_package)):
                case 'estandar':
?>
    <option value="5">
        Standard: 50 HP vials + 4 MFIII PE boxes
    </option>
<?php
                case 'premium':
?>
    <option value="6">
        Premium: 100 HP vials + 8 MFIII PE boxes
    </option>
<?php
                case 'optimum':
?>
    <option value="7">
        Optimum: 150 HP vials + 12 MFIII PE boxes
    </option>
<?php
                case 'optimum plus':
?>
    <option value="8">
        Optimum Plus: 200 HP vials + 16 MFIII PE boxes
    </option>
<?php
            endswitch;
        break;
        case 'ideal_vp':
            switch(strtolower($from_package)):
                case 'estandar':
?>
    <option value="9">
        Standard: 10 VP vials + 4 MFIII PE boxes
    </option>
<?php
                case 'premium':
?>
    <option value="10">
        Premium: 20 VP vials + 8 MFIII PE boxes
    </option>
<?php
                case 'optimum':
?>
    <option value="11">
        Optimum: 30 VP vials + 12 MFIII PE boxes
    </option>
<?php
                case 'optimum plus':
?>
    <option value="12">
        Optimum Plus: 40 VP vials + 16 MFIII PE boxes
    </option>
<?php
            endswitch;
        break;
    endswitch;
?>
</select>
<?php    
}   //end buildSelectIdealCombine

//--------------------------------------------------------------------------------------------------

/**
 * Construye el select para cambiar el tipo de capsula, ya sea PE, VP, o el producto combinado.
 */
function buildSelectCapsule ($product, $select_index, $combined_product = "") {
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
    
    
    switch($combined_product):
    case "parche_plus":
        $texto_select   = "Choose capsules or patch";
        $texto_combinar = "Pro-Sero Patch";
        $select_value	= 6;
        break;
    case "blue_cell":
        $texto_select   = "Choose capsules or cream";
        $texto_combinar = "Blue Cell Serum";
        $select_value	= 7;
        break;
    case "kimi":
        $texto_select   = "Choose capsules or soles";
        $texto_combinar = "Kimi";
        $select_value	= 8;
        break;
    default:
        $texto_select   = "Choose PE or VP capsules";
        break;
    endswitch;    
?>
<select id="<?php echo "escoger_". $product_counter; ?>"
onchange="update_product( '<?php echo $product->paquete_tipo; ?>',
    '<?php echo "descuento_" . $product_counter; ?>', 
    '<?php echo "combinar_" . $product_counter; ?>', 
    '<?php echo "product_link_" . $product_counter; ?>', 
    '<?php echo "image_" . $product_counter; ?>', 
    '<?php echo $product->usar_select; ?>',
     <?php echo $discount; ?>,
     <?php echo $product->producto_peso; ?>, 
     <?php echo $descuento; ?>);
     toggleSelectBox(<?php echo "'".$product_counter."'".", '".$select_index."'"; ?>, 
                     undefined, undefined, undefined, 'capsule');">
	<option value="0" selected><?php echo $texto_select; ?></option>
	<option value="1">PE capsules</option>
	<option value="2">VP capsules</option>
<?php 
    if( $combined_product != "" ): 
?>
        <option value="<?php echo $select_value; ?>">
            <?php echo $texto_combinar; ?>
        </option>
<?php       
    endif; 
?>
</select>
<?php
}   //end buildSelectCapsule

//--------------------------------------------------------------------------------------------------

/**
 * Construye el select para cambiar el tipo de capsula en productos combinados, ya sea PE o VP.
 */
function buildSelectCapsuleCombined ($product) {
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
?>
<select id="<?php echo "combinar_". $product_counter; ?>"
onchange="update_product( '<?php echo $product->paquete_tipo; ?>',
    '<?php echo "descuento_" . $product_counter; ?>', 
    '<?php echo "combinar_" . $product_counter; ?>', 
    '<?php echo "product_link_" . $product_counter; ?>', 
    '<?php echo "image_" . $product_counter; ?>', 
    '<?php echo $product->usar_select; ?>',
     <?php echo $discount; ?>,
     <?php echo $product->producto_peso; ?>, 
     <?php echo $descuento; ?>);">
	<option value="4" selected>Choose PE or VP capsules</option>
	<option value="4"><?php echo $product->producto_nombre; ?> + PE capsules</option>
	<option value="5"><?php echo $product->producto_nombre; ?> + VP capsules</option>
</select>
<?php
}   //end buildSelectCapsule

//--------------------------------------------------------------------------------------------------

function buildTooltipPE($product) {
?>
<div style="clear: both; width: 50%">
    <div class="select_left">
		<strong class="product_name">
			<?php echo $product->producto_nombre; ?> 
        </strong>
    </div>
	<div class="select_right">
		<a href="javascript:void(0)" onmouseover="TagToTip('tooltip_pe_vp', STICKY, true, CLOSEBTN, true, CLOSEBTNTEXT,
		'Click here to close', COPYCONTENT, false, SHADOW, true, WIDTH, -300, 
		CENTERWINDOW, true, CENTERALWAYS, true, PADDING, 20, DELAY, 400, 
		FADEIN, 800)" onmouseout="UnTip()">
        <img src="http://mf3products.com/images/sitio/help_icon.gif" alt="?" width="14" height="14" class="c16" />
		</a>
    </div>
</div>
<?php
}   //end buildTooltipPE

//--------------------------------------------------------------------------------------------------

/**
 * Crea un select que le permite al usuario seleccionar si los productos en capsulas pueden ir con
 * o sin caja, lo cual afecta el precio final del producto.
 */
function buildSelectBox($product) {
    global $product_counter;
    
    if( isset( $product->producto_precio_solo_descuento ) and
        isset( $product->producto_precio_solo ) ):
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_solo_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio_solo ) );
    else:
        $discount   = floatval( str_replace( ",", "", $product->producto_precio_descuento ) );
        $price      = floatval( str_replace( ",", "", $product->producto_precio ) );
    endif;
    $descuento      = round(($discount / $price), 2);
    $type           = $product->usar_select;
?>
    <select id="<?php echo "cajita_". $product_counter ?>"
    onchange="update_product( '<?php echo $product->paquete_tipo; ?>',
        '<?php echo "descuento_" . $product_counter; ?>', 
        '<?php echo "combinar_" . $product_counter; ?>', 
        '<?php echo "product_link_" . $product_counter; ?>', 
        '<?php echo "image_" . $product_counter; ?>', 
        '<?php echo $type; ?>',
         <?php echo $discount; ?>,
         <?php echo $product->producto_peso; ?>, 
         <?php echo $descuento; ?>);">
        <option value="0">Without box</option>
        <option value="1">With box</option>
    </select>  
<?php
}   //end buildSelectBox
//--------------------------------------------------------------------------------------------------
?>