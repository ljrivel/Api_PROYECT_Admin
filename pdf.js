

const fs = require("fs");
const fonts = require("./fonts");
const styles = require("./styles");
const { image, header } = require("./styles");





function facturaPeliculas(EntradaAdultos, EntradaMayores, EntradaNinos, Asientos, PrecioTotal){
let docDefinition1 = {
    content:[
        
        {text: ".", style: "separador"},
        {text: "MUCHAS GRACIAS POR PREFERIR CINEPOLIS", style: "header"},
        {text: "SU COMPRA SE HA COMPLETADO CON EXITO", style: "header"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: "Detalle de la compra: ", style: "subheader"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: "Entradas Adultos:                                   " + EntradaAdultos, style: "subheader"},
        {text: "Entradas Adultos Mayores:                  " + EntradaMayores, style: "subheader"},
        {text: "Entradas Niños:                                      " + EntradaNinos, style: "subheader"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: "Numero de Asientos: ", style: "subheader"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: Asientos, style: header },
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: "Total Pagado: ", style: "subheader"},
        {text: ".", style: "separador"},
        {text: ".", style: "separador"},
        {text: PrecioTotal, style: "header"},

    ],
    styles: styles
};
return docDefinition1;
}






//----------------------------------------------------------------------------------------------------------------------

function facturaComida(Nombre, Cantidad, PrecioTotal){
    let docDefinition2 = {
        content:[
            {text: ".", style: "separador"},
            {text: "MUCHAS GRACIAS POR PREFERIR CINEPOLIS", style: "header"},
            {text: "SU COMPRA SE HA COMPLETADO CON EXITO", style: "header"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: "Detalle de la compra: ", style: "subheader"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: "Nombre Producto:                                   " + Nombre, style: "subheader"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: "Cantidad:                                   " + Cantidad, style: "subheader"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: "Total Pagado: ", style: "subheader"},
            {text: ".", style: "separador"},
            {text: ".", style: "separador"},
            {text: PrecioTotal, style: "header"},
    
        ],
        styles: styles
    };
    return docDefinition2;
    }
    
    
    
   


module.exports = {facturaPeliculas,facturaComida};