'use strict';

import { button } from "/js/app.js";
import { playerGarage } from "/js/playerGarage.js";

export let playerHand = [0, 1, 2, 3, 4];

window.addEventListener('click', getHandCards(...playerHand));

export function getHandCards(car1, car2, car3, car4, car5) {
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            data = data.cars
            if (playerHand.length === 5) {
            const handCar1 = data[car1];
            const handImage1 = handCar1.imageID;2
            document.getElementById('hand1').innerHTML = `<img src="./assets/cards/${handImage1}" id="imageBox"/>`

            const handCar2 = data[car2];
            const handImage2 = handCar2.imageID;
            document.getElementById('hand2').innerHTML = `<img src="./assets/cards/${handImage2}" id="imageBox"/>`

            const handCar3 = data[car3];
            const handImage3 = handCar3.imageID;
            document.getElementById('hand3').innerHTML = `<img src="./assets/cards/${handImage3}" id="imageBox"/>`

            const handCar4 = data[car4];
            const handImage4 = handCar4.imageID;
            document.getElementById('hand4').innerHTML = `<img src="./assets/cards/${handImage4}" id="imageBox"/>`

            const handCar5 = data[car5];
            const handImage5 = handCar5.imageID;
            document.getElementById('hand5').innerHTML = `<img src="./assets/cards/${handImage5}" id="imageBox"/>`
                
                
               
        }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}

export function handUpdater(indexNo) {
    playerHand = playerHand.filter(item => item !== indexNo);
    console.log(playerHand.length);
        console.log(playerHand);
};

export function handAdder(indexNo) {
    playerHand.push(indexNo);
};