'use strict';

import { button } from "./app.js";
import { playerGarage, playerPrestigeGarage, collectionHandUpdater } from "./playerGarage.js";

export let playerHand = [3, 75, 41, 46, 17];
export let totalRQ = 0;

window.addEventListener('click', getHandCards(...playerHand));

export function getHandCards(car1, car2, car3, car4, car5) {
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            data = data.cars
            if (playerHand.length === 5) {
            totalRQ = 0;
            const handCar1 = data[car1];
            const handImage1 = handCar1.imageID;
            totalRQ += handCar1.rq;
            document.getElementById('hand1').innerHTML = `<img src="./assets/cards/${handImage1}" id="1"/>`
            console.log(playerPrestigeGarage);
            if (playerPrestigeGarage.includes(handCar1.carID)) {
                document.getElementById('1').classList.add('border');
            }

            const handCar2 = data[car2];
            const handImage2 = handCar2.imageID;
            totalRQ += handCar2.rq;
            document.getElementById('hand2').innerHTML = `<img src="./assets/cards/${handImage2}" id="2"/>`
            if (playerPrestigeGarage.includes(handCar2.carID)) {
                document.getElementById('2').classList.add('border');
            }

            const handCar3 = data[car3];
            const handImage3 = handCar3.imageID;
            totalRQ += handCar3.rq;
            document.getElementById('hand3').innerHTML = `<img src="./assets/cards/${handImage3}" id="3"/>`
            if (playerPrestigeGarage.includes(handCar3.carID)) {
                document.getElementById('3').classList.add('border');
            }

            const handCar4 = data[car4];
            const handImage4 = handCar4.imageID;
            totalRQ += handCar4.rq;
            document.getElementById('hand4').innerHTML = `<img src="./assets/cards/${handImage4}" id="4"/>`
            if (playerPrestigeGarage.includes(handCar4.carID)) {
                document.getElementById('4').classList.add('border');
            }

            const handCar5 = data[car5];
            const handImage5 = handCar5.imageID;
            totalRQ += handCar5.rq;
            document.getElementById('hand5').innerHTML = `<img src="./assets/cards/${handImage5}" id="5"/>`
            if (playerPrestigeGarage.includes(handCar5.carID)) {
                document.getElementById('5').classList.add('border');
            }
            
               
        }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}

export function handUpdater(indexNo) {
    let handIndex = playerHand.indexOf(indexNo);
    playerHand.splice(handIndex, 1);
};

export function handAdder(indexNo) {
    playerHand.push(indexNo);
    collectionHandUpdater(indexNo);
};

export function handLoader(hand) {
    playerHand = hand;
}