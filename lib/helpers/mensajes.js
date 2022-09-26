const messages = {
    'required': 'El campo {{ field }}  es requerido',
    'number': '{{ field }}  tiene que ser numero',
    'min': 'El campo {{ field }} no cumple con el minimo de caracteres',
    'password.required': 'La contraseña es requerida',
    //aportes
    'regex': 'Campo {{ field }} no cumple con el formato correcto (max 15 enteros + 4 decimales obligatorios)',
    'max': 'El campo {{ field }} no cumple con el máximo de caracteres',
    'fechaeleccion': 'Formato invalido de fecha para campo {{ field }}',
    'fechaaporte': 'Formato invalido de fecha para campo {{ field }}',
    'integer': 'El campo {{ field }} debe ser número',
    'dateFormat' : 'Formato NO valido para fecha para campo {{ field }}, utilizar YYYYMMDD',
    'required_if': 'idPartido o idCandidato debe tener dato',
    'required_without_all':'necesita los dos campos',
    'array':'Debe ser  arreglo Valido',
    'object':'Debe ser un objeto',
    'date': 'Formato de fecha NO valido para el campo {{ field }}',
   }


export default messages;
