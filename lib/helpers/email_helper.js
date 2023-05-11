const moment = require('moment')
const nodemailer = require('nodemailer')
import { EnvioCotizacion } from '../themplates/correos/EnvioCotizacion'
import * as CoreNotificaciones from '../../routes/api/notificaciones/core-notificaciones';

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

    async  sendQuotation(value, token, notif){
        // console.log('lo que llega al correo', value)
        const trasporter = this.transporter 
        return new Promise(async function (resolve, reject)
        { 
            if(!value.destinatario[0].mail) return  reject( { message: 'Falta definir : correo'})   

            const mail_subject = 'Confirmación de Cotización Andes Analytical Assay'
            const mail_to = `${ value.destinatario[0].mail}`
            const mail_from = `noreply@3aaa.cl`
            // const mail_bcc = value.mail_bcc_array || []
            const content = await EnvioCotizacion(value, token)

           trasporter.sendMail({ 
                from: mail_from, 
                to: mail_to, 
                // bcc: mail_bcc, 
                subject: mail_subject, 
                html: content
            }, 
            function (mail_error, info) 
            { 
                const send_time = moment().format('YYYY-MM-DD HH:mm:ss')
                if (mail_error) 
                { 
                    const msg_1 = `No se puede enviar correo a usuario, ${mail_error} `
                    const log_1 = CoreNotificaciones.actulizarEstado(notif.id, 'FALLIDO', msg_1)
                    console.error(msg, mail_error)
                    return reject(msg, mail_error) 
                } 
                const msg_2 = `Notificacion de cotizacion:  ${JSON.stringify(info)} `
                const log_2 = CoreNotificaciones.actulizarEstado(notif.id, 'ENVIADO', msg_2)
                // console.log("log_2",log_2);
                console.info(msg_2);
                return resolve(msg_2)
            })  
        })
    } 
    
    async nuevaCotizacion(){}
}

export default EmailHelper