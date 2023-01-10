import moment from 'moment';
import PdfPrinter from 'pdfmake/src/printer';
import currencyFormatter from 'currency-formatter';

const Quotation = async() =>{
    var fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    };

    var tituloinicio = `Certificado Declaración de Ingresos y Gastos Electorales `;
    var folio = `Folio: N° XXXXXXXXXX}`;
    var tituloCertificado = "CERTIFICADO DECLARACIÓN DE INGRESOS Y GASTOS ELECTORALES WEB";
    var textoCertificado = `El Servicio Electoral certifica que la Declaración de Ingresos y Gastos Electorales del candidato a la elección de don RUT , ha sido enviada vía internet al Administrador General del Partido y ha sido recibida con fecha .`;
    var textofinal = "Si usted desea, puede imprimir el certificado adjunto como comprobante de que el Servicio Electoral ha recibido su declaración.";

    var docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: 'landscape',
        pageMargins: [60, 10, 60, 60],
        content: [{
            style: 'certificado',
            color: '#444',
            table: {
                widths: [650],
                headerRows: 2,
                body: [
                    [{ image: 'logo', width: 50, border: [false, false, false, false], alignment: 'left', margin: [5, 5, 90, 5] }],
                    [{ text: tituloinicio, border: [false, false, false, true], fontSize: 10, lineHeight: 1, alignment: 'center', margin: [20, 15, 20, 15] }],
                    [{ text: folio, border: [true, false, true, false], fontSize: 12, lineHeight: 1, alignment: 'right', margin: [140, 15, 10, 15] }],
                    [{ text: tituloCertificado, border: [true, false, true, false], fontSize: 13, lineHeight: 1, alignment: 'center', margin: [140, 15, 140, 15] }],
                    [{ text: textoCertificado, border: [true, false, true, false], fontSize: 12, lineHeight: 1, margin: [10, 15, 10, 30] }],
                    [{ text: textofinal, border: [false, true, false, false], fontSize: 11, lineHeight: 1, alignment: 'justify', margin: [10, 15, 10, 15] }]
                ]
            }
        }],
        images: {
            logo: 'public/logos/logo.png'
        },
        styles: {
            header: {
                fontSize: 24,
                bold: false,
                alignment: 'center',
                margin: [0, 120, 0, 10]
            },
            certificado: {
                fontSize: 10,
                bold: false,
                alignment: 'justify',
                lineHeight: 2.25,
                margin: [0, 20, 0, 10]
            },
            anotherStyle: {
                italic: true,
                alignment: 'right'
            }
        }
    };
    //  var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

    return printer.createPdfKitDocument(docDefinition);


}


module.exports = {
    Quotation
}