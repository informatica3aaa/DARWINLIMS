const moment = require('moment')
const nodemailer = require('nodemailer')
import { EnvioCotizacion } from '../themplates/correos/EnvioCotizacion'

const EMAIL_NO_REPLY = 'lims.3aaa@gmail.com'

class EmailHelper {

    constructor() 
    {
        if(!process.env.CORREO_USER) throw { message: 'Falta el variable de entorno CORREO_USER '}
        if(!process.env.CORREO_PASS) throw { message: 'Falta el variable de entorno CORREO_PASS '}
        if(!process.env.CORREO_HOST) throw { message: 'Falta el variable de entorno CORREO_HOST '}
        if(!process.env.CORREO_PORT) throw { message: 'Falta el variable de entorno CORREO_PORT '}

        this.transporter = nodemailer.createTransport({
           // host: process.env.CORREO_HOST,
           // port: process.env.CORREO_PORT,

            service: 'gmail',
            auth: {
                //user: process.env.CORREO_USER, // generated ethereal user
                user: '3ldago@gmail.com', // generated ethereal user
                //pass: process.env.CORREO_PASS // generated ethereal password
                pass: 'whgdpawhauhnjdzg' // generated ethereal password
            }
    
        });
    } 

    async  sendQuotation(value){
        console.log('lo que llega al correo', value)
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.correo) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Notificación del Servicio Electoral de Chile'
            const mail_to = `"${ value.correo }" <${ value.correo }>`
            const mail_from = `"" <${EMAIL_NO_REPLY}>`
            const mail_bcc = value.mail_bcc_array || []


 
            const content = await EnvioCotizacion('EMPRESA CONSTRUCTORA')


            trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                
                if (mail_error) 
                { 
                    const msg = `[${send_time}][ERROR] No se puede enviar correo a usuario "${value.correo}"`
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                
                
                const msg = `[${send_time}][SUCCESS] Correo a "${value.correo} " enviado`
                console.info(msg);
                return resolve(msg)
            })  
        })
    } 
    
    async nuevaCotizacion(){}
}

export default EmailHelper