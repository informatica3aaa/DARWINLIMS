import moment from 'moment';
import PdfPrinter from 'pdfmake/src/printer';
import currencyFormatter from 'currency-formatter';
// var printer = new PdfPrinter(fonts);
var fs = require('fs');
const officegen = require('officegen');
let docx = officegen('docx')


const QuotationPDF = async(quotation) =>{
	// console.log("AAA-1402-1292-A0", quotation);
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
	var paginas=[];
	var element=[];
	let i =1;
	items.push([
		{text: ''},
		{text: 'Tipo', alignment: 'left', fontSize: 9,   bold: true  },
		{text: 'Pagina Nro', alignment: 'left', fontSize: 9,   bold: true},
		{text: 'Ítem', alignment: 'left', fontSize: 9,   bold: true},
		{text: 'Valor',alignment: 'left', fontSize: 9,   bold: true }
	])

    for(let quo of quotation[0].analisis_asociado){
		let titulo = String(quo.assay_name)
		items.push([
			{text: i++},
			{text: quo.tipo},
			{pageReference: titulo, alignment: 'left'},
			{textReference: titulo, alignment: 'left', color:'blue'},
			{text: quo.divisa + ' '+ quo.price }
		])
		
	
	if(quo.elementos.length != 0){
		for(let ele of quo.elementos){
			if(ele){
					element.push([
						{ text: ele.elemento },
						{ text: ele.unidad },
						{ text: ele.valor_f},
						{ text: ele.limite_inferior +';'+ ele.limite_superior},
						{ text: ele.decimals}
					]) 
			}
		}
	}
		paginas.push([
			{ text: titulo, style: 'header',	id: titulo, pageBreak: 'before'},
			{ layout: 'noBorders',
				table: {
				widths: [100,'auto'],
				body :[
						[
							{ text: 'Tipo', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.tipo}`, fontSize: 9,  lineHeight: 1.5 }
						],
						[
							{ text: 'Código Ítem', alignment : 'right', fontSize: 9,   bold: true  ,  lineHeight: 1.5 },
							{ text: `${quo.assay_name }`, fontSize: 9,  lineHeight: 1.5 }
						],
						[ { text: 'Descripción', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.description }`, fontSize: 9,  lineHeight: 1.5 }],
						[ 
							{ text: 'Digestión', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.digestion }`, fontSize: 9,  lineHeight: 1.5 }
						],
						[
							{ text: 'Técnica', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.tecnica }`, fontSize: 9,  lineHeight: 1.5 }
						],
						[
							{ text: 'Método', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.metodo } `, fontSize: 9,  lineHeight: 1.5 }
						],	
						[
							{ text: 'Peso Nominal', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.nominal_weight }`, fontSize: 9,  lineHeight: 1.5 }
						],
						[
							{ text: 'Volumen Nominal', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.nominal_volume }`, fontSize: 9,  lineHeight: 1.5 }
						],
						[
							{ text: 'Tipo Muestra', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: `${quo.tipo_muestra} `, fontSize: 9,  lineHeight: 1.5 }
						]
					]
					}
			},
			{	layout: 'lightHorizontalLines',
				table: {
					widths: [90,90,90,90,90],
					body :element
					// [
					// 	[
					// 	{ text: 'Elemento', alignment : 'left', fontSize: 9,   bold: true,  lineHeight: 1.5 },
					// 	{ text: 'Unidad', alignment : 'left', fontSize: 9,   bold: true,  lineHeight: 1.5 },
					// 	{ text: 'Aforo', alignment : 'left', fontSize: 9,   bold: true,  lineHeight: 1.5 },
					// 	{ text: 'Limite Detección', alignment : 'left', fontSize: 9,   bold: true,  lineHeight: 1.5 },
					// 	{ text: 'Decimales', alignment : 'left', fontSize: 9,   bold: true,  lineHeight: 1.5 }
					// 	],
					// 		element
					// 	]
					}
			},
		])
		
    }


    var docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: '',
        pageMargins: [ 50, 10, 60, 50 ],
		watermark: {text: 'ANDES ANALYTICAL ASSAY', color: 'gray', opacity: 0.2, italics: false, fontSize: 16},
		watermark: {text: 'BY ANDES ANALYTICAL ASSAY', color: 'gray', opacity: 0.2, italics: false, fontSize: 26},
		footer: () => {
            return {
                text: `El Totoral 651, Barrio Industrial Buenaventura \nQuilicura, Santiago - Fono (56-2) 2747 1265 \nwww.3aaa.cl `,
                alignment: 'left',
                fontSize: 7,
				margin:[ 60, 0, 0, 0 ],
				color: 'gray', 
            }
        },		

		content : [
			
		{	layout: 'noBorders',
			table: {
				
				widths: ['*','auto'],
				body :[
					[
						{ image: 'logo', width: 100, rowSpan:3},
						{ text: `Oferta comercial`,alignment : 'right', bold: true},
					],
					[
						{},
			     		{ text: `${quotation[0].quotation_number} `, alignment : 'right', bold: true},
					

					],
					[
						{},
						{ text: `${quotation[0].company_name} `, alignment : 'right'},

					],
					[
						{ text: `Laboratorio de Análisis Químico`},
						{}

					]

				]
			}
			
		},
		{text: '1. DATOS GENERALES', style: 'subheader',   bold: true},
		{
			layout: 'noBorders',
			table: {
			
				widths: [100,'auto'],
				body :[
					[
						[
							{ text: 'Número', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: 'Vigencia', alignment : 'right', fontSize: 9,   bold: true  ,  lineHeight: 1.5 },
							{ text: 'Cliente', alignment : 'right', fontSize: 9,   bold: true ,  lineHeight: 1.5 },
							{ text: 'Rut Cliente', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: 'Proyecto', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: 'Días Estimados', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: 'Ejecutivo', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{ text: 'Dirigido a', alignment : 'right', fontSize: 9,   bold: true,  lineHeight: 1.5 },
							{}
						],
						[
							{ text: `${quotation[0].quotation_number} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].start_date} - ${quotation[0].expiration_date }`, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].company_name} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].company_name} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].project} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].estimated_days} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].user_creator} `, fontSize: 9,  lineHeight: 1.5 },
							{ text: `${quotation[0].for} `, fontSize: 9,  lineHeight: 1.5 },
							{}
						]
					],
				]
			}
		},
		{text: '2. RESUMEN OFERTA COMERCIAL', style: 'subheader',   bold: true},
		{
			layout: 'lightHorizontalLines',
			style: 'tabla_quo',
			table: {
				widths: [20,70 ,'*', 'auto','auto'],
				body :items
			}
		},
		{text: '3. DETALLES POR ITEM', style: 'subheader',   bold: true},
		paginas
			
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
			tabla_quo: {
				fontSize: 9, 
				bold: false,
			  },
        }
    };
    //  var PdfPrinter = require('pdfmake');
    var printer = new PdfPrinter(fonts);

    return printer.createPdfKitDocument(docDefinition);


}

const QuotationWord = async(quotation) =>{
	
}


module.exports = {
    QuotationPDF,
	QuotationWord,
}