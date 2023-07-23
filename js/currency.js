/**
 * clase que representa las diferentes monedas existentes en el mercado y el factor de conversion de
 * COP (colombian pesos) a las diferentes monedas.
 * **/
class Currency {
    constructor(code = '', nombre='', factor=0){
        this.code = code;
        this.nombre = nombre;
        this.factor = factor;
    }
    getfactor(){
        return this.factor;
    }

    convert(Amount){
        return this.factor * Amount;
    }

    getName(){
        return this.nombre;
    }

    getCode(){
        return this.code;
    }
}