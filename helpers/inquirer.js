const inquirer = require("inquirer");
require("colors");

const questions = [
    {
        type:"list",
        name:"options",
        message:"Que desea hacer?",
        choices:[
            {
                value:1,
                name:"1.-Buscar."
            },
            {
                value:2,
                name:"2.-Historial"
            },
            {
                value:3,
                name:"3.-Salir."
            },]
    }
];

const inquirerMenu = async()=>{
    console.clear();
    console.log("=====================".green);
    console.log("Seleccione una opcion".white);
    console.log("=====================".green);
    const {options} = await inquirer.prompt(questions);
    return options;
}

const inquirerPausa = async()=>{
    const pausa = await inquirer.prompt([{type:"input", name:"pausa", message:`Presione ${'ENTER'.green} para continuar.`}]);
    return pausa;
}

const inquirerInput = async(message)=>{
    const {desc} = await inquirer.prompt([{type:"input", name:"desc", message}]);
    return desc;
}

const inquirerSelecionarCiudad = async (ciudades=[])=>{
    let choices = ciudades.map(ciudad=>{
        return {
            value: ciudad.id,
            name: ciudad.name,
        }
    })

    let questions = [
        {
            type:"list",
            name:"id",
            message:"Elije tu ciudad:",
            choices,
        }
    ]

    let {id} = await inquirer.prompt(questions);
    return id;


}

const inquirerCompletar = async (tareas=[])=>{
    let choices = tareas.map(tarea=>{
        return {
            value: tarea.id,
            name: tarea.desc,
            checked: (tarea.completado) ? true : false,
        }
    })

    let questions = [
        {
            type:"checkbox",
            name:"ids",
            message:"Confirmar",
            choices,
        }
    ]

    let {ids} = await inquirer.prompt(questions);
    return ids;


}

const confirmarBorrado =async ()=>{
    let choices = [
        {
            type:"confirm",
            name:"confirmar",
            message:"Esta seguro",
        }
    ]

    const {confirmar} = await inquirer.prompt(choices);
    return confirmar;
}

module.exports = {inquirerMenu, 
                    inquirerPausa, 
                    inquirerInput, 
                    inquirerSelecionarCiudad, 
                    confirmarBorrado, 
                    inquirerCompletar
                };