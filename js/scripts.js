let arrClientes = [];
window.addEventListener('DOMContentLoaded', event => {

    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {

        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
});
const renderClientes = (container)=>{
    container.innerHTML = "";
    getClientesFromStorage().forEach((value, index) => {
        container.innerHTML += '<div class="card" id="card_"'+index.toString()+' style="width: 21rem; margin: 0px 5px 5px 0px">\n' +
            '  <div class="card-body">\n' +
            '    <h5 class="card-title">Nombre:'+value.nombre.toString()+'</h5>\n' +
            '    <h6 class="card-subtitle mb-2 text-muted">'+value.identificacion.toString()+'</h6>\n' +
            '    <a onclick="depositar('+value.identificacion+')" href="#" class="card-link">Deposito</a>\n' +
            '    <a onclick="retirar('+value.identificacion+')" href="#" class="card-link">Retiro</a>\n' +
            '    <a onclick="consultarSaldo('+value.identificacion+')"  href="#" class="card-link">Saldo</a>\n' +
            '    <a onclick="borrarCliente('+value.identificacion+')" href="#" class="card-link">Eliminar</a>\n' +
            '  </div>\n' +
            '</div>';
    })
}

const renderListasCuentas = (cuentaOrigen, cuentaDestino)=>{

    let optionO = document.createElement("option");
    optionO.text = "Seleccione la cuenta origen";
    optionO.value = "";
    cuentaOrigen.add(optionO);

    let optionD = document.createElement("option");
    optionD.text = "Seleccione la cuenta destino";
    optionD.value = "";
    cuentaDestino.add(optionD);

    getClientesFromStorage().forEach((value, index) => {
        optionO = document.createElement("option");
        optionO.text = value.nombre;
        optionO.value = value.identificacion;
        cuentaOrigen.add(optionO);

        optionD = document.createElement("option");
        optionD.text = value.nombre;
        optionD.value = value.identificacion;
        cuentaDestino.add(optionD);

    })
}
const getClientesFromStorage = ()=>{
    arrClientes = [];
    let _clientes  = JSON.parse(localStorage.getItem("clientes")) || [];
    _clientes.forEach(value => {
        arrClientes.push(new Customer(value.identificacion, value.nombre, value.balance));
    });
    return arrClientes;
}
const setClientesToStorage = ()=>{
    localStorage.setItem('clientes',JSON.stringify(arrClientes));
}
const validateCliente = (nombre, identificacion, balance)=>{
    if(!identificacion || !nombre || !balance){
        return false;
    }else{
        if(parseFloat(balance)>=0){
        return true;
        }else{
            return false;
        }
    }
}
const validateTransfer = (valorTransferencia, identificacionOrigen, identificacionDestino)=>{
    if(!valorTransferencia || !identificacionOrigen || !identificacionDestino){
        return false;
    }else{
        if(parseFloat(identificacionDestino)>=0){
            return true;
        }else{
            return false;
        }
    }
}
const existeCliente = (identificacion)=>{
    return  getClientesFromStorage().find((value, index) => {
        return value.identificacion == identificacion
    }) ? true:false;
}
const saveCliente=(nombre, identificacion, balance)=>{
    if(validateCliente(nombre, identificacion, balance)) {
        if(existeCliente(identificacion)){
            sweetAlert("Oops...", "El cliente ya existe", "error");
        }else {
            const _cliente = new Customer(identificacion, nombre, parseFloat(balance));
            arrClientes.push(_cliente);
            setClientesToStorage();
            swal("Cliente agregado correctamente!")
                .then((value) => {
                    location.reload();
                });
        }

    }else{
            sweetAlert("Oops...", "Digita todos los datos", "error");
    }
}
const transferir=(valorTransferencia, identificacionOrigen, identificacionDestino)=> {
    if (validateTransfer(valorTransferencia, identificacionOrigen, identificacionDestino)) {
        if(identificacionOrigen == identificacionDestino){
            sweetAlert("Oops...", "Cuenta origen y destino es la misma", "error");
        }else{
            const _cuentaOrigen = arrClientes.filter(value => {return value.identificacion == identificacionOrigen})[0];
            const _cuentaDestino = arrClientes.filter(value => {return value.identificacion == identificacionDestino})[0];

            if(_cuentaOrigen.getBalance() < parseFloat(valorTransferencia)){
                sweetAlert("Oops...", "Fondos insuficientes", "error");
            }else{
                _cuentaOrigen.withdraw(parseFloat(valorTransferencia));
                _cuentaDestino.addBalance(parseFloat(valorTransferencia));
                setClientesToStorage();
                swal("Transferencia realizada correctamente!")
                    .then((value) => {
                        location.reload();
                    });
            }
        }
    }else{
        sweetAlert("Oops...", "Digita todos los datos", "error");
    }
}
const borrarCliente = (identificacion)=>{
    swal({
        title: "¿Está seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                arrClientes = arrClientes.filter(value => {return value.identificacion != identificacion});
                setClientesToStorage();
                location.reload();
            }
        });


}
const consultarSaldo = (identificacion)=>{
    const _cliente = arrClientes.filter(value => {return value.identificacion == identificacion})[0];
    if(_cliente)
        swal(_cliente.nombre + " tu saldo actual es: " + _cliente.getBalance() );
}
const depositar = (identificacion)=>{
    const _cliente = arrClientes.filter(value => {return value.identificacion == identificacion})[0];
    if(_cliente) {
        swal({
            content: {
                element: "input",
                attributes: {
                    placeholder: "Valor del depósito",
                    type: "number"
                },
            },
        }).then(value =>  {
            if(parseFloat(value) > 0) {
                _cliente.addBalance(parseFloat(value));
                setClientesToStorage();
                swal("Dinero depositado correctamente!")
                    .then((value) => {
                        location.reload();
                    });
            }else{
                swal("Digita un cantidad mayor o igual a 0")
                    .then((value) => {
                        location.reload();
                    });
            }
        });


    }


}
const retirar = (identificacion)=>{
    const _cliente = arrClientes.filter(value => {return value.identificacion == identificacion})[0];
    if(_cliente) {
        swal({
            content: {
                element: "input",
                attributes: {
                    placeholder: "Valor del retiro",
                    type: "number"
                },
            },
        }).then(value =>  {
            if(parseFloat(value) > 0) {
                const _fondosInsuficientes = _cliente.getBalance() >= parseFloat(value) ? false : true;
                if(!_fondosInsuficientes){
                    _cliente.withdraw(parseFloat(value));
                    setClientesToStorage();
                    swal("Dinero retirado correctamente!")
                        .then((value) => {
                            location.reload();
                        });
                }else{
                    swal("Fondos insuficientes")
                        .then((value) => {
                            location.reload();
                        });
                }
            }else{
                swal("Digita un cantidad mayor o igual a 0")
                    .then((value) => {
                        location.reload();
                    });
            }
        });


    }


}
