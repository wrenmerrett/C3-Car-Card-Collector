'use strict';

const garageButton = document.getElementById('garageDrop');

export const playerGarage = [0, 1, 2, 3, 4];
const tabs = document.querySelectorAll('.tab');
var cards;
const rarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']

fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        cards = data.cars;
    })

tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

function handleTabClick(event) {
    const target = event.target;
    const id = target.id;
    var carRarity = rarities.indexOf(id) + 1;

    cards.forEach(cards => {
        if (cards.rarity == carRarity) {
            if (playerGarage.includes(cards.carID)) {
                var garageImage = cards.imageID;
                document.getElementById('garage').innerHTML = `<img src="assets/cards/${garageImage}" id="imageBox"/>`
            }
        } else {
            console.log("peeman")
        }
    });
}
