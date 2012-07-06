//Fix for IE
//Found in http://blog.stevenlevithan.com/page/11
/* Cross-Browser Split 1.0.1
(c) Steven Levithan <stevenlevithan.com>; MIT License
An ECMA-compliant, uniform cross-browser split method */

var cbSplit;

// avoid running twice, which would break `cbSplit._nativeSplit`'s reference to the native `split`
if (!cbSplit) {

    cbSplit = function (str, separator, limit) {
        // if `separator` is not a regex, use the native `split`
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
            return cbSplit._nativeSplit.call(str, separator, limit);
        }

        var output = [],
        lastLastIndex = 0,
        flags = (separator.ignoreCase ? "i" : "") +
        (separator.multiline  ? "m" : "") +
        (separator.sticky     ? "y" : ""),
        separator = RegExp(separator.source, flags + "g"), // make `global` and avoid `lastIndex` issues by working with a copy
        separator2, match, lastIndex, lastLength;

        str = str + ""; // type conversion
        if (!cbSplit._compliantExecNpcg) {
            separator2 = RegExp("^" + separator.source + "$(?!\\s)", flags); // doesn't need /g or /y, but they don't hurt
        }

   /* behavior for `limit`: if it's...
    - `undefined`: no limit.
    - `NaN` or zero: return an empty array.
    - a positive number: use `Math.floor(limit)`.
    - a negative number: no limit.
    - other: type-convert, then use the above rules. */
        if (limit === undefined || +limit < 0) {
            limit = Infinity;
        } else {
            limit = Math.floor(+limit);
            if (!limit) {
                return [];
            }
        }

        while (match = separator.exec(str)) {
            lastIndex = match.index + match[0].length; // `separator.lastIndex` is not reliable cross-browser

            if (lastIndex > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));

                // fix browsers whose `exec` methods don't consistently return `undefined` for nonparticipating capturing groups
                if (!cbSplit._compliantExecNpcg && match.length > 1) {
                    match[0].replace(separator2, function () {
                        for (var i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === undefined) {
                                match[i] = undefined;
                            }
                        }
                    });
                }

                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }

                lastLength = match[0].length;
                lastLastIndex = lastIndex;

                if (output.length >= limit) {
                    break;
                }
            }

            if (separator.lastIndex === match.index) {
                separator.lastIndex++; // avoid an infinite loop
            }
        }

        if (lastLastIndex === str.length) {
            if (lastLength || !separator.test("")) {
                output.push("");
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }

        return output.length > limit ? output.slice(0, limit) : output;
    };

    cbSplit._compliantExecNpcg = /()??/.exec("")[1] === undefined; // NPCG: nonparticipating capturing group
    cbSplit._nativeSplit = String.prototype.split;

} // end `if (!cbSplit)`

// for convenience...
String.prototype.split = function (separator, limit) {
    return cbSplit(this, separator, limit);
};

//Funcion para dar formato de moneda a un numero:
//Found in: http://www.web-source.net/web_development/currency_formatting.htm
function CommaFormatted(amount)
{
    var delimiter = ","; // replace comma if desired
    var a = amount.split('.',2)
    var d = a[1];
    var i = parseInt(a[0]);
    if(isNaN(i)) {
        return '';
    }
    var minus = '';
    if(i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while(n.length > 3)
    {
        var nn = n.substr(n.length-3);
        a.unshift(nn);
        n = n.substr(0,n.length-3);
    }
    if(n.length > 0) {
        a.unshift(n);
    }
    n = a.join(delimiter);
    if(d.length < 1) {
        amount = n;
    }
    else {
        amount = n + '.' + d;
    }
    amount = minus + amount;
    return amount;
}
// end of function CommaFormatted()



function clean_description(description)
{
    //Limpio la descripcion para evitar codificaciones dobles:
    description = description.replace(/%2[C|c]/gi, ",");
    description	= description.replace(/%2[F|f]/gi, "/");
    description	= description.replace(/%3[A|a]/gi, ":");
    description	= description.replace(/%2[B|b]/gi, "+");

    return description;
}

function clean_link(link)
{
    link    = clean_description(link);

    return link;
}

//Actualiza el precio tomado en cuenta desde el enlace, corre siempre que
//se modifica un select:
function update_price(price_id, link_id, site_discount)
{
    //Para realizar pruebas:
    var DEBUG		   = false;
    if(DEBUG)	{
        alert("Ahora en la funcion: update_price");
    }
    //Obtengo las variables necesarias:
    if(DEBUG)
    {
        alert("Variables obtenidas:\n" + 
            "\n price_id: " + price_id + 
            "\n link_id: " + link_id +
            "\n site_discount: " + site_discount
            )
    }
    //Si le paso un objeto de tipo string a la funcion, lo decodifico de una vez.
    //Si no, asumo que es un ObjectElement HTML
    var link_parent        = document.getElementById(link_id);
    if(typeof(link_parent) != "string" && link_parent != undefined)
    {
        if(DEBUG)	{
            alert("Se obtuvo el link en forma de elemento HTML.");
        }
        var link            = decodeURI(link_parent.href);
    }
    else
    {
        if(DEBUG)	{
            alert("Se obtuvo el link en forma de string.");
        }
        link                = link_id;
    }
    var price_parent        = document.getElementById(price_id);
    if(!price_parent)
    {
        //Error, no se consiguio el ID
        //O simplemente no hay descuento en la tienda.
        return;
    }
    var price               = price_parent.innerHTML;

    if(DEBUG){
        alert("Parte 1: IDs de precio y de enlace:\nPrecio: " + price_id + "\nEnlace: " + link_id );
    }
    if(DEBUG){
        alert("Parte 2: Contenido del ID de precio: " + price);
    }
    //Separo el link en tokens:
    var tokens              = link.split(/\|/);

    //Obtengo el token correspondiente al precio:
    var array_price         = tokens[2];
    if(DEBUG){
        alert("Parte 3: Precio desde el enlace: " + array_price);
    }
	
    //Si la variable site_discount no existe,  
    //sencillamente discounted es 1:
    if(!site_discount)
    {
        var discounted      = 1;
        if(DEBUG){
            alert("Parte 4: No se envio la variable de descuento desde el sitio.");
        }
    }
    //Ahora, si la variable site_discount existe, obtengo 
    //el complemento y lo multiplico por el precio:
    else
    {
        if(site_discount > 1)
        {
            discounted      = site_discount;
        }
        else
        {
            discounted      = 1 / site_discount;
            if(DEBUG){
                alert("Parte 4: Descuento encontrado.");
            }
        }
    }
    if(DEBUG){
        alert("Parte 4: Descuento aplicado:\n1 / " + site_discount + " = " + discounted);
    }
	
    array_price             = array_price * discounted;
	
    //Busco dentro del precio (en rojo o gris) la parte
    //numerica y la sustituyo con la del enlace:
    price                   = price.replace(/^\s+/, "");
    price                   = price.replace(/,/, "");
	
    if(DEBUG){
        alert("Parte 5: Precio limpio: " + price);
    }
    price                   = price.replace(/^\d+\.\d+(?=\s+US\$)/, CommaFormatted(parseFloat(array_price).toFixed(2)));
    if(DEBUG){
        alert("Parte 6: Precio final: " + price);
    }

    price_parent.innerHTML  = price;
}

//Cambia una imagen identificada con image_id, por la especificada en image_name:
function change_image(image_id, image_link, image_width, image_height)
{
    //Obtener el id de la imagen:
    var image			= document.getElementById(image_id);

    //Cambiar el alto:
    image.width			= image_width;
    //Cambiar el ancho:
    image.height		= image_height;
    //Cambiar la imagen como tal:
    image.src			= image_link;
}

//Cambia el enlace especificado por link_id segun lo especificado en select_id:
function change_link(link_id, select_id)
{
    //Para realizar pruebas:
    var DEBUG   		= false;
	
    //Obtener las variables necesarias
    var link_parent		= document.getElementById(link_id);
    var link			= decodeURI(link_parent.href);
    var opt_parent  		= select_id;
    var opt_select  		= opt_parent.selectedIndex;
    var option  		= parseInt(opt_parent.options[opt_select].value);
    var auto_ship		= "";

    //String regular que dice si el enlace es automatico o no:
    var reg_exp 		= new RegExp("[|]{6}\\d-Monthly=-1=Product", "g");

    //Independiente del resultado de la búsqueda, se remueve la parte del envio
    //automatico si existe:
    if( reg_exp.test(link) )
    {
        link			= link.replace(reg_exp, "");
    }

    //Una vez hecho eso, se coloca el enlace correspondiente:
    switch(option)
    {
        case 0:
        {
            if(DEBUG){
                alert(opt_select + " - " + option + " - No se modifico el codigo");
            }
            break;
        }
        case 1:
        {
            if(DEBUG){
                alert(opt_select + "-" + option + " - Con envio automatico - 1 mes");
            }
            auto_ship		= "<br>(Ship automatically every 30 days)";
            link		= link + "||||||1-Monthly=-1=Product";
            break;
        }
        case 2:
        {
            if(DEBUG){
                alert(opt_select + "-" + option + " - Con envio automatico - 2 meses");
            }
            auto_ship		= "<br>(Ship automatically every 2 months)";
            link        	= link + "||||||2-Monthly=-1=Product";
            break;
        }
        case 3:
        {
            if(DEBUG){
                alert(opt_select + "-" + option + " - Con envio automatico - 3 meses");
            }
            auto_ship		= "<br>(Ship automatically every 3 months)";
            link		= link + "||||||3-Monthly=-1=Product";
            break;
        }
        case 4:
        {
            if(DEBUG){
                alert(opt_select + "-" + option + " - Con envio automatico - 6 meses");
            }
            auto_ship		= "<br>(Ship automatically every 2 months)";
            link		= link + "||||||6-Monthly=-1=Product";
            break;
        }
    }	
    var tokens			= link.split(/\|/);
    var array_descr 		= tokens[1];
    //Quitamos la opcion de envio anterior si existe:
    var position		= array_descr.search(/<br(\/)?>\(Ship automatically every \d+ (days|months)\)/gi);
    array_descr			= array_descr.replace(/<br(\/)?>\(Ship automatically every \d+ (days|months)\)/gi, "");
    if(position != -1)
    {
        var part_one		= array_descr.substring(0, position);
        var part_two		= array_descr.substring(position);
        if(DEBUG){
            alert("Parte 1:\n" + part_one + "\nParte 2:\n" + part_two);
        }
        array_descr		= part_one + auto_ship + part_two;
    }
    else
    {
        array_descr		= array_descr + auto_ship;
    }
    if(DEBUG){
        alert(array_descr);
    }
    //Lo limpiamos de cualquier codificacion doble:
    array_descr                 = clean_description(array_descr);
    tokens[1]			= array_descr;
    link			= tokens.join("|");
	
    if(DEBUG){
        alert(link);
    }
    link_parent.href		= encodeURI(link);
}

/**
 * reset_cart_link
 * @param   link                    
 * @param   orig_price              
 * @param   orig_weight             
 * @param   discount_select_exists  
 */
function reset_cart_link(link, orig_price, orig_weight, site_discount, discount_select_exists) {
    //Para realizar pruebas:
    var DEBUG       = false;
    if(DEBUG)	{
        alert("Ahora en la funcion: reset_cart_link");
    }
    //Limpio el link:
    link            = clean_link(link);
    //Separo el link en sus correspondientes tokens:
    var tokens      = link.split(/\|/);
    if(DEBUG)
    {		
        for (x in tokens)
        {
            alert("Parte 1, enlace separado:\ntokens["+ x +"]: "+ tokens[x]);
        }
    }
    var array_descr = tokens[1];
    //Limpio la descripcion de cualquier condición anterior:
    //Acá se quita la parte que dice "Combined with...":
    array_descr     = array_descr.replace(/<br\/>\(Combined with [\w\s]*\(?[\w\s]*?\)?\)/gi, "");
    //Y tambien la parte, si existe, de "Capsules with/without box":
    array_descr     = array_descr.replace(/<br\/>\(Capsules (with|without) box\)/gi, "");
    //Acá se quita el multiplicador y el descuento:
    if(discount_select_exists)
    {
        if(DEBUG)	{
            alert("Quitando de la desccripcion la parte de descuento.");
        }
        if(DEBUG)	{
            alert("Antes:\n" + array_descr);
        }
        array_descr = array_descr.replace(/<br(\/)?>\(With \d+% discount!\)/gi, "");
        array_descr = array_descr.replace(/^\dx /gi, "");
        if(DEBUG)	{
            alert("Despues:\n" + array_descr);
        }
    }
    //Luego coloco las variables correspondientes en donde van:
    tokens[1]       = array_descr;
    tokens[2]       = orig_price.toFixed(2);
    tokens[7]       = orig_weight.toFixed(2);	
    //Uno de nuevo el link:
    link	    = tokens.join("|");
    if(DEBUG){
        alert("Parte 4, enlace final:\n" + link);
    }
	
    return link;
}

//Segun la opcion seleccionada, retorna cual es el producto combinado.
function get_combination(selected_option)
{
    var combination = "";
    switch(selected_option)
    {
        case 0:
        {
            //Combinar con nada
            combination = "nothing";
            break;
        }
        case 1:
        {
            //Paquete Estandar EUF
            combination = "euf";
            break;
        }
        case 2:
        {
            //Paquete Estandar HP
            combination = "hp";
            break;
        }
        case 3:
        {
            //Paquete Estandar VP (ampollas)
            combination = "vp_vials";
            break;
        }
        case 4:
        {
            //Paquete Estandar PE
            combination = "pe";
            break;
        }
        case 5:
        {
            //Paquete Estandar VP (capsulas)
            combination = "vp_caps";
            break;
        }
        case 6:
        {
            //Paquete Pro-Sero Patch
            combination = "parche_plus";
            break;
        }
        case 7:
        {
            //Blue Cell Serum
            combination = "blue_cell";
            break;
        }
        case 8:
        {
            //Kimi
            combination = "kimi";
            break;
        }
    }
    return combination;
}

//Retorna sencillamente un numero, que es el peso del producto combinado:
function get_comb_weight(selected_option)
{
    var weight = 0;
    switch(selected_option)
    {	//Combinar con nada
        case 0:
        //Paquete Estandar EUF
        case 1:
        //Paquete Estandar HP
        case 2:
        //Paquete Estandar VP (ampollas)
        case 3:
        //Paquete Estandar PE
        case 4:
        //Paquete Estandar VP (capsulas)
        case 5:
        //Blue Cell Serum
        case 7:
        //Kimi
        case 8:
        {
            weight         		= 0.5;
            break;
        }
        case 6:
        {
            //Paquete Pro-Sero Patch
            weight         		= 1.5;
            break;
        }
    }
    return weight;
}

// Retorna un enlace a la imagen correspondiente, o en su defecto, a la imagen 
// original:
function get_comb_image(combine_this, with_this)
{
    var DEBUG                   = false;
    var image_link              = "";
    //var image_path              = "http://mf3la.com/images/tienda/";
    var image_path              = "./images/";
    switch(combine_this)
    {
        // Posibles valores (tanto fuente como destino):
        //    euf
        //    hp
        //    vp_vials
        //    pe
        //    vp_caps
        //    parche_plus
        //    blue_cell
        //    kimi
        //    nothing

        case "euf":                     //EUF con...
            switch(with_this)
            {
                case "hp":              //...HP
                    image_link  = image_path + "hp+euf.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "vpamp+euf.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+euf.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "vpcaps+euf.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "euf+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "euf+bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "euf+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "euf.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "hp":                      //HP con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "hp+euf.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "hp+vpamp.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "hp+pe.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "hp+vpcaps.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "hp+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "hp+bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "hp+kimi.png";
                    break;
                case "nothing":         //...Nada.
                    image_link  = image_path + "hp.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "vp_vials":                //VP en ampollas con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "vpamp+euf.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+vpamp.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+vpamp.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "vpcaps+vpamp.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "vpamp+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "vpamp+bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "vpamp+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "vpamp.png";
                    break;
                default:
                    break;
            }
            break;
        case "pe":                      //PE con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "pe+euf.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+pe.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "pe+vpamp.png";
                    break;
                case "vp_caps":         //...VP en ampollas
                    image_link  = image_path + "pe+vpcaps.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "pe+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "pe+bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "pe+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "pe.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "vp_caps":                 //VP en capsulas con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "vpcaps+euf.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+vpcaps.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "vpcaps+vpamp.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+vpcaps.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "vpcaps+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "vpcaps+bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "vpcaps+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "vpcaps.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "blue_cell":               //Blue Cell Serum Serum con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "euf+bc.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+bc.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "vpamp+bc.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "vpcaps+bc.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+bc.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "bc+parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum -- combinado consigo mismo.
                    image_link  = image_path + "bc.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "bc+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "bc.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "parche_plus":             //Pro-Sero Patch con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "euf+parche.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+parche.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "vpamp+parche.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "vpcaps+parche.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+parche.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch -- combinado consigo mismo.
                    image_link  = image_path + "parche.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "bc+parche.png";
                    break;
                case "kimi":            //...Kimi
                    image_link  = image_path + "parche+kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "parche.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        case "kimi":                    //Kimi con...
            switch(with_this)
            {
                case "euf":             //...EUF
                    image_link  = image_path + "euf+kimi.png";
                    break;
                case "hp":              //...HP
                    image_link  = image_path + "hp+kimi.png";
                    break;
                case "vp_vials":        //...VP en ampollas
                    image_link  = image_path + "vpamp+kimi.png";
                    break;
                case "vp_caps":         //...VP en capsulas
                    image_link  = image_path + "vpcaps+kimi.png";
                    break;
                case "pe":              //...PE
                    image_link  = image_path + "pe+kimi.png";
                    break;
                case "parche_plus":     //...Pro-Sero Patch
                    image_link  = image_path + "parche+kimi.png";
                    break;
                case "blue_cell":       //...Blue Cell Serum
                    image_link  = image_path + "bc+kimi.png";
                    break;
                case "kimi":            //...Kimi -- combinado consigo mismo.
                    image_link  = image_path + "kimi.png";
                    break;
                case "nothing":         //...Nada
                    image_link  = image_path + "kimi.png";
                    break;
                default:                // nothing
                    break;
            }
            break;
        default:    // nothing
            break;
    }
    
    //Se retorna finalmente lo hallado:
    return image_link;
}

function change_combined(selected_option, 
                         link, 
                         orig_product, 
                         orig_price, 
                         orig_weight, 
                         site_discount,
                         box_option
                        ) {
    //Para realizar pruebas:
    var DEBUG                   = false;
    if(DEBUG) {
        alert("Ahora en la funcion: change_combined.");
    }
    
    var caps_box_price          = 25;
    var producto_1  		= new Array(2); //Combinar con Paquete Est&aacute;ndar EUF
    producto_1[0]    		= "Standard Package EUF";
    producto_1[1]    		= 259.95;
    var producto_2  		= new Array(2); //Combinar con Paquete Est&aacute;andar HP
    producto_2[0]    		= "Standard Package HP";
    producto_2[1]    		= 235.95;
    var producto_3  		= new Array(2); //Combinar con Paquete Est&aacute;andar VP (ampollas)
    producto_3[0]    		= "Standard Package VP vials";
    producto_3[1]    		= 289.95;
    var producto_4  	    	= new Array(2); //Combinar con Paquete Est&aacute;andar PE
    producto_4[0]    		= "Standard Package PE";
    producto_4[1]    		= 204.95 - caps_box_price;
    var producto_5  		= new Array(2); //Combinar con Paquete Est&aacute;andar VP (c&aacute;psulas)
    producto_5[0]    		= "Standard Package VP capsules";
    producto_5[1]    		= 219.95 - caps_box_price;
    var producto_6  		= new Array(2); //Combinar con Paquete Pro-Sero Patch
    producto_6[0]    		= "Pro-Sero Patch";
    producto_6[1]    		= 89.95;
    var producto_7  		= new Array(2); //Combinar con Blue Cell Serum
    producto_7[0]    		= "Blue Cell Serum";
    producto_7[1]    		= 196.95;
    var producto_8  		= new Array(2); //Combinar con Kimi
    producto_8[0]    		= "Kimi";
    producto_8[1]    		= 49.95;

    //Separo el link en tokens:
    var tokens                  = link.split(/\|/);
    if(DEBUG)
    {		
        for (x in tokens)
        {
            alert("Parte 1, enlace separado:\ntokens["+ x +"]: "+ tokens[x]);
        }
    }
	
    //Obtengo los tokens correspondientes al precio, y a la descripcion:
    var array_descr             = tokens[1];
    var array_price             = tokens[2];
    var array_weight    	= tokens[7];
    
    //Limpio la descripcion para evitar codificaciones dobles:
    array_descr                 = clean_description(array_descr);

    //Ahora, dependiendo del select, se procede a combinar o no:
    var box_text                = "";
    var	combined_descr		= "";
    var	combined_price		= 0;
    var	combined_weight		= 0;
    selected_option		= parseInt(selected_option);	
    orig_price			= parseFloat(orig_price);
	
    if(DEBUG)	{
        alert("Parte 2, Opcion seleccionada: " + selected_option);
    }
    switch(selected_option)
    {
        case 0:
        {
            //	No se hace nada
            if(DEBUG){
                alert("Parte 2.1, combinando con: nada.");
            }
            combined_descr      = "";
            combined_price      = 0;
            break;
        }
        case 1:
        {
            //Paquete Estandar EUF
            if(DEBUG){
                alert("Parte 2.1, combinando con: EUF.");
            }
            combined_descr      = producto_1[0];
            combined_price      = parseFloat(producto_1[1]);
            break;
        }
        case 2:
        {
            //Paquete Estandar HP
            if(DEBUG){
                alert("Parte 2.1, combinando con: HP.");
            }
            combined_descr      = producto_2[0];
            combined_price      = parseFloat(producto_2[1]);
            break;
        }
        case 3:
        {
            //Paquete Estandar VP (ampollas)
            if(DEBUG){
                alert("Parte 2.1, combinando con: VP ampollas.");
            }
            combined_descr      = producto_3[0];
            combined_price      = parseFloat(producto_3[1]);
            break;
        }
        case 4:
        {
            //Paquete Estandar PE
            if(DEBUG){
                alert("Parte 2.1, combinando con: PE.");
            }
            combined_descr	= producto_4[0];
            if(box_option != 0) {
                combined_price  = parseFloat( getBoxPrice('pe', producto_4[1], 1.00) );
            }
            else {
                combined_price	= parseFloat(producto_4[1]);
            }
            capsule_type(link, 1);
            break;
        }
        case 5:
        {
            //Paquete Estandar VP (capsulas)
            if(DEBUG){
                alert("Parte 2.1, combinando con: VP capsulas.");
            }
            combined_descr	= producto_5[0];
            if(box_option != 0) {
                combined_price	= parseFloat( getBoxPrice('pe', producto_5[1], 1.00) );
            }
            else {
                combined_price  = parseFloat(producto_5[1]);
            }
            capsule_type(link, 2);
            break;
        }
        case 6:
        {
            //Paquete Pro-Sero Patch
            if(DEBUG){
                alert("Parte 2.1, combinando con: Pro-Sero Patch.");
            }
            combined_descr	= producto_6[0];
            combined_price	= parseFloat(producto_6[1]);
            break;
        }
        case 7:
        {
            //Blue Cell Serum
            if(DEBUG){
                alert("Parte 2.1, combinando con: Blue Cell Serum.");
            }
            combined_descr	= producto_7[0];
            combined_price	= parseFloat(producto_7[1]);
            break;
        }
        case 8:
        {
            //Kimi
            if(DEBUG){
                alert("Parte 2.1, combinando con: Kimi.");
            }
            combined_descr	= producto_8[0];
            combined_price	= parseFloat(producto_8[1]);
            break;
        }
    }
    if(selected_option != 0)
    {
        combined_weight         = parseFloat(get_comb_weight(selected_option));
        if(selected_option == 4 || selected_option == 5) {
            //El producto puede tener caja o no. Colocarlo segun el estado de box_option
            box_text = "<br/>("+((box_option == 0) ? "Capsules without box" : "Capsules with box")+")";
        }
        //El producto queda entonces combinado -- solo colocar si no lo está previamente:
        if(!/combined/gi.test(array_descr)) {
            array_descr         = array_descr + "<br/>(Combined with " + combined_descr + ")";
        }
    }
    if (box_text != "") {
        array_descr             = array_descr + box_text;
    }
    array_price                 = orig_price  + (combined_price * site_discount);
    if(DEBUG) {
        alert("Parte 3, Calculo de precio.\n3.1 Precio Original:\n"+ orig_price +"\n3.2 Precio Combinado:\n"+ combined_price +"\n3.3 Descuento de:\n"+ site_discount +"\n3.4 Precio Final:\n"+ array_price +".");
    }
    array_weight	        = orig_weight + combined_weight;

    if(DEBUG){
        alert("Parte 4, resultado de la combinacion.\n4.1 Descripcion:\n"+ array_descr +"\n4.2 Precio:\n"+ array_price +"\n4.3 Peso:\n"+ array_weight +".");
    }
	
    //Finalmente, se junta todo el link:
    tokens[1]			= array_descr;
    tokens[2]			= parseFloat(array_price).toFixed(2);
    tokens[7]        		= parseFloat(array_weight).toFixed(2);
    link			= tokens.join("|");
    if(DEBUG){
        alert("Parte 4, enlace final:\n" + link);
    }

    return link;
}

/**
 * change_discount
 * Determina cual descuento será aplicado al producto, basado en la selección realizada por el 
 * usuario.
 * @param   select_option   Opción seleccionada actualmente por el usuario.
 * @param   link            El enlace del carrito de comrpas, para ser modificado.
 * @param   site_discount   El descuento aplicado actualmente en el sitio, para efectos del calculo.
 * @param   struck_price_id El identificador único del precio tachado, para ser cambiado al precio 
 *                          sin descuento.
 */
function change_discount(   select_option, 
                            link,
                            site_discount,
                            struck_price_id
                        )
{
    //Para realizar pruebas:
    var DEBUG			    	= false;
    if(DEBUG) {
        alert("Ahora en la funcion: change_discount.");
    }
    site_discount			= parseFloat(site_discount);
	
    if(DEBUG)
    {
        alert("Variables obtenidas:\n" + 
            "\n select_option: " + select_option + 
            "\n link: " + link +
            "\n site_discount: " + site_discount
            )
    }
	
    //Separo el link en tokens:
    var tokens              	= link.split(/\|/);
    if(DEBUG)
    {		
        for (x in tokens)
        {
            alert("Parte 1, enlace separado:\ntokens["+ x +"]: "+ tokens[x]);
        }
    }

    select_option		= parseInt(select_option);
    //Obtengo los tokens correspondientes al precio, y a la descripcion:
    var array_descr 		= tokens[1];
    if(DEBUG){
        alert("Parte 2.1, descripcion: " + array_descr);
    }
    var array_price 		= parseFloat(tokens[2].replace(",", ""));
    if(DEBUG){
        alert("Parte 2.2, precio: " + array_price);
    }
    var array_weight    	= parseFloat(tokens[7]);
    if(DEBUG){
        alert("Parte 2.3, peso: " + array_weight);
    }
    var discount		= 1;
    var percentage  		= 0;
    var quantity		= 0;
	
    //De ser necesario añadir un porcentaje de descuento, hacerlo acá bajo 
    //un nuevo case. Recordar que el descuento es realmente el complemento:
    switch(select_option)
    {
        case 0:
        {
            quantity		= 1;
            discount		= 1;
            break;
        }
        case 1:
        {
			
            quantity		= 2;
            discount		= 0.92;
            break;
        }
        case 2:
        {
            quantity		= 3;
            discount		= 0.88;
            break;
        }
        case 3:
        {
            quantity		= 6;
            discount		= 0.85;
            break;
        }
    }
    percentage			= ((1 - discount) * 100).toFixed(0);
	
    if(DEBUG){
        alert("Parte 3, Valores para aplicar desde el select:\nCantidad:\t" + quantity + "\nDescuento:\t" + discount+ "\nPorcentaje:\t" + percentage);
    }	
    if(DEBUG){
        alert("Parte 3.1, Descuento del sitio:\t" + site_discount);
    }
    //Se quita el descuento proveniente del sitio al producto, ya sea que se recalcule o se 
    //deje igual:
    array_price                 = (array_price / site_discount).toFixed(2);
    
    if( site_discount <= discount )		//Si el descuento de la promocion en el sitio es mayor o igual al que se le 
    {									//aplicaria el producto gracias al select, no se aplica descuento:
        percentage		= ((1 - site_discount) * 100).toFixed(0);	//Se coloca el descuento como en el select
        discount 		= site_discount;
        if(DEBUG){
            alert("Parte 3.1.1, aplica descuento de sitio:\ndiscount:\t" + discount + "\npercentage:\t" + percentage);
        }	
    }
    else
    {
        if(DEBUG){
            alert("Parte 3.1.2, aplica descuento del select:\ndiscount:\t" + discount + "\npercentage:\t" + percentage);
        }	
    }
    if(DEBUG){
        alert("Parte 4, calculo del descuento a mostrar:\nDescuento del sitio:\t" + site_discount + "\nDescuento calculado:\t" + discount + "\nPorcentaje:" + percentage);
    }	
	
    //Obtenidos todos los datos, modifico segun el select:
    //Primero el precio:
    var base_price		= quantity * array_price;
    array_price			= base_price * discount;
    if(DEBUG){
        alert("Parte 4.1, precio calculado:\nCantidad:\t" + quantity + "\nPrecio:\t" + array_price + "\nDescuento:\t" + discount);
    }
    //Luego el peso:
    array_weight		= quantity * array_weight;

    //Y luego el enlace:
    //Primero limpio la descripcion para evitar codificaciones dobles:
    array_descr             	= clean_description(array_descr);
	
    if(DEBUG){
        alert("Parte 4.1, enlace limpio:\n" + array_descr);
    }
	
    //Luego coloco el porcentaje correspondiente en la descripcion:
    if( percentage != 0 )
    {
        if(quantity != 1)
        {
            array_descr 		= quantity + "x " + array_descr + "<br>(With " + percentage + "% discount!)";
        }
        else if(site_discount != 1)
        {
            percentage			= ((1 - site_discount) * 100).toFixed(0);
            array_descr 		= array_descr + "<br>(With " + percentage + "% discount!)";
            discount			= site_discount;
        }
    }
    //Si hay descuento de sitio, y el select se deja en 0, se deja el porcentaje como estaba.
    if(DEBUG){
        alert("Percentage=" + select_option + " site_discount=" + site_discount);
    }
    if(DEBUG){
        alert("Parte 5, enlace modificado:\n" + array_descr);
    }

    //Se junta todo el link:
    tokens[1]				    = array_descr;
    tokens[2]				    = array_price.toFixed(2);
    tokens[7]				    = array_weight.toFixed(2);
    link                                    = tokens.join("|");
    if(DEBUG){
        alert("Parte 5, enlace final:\n" + link);
    }

    //Finalmente, ahora cambiamos el precio tachado en el enlace
    if (struck_price_id != null)
    {
        var product_price		= document.getElementById(struck_price_id);
    }
    if (product_price != null)
    {
        if (DEBUG) {
            alert("Parte 6, Cambiando el precio tachado '" + struck_price_id + "' a: " + base_price);
        }
        if (discount == 1.00)
        {
            if (DEBUG) {
                alert("Parte 6.1, El descuento fue calculado como de 0%, corrigiendo:\n" + 
                        base_price + " / " + array_price);
            }    
            discount			= parseFloat(base_price / array_price).toFixed(2);
        }
        if (DEBUG) {
            alert("Colocando el precio tachado al descuento: " + discount);
        }
        if (DEBUG) {
            alert("Cambiando el precio en gris - hay select de descuento.");
        }
        update_price(struck_price_id, link, discount);
    }
    else
    {
        if(DEBUG){
            alert("Parte 6, No se consiguio el precio tachado '" + struck_price_id + "'");
        }
    }
	
    return link;
}

function change_select_2(select_id, change_to)
{
    var DEBUG                   = false;
    //Obtengo el select
    var select			= document.getElementById(select_id);
    var select_content  = "";
    if(DEBUG)       {
        alert("ID del select de combinacion: " + select_id);
    }
    if(!select)
    {
        if(DEBUG)   {
            alert("Error. No se pudo obtener el select: " + select_id);
        }
        return;
    }
	
    //Chequeo que mediante el codigo pueda accederse a cada una de las opciones:
    if(DEBUG)
    {
        select_content          = "";
        for (var x = 0; x < select.options.length; x++)
        {
            select_content      += "\n" + select.options[x].value + " -> " + select.options[x].text;
        }
        alert("Contenido del select '"+ select_id +"' antes de borrar:" + select_content);
    }
    //Guardo, en 2 variables, el contenido de la ultima opcion del select:
    var saved_value		= select.options[select.options.length - 1].value;
    var saved_text		= select.options[select.options.length - 1].text;
    if(DEBUG)
    {
        alert("Guardando la ultima opcion de '"+ select_id +"':\nValue: " + saved_value + "\nText: " + saved_text);
    }
	
    //Obtengo el que esta seleccionado:
    var currently_selected	= parseInt(select.options[select.selectedIndex].value);
    if(DEBUG)   {
        alert("Posicion actual del select: " + currently_selected);
    }
	
    var option_4		= false;
    var option_5		= false;
	
    switch(currently_selected)
    {
        case 4:
        {
            if(DEBUG)   {
                alert("Seleccionada la combinacion: 4");
            }
            option_4		= true;
            break;
        }
        case 5:
        {
            if(DEBUG)   {
                alert("Seleccionada la combinacion: 5");
            }
            option_5		= true;
            break;
        }
        default:
        {
            break;
        }
    }
	
    //Ahora, borro desde el index 4 hasta length:
    select.options.length       = 4;
    if(DEBUG)
    {
        select_content          = "";
        for (x = 0; x < select.options.length; x++)
        {
            select_content     += "\n" + select.options[x].value + " -> " + select.options[x].text;
        }
        alert("Contenido del select tras borrar:" + select_content);
    }
	
    //Igual, dependiendo del change_to, agrego la(s) opcion(es) correspondiente(s):
    switch(change_to)
    {
        case "vp_caps":
        {
            if(option_4){
                option_5                    = true;
            }		
            select.options[select.length]   = new Option("Combine with VP (30 caps)", 
                                                         5, 
                                                         false, 
                                                         option_5);
            //Solo si la ultima opcion del select anterior es distinta a las ya colocadas, 
            //volver agregarla: 
            if(saved_value > 5) {
                select.options[select.length]   = new Option(saved_text, saved_value, false, false);
            }
            break;
        }
        case "pe":
        {		
            if(option_5){
                option_4                    = true;
            }	
            select.options[select.length]   = new Option("Combine with PE (30 caps)", 
                                                         4, 
                                                         false, 
                                                         option_4);
            //Solo si la ultima opcion del select anterior es distinta a las ya colocadas, 
            //volver agregarla: 
            if(saved_value > 5) {
                select.options[select.length]   = new Option(saved_text, saved_value, false, false);
            }
            break;
        }
        default:
        {
            break;
        }
    }
    
    if(DEBUG)	{
        alert("Reseteando el select al <option value='" + currently_selected + "'> seleccionado por el usuario.");
    }
    if(currently_selected <= 3 || currently_selected >= 6)
    {
        for (var i = 0; i <= select.options.length; i++)
        {
            if(DEBUG)	{
                alert("Evaluando el <option value='" + parseInt(select.options[i].value) + "'>" );
            }
            if ( parseInt(select.options[i].value) == currently_selected )
            {
                if(DEBUG) {
                    alert("Opcion escogida: " + select.options[i].value + " -> " + select.options[i].text);
                }
                select.options[i].selected  = true;
                break;
            }
        }
    }
    //Show resulting select after modifications:
    if(DEBUG)
    {
        select_content          = "";
        for (x = 0; x < select.options.length; x++)
        {
            select_content     += "\n" + select.options[x].value + " -> " + select.options[x].text;
        }
        alert("Contenido del select tras modificar:" + select_content);
    }    
}

/**
 *  toggleSelectBox()
 *  (in)habilita el select de caja dado por el indice obtenido.
 *  @param  sourceIndex El indice bajo el cual se obtendra el select de combinacion.
 *  @param  toggleIndex El indice bajo el cual se obtendra el grupo de selects.
 *  @param  source      (opcional) El id unico del select que cambia a los demas.
 *  @param  lToggle     (opcional) El id unico del div izquierdo (que contiene al select).
 *                      Si no se especifica, se combinara con 'select_left_'
 *                      para obtener un id único. Ejemplo: 'select_left_1-8'.
 *  @param  rToggle     (opcional) El id unico del div derecho (que contiene al select).
 *                      Si no se especifica, se combinara con 'select_right_'
 *                      para obtener un id único. Ejemplo: 'select_right_1-8'.
 */
function toggleSelectBox(sourceIndex, toggleIndex, source, lToggle, rToggle, toggleType){
    //Optional arguments:
    lToggle     = typeof lToggle  !== 'undefined' ? lToggle  : 'select_left_' + toggleIndex;
    rToggle     = typeof rToggle  !== 'undefined' ? rToggle  : 'select_right_' + toggleIndex;
    toggleType  = typeof toggleType !== 'undefined' ? toggleType  : 'combine';
    if(toggleType == 'combine') {
        source  = typeof source   !== 'undefined' ? source   : 'combinar_' + sourceIndex;
    }
    else {
        source  = typeof source   !== 'undefined' ? source   : 'escoger_' + sourceIndex;
    }
    var DEBUG           = false;
    var sourceSelect    = jQuery("#" + source);
    var toggleDivL      = jQuery("#" + lToggle);
    var toggleDivR      = jQuery("#" + rToggle);
    var sourceOption    = sourceSelect.val();
    
    if( DEBUG) {
        console.log("Ahora en la funcion: 'toggleSelectBox'");
        console.log("Parametros:");
        console.log("sourceIndex: " + sourceIndex);
        console.log("toggleIndex: " + toggleIndex);
        console.log("source: " + source);
        console.log("lToggle: " + lToggle);
        console.log("rToggle: " + rToggle);
        console.log("toggleType: " + toggleType);
    }
    
    if(toggleType == 'combine') {
        if( sourceOption == 4 || sourceOption == 5) {
            if (   jQuery(toggleDivL).hasClass('hidden') &&
                jQuery(toggleDivR).hasClass('hidden')) {
                jQuery(toggleDivL).removeClass('hidden');
                jQuery(toggleDivR).removeClass('hidden');
                if(DEBUG)
                    alert('Rendering select visible.');
            }
        }
        else {
            if ( ! jQuery(toggleDivL).hasClass('hidden') &&
                 ! jQuery(toggleDivR).hasClass('hidden')) {
                jQuery(toggleDivL).addClass('hidden');
                jQuery(toggleDivR).addClass('hidden');
                if(DEBUG)
                    alert('Rendering select not visible.');
            }
        }
    }
    else {
        if( sourceOption == 0 || sourceOption == 1 || sourceOption == 2) {
            if (   jQuery(toggleDivL).hasClass('hidden') &&
                jQuery(toggleDivR).hasClass('hidden')) {
                jQuery(toggleDivL).removeClass('hidden');
                jQuery(toggleDivR).removeClass('hidden');
                if(DEBUG)
                    alert('Rendering select visible.');
            }
        }
        else {
            if ( ! jQuery(toggleDivL).hasClass('hidden') &&
                 ! jQuery(toggleDivR).hasClass('hidden')) {
                jQuery(toggleDivL).addClass('hidden');
                jQuery(toggleDivR).addClass('hidden');
                if(DEBUG)
                    alert('Rendering select not visible.');
            }
        }        
    }
}
/**
 * Logica para el select de caja:
 * Un select adicional que va en el paquete combinado y en el 
 * paquete por separado de capsulas que esté justo encima del 
 * que cambia las capsulas PE por VP o al revés, 
 * que contenga dos opciones que digan: "sin cajita", "con cajita". 
 * Que por defecto esté en "sin cajita". 
 * Cuando está en "sin cajita", el valor de cada cajita como tal 
 * (empaque de las cápsulas) es de 25 US$, de manera que por cada 
 * caja escogida se le reduce esa cantidad al paquete (si tiene descuento, 
 * se le reduce y luego se saca todo el descuento). Si el usuario cambia a 
 * "con cajita", entonces el precio de las cápsulas estarán al precio como 
 * debe ser, es decir a: 204.95 US$.
 */
function getBoxPrice(product_type, base_price, site_discount)
{
    var DEBUG       = false;
    var box_price   = 25.00;
    var box_total;
    var total_price;
    var box_qty;
    var pe_price    = 204.95 - box_price;
    var vp_price    = 219.95 - box_price;
    
    if(site_discount != 1.00){
        //Cambiar el precio base al sin descuento:
        if (DEBUG) {
            alert("Paso 1: Quitando el descuento de "+ site_discount +".\nAntes:\nPrecio Base: "+ base_price);
        }
        base_price  = parseFloat((base_price / site_discount).toFixed(2));
        if (DEBUG) {
            alert("Paso 1: Quitando el descuento de "+ site_discount +".\nDespues:\nPrecio Base: " + base_price);
        }
    }
    //De acuerdo al tipo de producto, calcular el número de cajas:
    if(product_type == 'pe') {
        box_qty = parseInt( base_price / pe_price );
    }
    else {
        box_qty = parseInt( base_price / vp_price );
    }
    
    if (DEBUG) {
        alert("Paso 2: Cajas calculadas en base al precio dado para '"+ product_type +
              "': "+ box_qty);
    }
    //Si la cantidad de cajas llegase a ser cero, quiere decir que no se pudo calcular con el precio
    //base, por tanto, realizar de nuevo el calculo, ignorando el tipo de producto, ya que asumimos
    //que el precio base se refiere al PE:
    if(box_qty == 0) {
        box_qty = parseInt( base_price / pe_price );
    }
    
    //Calcular de nuevo el precio base de acuerdo al numero de cajas obtenido:
    if(product_type == 'pe') {
        base_price = parseFloat( box_qty * pe_price );
    }
    else {
        base_price = parseFloat( box_qty * vp_price );
    }
        
    //Ahora calcular el nuevo precio por el número de cajas y colocar de nuevo el descuento quitado:
    box_total   = parseFloat( (box_qty * box_price).toFixed(2) );
    total_price = parseFloat( ( (box_total + base_price) * site_discount ).toFixed(2) );
    if (DEBUG) {
        alert("Paso 3.1: Parametros: \nCajas:"+ 
              box_qty +"\nPrecio Cajas:"+ 
              box_price +"\nSubtotal Cajas:"+ 
              box_total+"\nPrecio Base:"+
              base_price
             );
        alert("Paso 3.2: Precio nuevo calculado: "+ total_price);
    }
    
    return total_price.toFixed(2);
}

function capsule_type(link, change_to)
{
    //Para realizar pruebas:
    var DEBUG               = false;
	
    if(DEBUG){
        alert("Parte 1, Descripcion de producto obtenido: " + link);
    }
		
    //Separo el link en tokens:
    var tokens              = link.split(/\|/);

    //Obtengo el token correspondiente a la descripcion:
    var array_descr         = tokens[1];

    //Solo hay dos posibles opciones, PE o VP, así que se busca eso en el string de descripcion:
    var reg_exp_PE          = /MFIII PE/gi;
    var reg_exp_VP          = /MFIII VP/gi;
    //Esta es una opcion provisional, para los productos Blue Cell Serum, Parche Pro-Sero y Kimi:
    var reg_exp_BC          = /Blue Cell Serum/gi;
    var reg_exp_parche      = /Pro-Sero Patch/gi;
    //Esto es para los tipos de aplicacion de producto:
    var reg_exp_caps        = /Capsules/i;
    var reg_exp_drink       = /Drinkable/i;
    var reg_exp_patch       = /Aplicable/i;

    if(DEBUG){
        alert("Parte 2, descripcion actual: " + tokens[1]);
    }
	
    //Y ahora se sustituye con lo que va.
    if(DEBUG)	{
        alert("Ahora dentro del case: " + change_to);
    }
    switch(parseInt(change_to))
    {
        case 0: 
        case 1:
        {   
            //Cambiar el tipo de producto:
            if(reg_exp_VP.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es PE y actualmente es VP");
                }		
                array_descr = array_descr.replace(reg_exp_VP, "MFIII PE");
            }
            if(reg_exp_BC.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es PE y actualmente es Blue Cell Serum");
                }		
                array_descr = array_descr.replace(reg_exp_BC, "MFIII PE");
            }
            if(reg_exp_parche.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es PE y actualmente es Pro-Sero Patch");
                }		
                array_descr = array_descr.replace(reg_exp_parche, "MFIII PE");
            }
            //Cambiar la forma de consumo:
            if(reg_exp_drink.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es en capsulas y actualmente es bebible");
                }		
                array_descr = array_descr.replace(reg_exp_drink, "Capsules");
            }
            if(reg_exp_patch.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es en capsulas y actualmente es aplicable");
                }		
                array_descr = array_descr.replace(reg_exp_patch, "Capsules");
            }
            break;
        }
        case 2:
        {
            //Cambiar el tipo de producto:
            if(reg_exp_PE.test(array_descr))
            {
                if(DEBUG)	{
                    alert("El producto seleccionado es VP y actualmente es PE");
                }
                array_descr = array_descr.replace(reg_exp_PE, "MFIII VP");
            }
            if(reg_exp_BC.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es VP y actualmente es Blue Cell Serum");
                }		
                array_descr = array_descr.replace(reg_exp_BC, "MFIII VP");
            }
            if(reg_exp_parche.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es VP y actualmente es Pro-Sero Patch");
                }		
                array_descr = array_descr.replace(reg_exp_parche, "MFIII VP");
            }
            //Cambiar la forma de consumo:
            if(reg_exp_drink.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es en capsulas y actualmente es bebible");
                }		
                array_descr = array_descr.replace(reg_exp_drink, "Capsules");
            }
            if(reg_exp_patch.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es en capsulas y actualmente es aplicable");
                }		
                array_descr = array_descr.replace(reg_exp_patch, "Capsules");
            }
            break;
        }
        case 6: //El caso particular del Parche
        {
            if(reg_exp_PE.test(array_descr))
            {
                if(DEBUG)	{
                    alert("El producto seleccionado es Pro-Sero Patch y actualmente es PE");
                }
                array_descr = array_descr.replace(reg_exp_PE, "Pro-Sero Patch");
            }
            if(reg_exp_VP.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es Pro-Sero Patch y actualmente es VP");
                }		
                array_descr = array_descr.replace(reg_exp_VP, "Pro-Sero Patch");
            }
            if(reg_exp_BC.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es Pro-Sero Patch y actualmente es Blue Cell Serum");
                }		
                array_descr = array_descr.replace(reg_exp_BC, "Pro-Sero Patch");
            }
            //Cambiar la forma de consumo:
            if(reg_exp_caps.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es aplicable y actualmente es en capsulas");
                }		
                array_descr = array_descr.replace(reg_exp_caps, "Aplicable");
            }
            if(reg_exp_drink.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es aplicable y actualmente es bebible");
                }		
                array_descr = array_descr.replace(reg_exp_drink, "Aplicable");
            }
            break;
        }
        case 7: //El caso particular del Blue Cell Serum
        {
            if(reg_exp_PE.test(array_descr))
            {
                if(DEBUG)	{
                    alert("El producto seleccionado es Blue Cell Serum y actualmente es PE");
                }
                array_descr = array_descr.replace(reg_exp_PE, "Blue Cell Serum");
            }
            if(reg_exp_VP.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es Blue Cell Serum y actualmente es VP");
                }		
                array_descr = array_descr.replace(reg_exp_VP, "Blue Cell Serum");
            }
            if(reg_exp_parche.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es Blue Cell Serum y actualmente es Pro-Sero Patch");
                }		
                array_descr = array_descr.replace(reg_exp_parche, "Blue Cell Serum");
            }
            //Cambiar la forma de consumo:
            if(reg_exp_caps.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es aplicable y actualmente es en capsulas");
                }		
                array_descr = array_descr.replace(reg_exp_caps, "Aplicable");
            }
            if(reg_exp_drink.test(array_descr))
            {
                if(DEBUG) {
                    alert("El producto seleccionado es aplicable y actualmente es bebible");
                }		
                array_descr = array_descr.replace(reg_exp_drink, "Aplicable");
            }
            break;
        }
    }
    //Limpio la descripcion para evitar codificaciones dobles:
    array_descr             = clean_description(array_descr);

    //Finalmente, se junta todo el link:
    tokens[1]               = array_descr;
    if(DEBUG){
        alert("Parte 3, descripcion modificada:\n" + tokens[1]);
    }
    link                    = tokens.join("|");
    if(DEBUG){
        alert("Parte 4, Enlace final:\n" + link);
    }

    return link;
}

function update_product(product_type,
    discount_id, 
    combined_id, 
    link_id, 
    image_id, 
    orig_product, 
    orig_price, 
    orig_weight, 
    site_discount
    ) {
    //Para realizar pruebas:
    var DEBUG                   = false;
	
    if(DEBUG)
    {
        alert("Ahora en la funcion: update_product.");
        alert("Variables obtenidas:\n" + 
            "\n product_type: " + product_type +
            "\n discount_id: " + discount_id + 
            "\n combined_id: " + combined_id + 
            "\n link_id: " + link_id + 
            "\n image_id: " + image_id + 
            "\n orig_product: " + orig_product + 
            "\n orig_price: " + orig_price +
            "\n orig_weight: " + orig_weight + 
            "\n site_discount: " + site_discount
            )
    }

    //Last minute hack.
    //TODO: Fix properly.
    orig_product_config = orig_product;
    if(/combine_/gi.test(orig_product)) {
        orig_product            = orig_product.replace('combine_', '');
        
    }
    
    //Obtengo las variables necesarias:
    //Imagen:
    var image_source            = document.getElementById(image_id);
    if (DEBUG)	{
        alert("Fuente de la imagen: " + image_source );
    }
    //Enlace del producto:
    var link_parent             = document.getElementById(link_id);
    if (DEBUG)	{
        alert("Fuente del enlace: " + link_parent );
    }
    var link                    = decodeURI(link_parent.href);
	
    //Opciones del select:
    var discount_select 	= document.getElementById(discount_id);
    if(discount_select != null)
    {
        var discount_option	= discount_select.value;
        if (DEBUG)	{
            alert("Opcion seleccionada en el select de descuento: " + discount_option);
        }
        select_exists		= true;
    }
    else
    {
        if (DEBUG)	{
            alert("No hay o no se encuentra el select de descuento: " + discount_id);
        }
        var discount_option	= -1;
        select_exists		= false;
    }
    var combined_select 	= document.getElementById(combined_id);
	
    //Acá es donde se toma en cuenta si el producto 
    //dado es VP o PE, o si será combinado con ellos:
    var product_index		= link_id.match(/\d+/);
    var type_id			= "escoger_" + product_index;
    var box_id			= "cajita_" + product_index;
    var type_select 		= document.getElementById(type_id);
    var box_select 		= document.getElementById(box_id);
    var box_option;
    
    if (box_select != null) {
        box_option          = box_select.value;
    }
    else {
        box_option          = 0;
    }
    
    if (type_select != null) {
        if(DEBUG)   {
            alert("El producto posee select de VP-PE");
            alert("La opcion con o sin caja es: "+ box_option);
        }
        var type_option		= type_select.value;
 
        //Si es 0 o 1, es PE
        if(type_option == '0' || type_option == '1')
        {
            if(DEBUG)   {
                alert("Colocando el producto base como PE");
            }
            orig_product	= "pe";
            link                = capsule_type(link, type_option);
            orig_price          = getBasePrice(product_type, orig_product, site_discount);
            change_select_2(combined_id, "vp_caps");
        }
        //Si es 2, es VP
        else if (type_option == '2') {
            if(DEBUG) {
                alert("Colocando el producto base como VP");
            }
            orig_product	= "vp_caps";
            link                = capsule_type(link, type_option);
            orig_price          = getBasePrice(product_type, orig_product, site_discount);
            change_select_2(combined_id, "pe");
        }
        //Si es 6, es Pro-Sero Patch
        else if (type_option == '6') {
            if(DEBUG) {
                alert("Colocando el producto base como Pro-Sero Patch");
            }
            orig_product	= "parche_plus";
            link                = capsule_type(link, type_option);
            orig_price          = getBasePrice(product_type, orig_product, site_discount);
        }
        //Si es 7, es Blue Cell Serum
        else if (type_option == '7') {
            if(DEBUG) {
                alert("Colocando el producto base como Blue Cell Serum");
            }
            orig_product	= "blue_cell";
            link                = capsule_type(link, type_option);
            orig_price          = getBasePrice(product_type, orig_product, site_discount);
        }
        //Si es 5, es Kimi
        else if (type_option == '8') {
            if(DEBUG) {
                alert("Colocando el producto base como Kimi");
            }
            orig_product	= "kimi";
            link                = capsule_type(link, type_option);
            orig_price          = getBasePrice(product_type, orig_product, site_discount);
        }
        else {
            alert("Error. El select de tipo tiene el indice de: " + type_option);
        }
        
        //Si el producto base es PE o VP, cambiar el precio del producto:
        if(  box_option != 0 && 
            (   orig_product == 'pe' || 
                orig_product == 'vp_caps') ) {
            if(DEBUG) {
                alert("El usuario eligio con caja, y el producto base es PE o VP.");
            }
            orig_price          = parseFloat(getBoxPrice(orig_product, orig_price, site_discount));
        }
    }
    else if(/:(pe|vp_caps)/gi.test(orig_product)) {
        if(DEBUG)   {
            alert("El producto es combinado con capsulas. Colocando opciones adecuadas.");
        }
        //Asignar el producto correcto a producto original:
        orig_product            = orig_product.replace(':(pe|vp_caps)', '');
        link                    = capsule_type(link, combined_select.value);
    }
    //Fin de codigo agregado para detectar y manejar select de VP - PE.
    
    if(combined_select != null) {
        var combined_option 	= combined_select.value;
    }
    else {
        if (DEBUG) {
            alert("No hay o no se encuentra el select de combinacion: " + combined_id);
        }
        var combined_option	= -1;
    //select_exists		= false;
    }
    if (DEBUG)	{
        alert("Opcion seleccionada en el select de combinacion: " + combined_option );
    }    

    //Se realizan las operaciones sobre el enlace y la imagen:
    //Enlace:
    var resulting_link          = reset_cart_link(  link, 
                                                    orig_price,	
                                                    orig_weight, 
                                                    site_discount,
                                                    select_exists
                                                    );
    if(combined_option != -1)
    {
        resulting_link          = change_combined(  combined_option, 
                                                    resulting_link, 
                                                    orig_product, 
                                                    orig_price, 
                                                    orig_weight, 
                                                    site_discount,
                                                    box_option
                                                    );
    }
    //Si se tiene el enlace disponible para cambiar el descuento, se realiza:
    if(discount_option != -1)
    {
        resulting_link          = change_discount(  discount_option,
                                                    resulting_link,
                                                    site_discount,
                                                    "struck_price_" + product_index
                                                    );
    }
    else
    {
        //Cambio el precio tachado:
        if(DEBUG){
            alert("Cambiando el precio en gris - no hay select de descuento.");
        }
        update_price("struck_price_" + product_index, resulting_link, site_discount);
    }
    link_parent.href            = encodeURI(resulting_link);
	
    //Agregado para modificar el precio en rojo o normal del producto:
    if(DEBUG){
        alert("Cambiando el precio en rojo.");
    }
    update_price('product_price_' + product_index, link_id /*Sin descuento*/);
    
    if(! /combine_/.test(orig_product_config)) {
        //Imagen:
        //Solo cambiar si los tipos de producto estan determinados:
        if(orig_product != "")
        {
            if(DEBUG)	{
                alert("Producto original: " + orig_product);
            }
            var combine_with    = get_combination(parseInt(combined_option));
            if(DEBUG)	{
                alert("Combinado con: " + combine_with);
            }
            var resulting_image	= get_comb_image(orig_product, combine_with);
            if(DEBUG)	{
                alert("Enlace a la imagen resultante: " + resulting_image);
            }
            //Se cambia la imagen a lo solicitado:
            change_image(image_id, resulting_image, '160', '160');	
        }
        //Tipo de terapia:
        therapyContent      = getTherapy(orig_product, combine_with);
        setTherapy(product_index, therapyContent);
        
        //Descripcion:
        descriptionContent  = getDescription(orig_product, combine_with);
        setDescription(product_index, descriptionContent);

        //Uso:
        usageContent        = getUsage(product_type, orig_product, combine_with);
        setUsage(product_index, usageContent);
    }
    //Link (for ideal products)
    if(orig_product == "ideal_euf" || orig_product == "ideal_hp" || orig_product == "ideal_vp") {
        resulting_link      = encodeURI( clean_link( decodeURI( link_parent.href ) ) );
        //Abrir el link en sus distintos componentes:
        resulting_link      = getLink(resulting_link, usageContent);
        link_parent.href    = resulting_link;
    }
}