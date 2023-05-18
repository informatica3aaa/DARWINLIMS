
const EnvioCotizacion = async (data, link)=>{
  
  var tableCotizacion =''
  var total=0
  var url = process.env.AMBIENTE
  // console.log("ulr", url);
  for(let index = 0; index < data.analisis_asociado.length; index++){
      tableCotizacion+= `<tr>
                          <td>${index+1}</td>
                          <td>${data.analisis_asociado[index].tipo}</td> 
                          <td>${data.analisis_asociado[index].assay_name}</td> 
                          <td>${data.currency_name}</td> 
                          <td>${data.analisis_asociado[index].price}</td> 
                          </tr>`
      total = total + Number(data.analisis_asociado[index].price)
                        }

 
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
                                        <p style="text-align:justify">Informamos que se ha generado una cotizacion con fecha <b>${data.created} hrs.</b> a la compañia <b>${data.company_name}</b> que corresponde a la cotizacion Nro ${ data.quotation_number }, para el siguiente paso seleccine la opción </p> 
                                        <h3>ACEPTACIÓN DE OFERTA</h3>
                                        <table>
                                          <tr align="center">
                                            <td>  <a href="${url}/quotations/confirmacion/2/${link}"><button class="btn-secondary">Rechazo</button>  </a> </td>
                                            <td>  <a href="${url}/quotations/confirmacion/3/${link}"><button class="btn-primary">ACEPTO   </button> </a></td>
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
                                      ${ tableCotizacion }
                                      <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>Total</td>
                                      <td>${total}</td>
                                    </tr>
                                     </table>
                                  
                                  </td>
                                </tr>
                                <tr>
                                <td><h3>CONDICIONES COMERCIALES</h3></td>
                                </tr>
                                <tr>
                                <td>${ data.condiciones_especificas[0].paragraph_2} </td>
                                </tr>
                                <tr>
                                <td>${ data.condiciones_especificas[0].paragraph_1} </td>
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

const PagoPrevio = async (data, link)=>{
  var tableCotizacion =''
  var total=0
  var url = process.env.AMBIENTE
  // console.log("ulr", url);
  for(let index = 0; index < data.analisis_asociado.length; index++){
      tableCotizacion+= `<tr>
                          <td>${index+1}</td>
                          <td>${data.analisis_asociado[index].tipo}</td> 
                          <td>${data.analisis_asociado[index].assay_name}</td> 
                          <td>${data.currency_name}</td> 
                          <td>${data.analisis_asociado[index].price}</td> 
                          </tr>`
      total = total + Number(data.analisis_asociado[index].price)
                        }

  
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

    .btn-pago{
      text-decoration:none;
      color:#FFF;
      background-color:gray;
      border:solid gray;
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
                                        <p style="text-align:justify">Informamos que se ha generado el link de pago previo de la cotizacion con fecha <b>${data.created} hrs.</b> a la compañia <b>${data.company_name}</b> que corresponde a la cotizacion Nro ${ data.quotation_number }, para el siguiente paso seleccine la opción </p> 
                                        <h3>ACEPTACIÓN DE OFERTA</h3>
                                        <table>
                                          <tr align="center">
                                          <td> <a href="${url}/quotations/pago_previo/${link}"><button class="btn-pago">Boton de pago previo</button></td>
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
                                    ${ tableCotizacion }
                                    <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Total</td>
                                    <td>${total}</td>
                                  </tr>
                                   </table>
                                  
                                  </td>
                                </tr>
                                <td><h3>CONDICIONES COMERCIALES</h3></td>
                                </tr>
                                <tr>
                                <td>${ data.condiciones_especificas[0].paragraph_2} </td>
                                </tr>
                                <tr>
                                <td>${ data.condiciones_especificas[0].paragraph_1} </td>
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

const RechazoOferta = async (data, link)=>{
    var tableCotizacion =''
    var total=0
    var url = process.env.AMBIENTE
    // console.log("ulr", url);
    for(let index = 0; index < data.analisis_asociado.length; index++){
        tableCotizacion+= `<tr>
                            <td>${index+1}</td>
                            <td>${data.analisis_asociado[index].tipo}</td> 
                            <td>${data.analisis_asociado[index].assay_name}</td> 
                            <td>${data.currency_name}</td> 
                            <td>${data.analisis_asociado[index].price}</td> 
                            </tr>`
        total = total + Number(data.analisis_asociado[index].price)
                          }
  
    
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
  
      .btn-pago{
        text-decoration:none;
        color:#FFF;
        background-color:gray;
        border:solid gray;
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
                                          <p style="text-align:justify">Informamos que se ha rechado la oferta a la cotizacion con fecha <b>${data.created} hrs.</b> a la compañia <b>${data.company_name}</b> que corresponde a la cotizacion Nro ${ data.quotation_number }, para el siguiente paso seleccine la opción </p> 
                                          <h3>ACEPTACIÓN DE OFERTA</h3>
                                          <table>
                                            <tr align="center">
                                            <td><h1 class="btn-secondary"> La oferta ha sido rechazda por parte del cliente</h1></td>
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
                                      ${ tableCotizacion }
                                      <tr>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td>Total</td>
                                      <td>${total}</td>
                                    </tr>
                                     </table>
                                    
                                    </td>
                                  </tr>
                                  <td><h3>CONDICIONES COMERCIALES</h3></td>
                                  </tr>
                                  <tr>
                                  <td>${ data.condiciones_especificas[0].paragraph_2} </td>
                                  </tr>
                                  <tr>
                                  <td>${ data.condiciones_especificas[0].paragraph_1} </td>
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
    PagoPrevio,
    RechazoOferta
  
  };