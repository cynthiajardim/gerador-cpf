import {describe, it, expect} from 'vitest'
import { gerarDigitoVerificador, validarCpf, gerarCPF } from '../src/index.js'

describe(gerarDigitoVerificador.name, () => {
    it('Lança exceção caso o cpf não seja string', () => {
        expect(() => {
            gerarDigitoVerificador(/008987654/)
        }).toThrow
    })

    it('Lança exceção caso a string não contenha nove dígitos numéricos', () => {
        expect(() => {
            gerarDigitoVerificador('9876543211')
        }).toThrow
    })

    it('Lança exceção caso digitos não sejam numéricos', () => {
        expect(() => {
            gerarDigitoVerificador('90867876a')
        }).toThrow
    })

    it('Gera os digitos verificadores corretamente', () => {
        expect(gerarDigitoVerificador('062910040')).toBe('38')
    })
})

describe(validarCpf.name, () => {
    it('Lança exceção caso CPF seja inválido', () => {
        expect(() => {
            validarCpf('18761317722')
        }).toThrow
    })
})

describe(gerarCPF.name, () => {
    it('Gera um CPF corretamente', () => {
        const resultado = validarCpf(gerarCPF())
        expect(resultado).toBeTruthy()
    })
})