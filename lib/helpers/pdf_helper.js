import path from 'path';

class PDFHelper {

  static downloadPDF(documentDescriptor, filename, res) {
    const PdfPrinter = require('pdfmake/src/printer');
    const printer = new PdfPrinter(PDFHelper.getFontDescriptors());

    const doc = printer.createPdfKitDocument(documentDescriptor);

    const chunks = [];
    let result;

    doc.on('data', function (chunk) {
      chunks.push(chunk);
    });
    doc.on('end', function () {
      result = Buffer.concat(chunks);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=${filename}.pdf`,
        'Content-Length': Buffer.byteLength(result, 'utf-8')
      });
      res.end(result);
    });
    doc.end();
  }

  static getMarginInPoint(marginCM) {
    return marginCM / 2.54 * 72;
  }

  static getFontDescriptors() {
    const fontDescriptors = {
      Roboto: {
        normal: path.join(__dirname, '..', '..', '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '..', '..', '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, '..', '..', '/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '..', '..', '/fonts/Roboto-MediumItalic.ttf')
      }
    };

    return fontDescriptors
  }

  static getHR() {
    const hr = [{ type: 'line', x1: 0, y1: 1, x2: 810-2*40, y2: 1, lineWidth: 0.5}];
    return hr;
  }
}

export default PDFHelper;
