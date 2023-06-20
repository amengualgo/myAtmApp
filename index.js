/***
 * Variables globales
 ****/

const customerArr = [];

const ref1 = new Customer(), ref2 = new Customer();

let balance = 0;
const minOption = 1, maxOption = 8;
let labelSelectedOption = '';
const monthlyRate = 2.06;
const labelOpc1 = 'Consulta de saldo', labelOpc2= 'Hacer un depósito', labelOpc3 = 'Realizar un retiro',
    labelOpc4='Calcular cuotas mensuales de un préstamo.', labelOpcSalir = "Salir", labelOpc6 = 'Agregar cliente'
    labelOpc5 = 'Transferencia', labelOpc7 = "Buscar cliente";

/***
 * Presenta al usuario el menu principal con las opciones, valida que la opción seleccionada exista, si no muestra un
 * mensaje informado opcion incorrecta y muestra el menú nuevamente.
 * ***/
const mainMenu = () => {
    let selectedOption = 0;
    let amountEntered = 0;
    let monthsEntered = 0;
    let selectedCustomer = {};
    let selectedCustomer2 = {};

        do {
            selectedOption = prompt(
                'Menú principal\n\t' +
                '1. ' + labelOpc1 + '\n\t' +
                '2. ' + labelOpc2 + '\n\t' +
                '3. ' + labelOpc3 + '\n\t' +
                '4. ' + labelOpc4 + '\n\t' +
                '5. ' + labelOpc5 + '\n\t' +
                '6. ' + labelOpc6 + '\n\t' +
                '7. ' + labelOpc7+ '\n\t' +
                '8. ' + labelOpcSalir + '\n\t'
            );
        } while (!isValidOption(selectedOption));

        switch (selectedOption) {
            case '1' :
                labelSelectedOption = labelOpc1;
                if(customerArr.length >0) {
                    do {
                        selectedCustomer = prompt(customerMenu());
                    } while (selectedCustomer-1 < 0 && selectedCustomer-1 > customerArr.length );
                    if(selectedCustomer-1 >= 0 && selectedCustomer-1 <= customerArr.length-1 )
                        showBalance(customerArr[selectedCustomer-1]);
                }
                else
                    alert("No hay clientes creados en el sistema. Por favor cree un cliente y vuelva a intentarlo.")
                mainMenu();
                break;

            case '2' :
                labelSelectedOption = labelOpc2;
                if(customerArr.length>0) {
                    do {
                        selectedCustomer = prompt(customerMenu());
                    } while (selectedCustomer-1 < 0 && selectedCustomer-1 > customerArr.length );
                    if(selectedCustomer-1 >= 0 && selectedCustomer-1 <= customerArr.length-1 ) {
                        amountEntered = getAmount();

                        if(amountEntered)
                        depositMoney(customerArr[selectedCustomer - 1], amountEntered);
                    }
                }
                else
                    alert("No hay clientes creados en el sistema. Por favor cree un cliente y vuelva a intentarlo.");

                mainMenu();
                break;

            case '3' :
                labelSelectedOption = labelOpc3;
                if(customerArr.length >0) {
                    do {
                        selectedCustomer = prompt(customerMenu());
                    } while (selectedCustomer-1 < 0 && selectedCustomer-1 > customerArr.length );
                    if(selectedCustomer-1 >= 0 && selectedCustomer-1 <= customerArr.length-1 ){
                        amountEntered = getAmount();
                        if (amountEntered > 0)
                            withdrawMoney(customerArr[selectedCustomer - 1], amountEntered)
                    }
                }else
                    alert("No hay clientes creados en el sistema. Por favor cree un cliente y vuelva a intentarlo.")

                mainMenu();
                break;

            case '4' :
                labelSelectedOption = labelOpc4;

                amountEntered = parseInt(getAmount());
                if (amountEntered > 0)
                    monthsEntered = parseInt(getNumberMonths());

                if (amountEntered > 0 && monthsEntered > 0) {
                    loanSimulator(amountEntered, monthsEntered);
                }
                mainMenu();
                break;

            case '5' :
                labelSelectedOption = labelOpc5;
                if(customerArr.length >1){

                    do {
                        selectedCustomer = prompt(customerMenu());
                    } while (selectedCustomer-1 < 0 && selectedCustomer-1 > customerArr.length );

                    do {
                        selectedCustomer2 = prompt(customerMenu());
                    } while (selectedCustomer2-1 < 0 && selectedCustomer2-1 > customerArr.length );

                    if(selectedCustomer && selectedCustomer2) {

                        if(selectedCustomer != selectedCustomer2){
                            if ((selectedCustomer - 1 >= 0 && selectedCustomer - 1 <= customerArr.length - 1)&&
                                (selectedCustomer2 - 1 >= 0 && selectedCustomer2 - 1 <= customerArr.length - 1)) {
                                amountEntered = getAmount();
                                if (amountEntered > 0) {
                                    transferMoney(customerArr[selectedCustomer-1], customerArr[selectedCustomer2-1], amountEntered);
                                }
                            }
                        }else {
                                alert("Cliente origen y destino es el mismo.")
                        }

                    }

                }else
                    alert("Para hacer transferencias deben existir por lo menos 2 clientes registrados en el sistema.");
                mainMenu();
                break;

            case '6' :
                labelSelectedOption = labelOpc6;
                addCustomer();
                mainMenu();
                break;

            case '7' :
                labelSelectedOption = labelOpc7;
                if(customerArr.length > 0) {
                    debugger
                    let findUser = prompt("Digita una identificacion o un nombre");

                    let encontrado = customerArr.find((value, index, obj) => {
                       return value.identificacion.includes(findUser) || value.nombre.includes(findUser);
                    });

                    if(encontrado){
                        alert("Usuario encontrado: " + encontrado.nombre + " identificacion: " + encontrado.identificacion);
                    }else {
                        alert('No se encontró  un usario con la información proporcionada.');
                    }

                }else{
                    alert("Para hacer busquedas debe existir al menos un clietne registrado.")
                }
                mainMenu();
                break;

            default:
                break;
        }
}
/*
* presenta una lista de todos los clientes creados pra elegir uno de ellos y realizar operaciones
* */
const customerMenu = (selectedOption) => {
    let customer_list = "Elija un cliente de la lista de usuarios\n\t";
    customerArr.forEach((customer, index) => {
        customer_list += (index + 1).toString()+'. ' + customer.nombre + '\n\t';
    })
    return customer_list;
}

/**
 * Solicita los datos para crear un  clietne y si son vaálidos, entonces crea un objeto tipo Customer y lo agrega
 * al arreglo customerArr.
 * ***/
const addCustomer = () =>{
    let newCustomer = new Customer();

    newCustomer.nombre = prompt("Nombre completo");
    if(newCustomer.nombre)
        newCustomer.identificacion = prompt("Identificación");
    if(newCustomer.identificacion)
        newCustomer.balance = parseFloat(prompt("Saldo inicial"));

    if(newCustomer.identificacion && newCustomer.nombre && newCustomer.balance) {
        customerArr.push(newCustomer);
        alert("Cliente: "+newCustomer.nombre+" agregado correctamente al sistema.");
    }
    else
        alert("Operación cancelada por el usuario o los datos ingresados no son válidos.");
}

/**
 * Valida la opcion seleccionadá por el usario y muestra un mensaje si es una opcion errada;
 * ***/
const isValidOption = (SelectedOption) => {
    const numberSelectedOption = parseInt(SelectedOption);
    const isvalid = (SelectedOption == null) || (numberSelectedOption >= minOption && numberSelectedOption <= maxOption)
    if(!isvalid)
        alert('Opción incorrecta. Por favor intenta de nuevo.');
    return isvalid;
}
/***
 * Muestra al usuario el saldo total acumulado
 * ***/
const showBalance = (customer) =>{
    alert(labelSelectedOption+'\n\tSu saldo a la fecha es: ' + customer.getBalance());
}
/***
 * Recibe el monto a depositar y lo suma al saldo actual del cliente
 * ***/
const depositMoney = (customer, Amount) => {
    customer.addBalance(parseFloat(Amount));
    alert(labelSelectedOption+'\n\tDepósito realizado correctamente.');
}
/***
 * Recibe el monto a retirar, si hay suficiente saldo lo resta, si no muestra un mensaje de fondos insuficientes.
 * ****/
const withdrawMoney = (customer, Amount) => {
    if(parseInt(customer.getBalance()) < parseInt(Amount)){
        alert(labelSelectedOption+'\n\tFondos insificientes.');
    }else {
        customer.withdraw(parseInt(Amount));
        alert(labelSelectedOption+'\n\tRetiro realizado correctamente.');
    }
}
/***
 * Valida que le monto ingesado sea válido, si no, muestra un error.
 * ***/
const validateAmount = (Amount) => {
    const validatedAmount = parseInt(Amount);
    const isValid = validatedAmount > 0 || Amount == null;
    if(!isValid)
        alert(labelSelectedOption+'\n\tEl monto ingresado es incorrecto. Por favor intenta de nuevo.');
    return isValid
}
/***
 * Solicita al usuario un monto, valido si es correcto, si no muestra un error y vuelve a solictar el monto
 * ****/
const getAmount = () =>{
    let amount = 0;
    do {
        amount = prompt(
            labelSelectedOption+'\n\tDigita el monto:'
        );
    }while (!validateAmount(amount));
    return amount;
}

/***
 * Valida que la cantidad de meses no sea mayor a 36, si no muestra un error.
 * ***/
const validateMonths = (Months) => {
    console.log(Months);
    const validatedMonths= parseInt(Months);
    const isValid = (validatedMonths > 0 && validatedMonths <= 36) || (Months == null);
    if(!isValid)
        alert(labelSelectedOption+'\n\tLa cantidad de meses debe ser entre 1  y 36. Por favor intenta de nuevo.');

    return Months
}
/**
 * valida la cantidad ed meses del prestamo  maximo 36 meses
 * ****/
const getNumberMonths = () =>{
    let months = 0;
    do {
        months = prompt(
            labelSelectedOption+'\n\tDigíta la cantidad de meses para pagar el préstamo:'
        );
    }while (validateMonths(months)<0);
    return months;
}

/***
 * Simula la cuota a pgar en cada mes, solicita el monto y la cantidad de meses. La tasa de interes esta dada por una
 * variable global.
 * ***/
const loanSimulator = (Amount, NumberMonts) =>{
    let messageByMonth = "";
    const amountByMonth = ((Amount/NumberMonts)*(1+(monthlyRate/100))).toFixed(2);
    for (let i = 1; i <= NumberMonts; i++) {
        messageByMonth = messageByMonth + "La cuota para el mes # " + i + ' es de ' + amountByMonth+'\n\t';
    }
    alert(labelSelectedOption+'\n\tA continuación las coutas a pagar en cada mes:\n\t'+messageByMonth+' \n\tLa tasa de interes es de: '+ monthlyRate);
}

/*
* Trasnferir dinero de una cliente a otro
* **/

const transferMoney = (customer1,customer2, Amount) => {

    if(parseInt(customer1.getBalance()) < parseInt(Amount)){
        alert(labelSelectedOption+'\n\tFondos insificientes.');
    }else {
        customer1.withdraw(parseInt(Amount));
        customer2.addBalance(parseInt(Amount));
        alert(labelSelectedOption+'\n\tTransferencia realizada correctamente.');
    }
}

/***
 * Inicia la aplicacion del cajero automatico
 * ***/
mainMenu();