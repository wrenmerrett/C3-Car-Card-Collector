'use strict';

export const playerGarage = [1, 2, 3, 4, 5];
import { button } from "./app.js";
import { playerHand } from "/js/playerHand.js";
const tabs = document.querySelectorAll('.tab');
var cards;
var newHandCard;
var inHand;
const rarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']

fetch('./js/data.json')
    .then(response => response.json())
    .then(data => {
        cards = data.cars;
    })

tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

garageGrid.addEventListener("click", function (e) { // e = event object
    const clickedCard = e.target;
    console.log(clickedCard);
    console.log("it works!");
    addToHand(clickedCard);
        // do stuff with `clickedVideoContainer`
});

function handleTabClick(event) {
    const target = event.target;
    const id = target.id;
    var carRarity = rarities.indexOf(id) + 1;
    document.getElementById('garageGrid').innerText = "";
    document.getElementById('unownedGrid').innerText = "";

    cards.forEach(cards => {
        if (cards.rarity == carRarity) {
            if (playerGarage.includes(cards.carID)) {
                var gridContainer = document.getElementById('garageGrid');
                const garageCard = document.createElement('div');
                var img = document.createElement('img');
                img.src = "/assets/cards/" + cards.imageID;
                img.id = cards.carID;
                garageCard.appendChild(img);
                var carIndex = cards.carID - 1;
                if (playerHand.includes(carIndex)) {
                    var inHand = document.createElement('button');
                    inHand.className = "btn";
                    inHand.innerHTML = "IN HAND";
                    inHand.id = carIndex;
                    inHand.addEventListener('click', () => {
                        delete playerHand[this.id];
                        inHand.remove();
                    });
                    garageCard.appendChild(inHand);
                }
                gridContainer.append(garageCard);
            } else {
                var collectionAdd = document.getElementById('unownedGrid');
                const unownedimg = document.createElement('img');
                unownedimg.src = "/assets/cards/" + cards.imageID;
                collectionAdd.append(unownedimg);
            }
        } else {
        }
    });

} function addToHand(newHandCard) {
    if (playerHand.length < 5) {
        console.log("it REALLY works");
        var inHand = document.createElement('button');
        inHand.className = "btn";
        inHand.innerHTML = "IN HAND";
        inHand.id = carIndex;
        inHand.onclick = (function () {
            delete playerHand[this.id];
            $(this).remove();
        });
        newHandCard.appendChild(inHand);
        playerHand.push[this.id];
    } else {

    }
}
