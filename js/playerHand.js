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
            var handCar1 = data[car1];
            var handImage1 = handCar1.imageID;
            document.getElementById('hand1').innerHTML = `<img src="./assets/cards/${handImage1}" id="imageBox"/>`
            var handAccel1 = handCar1.zeroToSixty;

            var handCar2 = data[car2];
            var handImage2 = handCar2.imageID;
            document.getElementById('hand2').innerHTML = `<img src="./assets/cards/${handImage2}" id="imageBox"/>`
            var handAccel2 = handCar2.zeroToSixty;

            var handCar3 = data[car3];
            var handImage3 = handCar3.imageID;
            document.getElementById('hand3').innerHTML = `<img src="./assets/cards/${handImage3}" id="imageBox"/>`
            var handAccel3 = handCar3.zeroToSixty;

            var handCar4 = data[car4];
            var handImage4 = handCar4.imageID;
            document.getElementById('hand4').innerHTML = `<img src="./assets/cards/${handImage4}" id="imageBox"/>`
            var handAccel4 = handCar4.zeroToSixty;

            var handCar5 = data[car5];
            var handImage5 = handCar5.imageID;
            document.getElementById('hand5').innerHTML = `<img src="./assets/cards/${handImage5}" id="imageBox"/>`
            var handAccel5 = handCar5.zeroToSixty;

            let buttonCooldown = (handAccel1 + handAccel2 + handAccel3 + handAccel4 + handAccel5);
        }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });
}

function test(...playerHand) {
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => { // Work with your JSON data here
            data = data.cars
            if (playerHand.length === 5) {
                var handCar = data[playerHand];
                var handAccel = handCar.zeroToSixty;
                var handAdd = document.getElementById('handDisplay');
                const handImage = document.createElement('img');
                unownedimg.src = "/assets/cards/" + playerHand.imageID;
                handAdd.append(handImage);
                buttonCooldown += handAccel;
            }
        });

    document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + (buttonCooldown) / 1000 + " seconds";
    button.addEventListener('click', () => {
        setTimeout(function () {
            button.disabled = false;
        }, buttonCooldown);
    });

    export function handUpdater(indexNo) {
        playerHand = playerHand.filter(item => item !== indexNo);
        console.log(playerHand.length);
        console.log(playerHand);
    }

    export function handAdder(indexNo) {
        playerHand.push(indexNo);
    }
}