/**
 * getVialSelect
 *
 */
function getVialSelect(idNumber) {
    "use strict";
    var DEBUG               = false;
    //Getting the select:
    var completeId          = "select_tipo_ampolla_ideal_" + idNumber;
    var select              = document.getElementById(completeId);
    var currentSelection    = parseInt(select.options[select.selectedIndex].value, 10);
    var vialType;
    
    if (DEBUG) {
        alert("ID del select de ampolla: : '" + completeId + "'");
    }
    if (!select) {
        if (DEBUG) {
            alert("Error. No se pudo obtener el select de ampolla.");
        }
        return null;
    }
    
    switch (currentSelection){
        case 1: {
            vialType    = 'euf';
            break;
        }
        case 2: {
            vialType    = 'hp';
            break;
        }
        case 3: {
            vialType    = 'vp';
            break;
        }
        default: {
            vialType    = "";
        }
    }
    return vialType;
}

//--------------------------------------------------------------------------------------------------

/**
 * Obtiene el select de tipo de los paqutes ideales.
 * @param   idNumber    Numero del identificador unico del select a obtener,
 */
function getTypeSelect(idNumber) {
    "use strict";
    var DEBUG               = false;
    //Getting the select:
    var completeId          = "select_tipo_paquete_ideal_" + idNumber;
    var select              = document.getElementById(completeId);
    var currentSelection    = parseInt(select.options[select.selectedIndex].value, 10);
    var productType;
    if (DEBUG) {
        alert("ID del select de tipo: '" + completeId + "'");
    }
    if (!select) {
        if (DEBUG) {
            alert("Error. No se pudo obtener el select de tipo.");
        }
        return null;
    }
    switch (currentSelection) {
        case 0: 
        case 4:
        case 8: {
            productType = 'standard';
            break;
        }
        case 1:
        case 5:
        case 9: {
            productType = 'premium';
            break;
        }
        case 2:
        case 6:
        case 10: {
            productType = 'optimum';
            break;
        }
        case 3:
        case 7:
        case 11: {
            productType = 'optimum_plus';
            break;
        }
        default: {
            productType = "";
        }
    }
    return productType;
}

/**
 * Cambia el select de opciones de paquete.
 * @param currentPackage    Paquete actualmente seleccionado, entre las siguientes opciones:
 *                          'standard'
 *                          'premium'
 *                          'optimum'
 *                          'optimum_plus'
 * @param vial_type         Tipo del producto a cambiar, entre las siguientes opciones:
 *                          'euf'
 *                          'hp'
 *                          'vp'
 * @param idNumber          Numero de id del select a cambiar.
 */
function setTypeSelect(currentPackage, vial_type, idNumber) {
    "use strict";
    var DEBUG               = false;
    //Getting the select:
    var completeId          = "select_tipo_paquete_ideal_" + idNumber;
    var select              = document.getElementById(completeId);
    //Variables needed to repopulate the select based on user choice:
    var select_opts         = new Array();
    var sel_option          = new Array(2);
    var i;
    var selectedOpt         = new Array(false, false, false, false);
    //Base product quantities -- to be updated if necessary:
    var baseEUF             = 20;
    var baseHP              = 50;
    var baseVP              = 10;
    if (DEBUG) {
        alert("ID del select de tipo: '" + completeId + "'");
    }
    if (!select) {
        if (DEBUG) {
            alert("Error. No se pudo obtener el select de tipo.");
        }
        return null;
    }
    //Clean the select:
    select.length = 0;
    if (DEBUG) {
        alert("Paquete seleccionado: " + currentPackage);
    }
    //Set the selected variable on the select
    switch (currentPackage){
        case 'standard': {
            selectedOpt[0]  = true;
            break;
        }
        case 'premium': {
            selectedOpt[1]  = true;
            break;
        }
        case 'optimum': {
            selectedOpt[2]  = true;
            break;
        }
        case 'optimum_plus': {
            selectedOpt[3]  = true;
            break;
        }
    }
    
    if (DEBUG) {
        alert("Ampollas seleccionadas: " + vial_type);
    }
    //Now, populate the select array with new options:
    switch (vial_type){
        case 'euf': {
            sel_option[0]   = "Standard: EUF ("+ 1*baseEUF +" vials)";
            sel_option[1]   = 0;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Premium: EUF ("+ 2*baseEUF +" vials)";
            sel_option[1]   = 1;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum: EUF ("+ 3*baseEUF +" vials)";
            sel_option[1]   = 2;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum Plus: EUF ("+ 4*baseEUF +" vials)";
            sel_option[1]   = 3;
            select_opts.push(sel_option);
            break;
        }
        case 'hp': {
            sel_option[0]   = "Standard: "+ 1*baseHP +" HP vials";
            sel_option[1]   = 4;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Premium: "+ 2*baseHP +" HP vials";
            sel_option[1]   = 5;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum: "+ 3*baseHP +" HP vials";
            sel_option[1]   = 6;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum Plus: "+ 4*baseHP +" HP vials";
            sel_option[1]   = 7;
            select_opts.push(sel_option);
            break;
        }
        case 'vp': {
            sel_option[0]   = "Standard: "+ 1*baseVP +" VP vials";
            sel_option[1]   = 8;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Premium: "+ 2*baseVP +" VP vials";
            sel_option[1]   = 9;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum: "+ 3*baseVP +" VP vials";
            sel_option[1]   = 10;
            select_opts.push(sel_option);
            sel_option      = new Array(2);
            sel_option[0]   = "Optimum Plus: "+ 4*baseVP +" VP vials";
            sel_option[1]   = 11;
            select_opts.push(sel_option);
            break;
        }
    }
    //Finally, populate the select again:
    for (i= 0; i < select_opts.length; i++) {
        if (DEBUG) {
            alert("Agregando opcion " + i + ": " + select_opts[i][0] + " " + select_opts[i][1] + " " + selectedOpt[i]);
        }
        select.options[select.length]	= new Option(select_opts[i][0],
            select_opts[i][1],
            selectedOpt[i],
            selectedOpt[i]);
    }
    return 0;
}

//--------------------------------------------------------------------------------------------------

/**
 *
 *
 */
function getCombineSelect(idNumber) {
    "use strict";
    var DEBUG               = false;
    //Getting the select:
    var completeId          = "select_combinar_ideal_" + idNumber;
    var select              = document.getElementById(completeId);
    var currentSelection    = parseInt(select.options[select.selectedIndex].value, 10);
    var packageSelected, productSelected, isCombined, combinedOptions;
    if (DEBUG) {
        alert("ID del select de combinacion: '" + completeId + "'");
    }
    if (!select) {
        if (DEBUG) {
            alert("Error. No se pudo obtener el select de combinacion.");
        }
        return null;
    }
    switch (currentSelection) {
        case 0: {
            packageSelected = null;
            productSelected = null;
            isCombined      = false;
            break;
        }
        //EUF combined:
        case 1: {
            packageSelected = 'standard';
            productSelected = 'euf';
            isCombined      = true;
            break;
        }
        case 2: {
            packageSelected = 'premium';
            productSelected = 'euf';
            isCombined      = true;
            break;
        }
        case 3: {
            packageSelected = 'optimum';
            productSelected = 'euf';
            isCombined      = true;
            break;
        }
        case 4: {
            packageSelected = 'optimum_plus';
            productSelected = 'euf';
            isCombined      = true;
            break;
        }
        //HP combined:
        case 5: {
            packageSelected = 'standard';
            productSelected = 'hp';
            isCombined      = true;
            break;
        }
        case 6: {
            packageSelected = 'premium';
            productSelected = 'hp';
            isCombined      = true;
            break;
        }
        case 7: {
            packageSelected = 'optimum';
            productSelected = 'hp';
            isCombined      = true;
            break;
        }
        case 8: {
            packageSelected = 'optimum_plus';
            productSelected = 'hp';
            isCombined      = true;
            break;
        }
        //VP combined:
        case 9: {
            packageSelected = 'standard';
            productSelected = 'vp';
            isCombined      = true;
            break;
        }
        case 10: {
            packageSelected = 'premium';
            productSelected = 'vp';
            isCombined      = true;
            break;
        }
        case 11: {
            packageSelected = 'optimum';
            productSelected = 'vp';
            isCombined      = true;
            break;
        }
        case 12: {
            packageSelected = 'optimum_plus';
            productSelected = 'vp';
            isCombined      = true;
            break;
        }
        default: {
            packageSelected = null;
            productSelected = null;
        }
    }
    combinedOptions     = "{ 'isCombined':"+ isCombined +"," +
    "  'packageSelected':'"+ packageSelected +"'," +
    "  'productSelected':'"+ productSelected +"'"  +
    " }";
    return combinedOptions;
}

function setCombineSelect(package_type, vial_type, idNumber) {
    "use strict";
    var DEBUG               = false;
    var completeId          = "select_combinar_ideal_" + idNumber;
    var select              = document.getElementById(completeId);
    var select_opts = new Array();
    var sel_option = new Array(2);
    var i;
    //Base product quantities -- to be updated if necessary:
    var baseEUF     = 20;
    var baseCombEUF = 4;
    var baseHP      = 50;
    var baseCombHP  = 4;
    var baseVP      = 10;
    var baseCombVP  = 4;
    //Clean the select:
    select.length = 1;
    //Now do something with it:
    switch (vial_type) {
        case 'euf': {
            switch (package_type) {
                case 'standard': {
                    sel_option[0]   = "Standard: "+ 1*baseEUF +
                    " EUF vials + "+ 1*baseCombEUF +" MFIII PE boxes";
                    sel_option[1]   = 1;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'premium': {
                    sel_option[0]   = "Premium: "+ 2*baseEUF +
                    " EUF vials + "+ 2*baseCombEUF +" MFIII PE boxes";
                    sel_option[1]   = 2;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum': {
                    sel_option[0]   = "Optimum: "+ 3*baseEUF +
                    " EUF vials + "+ 3*baseCombEUF +" MFIII PE boxes";
                    sel_option[1]   = 3;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum_plus': {
                    sel_option[0]   = "Optimum Plus: "+ 4*baseEUF +
                    " EUF vials + "+ 4*baseCombEUF +" MFIII PE boxes";
                    sel_option[1]   = 4;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
            }
            break;
        }   //endcase
        case 'hp': {
            switch (package_type) {
                case 'standard': {
                    sel_option[0]   = "Standard: "+ 1*baseHP +
                    " HP vials + "+ 1*baseCombHP +" MFIII PE boxes";
                    sel_option[1]   = 5;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'premium': {
                    sel_option[0]   = "Premium: "+ 2*baseHP +
                    " HP vials + "+ 2*baseCombHP +" MFIII PE boxes";
                    sel_option[1]   = 6;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum': {
                    sel_option[0]   = "Optimum: "+ 3*baseHP +
                    " HP vials + "+ 3*baseCombHP +" MFIII PE boxes";
                    sel_option[1]   = 7;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum_plus': {
                    sel_option[0]   = "Optimum Plus: "+ 4*baseHP +
                    " HP vials + "+ 4*baseCombHP +" MFIII PE boxes";
                    sel_option[1]   = 8;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
            }
            break;
        }   //endcase
        case 'vp': {
            switch (package_type) {
                case 'standard': {
                    sel_option[0]   = "Standard: "+ 1*baseVP +
                    " VP vials + "+ 1*baseCombVP +" MFIII PE boxes";
                    sel_option[1]   = 9;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'premium': {
                    sel_option[0]   = "Premium: "+ 2*baseVP +
                    " VP vials + "+ 2*baseCombVP +" MFIII PE boxes";
                    sel_option[1]   = 10;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum': {
                    sel_option[0]   = "Optimum: "+ 3*baseVP +
                    " VP vials + "+ 3*baseCombVP +" MFIII PE boxes";
                    sel_option[1]   = 11;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
                case 'optimum_plus': {
                    sel_option[0]   = "Optimum Plus: "+ 4*baseVP +
                    " VP vials + "+ 4*baseCombVP +" MFIII PE boxes";
                    sel_option[1]   = 12;
                    select_opts.push(sel_option);
                    sel_option      = new Array(2);
                }
            }
            break;
        }   //endcase
    }   //endswitch
    //Now populate the select again:
    for (i=0; i< select_opts.length; i++) {
        select.options[select.length]	= new Option(select_opts[i][0], select_opts[i][1], false, false);
    }
}

//--------------------------------------------------------------------------------------------------

/**
 * Formatea un link de compra obtenido como parámetro con las opciones suministradas.
 * @param   baseLink    (string)
 * @param   description (string)
 * @param   price       (float)
 * @param   weight      (float)
 */
function getLink(baseLink, description, price, weight){
    "use strict";
    var DEBUG   = false;
    if(DEBUG) {
        console.log("Ahora en la funcion 'getLink'.");
        console.log("Parametros:");
        console.log("baseLink: " + baseLink);
        console.log("description: " + description);
        console.log("price: " + price);
        console.log("weight: " + weight);
    }
    
    //Limpiar el link
    baseLink            = clean_link(decodeURI(baseLink));
    //Abrir el link en sus distintos componentes:
    var tokens          = baseLink.split(/\|/);
    
    if(DEBUG) {
        console.log("Tokens before:");
        console.log("tokens[0]: " + tokens[0]);
        console.log("tokens[1]: " + tokens[1]);
        console.log("tokens[2]: " + tokens[2]);
        console.log("tokens[3]: " + tokens[3]);
        console.log("tokens[6]: " + tokens[6]);
        console.log("tokens[7]: " + tokens[7]);
    }
    
    //Optional/default arguments:
    description = typeof description !== 'undefined' ? description : tokens[1];
    price       = typeof price  !== 'undefined' ? price  : tokens[2];
    weight      = typeof weight !== 'undefined' ? weight : tokens[7];
    
    //Modificar descripcion
    var baseDescription = tokens[1];
    baseDescription     = baseDescription.replace(/<br\/?>\((.*?)\)+/, "<br>(" + description + ")" );
    tokens[1]           = baseDescription;
    //Modificar precio
    var basePrice       = tokens[2];
    basePrice           = price;
    tokens[2]           = basePrice;
    //Modificar peso
    var baseWeight      = tokens[7];
    baseWeight          = weight;
    tokens[7]           = baseWeight;
    //Unir el link resultante:
    baseLink            = tokens.join("|");
    if(DEBUG) {
        console.log("Link after:");
        console.log(baseLink);
    }
    return encodeURI(baseLink);
}

/**
 * setLink
 * Coloca el link actualizado al elemento identificado por el numero de id pasado como parámetro.
 * @param   idNumber    (integer) Número de id único del elemento.
 * @param   linkContent (URI) URL codificada del producto.
 * @return  true en caso de éxito, false en caso de no encontrar el elemento al cual actualizar.
 */
function setLink(idNumber, linkContent){
    "use strict";
    var completeId  = "product_link_" + idNumber;
    var link        = document.getElementById(completeId);
    if (!link) {
        return false;
    }
    link.href       = linkContent;
    return true;
}

//--------------------------------------------------------------------------------------------------

/**
 * Funcion que obtiene el estado actual de todos los selects, y retorna esto como un objeto JSON.
 * @return json Objeto json con las siguientes características:
 *              packageType         Tipo de paquete seleccionado.
 *              vials               Tipo de ampolla seleccionada.
 *              productCombined     Si el producto está combinado o no.
 *              comboPackage        Paquete que el usuario escogio como combinado (sel. combinar).
 *              comboProduct        Producto que el usuario escogio como combinado (sel. combinar).
 */
function getIdealSelects(idNumber){
    "use strict";
    var vials   = getVialSelect(idNumber);              //euf, vp or hp
    var type    = getTypeSelect(idNumber);              //standard, premium, optimum or optimum_plus
    var combo   = eval('(' + getCombineSelect(idNumber) + ')');  //selected combination
    var json    = "{ 'packageType':'"+ type +"'," +
    "  'vials':'"+ vials +"'," +
    "  'productCombined':"+ combo.isCombined +"," +
    "  'comboPackage':'"+ combo.packageSelected +"'," +
    "  'comboProduct':'"+ combo.productSelected +"'" +
    " }";
    return json;
}

/**
 * Funcion que unifica a todas las demas y se encarga de cambiar a los selects a las opciones 
 * adecuadas segun la eleccion del usuario.
 * @param   idNumber            El numero de id del producto obtenido.
 * @param   idealSelectChanged  Dice cual select fue cambiado por el usuario, y por ende cuales 
 *                              selects hay que cambiar en base a eso. Los valores son:
 *                              0 para el select de ampollas.
 *                              1 para el select de paquete (estandar, premium, etc.)
 *                              2 para el select de combinacion.
 */
function setIdealSelects(idNumber, idealSelectChanged){
    "use strict";
    var DEBUG   = false;
    var vials, type, combo;
    var jsonResult;         //Will get the current status of the selects.    
    //If the select changed by the user is the combination select, do not change anything. Return.
    if ( idealSelectChanged == 2 )
        return null;
    //Otherwise, get current status of the selects:
    //XXX: Currently working:
    /*
    vials       = getVialSelect(idNumber);       //euf, vp or hp
    type        = getTypeSelect(idNumber);       //standard, premium, optimum or optimum_plus
    combo       = eval('(' + getCombineSelect(idNumber) + ')');  //selected combination
    if (DEBUG)	{	alert("Opciones: " + type + " " + vials + " " + combo.isCombined);    }
    */
    jsonResult  = eval('(' + getIdealSelects(idNumber) + ')');
    type        = jsonResult.packageType;
    vials       = jsonResult.vials;
    combo       = jsonResult.isCombined;
    if (DEBUG)	{
        alert("Opciones: " + type + " " + vials + " " + combo);
    }
    //Now, according to user selection, modify selects as needed:
    if (idealSelectChanged <= 1) {
        setTypeSelect(type, vials, idNumber);
        setCombineSelect(type, vials, idNumber);
    }
    return jsonResult;
}

//--------------------------------------------------------------------------------------------------

function getDescription(baseProductType, combinedProductType){
    "use strict";
    //Calcular en base a las características del producto, el contenido de la descripcion.
    var baseStr, combinedStr;
    
    switch (baseProductType) {
    case 'euf':
        baseStr = "Eco-UltraFiltrates";
        break;
    case 'hp':
        baseStr = "MFIII HP";
        break;
    case 'vp_vials':
        baseStr = (combinedProductType == "nothing") ? "MFIII Vegetal Placenta" : "MFIII VP";
        break;
    case 'pe':
        baseStr = "MFIII PE";
        break;
    case 'vp_caps':
        baseStr = (combinedProductType == "nothing") ? "MFIII Vegetal Placenta" : "MFIII VP";
        break;
    case 'parche_plus':
        baseStr = "Pro-Sero Patch";
        break;
    case 'blue_cell':
        baseStr = "Blue Cell Serum";
        break;
    case 'kimi':
        baseStr = "Kimi";
        break;
    default:
        return null;
    }
    
    combinedStr = (combinedProductType != "nothing") ? " + " : "";
    
    //Now add the combined product:
    switch (combinedProductType) {
    case 'euf':
        combinedStr += "EUF";
        break;
    case 'hp':
        combinedStr += "MFIII HP";
        break;
    case 'vp_vials':
        combinedStr += "MFIII VP";
        break;
    case 'pe':
        combinedStr += "MFIII PE";
        break;
    case 'vp_caps':
        combinedStr += "MFIII VP";
        break;
    case 'parche_plus':
        combinedStr += "Pro-Sero Patch";
        break;
    case 'blue_cell':
        combinedStr += "Blue Cell Serum";
        break;
    case 'kimi':
        combinedStr += "Kimi";
        break;
    default:
        combinedStr += "";
    }
    
    return baseStr + combinedStr;
}

/**
 * setDescription
 * Coloca la descripcion actualizada para el producto dado por el identificador pasado como 
 * parametro
 * @param   idNumber    Identificador único del elemento div a modificar.
 * @param   setContent  Valor a colocar como nueva descripcion.
 */
function setDescription(idNumber, setContent){
    "use strict";
    var completeId  = "product_name_" + idNumber;
    var name        = document.getElementById(completeId);
    if(!name)
        return false;
    name.innerHTML  = setContent;
    return true;
}

//--------------------------------------------------------------------------------------------------

function getName(productType) {
    switch (baseProductType) {
    case 'euf':
        baseStr = "Eco-UltraFiltrates";
        break;
    case 'hp':
        baseStr = "MFIII HP";
        break;
    case 'vp_vials':
        baseStr = (combinedProductType == "nothing") ? "MFIII Vegetal Placenta" : "MFIII VP";
        break;
    case 'pe':
        baseStr = "MFIII PE";
        break;
    case 'vp_caps':
        baseStr = (combinedProductType == "nothing") ? "MFIII Vegetal Placenta" : "MFIII VP";
        break;
    case 'parche_plus':
        baseStr = "Pro-Sero Patch";
        break;
    case 'blue_cell':
        baseStr = "Blue Cell Serum";
        break;
    case 'kimi':
        baseStr = "Kimi";
        break;
    default:
        return null;
    }
    
    combinedStr = (combinedProductType != "nothing") ? " + " : "";
    
    //Now add the combined product:
    switch (combinedProductType) {
    case 'euf':
        combinedStr += "EUF";
        break;
    case 'hp':
        combinedStr += "MFIII HP";
        break;
    case 'vp_vials':
        combinedStr += "MFIII VP";
        break;
    case 'pe':
        combinedStr += "MFIII PE";
        break;
    case 'vp_caps':
        combinedStr += "MFIII VP";
        break;
    case 'parche_plus':
        combinedStr += "Pro-Sero Patch";
        break;
    case 'blue_cell':
        combinedStr += "Blue Cell Serum";
        break;
    case 'kimi':
        combinedStr += "Kimi";
        break;
    default:
        combinedStr += "";
    }
}

function setName() {
    link.replace(/:\d+?(.*)(?=<)/);
}

//--------------------------------------------------------------------------------------------------

/*
 * getTherapy
 * Obtiene el tipo de terapia de acuerdo al tipo de producto utilizado.
 * Si es combinado, obtiene el tipo de terapia adecuado correspondiente a los tipos de producto.
 * @param   baseType        (string)    El tipo de producto base.
 * @param   combinedType    (string)    El tipo de producto combinado, si existe.
 */
function getTherapy(baseType, combinedType) {
    "use strict";
    var DEBUG   = false;
    var baseStr, combinedStr;
    
    switch (baseType) {
    case 'euf':
        baseStr = "Drinkable";
        break;
    case 'hp':
    case 'vp_vials':
        baseStr = "Inyectable";
        break;
    case 'pe':
    case 'vp_caps':
        baseStr = "Capsules";
        break;
    case 'parche_plus':
    case 'blue_cell':
        baseStr = "Applicable";
        break;
    case 'kimi':
        baseStr = "Kimi";
        break;
    default:
        return null;
    }
    
    //Now get the combined product:
    switch (combinedType) {
    case 'euf':
        combinedStr = "Drinkable";
        break;
    case 'hp':
    case 'vp_vials':
        combinedStr = "Inyectable";
        break;
    case 'pe':
    case 'vp_caps':
        combinedStr = "Capsules";
        break;
    case 'parche_plus':
    case 'blue_cell':
        combinedStr = "Applicable";
        break;
    case 'kimi':
        combinedStr = "Kimi";
        break;
    default:
        combinedStr = "";
    }
    
    //Compare the two. If both are equal, combine into a single option.
    if(baseStr == combinedStr) {
        combinedStr = "";
    }
    combinedStr = (combinedStr != "") ? " / " + combinedStr : "";

    return baseStr + combinedStr;
}

/**
 * Coloca el tipo de terapia adecuado y actualizado del producto conforme al tipo base del producto 
 * y a su producto combinado, si aplica.
 * @param   idNumber    Identificador único del elemento div a modificar.
 * @param   setContent  Valor a colocar como nuevo uso.
 */
function setTherapy(idNumber, setContent){
    "use strict";
    var completeId  = "product_type_" + idNumber;
    var usage       = document.getElementById(completeId);
    if (!usage) {
        return false;
    }
    usage.innerHTML = "(" + setContent + " Therapy)";
    return true;
}

//--------------------------------------------------------------------------------------------------

/**
 * getUsage
 * Calcula y obtiene el uso correspondiente al producto actual, basado en el cómputo del producto
 * base por el multiplicador de paquete, y de estar combinado, tambien obtiene la cantidad y el tipo
 * de producto correspondiente.
 * @param   packageType
 * @param   productType
 * @param   combinedType    (string)    Tipo del producto combinado, entre las siguientes opciones:
 *                          'euf'
 *                          'hp'
 *                          'vp_vials'
 *                          'pe'
 *                          'vp_caps'
 *                          'blue_cell'
 *                          'parche_plus'
 *                          'kimi'
 * @param   isIdeal         (boolean)   Dice si el producto para el cual se calcula el uso es un 
 *                          producto ideal o no. Por defecto, es false.
 */
function getUsage(packageType, productType, combinedType, isIdeal){
    "use strict";
    var DEBUG   = true;
    //Optional/default arguments:
    isIdeal     = typeof isIdeal !== 'undefined' ? isIdeal : false;
        
    if(DEBUG) {
        console.log("Ahora en la funcion 'getUsage'.");
        console.log("Parametros:");
        console.log("packageType: " + packageType);
        console.log("productType: " + productType);
        console.log("combinedType: " + combinedType);
        console.log("isIdeal: " + isIdeal);
    }
    
    var baseMultiplier, baseQty, basePresentation, baseProductTotalQty, baseTypeStr;
    var combinedQty, combinedPresentation, combinedTypeStr, combinedFinal;
    //Set product multiplier based on package type:
    switch(packageType){
    case 'standard':
    case 'Estandar':
        baseMultiplier  = 1;
        break;
    case 'premium':    
    case 'Premium':
        baseMultiplier  = 2;
        break;
    case 'optimum':
    case 'Optimum':
        baseMultiplier  = 3;
        break;
    case 'optimum_plus':
    case 'Optimum Plus':
        baseMultiplier  = 4;
        break;
    }
    
    if(DEBUG) {
        console.log("Calculando multiplicador de paquete.");
        console.log("baseMultiplier: " + baseMultiplier)
    }
    
    //Set base product quantity:
    switch(productType){
    case 'euf':
        baseQty = (isIdeal) ? 20 : 2;
        baseTypeStr         = "EUF";
        basePresentation    = "vials";
        break;
    case 'ideal_euf':
        baseQty             = 20;
        baseTypeStr         = "EUF";
        basePresentation    = "vials";
        isIdeal             = true;
        break;
    case 'hp':
        baseQty = (isIdeal) ? 50 : 4;
        baseTypeStr         = "MFIII HP";
        basePresentation    = "vials";
        break;
    case 'ideal_hp':
        baseQty             = 50;
        baseTypeStr         = "MFIII HP";
        basePresentation    = "vials";
        isIdeal             = true;
        break;
    case 'vp_vials':
        baseQty = (isIdeal) ? 10 : 1;
        baseTypeStr         = "MFIII VP";
        basePresentation    = "vials";
        break;
    case 'ideal_vp':
        baseQty             = 10;
        baseTypeStr         = "MFIII VP";
        basePresentation    = "vials";
        isIdeal             = true;
        break;
    case 'pe':
        baseQty = 30;
        baseTypeStr         = "MFIII PE";
        basePresentation    = "capsules";
        break;
    case 'vp_caps':
        baseQty = 30;
        baseTypeStr         = "MFIII VP";
        basePresentation    = "capsules";
        break;
    case 'parche_plus':
        baseQty = 1;
        baseTypeStr         = "Pro-Sero Patch";
        basePresentation    = "patch boxes";
        break;
    case 'blue_cell':
        baseQty = 1;
        baseTypeStr         = "Blue Cell Serum";
        basePresentation    = "flasks";
        break;
    case 'kimi':
        baseQty = 1;
        baseTypeStr         = "Kimi";
        basePresentation    = "soles";
        break;
    }
    //Set correct adjetive and number of items for base presentation:
    baseProductTotalQty = baseMultiplier * baseQty;
    if(basePresentation == "vials")
        basePresentation = (baseProductTotalQty > 1) ? "vials" : "vial";
    if(basePresentation == "c&aacute;psulas")
        basePresentation = (baseProductTotalQty > 1) ? "capsules" : "capsule";
    if(basePresentation == "flasks")
        basePresentation = (baseProductTotalQty > 1) ? "flasks" : "flask";
    if(basePresentation == "soles")
        basePresentation = (baseProductTotalQty > 1) ? "soles" : "sole";
    if(basePresentation == "patch boxes")
        basePresentation = (baseProductTotalQty > 1) ? "patch boxes" : "patch box";
    
    if(productType == "ideal_euf" || productType == "ideal_hp" || productType == "ideal_vp") {
        console.log("Seguramente estamos en el caso del select de descuento. Tipo: " + productType);
        console.log("isIdeal: " + isIdeal);
        console.log("combinedType: " + combinedType);
    }
    
    
    if(isIdeal && (productType == "euf" || productType == "hp" || productType == "vp_vials" || 
        productType == "ideal_euf" || productType == "ideal_hp" || productType == "ideal_vp") &&
       (combinedType == "nothing" || combinedType == "") ) {
        console.log("Colocando como base el texto largo.");
        basePresentation     = baseTypeStr +  " " + basePresentation + " (" + baseMultiplier.toString(10);
        basePresentation    += ((baseMultiplier > 1) ? " whole boxes" : " whole box") + ")";
    }
    else if(isIdeal && (productType == "euf" || productType == "hp" || productType == "vp_vials")) {
        basePresentation     = baseTypeStr + " " + basePresentation;
    }
    //Deal with combination cases:
    switch(combinedType){
    case 'euf':
        combinedQty = 2;
        combinedTypeStr             = "EUF";
        combinedPresentation        = "vials";
        break;
    case 'hp':
        combinedQty = 4;
        combinedTypeStr             = "MFIII HP";
        combinedPresentation        = "vials";
        break;
    case 'vp_vials':
        combinedQty = 1;
        combinedTypeStr             = "MFIII VP";
        combinedPresentation        = "vials";
        break;
    case 'pe':
        combinedQty = (isIdeal) ? 4 : 30;
        combinedTypeStr             = "MFIII PE";
        combinedPresentation        = (isIdeal) ? "boxes" : "capsules";
        break;
    case 'vp_caps':
        combinedQty = 30;
        combinedTypeStr             = "MFIII VP";
        combinedPresentation        = "capsules";
        break;
    case 'parche_plus':
        combinedQty = 1;
        combinedTypeStr             = "Pro-Sero Patch";
        combinedPresentation        = "patches";
        break;
    case 'blue_cell':
        combinedQty = 1;
        combinedTypeStr             = "Blue Cell Serum";
        combinedPresentation        = "flasks";
        break;
    case 'kimi':
        combinedQty = 1;
        combinedTypeStr             = "Kimi";
        combinedPresentation        = "soles";
        break;
    default:
        combinedTypeStr             = "";
        combinedPresentation        = "";
    }
    
    if(DEBUG) {
        console.log("Resultado del producto combinado.");
        console.log("combinedQty: " + combinedQty);
        console.log("combinedTypeStr: " + combinedTypeStr);
        console.log("combinedPresentation: " + combinedPresentation);
    }    
    
    //Set correct adjetive and number of items for combined presentation:
    if(combinedPresentation == "vials") {
        combinedPresentation = (combinedQty > 1) ? "vials" : "vial";
    }
    if(combinedPresentation == "capsules") {
        combinedPresentation = (combinedQty > 1) ? "capsules" : "capsule";
    }
    if(combinedPresentation == "flasks") {
        combinedPresentation = (combinedQty > 1) ? "flasks" : "flask";
    }
    if(combinedPresentation == "soles") {
        combinedPresentation = (combinedQty > 1) ? "soles" : "sole";
    }
    if(combinedPresentation == "patches"){
        combinedPresentation = (combinedQty > 1) ? "patches" : "patch";
    }
    if(combinedPresentation == "boxes")
        combinedPresentation = (combinedQty > 1) ? "boxes" : "box";
    //Format string for combination:
    if(isIdeal) {
        combinedPresentation     = combinedTypeStr + " " + combinedPresentation;
    }
    if(combinedPresentation != "" && (typeof combinedQty !== 'undefined')) {
        combinedFinal   = " + " + combinedQty.toString(10) + " " + combinedPresentation;
    }
    else {
        combinedFinal   = "";
    }
    //Finally, join all choices:
    if(isIdeal) {
        return baseProductTotalQty.toString(10) + " " + basePresentation + combinedFinal;
    }
    else {
        return baseProductTotalQty.toString(10) + " " + basePresentation + combinedFinal + " a month";
    }
}

/**
 * Coloca el uso adecuado y actualizado del producto conforme al tipo base del producto y a su 
 * producto combinado, si aplica.
 * @param   idNumber    Identificador único del elemento div a modificar.
 * @param   setContent  Valor a colocar como nuevo uso.
 */
function setUsage(idNumber, setContent){
    "use strict";
    var completeId  = "product_usage_" + idNumber;
    var usage       = document.getElementById(completeId);
    if (!usage) {
        return false;
    }
    usage.innerHTML = setContent;
    return true;
}

//--------------------------------------------------------------------------------------------------

function getDiscount(currentPrice, siteDiscount) {
    "use strict";
    var DEBUG   = false;
    if(DEBUG){
        console.log("Ahora en la funcion 'getDiscount'.");
        console.log("Parametros:");
        console.log("currentPrice");
        console.log(currentPrice);
        console.log("siteDiscount");
        console.log(siteDiscount);
    }
    return (currentPrice * siteDiscount).toFixed(2);
}

/**
 * getBasePrice
 * Calcula el precio base de un producto dado el tipo de paquete, el producto en si, y si hay o no
 * algún tipo de descuento.
 * @param   packageType (string)    El tipo de paquete, ya sea:
 *                                  'Estandar' o 'standard'
 *                                  'Premium' o 'premium'
 *                                  'Optimum' u 'optimum'
 *                                  'Optimum Plus' u 'optimum_plus'
 * @param   productType (string)    El producto en si, de la lista siguiente:
 *                                  'euf'           Eco-UltraFiltrados
 *                                  'hp'            HP
 *                                  'vp_vials'      VP en ampollas
 *                                  'pe'            PE
 *                                  'vp_caps'       VP en capsulas
 *                                  'blue_cell'     Blue Cell Serum
 *                                  'parche_plus'   Parche Pro-Sero
 *                                  'kimi'          Plantillas Kimi
 * @param   discount    (float)     El descuento del sitio, si aplica. Por defecto es 1 
 *                                  (sin descuento).
 * @return  (float) El precio base calculado.
 */
function getBasePrice(packageType, productType, discount) {
    "use strict";
    var DEBUG               = false;
    var caps_box            = 25.00;
    var euf_base            = 259.95;
    var hp_base             = 235.95;
    var vp_vial_base        = 289.95;
    var pe_base             = 204.95 - caps_box;   
    var vp_caps_base        = 219.95 - caps_box;
    var bluecell_base       = 196.95;
    var parche_plus_base    = 89.95;
    var kimi_base           = 49.95;
    var baseMultiplier, selectedProduct;
    //Optional/default arguments:
    discount                = typeof discount !== 'undefined' ? discount : 1.00;

    if(DEBUG){
        console.log("Ahora en la funcion 'getBasePrice'.");
        console.log("Parametros:");
        console.log("packageType");
        console.log(packageType);
        console.log("productType");
        console.log(productType);
        console.log("discount");
        console.log(discount);
    }

    //Calculate multiplier:
    switch (packageType) {
        case 'Estandar':
        case 'standard':
            baseMultiplier = 1;
            break;
        case 'Premium':
        case 'premium':
            baseMultiplier = 2;
            break;
        case 'Optimum':
        case 'optimum':
            baseMultiplier = 3;
            break;
        case 'Optimum Plus':
        case 'optimum_plus':
            baseMultiplier = 4;
            break;
    }
    //Get product to be calculated:
    switch (productType) {
    case 'euf':
        selectedProduct = euf_base;
        break;
    case 'hp':
        selectedProduct = hp_base;
        break;
    case 'vp_vials':
        selectedProduct = vp_vial_base;
        break;
    case 'pe':
        selectedProduct = pe_base;
        break;
    case 'vp_caps':
        selectedProduct = vp_caps_base;
        break;
    case 'blue_cell':
        selectedProduct = bluecell_base;
        break;
    case 'parche_plus':
        selectedProduct = parche_plus_base;
        break;
    case 'kimi':
        selectedProduct = kimi_base;
        break;
    }
    return baseMultiplier * selectedProduct * discount;
}


//--------------------------------------------------------------------------------------------------

function getPrice(packageType, mainItem, isCombined){
    "use strict";
    var DEBUG   = false;
    if( DEBUG) {
        console.log("Ahora en la funcion: 'getPrice'");
        console.log("Parametros:");
        console.log("packageType: " + packageType);
        console.log("mainItem: " + mainItem);
        console.log("isCombined: " + isCombined);
    }
    //Prices:
    var baseIdealEuf        = 2600.0;
    var baseIdealHp         = 2950.0;
    var baseIdealVp         = 2900.0;
    var basePe              = 204.95;   //PE with box.
    var basePrice, idealMultiplier, combinedMultiplier = 4;
    var finalPrice;
    //Calculate multiplier:
    switch (packageType){
        case 'standard':
            idealMultiplier = 1;
            break;
        case 'premium':
            idealMultiplier = 2;
            break;
        case 'optimum':
            idealMultiplier = 3;
            break;
        case 'optimum_plus':
            idealMultiplier = 4;
            break;
    }
    //Calculate base price:
    switch (mainItem){
        case 'euf':
            basePrice       = parseFloat( idealMultiplier * baseIdealEuf );
            break;
        case 'hp':
            basePrice       = parseFloat( idealMultiplier * baseIdealHp );
            break;
        case 'vp_vials':
        case 'vp':
            basePrice       = parseFloat( idealMultiplier * baseIdealVp );
            break;
    }
    //If combined, calculate combined price and add to base price:
    if (isCombined)
        finalPrice          = parseFloat( basePrice + (idealMultiplier * combinedMultiplier * basePe) );
    else
        finalPrice          = basePrice;
    //Calculation complete, return result:
    return finalPrice.toFixed(2);
}

/**
 * Coloca el precio en el div de producto correspondiente, de acuerdo a los parámetros 
 * proporcionados.
 * @param   price           Precio a colocar, previamente calculado.
 * @param   idNumber        Número del identificador único del select, que será seleccionado según 
 *                          el parámetro @param isNormalPrice.
 * @param   isNormalPrice   Determina si el select a obtener es el precio normal, o si es el caso,
 *                          el precio de descuento. Sus valores entonces son:
 *                          true para obtener un id de tipo 'product_price_'
 *                          false para obtener un id de tipo 'struck_price_'
 */
function setPrice(price, idNumber, isNormalPrice){
    "use strict";
    //Optional/default arguments:
    isNormalPrice           = typeof isNormalPrice !== 'undefined' ? isNormalPrice : true;
    
    var idealPrice, priceType, oldPrice, newPrice, DEBUG = false;
    //Get price element depending on discount or not:
    if (isNormalPrice) {
        priceType           = "product_price_";
    }
    else {
        priceType           = "struck_price_";
    }
    idealPrice              = document.getElementById(priceType + idNumber);
    oldPrice                = jQuery.trim(idealPrice.innerHTML);    
    if (DEBUG) {
        console.log("Ahora en la funcion 'setPrice'.");
        console.log("Parametros:")
        console.log("Identificador del tipo de precio a colocar: ");
        console.log(priceType);
        console.log("Precio nuevo antes de asignar: ");
        console.log(price);
        console.log("Precio viejo: ");
        console.log(oldPrice);        
    }
    oldPrice                = oldPrice.replace(/^\s+/, "");
    if (DEBUG) {
        console.log("Precio viejo limpio, 1.1: ");
        console.log(oldPrice);        
    }
    oldPrice                = oldPrice.replace(/,/, "");
    if (DEBUG) {
        console.log("Precio viejo limpio, 1.2: ");
        console.log(oldPrice);    
    }
    //Replace the old price with new one:
    //TODO: Remove this notice once/if code migrated to old store code:
    //CommaFormatted comes from funciones_productos_old
    newPrice                = oldPrice.replace( /^\d+\.\d+(?=\s+US\$)/, 
                                                CommaFormatted(parseFloat(price).toFixed(2)) );
    if (DEBUG) {
        console.log("Precio nuevo listo: " + newPrice);
    }
    idealPrice.innerHTML    = newPrice;
}

//--------------------------------------------------------------------------------------------------

function getIndexOfSelect (selectName, getOption) {
    "use strict";
    var optionSelected;
    switch (selectName) {
        case 'vials':
            switch (getOption) {
                case 'euf':
                    optionSelected = 1;
                    break;
                case 'hp':
                    optionSelected = 2;
                    break;
                case 'vp':
                    optionSelected = 3;
                    break;
            }
            break;
        case 'combine':
            switch (getOption) {
                case 'standard':
                    optionSelected = 1;
                    break;
                case 'premium':
                    optionSelected = 2;
                    break;
                case 'optimum':
                    optionSelected = 3;
                    break;
                case 'optimum_plus':
                    optionSelected = 4;
                    break;
            }
            break;
    }   //endswitch main
    return optionSelected;
}

function changeToIdeal (idPanel) {
    "use strict";
    var panelBar = $("#panelBar").data("kendoPanelBar");
    panelBar.expand($("#panelBarItem_" + idPanel));
    //Luego:
    var tabIndex = $("#tabStripItem_" + (3*idPanel));
    $("#package_" + idPanel).data("kendoTabStrip").activateTab(tabIndex);
}

//--------------------------------------------------------------------------------------------------

/**
 * setIdealProduct()
 * Basado en las opciones seleccionadas por el usuario, modificar el producto. 
 * de tipo. Esta funcion se llama cada vez que se modifica un select dede el sitio.
 * @param   obj             El select que llama a la funcion pasado como objeto HTML.
 * @param   siteDiscount    Descuento del sitio.
 */
function setIdealProduct(obj, siteDiscount) {
    "use strict";
    
    //Optional/default arguments:
    siteDiscount    = typeof siteDiscount !== 'undefined' ? siteDiscount : 1.00;
    
    var DEBUG       = false;
    var ident, vials, type, combo, usage, link, linkRef;
    var regex, identNumber;
    var selectChanged;          //Will contain the index of the select that the user changed.
    var jsonState, jsonResult;  //Will get the current status of the selects.
    var isIdealCombined, destPackage, standaloneProduct, combinedProduct, finalPrice, discountPrice;
    if (typeof(obj) != "string" && obj != undefined) {
        if (DEBUG)	{
            alert("Se obtuvo el objeto en forma de elemento HTML.");
        }
        ident   = obj.id;
    }
    else if (obj != undefined) {
        if (DEBUG)	{
            alert("Se obtuvo el objeto en forma de string.");
        }
        ident   = obj;
    }
    else{
        if (DEBUG)	{
            alert("Error. No se ha podido obtener el objeto.");
        }
    }
    //Get the index of the select changed by the user according to the function caller's id:
    if ( /select_tipo_ampolla_ideal_\d+/.test(ident) )
        selectChanged   = 0;
    if ( /select_tipo_paquete_ideal_\d+/.test(ident) )
        selectChanged   = 1;
    if ( /select_combinar_ideal_\d+/.test(ident) )
        selectChanged   = 2;
    if (DEBUG)	{
        alert("Indice obtenido: " + selectChanged);
    }
    //Get the id number used for changing all of the selects:
    if (DEBUG)	{
        alert("Id completo obtenido: " + ident);
    }
    regex       = /\d+/gi;
    identNumber = regex.exec(ident);
    if (DEBUG)	{
        alert("Numero de id obtenido: " + identNumber);
    }
    //Get or change current select status as necessary:
    //  If the select changed by the user is the combination select, 
    //  do not change anything, just get the current state.
    //  Also, if the select change is the package type select, change
    //  the user to that package and change the relevant options.
    //  Otherwise, change the selects in current product, and get 
    //  resulting state.
    if ( selectChanged == 1 ) {
        //Get the current state of selects:
        jsonState   = getIdealSelects(identNumber);
        //Parse JSON to get each variable if necessary:
        jsonResult  = eval('(' + jsonState + ')');
        //Get the index of the package/product the user should switch to 
        //and change to it:
        changeToIdeal( getIndexOfSelect('combine', jsonResult.packageType) );
    //Migrate user choices to that product -- optional:
    }
    else if (selectChanged == 2) {
        jsonState   = getIdealSelects(identNumber);
        //Parse JSON to get each variable if necessary:
        jsonResult  = eval('(' + jsonState + ')');
    }
    else {
        jsonResult  = setIdealSelects(identNumber, selectChanged);
        //Get status of select after changing again:
        jsonState   = getIdealSelects(identNumber);
        jsonResult  = eval('(' + jsonState + ')');
    }    
    isIdealCombined = jsonResult.productCombined;
    /*
    *   packageType         Tipo de paquete seleccionado.
    *   vials               Tipo de ampolla seleccionada.
    *   productCombined     Si el producto está combinado o no.
    *   comboPackage        Paquete que el usuario escogio como combinado (sel. combinar).
    *   comboProduct        Producto que el usuario escogio como combinado (sel. combinar).
    */
    //If product is combined, combined package gets priority over package select:
    if (isIdealCombined) {
        destPackage     = jsonResult.comboPackage;
        combinedProduct = jsonResult.comboProduct;
    }
    else{
        destPackage     = jsonResult.packageType;
        combinedProduct = "nothing";
    }
    //Now, get the product that will be used -- combined product has been previously obtained:
    standaloneProduct   = jsonResult.vials;
    //Change the image:    
    if(standaloneProduct == combinedProduct) {
        combinedProduct = "nothing";
    }
    
    if(standaloneProduct == "vp") {
        standaloneProduct = "vp_vials";
    }
    
    if(jsonResult.productCombined){
        combinedProduct = "pe";
    }
    else {
        combinedProduct = "nothing";
    }
    
    var finalImageLink  = get_comb_image(standaloneProduct, combinedProduct);
    change_image("image_" + identNumber, finalImageLink, '160', '160');
    //Calculate the before-discount price:
    finalPrice          = getPrice(destPackage, standaloneProduct, isIdealCombined);
    //Calculate discount price if applicable:
    discountPrice       = getDiscount(finalPrice, siteDiscount);
    
    //TODO: //Cambiar uso (cantidad de producto por mes):
    usage               = getUsage(destPackage, standaloneProduct, combinedProduct, true)
    setUsage(identNumber, usage);
    
    if(siteDiscount < 1.00) {
        //Cambiar precio tachado:
        setPrice(finalPrice, identNumber, false);
    }
    //Cambiar precio normal:
    setPrice(discountPrice, identNumber, true);
    //Cambiar enlace
    link    = $("#product_link_" + identNumber);
    linkRef = link.attr("href");
    linkRef = getLink(linkRef, usage, discountPrice);
    setLink(identNumber, linkRef);
}