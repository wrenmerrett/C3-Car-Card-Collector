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
            data = data.cars
            var gacha = Math.floor(Math.random() * 100) + 1;
            if (gacha < 19) {
                var carSelection = data.filter(data => data.rarity === 1);
            } else
            if (gacha < 37) {
                var carSelection = data.filter(data => data.rarity === 2);
            } else
            if (gacha < 55) {
                var carSelection = data.filter(data => data.rarity === 3);
            } else
            if (gacha < 73) {
                var carSelection = data.filter(data => data.rarity === 4);
            } else
            if (gacha < 88) {
                var carSelection = data.filter(data => data.rarity === 5);
            } else
            if (gacha < 98) {
                var carSelection = data.filter(data => data.rarity === 6);
            } else {
                var carSelection = data.filter(data => data.rarity === 7);
                                }
            console.log(gacha);
            var chosenCar = carSelection[Math.floor(Math.random() * carSelection.length)];
            var carImage = chosenCar.imageID
            document.getElementById('newestCard').innerHTML = `<img src="assets/cards/${carImage}" id="imageBox"//>`
            var garageAdd = chosenCar.carID;
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