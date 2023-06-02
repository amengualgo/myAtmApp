/***
 * Variables globales
 * ***/
let balance = 0;
const minOption = 1, maxOption = 5;
let labelSelectedOption = '';
const monthlyRate = 2.06;
const labelOpc1 = 'Consultade saldo', labelOpc2= 'Hacer un depósito', labelOpc3 = 'Realizar un retiro',
    labelOpc4='Calcular cuotas mensuales de un préstamo.', labelOpcSalir = "Salir"

/***
 * Presenta al usuario el menu principal con las opciones, valida que la opción seleccionada exista, si no muestra un
 * mensaje informado opcion incorrecta y muestra el menú nuevamente.
 * ***/
const mainMenu = () => {
    let selectedOption = 0;
    let amountEntered = 0;
    let monthsEntered = 0;
    do {
        selectedOption = prompt(
            'Menú principal\n\t'+
            '1. '+ labelOpc1 + '\n\t'+
            '2. '+ labelOpc2 + '\n\t'+
            '3. '+ labelOpc3 + '\n\t'+
            '4. '+ labelOpc4 + '\n\t'+
            '5. '+ labelOpcSalir
        );
    }while (!isValidOption(selectedOption));
    //Se valida la opcion y se realiza la operacion requerida por el cliente
    switch (selectedOption) {
        case '1' :
            labelSelectedOption = labelOpc1;
            showBalance();
            mainMenu();
            break;

        case '2' :
            labelSelectedOption = labelOpc2;
            amountEntered = getAmount();
            depositMoney(amountEntered)
            mainMenu();
            break;

        case '3' :
            labelSelectedOption = labelOpc3;
            amountEntered = getAmount();
            if(amountEntered > 0)
                withdrawMoney(amountEntered)
            mainMenu();
            break;

        case '4' :
            labelSelectedOption = labelOpc4;
            amountEntered = parseInt(getAmount());
            if(amountEntered > 0)
                monthsEntered = parseInt(getNumberMonths());

            if(amountEntered > 0 && monthsEntered > 0){
                loanSimulator(amountEntered,monthsEntered);
            }

            mainMenu();
            break;


        default:
            break;
    }
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
const showBalance = () =>{
    alert(labelSelectedOption+'\n\tSu saldo a la fecha es: ' + balance);
}
/***
 * Recibe el monto a depositar y lo suma al saldo actual del cliente
 * ***/
const depositMoney = (Amount) => {
    balance = parseInt(balance) + parseInt(Amount);
    alert(labelSelectedOption+'\n\tDepósito realizado correctamente.');
}
/***
 * Recibe el monto a retirar, si hay suficiente saldo lo resta, si no muestra un mensaje de fondos insuficientes.
 * ****/
const withdrawMoney = (Amount) => {
    if(parseInt(balance) < parseInt(Amount)){
        alert(labelSelectedOption+'\n\tFondos insificientes.');
    }else {
        balance = parseInt(balance) - parseInt(Amount);
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

/***
 * Inicia la aplicacion del cajero automatico
 * ***/
mainMenu();