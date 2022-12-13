import moment from 'moment';
import PdfPrinter from 'pdfmake/src/printer';
import currencyFormatter from 'currency-formatter';

const Quotation = async(quotation) =>{
    var fonts = {
        Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
        }
    };
//CABECERA
	const fecha = moment().format('DD/MM/YYYY');
    var items =[];
	let i =1;
    for(let quo of quotation[0].analisis_asociado){
		items.push([
			// {text: i++},
			// {text: quo.tipo},
			{text: quo.assay_name },
			// {text: quo.divisa + ' '+ quo.price }
		])
		
    }


    var docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: '',
        pageMargins: [ 60, 60, 60, 60 ],
		watermark: {text: 'ANDES ANALYTICAL ASSAY', color: 'gray', opacity: 0.2, italics: false, fontSize: 16},
		footer: () => {
            return {
                text: `El Totoral 651, Barrio Industrial Buenaventura \nQuilicura, Santiago - Fono (56-2) 2747 1265 \nwww.3aaa.cl `,
                alignment: 'left',
                fontSize: 7,
				margin:[ 60, 0, 0, 0 ],
				color: 'gray', 
            }
        },
		header: () => {
            return  { columns: [
				{
				image: 'logo',
				width: 100,
				border: [false, false, false, false], 
				alignment: 'left', 
				margin: [60, 25, 5, 15] 
				},
				{
                text: `Oferta comercial \n${quotation[0].quotation_number} \n${quotation[0].for}`,
                alignment: 'right',
                fontSize: 10,
				margin:[ 0, 25, 60, 0 ],
				// color: 'gray', 
            	}
			]}

        },
		content : [

            
		]//fin content
		,
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
            anotherStyle: {
                italic: true,
                alignment: 'right'
            },
			margin1: {
				margin: [0,1,0,1],
				fontSize:7
				},
        }
    };
    //  var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

    return printer.createPdfKitDocument(docDefinition);


}


module.exports = {
    Quotation
}