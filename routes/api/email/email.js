import { Router } from 'express' 
import HelperEmail  from './../../../lib/helpers/email_helper'

 

class Email{

    constructor()
    {
        const api = Router()

        api.post('/send', this.send)
        
        return api
    }

    async send(req, res) 
    {
        const cm = new HelperEmail()  
        try {
            await cm.sendQuotation({correo: 'dcarrascocid@gmail.com'})   
            console.log('enviado')
            res.status(200).json({ok: true})
         } catch (error) {
            console.error('Error: ', error)
            res.status(200).json({ok: false})
        }

        console.log('paso todo')

    } 

}
export default Email;