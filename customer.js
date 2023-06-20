/**
 * clase que representa un cliente de atm-app *
 * metodos de constructor, consulta, retiro, deposito y trasnferencia
 * **/
class Customer {
    constructor(identificacion = '', nombre='', balance=0){
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.balance = balance;
    }
    getBalance(){
        return this.balance;
    }

    withdraw(Amount){
        this.balance -= balance;
    }

    addBalance(Amount){
        this.balance +=balance;
    }
    transfer(customerRef1, amount){
        customerRef1.addBalance(amount);
        this.withdraw(amount);
    }

}