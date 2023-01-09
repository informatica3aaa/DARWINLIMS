import moment from 'moment';
import PdfPrinter from 'pdfmake/src/printer';
import currencyFormatter from 'currency-formatter';
// var printer = new PdfPrinter(fonts);
var fs = require('fs');
const officegen = require('officegen');
let docx = officegen('docx')


const QuotationPDF = async(quotation) =>{
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
			{text: i++},
			{text: quo.tipo},
			{text: quo.assay_name },
			{text: quo.divisa + ' '+ quo.price }
		])
		
    }


    var docDefinition = {
        pageSize: 'LETTER',
        pageOrientation: '',
        pageMargins: [ 50, 10, 60, 50 ],
		watermark: {text: 'ANDES ANALYTICAL ASSAY', color: 'gray', opacity: 0.2, italics: false, fontSize: 16},
		watermark: {text: 'BY TERRIBLE DEIVID', color: 'gray', opacity: 0.2, italics: false, fontSize: 26},
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
							{ text: `${quotation[0].user_id} `, fontSize: 9,  lineHeight: 1.5 },
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
				widths: [20,70 ,'*', 'auto'],
				body :items
			}
		},
		{
			text: 'This is a page reference example. Page number of text element marked id property will be located in pageReference element. See below.\n\n'
		},
		{
			table: {
				body: [
					[{ text: 'page #', bold: true }, { text: 'title', bold: true }],
					[{ pageReference: ' ', alignment: 'right' }, 'Header one'],
					[{ pageReference: 'subheader1', alignment: 'right' }, 'Subheader one'],
					[{ pageReference: 'subheader2', alignment: 'right' }, 'Subheader two'],
					[{ pageReference: 'subheader3', alignment: 'right' }, 'Subheader three']
				]
			}
		},
		{
			text: '\nAnd text can be referenced by textReference:\n'
		},
		{
			table: {
				body: [
					[{ text: 'page #', bold: true }, { text: 'title', bold: true }],
					[{ pageReference: 'header1', alignment: 'right' }, { textReference: 'header1' }],
					[{ pageReference: 'subheader1', alignment: 'right' }, { textReference: 'subheader1' }],
					[{ pageReference: 'subheader2', alignment: 'right' }, { textReference: 'subheader2' }],
					[{ pageReference: 'subheader3', alignment: 'right' }, { textReference: 'subheader3' }]
				]
			}
		},
		{
			text: '\nAnd all can be in inline texts:\n'
		},
		{
			text: [
				'Chapter "',
				{ textReference: 'header1' },
				'" is on page number ',
				{ pageReference: 'header1' }
			]
		},
		{
			text: [
				'Chapter "',
				{ textReference: 'subheader1' },
				'" is on page number ',
				{ pageReference: 'subheader1' }
			]
		},
		{
			text: [
				'Chapter "',
				{ textReference: 'subheader2' },
				'" is on page number ',
				{ pageReference: 'subheader2' }
			]
		},
		{
			text: [
				'Chapter "',
				{ textReference: 'subheader3' },
				'" is on page number ',
				{ pageReference: 'subheader3' }
			]
		},
		{
			text: 'This is a header, using header style',
			style: 'header',
			id: 'header1',
			pageBreak: 'before'
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n',
		{
			text: 'Subheader 1 - using subheader style',
			style: 'subheader',
			id: 'subheader1',
			pageBreak: 'before'
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
		{
			text: 'Subheader 2 - using subheader style',
			style: 'subheader',
			id: 'subheader2',
			pageBreak: 'before'
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.',
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n',
		{
			text: 'It is possible to apply multiple styles, by passing an array. This paragraph uses two styles: quote and small. When multiple styles are provided, they are evaluated in the specified order which is important in case they define the same properties',
			style: ['quote', 'small']
		},
		{
			text: [
				{
					text: 'Subheader 3 - using inline text',
					style: 'subheader',
					id: 'subheader3',
					tocItem: true
				},
				{
					text: '; and this text not be displayed in ToC',
					italics: true
				}
			],
			pageBreak: 'before'
		},
		'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.'	
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