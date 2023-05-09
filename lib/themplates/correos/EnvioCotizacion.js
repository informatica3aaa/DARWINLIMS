
const EnvioCotizacion = async (data, link)=>{
  
  
    return `<html xmlns="http://www.w3.org/1999/xhtml">
    <head><meta name="viewport" content="width=device-width,, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>3aaa</title>
    <link rel="stylesheet" type="text/css">
    <style>
    *{
      margin:0;
      padding:0;
      font-family:'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;
      font-size:100%;
      line-height:1.6
    }
    img{
      max-width:100%
    }
    
    body{
        text-align:justify;
        font-family:'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;
        -webkit-font-smoothing:antialiased;
        -webkit-text-size-adjust:none;
        width:100%!important;
        height:100%
    }
    a{
      color:#348eda
    }
      
    .btn-primary{
        text-decoration:none;
        color:#FFF;
        background-color:#49da50;
        border:solid #49da50;
        border-width:10px 20px;
        line-height:2;
        font-weight:bold;
        margin-right:10px;
        text-align:center;
        cursor:pointer;
        display:inline-block;
        border-radius:25px
    }
        
    .btn-secondary{
        text-decoration:none;
        color:#FFF;
        background-color:orangered;
        border:solid orangered;
        border-width:10px 20px;
        line-height:2;
        font-weight:bold;
        margin-right:10px;
        text-align:center;
        cursor:pointer;
        display:inline-block;
        border-radius:25px
    }
    .last{
        margin-bottom:0
    }
    
    .first{
        margin-top:0
      }
    
    .padding{
        padding:10px 0
    }
    
    table.body-wrap{
        width:100%;
        padding:20px
    }
    
    table.body-wrap .container{
        border:1px solid #f0f0f0
    }
        
    table.footer-wrap{
        width:100%;
        clear:both!important
    }
    
    .footer-wrap .container p{
          font-size:12px;
          color:#666
        }
    table.footer-wrap a{
      color:#999
    }
    
    h1,h2,h3{
      font-family:'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
      color:#000;
      margin:40px 0 10px;
      line-height:1.2;
      font-weight:200
    }
    
    h1{
      font-size:36px
    }
      
    h2{
      font-size:28px}
      
    h3{font-size:22px}
    
    .container{
      display:block!important;
      max-width:1600px!important;
      margin:0 auto!important;
      clear:both!important
    }
    
    .body-wrap .container{
      padding:5px
    }
      
    .content{
      max-width:1600px;
      display:block
    }
    .content table{
      width:100%
    }
    
    .circulo {
    width: 20px;
     height: 20px;
     background: #3582bd;
     border-radius: 50%;
    }
    .triangulo {
    width: 0;
                                                height: 0;
                                                border-top: 15px solid transparent;
                                                border-bottom: 15px solid transparent;
                                                border-left: 15px solid #42d7f1
    }
    p {
    font-size: 12px
    }
  
    
    </style>
    </head>
    <body bgcolor="#f6f6f6">
            <table class="body-wrap">
                <body>
                    <tr>
                      <td class="container" style="background:#FFFFFF;padding:15px;margin-top:15px;border-top:3px solid rgb(10, 10, 10);border-bottom:3px solid rgb(8, 8, 8);">
                            <div class="content">
                              <table>
                                  <tr>
                                    <td bgcolor="#000000"><img src="http://darwinlims.3aaa.cl/img/logo.png" width="150" alt=""></td>
                                  </tr>
                                  <tr>
                                        <td>
                                        <h4 style="text-align:left">Estimado  ${data.destinatario[0].name} </h4>
                                        <p style="text-align:justify">Informamos a usted que hemos recibido su rendición de cuenta N° <b>${data.created}</b> con fecha <b>${data.company_name}</b> hrs. ${ data.quotation_number } , El proceso de su cuenta en el Servicio Electoral, seguirá de la siguiente forma:                                    </p> 
                                        <h3>ACEPTACIÓN DE OFERTA</h3>
                                        <table>
                                          <tr align="center">
                                            <td>  <a href="http://darwinlims.3aaa.cl/cotizacion-rechazo/${link}"><button class="btn-secondary">Rechazo</button>  </a> </td>
                                            <td>  <a href="http://darwinlims.3aaa.cl/cotizacion-aceptar/${link}"><button class="btn-primary">ACEPTO   </button> </a></td>
                                          </tr>
                                        </table>
                                      </td>

                                </tr>
                                <tr>
                                  <td>
                                    <h3>RESUMEN COMERCIAL</h3>
                                    <table style="border-collapse: collapse;border-spacing: 0;">
                                      <tr>
                                        <td>Nro</td>
                                        <td>Tipo</td>
                                        <td>Servicio</td>
                                        <td>Divisa</td>
                                        <td>Precio</td>
                                      </tr>
                                      <tr>
                                        <td>1</td>
                                        <td>Analisis</td>
                                        <td>2AA_AASE3 12</td>
                                        <td>U$</td>
                                        <td>150.00</td>
                                      </tr>
                                      <tr>
  
                                      </tr>
                                    </table>
                                  
                                  </td>
                                </tr>
                                <td><h3>CONDICIONES COMERCIALES</h3>
                                <p >
                                  Ejecución del Servicio
El inicio del servicio estará dado por la recepción de la orden de compra o correo electrónico, haciendo referencia al número de 
cotización y la aceptación conforme de esta.
La documentación que acompaña a las muestras debe incluir claramente la identificación de las muestras, análisis requeridos en 
cada muestra, número de cotización asociado.
Los resultados emitidos en informes de ensayo corresponden a los análisis efectuados sobre la muestra proporcionada por el 
cliente, Andes Analytical Assay no se hace responsable por el muestreo y la toma de muestra.
Precios
Los precios ofertados en la cotización son valores netos y están expresados en dólares americanos, unidad de fomento (UF) o 
pesos chilenos. Los precios son netos, no incluyen IVA.
Forma de Pago
La facturación se realiza en moneda local (pesos chilenos) al tipo de cambio del día que se envíe el estado de pago, de no existir 
estado de pago, se enviara factura. El tipo de cambio considerado será de acuerdo con lo informado por el banco central.
Para clientes nuevos o que requieren servicios en forma puntual no habitual, se requiere pago previo.
Información, depósitos y transferencias.
Banco: Banco Chile
Nº cuenta: 5481406
Rut: 76.377.750-2.
Email: andes.assay@3aaa.cl
                                </p></td>
                                <tr>
                                </tr>
                              </table>
                            </div>
                      </td>
                    </tr>
                   
                </body>
            </table>
            <table class="footer-wrap">
                <tbody>
                <tr>
                    <td>
                    </td>
                    <td class="container">
                    <div class="content">
                        <table>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <span style="text-align: left"><a href="http://darwinlims.3aaa.cl">Andes Analitycal assay</a></span> 
                                    </td>
                                </tr>
                                <tr>
                                            
                                    <td align="center">
                                         <p>Este mail es generado de manera automática, por favor no responder.</p>
                                    </td>
                                 </tr
                            </tbody>
                        </table>
                    </div>
                    </td>
                    <td>
                    </td>
                </tr>
                </tbody>
            </table>
    </body>
    </html>
    `;
  } 

const EnvioPago = async (data)=>{
  
  
    return `<html xmlns="http://www.w3.org/1999/xhtml">
    <head><meta name="viewport" content="width=device-width,, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>3aaa</title>
    <link rel="stylesheet" type="text/css">
    <style>
    *{
      margin:0;
      padding:0;
      font-family:'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;
      font-size:100%;
      line-height:1.6
    }
    img{
      max-width:100%
    }
    
    body{
        text-align:justify;
        font-family:'Helvetica Neue','Helvetica',Helvetica,Arial,sans-serif;
        -webkit-font-smoothing:antialiased;
        -webkit-text-size-adjust:none;
        width:100%!important;
        height:100%
    }
    a{
      color:#348eda
    }
      
    .btn-primary{
        text-decoration:none;
        color:#FFF;
        background-color:#49da50;
        border:solid #49da50;
        border-width:10px 20px;
        line-height:2;
        font-weight:bold;
        margin-right:10px;
        text-align:center;
        cursor:pointer;
        display:inline-block;
        border-radius:25px
    }
        
    .btn-secondary{
        text-decoration:none;
        color:#FFF;
        background-color:orangered;
        border:solid orangered;
        border-width:10px 20px;
        line-height:2;
        font-weight:bold;
        margin-right:10px;
        text-align:center;
        cursor:pointer;
        display:inline-block;
        border-radius:25px
    }
    .last{
        margin-bottom:0
    }
    
    .first{
        margin-top:0
      }
    
    .padding{
        padding:10px 0
    }
    
    table.body-wrap{
        width:100%;
        padding:20px
    }
    
    table.body-wrap .container{
        border:1px solid #f0f0f0
    }
        
    table.footer-wrap{
        width:100%;
        clear:both!important
    }
    
    .footer-wrap .container p{
          font-size:12px;
          color:#666
        }
    table.footer-wrap a{
      color:#999
    }
    
    h1,h2,h3{
      font-family:'Helvetica Neue',Helvetica,Arial,'Lucida Grande',sans-serif;
      color:#000;
      margin:40px 0 10px;
      line-height:1.2;
      font-weight:200
    }
    
    h1{
      font-size:36px
    }
      
    h2{
      font-size:28px}
      
    h3{font-size:22px}
    
    .container{
      display:block!important;
      max-width:1600px!important;
      margin:0 auto!important;
      clear:both!important
    }
    
    .body-wrap .container{
      padding:5px
    }
      
    .content{
      max-width:1600px;
      display:block
    }
    .content table{
      width:100%
    }
    
    .circulo {
    width: 20px;
     height: 20px;
     background: #3582bd;
     border-radius: 50%;
    }
    .triangulo {
    width: 0;
                                                height: 0;
                                                border-top: 15px solid transparent;
                                                border-bottom: 15px solid transparent;
                                                border-left: 15px solid #42d7f1
    }
    p {
    font-size: 12px
    }
  
    
    </style>
    </head>
    <body bgcolor="#f6f6f6">
            <table class="body-wrap">
                <body>
                    <tr>
                      <td class="container" style="background:#FFFFFF;padding:15px;margin-top:15px;border-top:3px solid rgb(10, 10, 10);border-bottom:3px solid rgb(8, 8, 8);">
                            <div class="content">
                              <table>
                                  <tr>
                                    <td bgcolor="#000000"><img src="http://darwinlims.3aaa.cl/img/logo.png" width="150" alt=""></td>
                                  </tr>
                                  <tr>
                                        <td>
                                        <h4 style="text-align:left">Estimado  ${data} </h4>
                                        <p style="text-align:justify">Informamos a usted que hemos recibido su rendición de cuenta N° <b>${data}</b> con fecha <b>${data}</b> hrs. ${ data } , El proceso de su cuenta en el Servicio Electoral, seguirá de la siguiente forma:                                    </p> 
                                        <h3>ACEPTACIÓN DE OFERTA</h3>
                                        <table>
                                          <tr align="center">
                                            <td><button class="btn-secondary">Rechazo</button></td>
                                            <td><button class="btn-primary">ACEPTO   </button></td>
                                          </tr>
                                        </table>
                                      </td>

                                </tr>
                                <tr>
                                  <td>
                                    <h3>RESUMEN COMERCIAL</h3>
                                    <table style="border-collapse: collapse;border-spacing: 0;">
                                      <tr>
                                        <td>Nro</td>
                                        <td>Tipo</td>
                                        <td>Servicio</td>
                                        <td>Divisa</td>
                                        <td>Precio</td>
                                      </tr>
                                      <tr>
                                        <td>1</td>
                                        <td>Analisis</td>
                                        <td>2AA_AASE3 12</td>
                                        <td>U$</td>
                                        <td>150.00</td>
                                      </tr>
                                      <tr>
  
                                      </tr>
                                    </table>
                                  
                                  </td>
                                </tr>
                                <td><h3>CONDICIONES COMERCIALES</h3>
                                <p >
                                  Ejecución del Servicio
El inicio del servicio estará dado por la recepción de la orden de compra o correo electrónico, haciendo referencia al número de 
cotización y la aceptación conforme de esta.
La documentación que acompaña a las muestras debe incluir claramente la identificación de las muestras, análisis requeridos en 
cada muestra, número de cotización asociado.
Los resultados emitidos en informes de ensayo corresponden a los análisis efectuados sobre la muestra proporcionada por el 
cliente, Andes Analytical Assay no se hace responsable por el muestreo y la toma de muestra.
Precios
Los precios ofertados en la cotización son valores netos y están expresados en dólares americanos, unidad de fomento (UF) o 
pesos chilenos. Los precios son netos, no incluyen IVA.
Forma de Pago
La facturación se realiza en moneda local (pesos chilenos) al tipo de cambio del día que se envíe el estado de pago, de no existir 
estado de pago, se enviara factura. El tipo de cambio considerado será de acuerdo con lo informado por el banco central.
Para clientes nuevos o que requieren servicios en forma puntual no habitual, se requiere pago previo.
Información, depósitos y transferencias.
Banco: Banco Chile
Nº cuenta: 5481406
Rut: 76.377.750-2.
Email: andes.assay@3aaa.cl
                                </p></td>
                                <tr>
                                </tr>
                              </table>
                            </div>
                      </td>
                    </tr>
                   
                </body>
            </table>
            <table class="footer-wrap">
                <tbody>
                <tr>
                    <td>
                    </td>
                    <td class="container">
                    <div class="content">
                        <table>
                            <tbody>
                                <tr>
                                    <td align="center">
                                        <span style="text-align: left"><a href="http://darwinlims.3aaa.cl">Andes Analitycal assay</a></span> 
                                    </td>
                                </tr>
                                <tr>
                                            
                                    <td align="center">
                                         <p>Este mail es generado de manera automática, por favor no responder.</p>
                                    </td>
                                 </tr
                            </tbody>
                        </table>
                    </div>
                    </td>
                    <td>
                    </td>
                </tr>
                </tbody>
            </table>
    </body>
    </html>
    `;
  } 
  
  module.exports = {
    EnvioCotizacion,
    EnvioPago
  
  };