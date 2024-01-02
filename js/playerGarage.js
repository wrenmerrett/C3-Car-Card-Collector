'use strict';

export const playerGarage = [1, 2, 3, 4, 5];
import { button } from "./app.js";
import { playerHand, getHandCards } from "/js/playerHand.js";
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
                        delete playerHand[inHand.id];
                        console.log(playerHand);
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

    garageGrid.addEventListener("click", (e) => { // e = event object
        if (e.target.tagName === 'IMG') {
            console.log(e.target.tagName);
            const selection = e.target;
            const clickedCard = selection.id;
            const handCheck = clickedCard - 1;
            if (playerHand.includes(handCheck)) {
                document.getElementById('fullhandbox').innerText = "Car already in hand!";
                return;
            }
            addToHand(clickedCard);
        }
    })
};

function addToHand(newHandCard) {
    if (playerHand.includes(undefined)) {
        var inHand = document.createElement('button');
        inHand.className = "btn";
        inHand.innerHTML = "IN HAND";
        inHand.id = newHandCard - 1;
        var handAddedCar = Number(inHand.id);
        inHand.onclick = (function () {
            delete playerHand[this.id];
            $(this).remove();
        });
        var enteringHand = document.getElementById(newHandCard);
        enteringHand.innerText += inHand;
        for (let i = 0; i < playerHand.length; i++) {
            if (playerHand[i] === undefined) {
                playerHand[i] = handAddedCar; // Replace undefined with 0 or any desired value
                break;
            }
        }
        getHandCards(...playerHand)
    } else {
        document.getElementById('fullhandbox').innerText = "Your hand is full!";
    }
};