export const button = document.querySelector('[data-collect-card]');
import { playerGarage } from "/js/playerGarage.js";
var money = 10;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

document.getElementById('cashDisplay').innerText = "Cash: $" + money;

button.addEventListener('click', () => {
    carPicker();
    button.disabled = true;
});

// Read file asynchronously
function carPicker() {
    // Assuming data.json contains your JSON data
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            var chosenCar = data[Math.floor(Math.random() * data.length)];
            var carImage = chosenCar.carID + ".png";
            document.getElementById('newestCard').innerHTML = `<img src="assets/cards/${carImage}" id="imageBox"//>`
            var garageAdd = chosenCar.carID - 1;
            console.log(garageAdd);
            if (playerGarage.includes(garageAdd)) {
                money += (chosenCar.rarity * chosenCar.rq);
                document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            } else { playerGarage.unshift(garageAdd); }
            console.log(playerGarage);
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}