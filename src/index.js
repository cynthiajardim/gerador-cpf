const DIGITOS_SEM_VERIFICADOR = 9
const DIGITOS_COM_VERIFICADOR = 11;

export function gerarDigitoVerificador(cpf){
    checarCPF(cpf, DIGITOS_SEM_VERIFICADOR)    
    //Passo 1 (gerando o primeiro dígito verificador): 
    let soma = 0
    for(let i = 0; i < DIGITOS_SEM_VERIFICADOR; i++){
        soma += Number(cpf[i]) * (10 - i)
    }
    let dv1 = soma % 11
    dv1 = dv1 < 2 ? 0 : (11 - dv1)

    //PASSO 2 (gerando o segundo dígito verificador): 
    cpf += dv1.toString()
    soma = 0
    for(let i = 0; i < DIGITOS_SEM_VERIFICADOR + 1; i++){
        soma += Number(cpf[i]) * (11 - i)
    }
    let dv2 = soma % 11
    dv2 = dv2 < 2 ? 0 : (11 - dv2)

    return dv1.toString() + dv2.toString()
}   


function checarCPF(cpf, DIGITOS){
    if(typeof cpf !== 'string')
        throw new Error('O CPF deve ser uma string.')

    if(cpf.length !== DIGITOS)
        throw new Error(`O CPF deve ter ${DIGITOS} dígitos.`)

    if(! /^[0-9]+$/.test(cpf))
        throw new Error('O CPF deve conter apenas caracteres numéricos.')
}

export function validarCpf(cpf){
    const stringCpf = cpf.toString()
    checarCPF(stringCpf, DIGITOS_COM_VERIFICADOR)

    let cpfSemDigitos = stringCpf.substring(0, 9)
    let digitosCpfs = stringCpf.substring((stringCpf.length - 2))

    let digitos = gerarDigitoVerificador(cpfSemDigitos)

    if(digitos !== digitosCpfs)
        throw new Error("CPF inválido!")

    return true
}

export function gerarCPF(){
    let sequencia = Math.floor(Math.random() * 1000000000).toFixed(0).padStart(9, '0');
    let digitos = gerarDigitoVerificador(sequencia)
    let cpf = sequencia.toString() + digitos.toString()

    return cpf
}