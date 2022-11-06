const prompts = require('prompts')
async function main(){

/*
const settings = {
    accessKey: "b804d327facaacf4b439b53e2e2641e3",
    location: "Paris",
    units: "m"
}
fetch(`http://api.weatherstack.com/current?access_key=${settings.accessKey}&query=${settings.location}&units=${settings.units}`)
    .then(res => res.json())
    .then(data => {
        const {current, location, requets} = data
        console.log(`La temperature à ${location.name}°C, est de ${current.temperature}°C et le resenti est de ${current.feelslike}°C`)
    })
*/
let unit
const locationVille = await getLocationVille();
const unitDegFar = await getUnitDegFar();
if(unitDegFar === "°C"){
    unit = "m"
}
if(unitDegFar === "°F"){
    unit = "f"
}
const weather = (location, unit, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b804d327facaacf4b439b53e2e2641e3&query=${location}&units=${unit}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if(data.success === false){
                    callback(`Impossible de renvoyer vos informations. Erreur ${data.err.code}: ${data.err.info}`, undefined)
                }
                else{
                    const {location, current} = data
                    callback(undefined,`La temperature à ${location.name}, est de ${current.temperature}${unitDegFar} et le resenti est de ${current.feelslike}${unitDegFar}`)
                }
            })
}
weather(locationVille, unit, (err, data) => {
    console.log('Erreur :', err)
    console.log('Data :', data)
})
}
async function getLocationVille(){
    const location = await prompts({
        type: "text",
        name: "value",
        message: "Donne moi une ville en respectant les majuscules ?"
    })
    return location.value
}
async function getUnitDegFar(){
    const unit = await prompts({
        type: "text",
        name: "value",
        message: "Donne moi l'unité : °C, °F",
    })
    return unit.value
}
main();
