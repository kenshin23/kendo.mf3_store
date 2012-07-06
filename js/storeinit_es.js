/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//Enable preloader:
$(document).ready(function () {
    $('#wrapper').delay(5000).css('display','block');
    $("body").queryLoader2({
        backgroundColor: '#FFFFFF', //White
        barColor: '#C3D9FF',        //Blue
        barHeight: 20,
        percentage: true
    });
});
$("#preloader").remove();
            
//Init framework:
$(document).ready(function() {
    $("#panelBar").kendoPanelBar({
        expandMode: "single"
    });
    $("#package_1").kendoTabStrip({
        collapsible: false,
        animation: {
            open: { 
                effects: "fadeIn"
            } 
        }
    });
    $("#package_2").kendoTabStrip({
        collapsible: false,
        animation: {
            open: { 
                effects: "fadeIn"
            } 
        }
    });
    $("#package_3").kendoTabStrip({
        collapsible: false,
        animation: {
            open: { 
                effects: "fadeIn"
            } 
        }
    });
    $("#package_4").kendoTabStrip({
        collapsible: false,
        animation: {
            open: { 
                effects: "fadeIn"
            } 
        }
    });
});
            
//On tooltip close, change icon back:
function closeTooltip(){
    $(".helpIconImageOn").each(function(){
        $(this).attr("src", "./images/help_icon_off.gif");
        $(this).toggleClass("helpIconImageOn");
    });
}
            
//Init tooltips:
$(document).ready(function(){
    var window1 = $("#tooltip_text").kendoWindow({
        draggable: false,
        height: "300px",
        title: "Servicio de Env&iacute;o Autom&aacute;tico",
        visible: false,
        width: "450px",
        close: closeTooltip
    }).data("kendoWindow");
                
    var window2 = $("#tooltip_combinado").kendoWindow({
        draggable: false,
        height: "300px",
        title: "Combinar Productos",
        visible: false,
        width: "450px",
        close: closeTooltip
    }).data("kendoWindow");
                
    $('.tooltip_combinado').qtip({
        prerender: true,
        suppress: false,
        content: {
            text: 'Puede combinar este paquete con cualquiera de los productos'+
            ' mencionados para <strong>obtener mejores resultados!</strong>'+
            '<br/><br/>Simplemente escoja el producto en el men&uacute; con'+ 
            ' el cual desea combinar.',
            title: {
                text: 'Combinar producto',
                button: 'Close'
            }
        },
        title: {
            text: 'Combinar producto'
        },
        position: {
            my: 'bottom left',  // Position my bottom left...
            at: 'top right',    // at the top right of...
            //target: 'mouse'   // my target x/y mouse click coordinates
            target: 'event'     //my target
        },
        events: {
            hide: closeTooltip
        },
        show: {
            event: 'click'
        },
        hide: {
            event: false
        },
        style: {
            classes: 'ui-tooltip-blue ui-tooltip-shadow'
        }
    })
                
    var window3 = $("#tooltip_descuento").kendoWindow({
        height: "300px",
        title: "Obtenga un Descuento",
        visible: false,
        width: "450px",
        close: closeTooltip
    }).data("kendoWindow");
                
    $('.tooltip_ampollas').qtip({
        prerender: true,
        suppress: false,
        content: {
            text: 'Ac&aacute; puede seleccionar el tipo de ampollas que desee comprar,'+ 
            ' ya sean Eco UltraFiltrados, MFIII HP o MFIII VP.',
            title: {
                text: 'Seleccionar ampollas',
                button: 'Close'
            }
        },
        title: {
            text: 'Seleccionar ampollas'
        },
        position: {
            my: 'bottom left',  // Position my bottom left...
            at: 'top right',    // at the top right of...
            //target: 'mouse'   // my target x/y mouse click coordinates
            target: 'event'     //my target
        },
        events: {
            hide: closeTooltip
        },
        show: {
            event: 'click'
        },
        hide: {
            event: false
        },
        style: {
            classes: 'ui-tooltip-blue ui-tooltip-shadow'
        }
    })

    $('.tooltip_paquete').qtip({
        prerender: true,
        suppress: false,
        content: {
            text: 'Ac&aacute; puede seleccionar el tipo de paquete ideal que desea' +
            ' comprar.',
            title: {
                text: 'Seleccionar paquete',
                button: 'Close'
            }
        },
        title: {
            text: 'Seleccionar paquete'
        },
        position: {
            my: 'bottom left',  // Position my bottom left...
            at: 'top right',    // at the top right of...
            //target: 'mouse'   // my target x/y mouse click coordinates
            target: 'event'     //my target
        },
        events: {
            hide: closeTooltip
        },
        show: {
            event: 'click'
        },
        hide: {
            event: false
        },
        style: {
            classes: 'ui-tooltip-blue ui-tooltip-shadow'
        }
    })

    $('.tooltip_caja').qtip({
        prerender: true,
        suppress: false,
        content: {
            text: 'Usted tiene la opci&oacute;n de seleccionar que sus productos en'+ 
            ' c&aacute;psulas vengan sin caja/empaque (unicamente en un sobre'+
            ' protector), ahorr&aacute;ndose as&iacute el costo de la misma el'+
            ' cual es de 25 US$.',
            title: {
                text: 'Seleccionar opci&oacute;n con/sin caja',
                button: 'Close'
            }
        },
        title: {
            text: 'Seleccionar opci&oacute;n con/sin caja'
        },
        position: {
            my: 'bottom left',  // Position my bottom left...
            at: 'top right',    // at the top right of...
            //target: 'mouse'   // my target x/y mouse click coordinates
            target: 'event'     //my target
        },
        events: {
            hide: closeTooltip
        },
        show: {
            event: 'click'
        },
        hide: {
            event: false
        },
        style: {
            classes: 'ui-tooltip-blue ui-tooltip-shadow'
        }
    })

    var window4 = $("#tooltip_pe_vp").kendoWindow({
        draggable: false,
        height: "350px",
        title: "Seleccionar c&aacute;psulas PE - VP",
        visible: false,
        width: "450px",
        close: closeTooltip
    }).data("kendoWindow");
                
    var window5 = $("#tooltip_caja").kendoWindow({
        draggable: false,
        height: "100px",
        title: "Seleccionar opci&oacute;n con/sin caja",
        visible: false,
        width: "300px",
        close: closeTooltip
    }).data("kendoWindow");
                
    var window6 = $("#tooltip_euf").kendoWindow({
        draggable: false,
        height: "300px",
        title: "Seleccionar Eco-UltraFiltrados",
        visible: false,
        width: "450px",
        close: closeTooltip
    }).data("kendoWindow");
});
            
//Assign buttons to open panelBar items remotely:
$("#openButton1").click(function(){
    var panelBar = $("#panelBar").data("kendoPanelBar");
    panelBar.expand($("#panelBarItem_1"));
});
            
$("#openButton2").click(function(){
    var panelBar = $("#panelBar").data("kendoPanelBar");
    panelBar.expand($("#panelBarItem_2"));
});
            
$("#openButton3").click(function(){
    var panelBar = $("#panelBar").data("kendoPanelBar");
    panelBar.expand($("#panelBarItem_3"));
});
            
$("#openButton4").click(function(){
    var panelBar = $("#panelBar").data("kendoPanelBar");
    panelBar.expand($("#panelBarItem_4"));
});

//Assign clicks to open all combined products if one of them is selected:
$("#tabStripItem_1").click(function(){
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_4"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_7"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_10"));
});
            
$("#tabStripItem_4").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_1"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_7"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_10"));
});
            
$("#tabStripItem_7").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_1"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_4"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_10"));
});
            
$("#tabStripItem_10").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_1"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_4"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_7"));
});

//Assign clicks to open all separate products if one of them is selected:
$("#tabStripItem_2").click(function(){
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_5"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_8"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_11"));
});
            
$("#tabStripItem_5").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_2"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_8"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_11"));
});
            
$("#tabStripItem_8").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_2"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_5"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_11"));
});
            
$("#tabStripItem_11").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_2"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_5"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_8"));
});
            
//Assign clicks to open all ideal products if one of them is selected:
$("#tabStripItem_3").click(function(){
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_6"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_9"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_12"));
});
            
$("#tabStripItem_6").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_3"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_9"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_12"));
});
            
$("#tabStripItem_9").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_3"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_6"));
    $("#package_4").data("kendoTabStrip").activateTab($("#tabStripItem_12"));
});
            
$("#tabStripItem_12").click(function(){
    $("#package_1").data("kendoTabStrip").activateTab($("#tabStripItem_3"));
    $("#package_2").data("kendoTabStrip").activateTab($("#tabStripItem_6"));
    $("#package_3").data("kendoTabStrip").activateTab($("#tabStripItem_9"));
});
            
//Enable tooltip window open:
function openTooltip(tTipId){
    var kWindow = $("#"+tTipId).data("kendoWindow");
    kWindow.center();
    kWindow.open();
}