<!DOCTYPE html>
<html lang="es-VE">
    <head>
        <title>Tienda</title>
        <meta http-equiv="Content-type"     content="text/html; charset=UTF-8" />

        <!-- Begin Stylesheets -->
        <link href="css/reset.css"              rel="stylesheet" type="text/css" media="screen" />
        <link href="css/960.css"                rel="stylesheet" type="text/css" media="screen" />
        <link href="css/text.css"               rel="stylesheet" type="text/css" media="screen" />        

        <!--    Old Store Product Stylesheet    -->
        <link href="../includes/css/productos1.css" rel="stylesheet" type="text/css" media="screen" />

        <link href="css/kendo.common.min.css"   rel="stylesheet" type="text/css" media="screen" />
        <link href="css/kendo.blueopal.min.css" rel="stylesheet" type="text/css" media="screen" />
        <!--
        <link href="css/kendo.silver.min.css"   rel="stylesheet" type="text/css" media="screen" />
        -->
        <!--
        <link href="css/kendo.black.min.css"    rel="stylesheet" type="text/css" media="screen" />
        -->
        <!--
        <link href="css/kendo.metro.min.css"    rel="stylesheet" type="text/css" media="screen" />
        -->
        <!--
        <link href="css/kendo.default.min.css"  rel="stylesheet" type="text/css" media="screen" />
        -->
        <!--    jQuery qTip Stylesheet          -->
        <link href="css/jquery.qtip.min.css"    rel="stylesheet" type="text/css" media="screen" />
        <!--    New Store Product Stylesheet    -->
        <!--
        <link href="css/store.css"              rel="stylesheet" type="text/css" media="screen" />
        -->
        <style>
            /* Applies to packages */
            .package-container {
                min-height              : 430px;
                position                : absolute;
            }
            .full-package {
                width                   : 100%;
                position                : relative;
            }
            /* Applies to products */
            .one-product {
                position                : relative;
                padding-top             : 2% !important;  /* Overrides 4% from .product_container   */
            }
            .image_container {
                padding-top             : 10px;
                padding-bottom          : 10px;
            }
            .product_container {
                width                   : 25%;
                float                   : left;
                padding-top             : 3.5%;
            }
            .product_pad {                              /* Provides padding for a centered product  */
                width                   : 36%;
                float                   : left;
            }
            .centered {
                text-align              : center;
                margin-left             : auto;
                margin-right            : auto;
            }
            select {
                width                   : 17em;
                font-size               : 0.6em;
            }
            select.shipping {
                background-color        : #fff000;
            }
            .tooltip {
                font-size               : 0.875em;
            }
            div.vertical_div {
                font-size               : 14px;
                line-height             : 14px;
                min-height              : 0.875em;
            }
            div.separator_top {
                font-size               : 16px;
                line-height             : 16px;
                min-height              : 1em;
            }
            div.separator_bottom {
                font-size               : 16px;
                line-height             : 16px;
                min-height              : 0.875em;
            }
            div.select_parent {
                width                   : 100%;
            }
            div.select_left {
                width                   : 40%;
                float                   : left;
                position                : relative;
                left                    : 45px;
            }
            div.select_right {
                width                   : 55%;
                float                   : right;
                position                : relative;
                left                    : 80px;
                text-align              : left;
            }
            div.select_center {
                width                   : 100%;
                position                : relative;
                left                    : 50px;
                text-align              : left;
            }
            div.newline {
                clear                   : both;
            }
            a.helpIconLink {
                color                   : black;
                text-decoration         : none;
                text-decoration-color   : black;
                cursor                  : help; 
            }
            span.helpButtonText {
                font-size               : 0.75em;
            }
            .hidden {
                visibility              : hidden;
            }
        </style>
        <!-- End Stylesheets -->

        <script type="text/javascript" src="./js/store_old_en.js"></script>
        <script type="text/javascript" src="./js/store_en.js"></script>
    </head>
    <body>
        <?php
            // Esto activa TODAS las opciones de debugging del servidor.
            // Solo usar -colocar en true- en caso de errores graves 
            // (paginas en blanco):
            $debugging = false;

            if ($debugging):
                ini_set("display_errors", 1);
                ini_set("display_startup_errors", 1);
                error_reporting(E_ALL | E_NOTICE | E_STRICT);
            endif;

            //Incluir calculo de precios:
            require_once("php/calculate_prices_en.php");

            //Incluir variables de configuracion:
            include "php/configure_discount_page_en.php";

            //Incluir los productos a utilizar:
            require_once("php/products_bluecell_en.php");

            //Incluir funciones de estructuracion:
            include "php/store_functions_en.php";
        ?>
        <!-- Content Wrapper -->
        <div id="wrapper" style="display: none;">
            
            <div id="preloader">
                <img src="./images/bc.png" 
                     alt="image01"/>
                <img src="./images/bc+kimi.png" 
                     alt="image02"/>
                <img src="./images/bc+parche.png" 
                     alt="image03"/>
                <img src="./images/euf.png" 
                     alt="image04"/>
                <img src="./images/euf+bc.png" 
                     alt="image05"/>
                <img src="./images/euf+kimi.png" 
                     alt="image06"/>
                <img src="./images/euf+parche.png" 
                     alt="image07"/>
                <img src="./images/help_icon_off.gif" 
                     alt="image08"/>
                <img src="./images/help_icon_on.gif" 
                     alt="image09"/>
                <img src="./images/hp.png" 
                     alt="image10"/>
                <img src="./images/hp_single.png" 
                     alt="image11"/>
                <img src="./images/hp+bc.png" 
                     alt="image12"/>
                <img src="./images/hp+euf.png" 
                     alt="image13"/>
                <img src="./images/hp+kimi.png" 
                     alt="image14"/>
                <img src="./images/hp+parche.png" 
                     alt="image15"/>
                <img src="./images/hp+pe.png" 
                     alt="image16"/>
                <img src="./images/hp+vpamp.png" 
                     alt="image17"/>
                <img src="./images/hp+vpcaps.png" 
                     alt="image18"/>
                <img src="./images/kimi.png" 
                     alt="image19"/>
                <img src="./images/parche.png" 
                     alt="image20"/>
                <img src="./images/parche+kimi.png" 
                     alt="image21"/>
                <img src="./images/pe.png" 
                     alt="image22"/>
                <img src="./images/pe+bc.png" 
                     alt="image23"/>
                <img src="./images/pe+euf.png" 
                     alt="image24"/>
                <img src="./images/pe+kimi.png" 
                     alt="image25"/>
                <img src="./images/pe+parche.png" 
                     alt="image26"/>
                <img src="./images/pe+vpamp.png" 
                     alt="image27"/>
                <img src="./images/pe+vpcaps.png" 
                     alt="image28"/>
                <img src="./images/vpamp.png" 
                     alt="image29"/>
                <img src="./images/vpamp+bc.png" 
                     alt="image30"/>
                <img src="./images/vpamp+euf.png" 
                     alt="image31"/>
                <img src="./images/vpamp+kimi.png" 
                     alt="image32"/>
                <img src="./images/vpamp+parche.png" 
                     alt="image33"/>
                <img src="./images/vpcaps.png" 
                     alt="image34"/>
                <img src="./images/vpcaps+bc.png" 
                     alt="image35"/>
                <img src="./images/vpcaps+euf.png" 
                     alt="image36"/>
                <img src="./images/vpcaps+kimi.png" 
                     alt="image37"/>
                <img src="./images/vpcaps+parche.png" 
                     alt="image38"/>
                <img src="./images/vpcaps+vpamp.png" 
                     alt="image39"/>
            </div>
            
            <!-- TOOLTIPS -->
            <div style="text-align: center;" id="tooltip_text">
                <div class="centered">
                    <h2 class="product_h2" style="text-align: center;">
                        Automatic Shipping Service<br/>
                        Entirely FREE!
                    </h2>
                </div>
                <div class="tooltip" style="text-align: center;" >
                    If you suscribe to the <em>Automatic Shipping Service</em>, 
                    your order will be <strong>placed automatically</strong> and 
                    <strong>charged</strong> charged to your credit card; you don't have to worry 
                    about forgeting to order. The process is automatically taken care of by our 
                    Shopping Cart, so it is entirely safe and secure.
                    <br/>
                    <br/>
                    <strong>We suggest you choose this option</strong>, since  
                    <strong>you will get better results</strong> with a constant treatment for at 
                    least 3 (three) months. Which is why <strong>we recommend choosing the option
                    for Automatic Shipping every 30 days</strong> and keeping your subscription to
                    the service during at least three orders. 
                    This will be an excellent way to keep it updated.
                    <br/>
                    <br/>
                    <strong>Note:</strong> You can contact us anytime if you want to request your 
                    withdrawal from the autoship service subscription. (Free of charge).
                    Also remember that this option is only activated with your permission; the 
                    system will activate the option only at your request.
                </div>
            </div>
                
            <div style="text-align: center;" id="tooltip_combinado">
                <div class="tooltip">
                    You can combine this package with any of the products mentioned to 
                    <strong>achieve better results!</strong> Simply choose the product you wish to 
                    combine in the menu.
                </div>
            </div>
                
            <div style="text-align: center;" id="tooltip_pe_vp">
                <div class="tooltip">
                    <?php if($product_to_combine == ""): ?>
                    You can choose berween PE capsules (Ovine Placenta) or VP (Vegetal Placenta), 
                    according to your preference.
                    <?php elseif($product_to_combine == "blue_cell"): ?>
                    You can choose berween PE capsules (Ovine Placenta), VP (Vegetal Placenta), or
                    Blue Cell Serum, according to your preference.
                    <?php elseif($product_to_combine == "parche_plus"): ?>
                    You can choose berween PE capsules (Ovine Placenta), VP (Vegetal Placenta), or
                    Pro-Sero Patches, according to your preference.
                    <?php else: ?>
                    You can choose berween PE capsules (Ovine Placenta), VP (Vegetal Placenta), or
                    Kimi soles, according to your preference.
                    <?php endif; ?>
                    <br/>
                    <br/>
                    <div style="margin: 0 auto; text-align: center;">
                        <img src="./images/vpamp_big.png" alt="MFIII VP"/>
                    </div>
                </div>
            </div>
                
            <div style="text-align: center;" id="tooltip_caja">
                <div class="tooltip">
                    You have the option of having your capsule product shipped without a box (only 
                    in a protective envelope), whjich will save you its cost (a $25 value for each 
                    box).
                </div>
            </div>
                
            <div style="text-align: center;" id="tooltip_euf">
                <div class="tooltip">
                    <?php //include "php/tooltips_euf.php"; ?>
                </div>
            </div>
            <!-- END TOOLTIPS -->
            <!-- Header -->
            <div class="container_16">
                <div class="grid_10 prefix_3" style="background-image: url(./images/header.png); width: 940px; height: 196px; border: 0px; background-repeat: no-repeat;">
                    
                    <div style="display: table; height: 196px; #position: relative; overflow: hidden;">
                        <div style=" #position: absolute; #top: 50%;display: table-cell; vertical-align: bottom;">
                        <?php
                        if( isset($porcentaje_descuento) && ($porcentaje_descuento != 1) ):
                            $porcentaje_promo	= round( ((1 - $porcentaje_descuento) * 100), 2);
                        ?>
                            <div style="color: white; text-align: center;">
                                <h2>
                                    <?php echo $porcentaje_promo; ?>% Discount Promotion
                                </h2>
                            </div>
                            <div class="vertical_div">&nbsp;</div>
                        <?php
                        endif;		
                        ?>
                            <button id="openButton1" class="k-button">Standard Package</button>
                            <button id="openButton2" class="k-button">Premium Package</button>
                            <button id="openButton3" class="k-button">Optimum Package</button>
                            <button id="openButton4" class="k-button">Optimum Plus Package</button>
                            <div class="vertical_div">&nbsp;</div>
			</div>
                    </div>
                </div>  <!-- grid_16        -->
            </div>  <!-- container_16       -->
            <div class="clear">&nbsp;</div>   
            <div class="container_16">
                <div class="grid_16" id="main_packages">
                    <?php
                    //Testing:
                    //echo "<pre>";
                    //print_r($paquetes);
                    //reset($paquetes);
                    //echo "</pre>";
                    //Imprimir la página:
                    layoutPackages($paquetes);
                    ?>
                </div>  <!-- grid_16        -->
            </div>  <!--    container_16    -->
            <!-- FOOTER                     -->
            <div class="vertical_div">&nbsp;</div>
            <div align="center" style="font-size: 10px; color:#545454;">
                Copyright <?php echo date("Y") ?>. Grand News Marketing, Inc. 246 5th Avenue, Ste. 605, New York, NY 10001<br>
                <a href="http://bit.ly/vOsNO0" target="_blank">Free Chat Service</a> | 
                <a href="http://bit.ly/s601QN" target="_blank">Free Telephone Service</a> | 
                Phone: +1(212)448-9088 | Fax: +1(212)591-6810 | 
                E-mail: <a href="mailto:info@mf3la.com">info@mf3la.com</a>
            </div>
            <div class="vertical_div">&nbsp;</div>
        </div>
        <!-- Begin JavaScript -->
        <!--       Loading jQuery       -->
        <script type="text/javascript" src="./js/jquery-1.7.1.js"></script>
        <!--        Loading KendoUI     -->
        <script type="text/javascript" src="./js/kendo.all.min.js"></script>
        <!--        Loading qTip        -->
        <script type="text/javascript" src="./js/jquery.qtip.min.js"></script>
        <!--        Loading preloader   -->
        <script type="text/javascript" src="./js/jquery.queryloader2.js"></script>
        <!--        Init store          -->
        <script type="text/javascript" src="./js/storeinit_en.js"></script>
    </body>
</html>        