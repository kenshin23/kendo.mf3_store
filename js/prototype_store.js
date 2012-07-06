/**
 *  Pasos del algoritmo:
 *  1. Obtener el estado de cada uno de los selects del producto
 *  2. Obtener la imagen correspondiente.
 *  3. Realizar el calculo del precio.
 *  4. 
 *
 */

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
function getBoxPrice(box_qty, base_price, site_discount)
{
    var box_price   = 25;
    var total_price;
    
    if(site_discount != 1.00){
        //Cambiar el precio base al sin descuento:
        base_price  = base_price / site_discount;
    }
    //Ahora calcular el nuevo precio por el número de cajas:
    total_price = (box_qty * box_price) + base_price;
    
    return total_price;
}