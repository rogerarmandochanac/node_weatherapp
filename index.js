require("dotenv").config();
const { inquirerInput, inquirerMenu, inquirerPausa, inquirerSelecionarCiudad } = require("./helpers/inquirer")
const { Busqueda } = require("./models/busqueda")

const main = async()=>{
    let opcion = undefined
    let busqueda = new Busqueda();
    busqueda.loadDatabase();
    do{
        opcion = await inquirerMenu();
        switch(opcion){
            case 1:
                let nombreCiudad = await inquirerInput("Nombre de la ciudad:");
                let data = await busqueda.getCiudad(nombreCiudad);
                let idCiudad = await inquirerSelecionarCiudad(data);
                let ciudadSelec = data.find(i=>i.id === idCiudad);
                busqueda.agregarHistorial(ciudadSelec.name);
                let climaData = await busqueda.getClima(ciudadSelec.lat, ciudadSelec.lng);
                console.log("Informacion de la ciudad".green);
                console.log(`${"Ciudad:".green} ${ciudadSelec.name}`);
                console.log(`${"Latitud:".green} ${ciudadSelec.lat}`);
                console.log(`${"Longitud:".green} ${ciudadSelec.lng}`);
                console.log(`${"Temperatura:".green} ${climaData.temp}`);
                console.log(`${"Minimo:".green} ${climaData.min}`);
                console.log(`${"Maximo:".green} ${climaData.max}`);
                console.log(`${"Descripcion:".green} ${climaData.desc}`);
                break;
            case 2:
                busqueda.historial.forEach(ciudad=>{
                    console.log(ciudad);
                });
                break;
        }
        if(opcion != 3 ){await inquirerPausa()};
    }while(opcion != 3)
}

main();