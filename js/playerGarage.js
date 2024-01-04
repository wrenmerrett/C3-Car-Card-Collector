'use strict';

export var playerGarage = [4, 76, 42, 47, 18];
import { button } from "./app.js";
import { playerHand, getHandCards, handUpdater, handAdder } from "./playerHand.js";
const tabs = document.querySelectorAll('.tab');
let handSize = playerHand.length;
var cards;
var newHandCard;
var inHand;

const rarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']

fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => {
        cards = data.cars;
    })

tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

function handButton(id,updater) {
    let handbtn = document.createElement('button');
    handbtn.id = id;
    handbtn.classList.add('btn'); // Use classList to add a class
    handbtn.innerHTML = "IN HAND";
    handbtn.onclick = (event) => {
        handUpdater(updater); // Call handUpdater function if needed
        event.target.remove(); // Use event.target to reference the clicked button
    };
    return handbtn;
};

export function loadGarage(garage) {
    playerGarage = garage;
};

function handleTabClick(event) {
    document.getElementById('fullhandbox').innerText = "";
    const target = event.target;
    const id = target.id;
    var carRarity = rarities.indexOf(id) + 1;
    document.getElementById('garageGrid').innerText = "";
    document.getElementById('unownedGrid').innerText = "";
    document.getElementById('eliteGrid').innerText = "";

    cards.forEach(cards => {
        if (cards.rarity == carRarity) {
            if (playerGarage.includes(cards.carID)) {
                var gridContainer = document.getElementById('garageGrid');
                const garageCard = document.createElement('div');
                var img = document.createElement('img');
                img.src = "./assets/cards/" + cards.imageID;
                img.id = parseInt(cards.carID);
                garageCard.appendChild(img);
                var carIndex = cards.carID - 1;
                if (playerHand.includes(carIndex)) {
                    garageCard.appendChild(handButton(img.id, carIndex));
                }
                gridContainer.append(garageCard);
            } else if (cards.elite === "yes")
            {
                var eliteAdd = document.getElementById('eliteGrid');
                const eliteimg = document.createElement('img');
                eliteimg.src = "./assets/cards/" + cards.imageID;
                eliteAdd.append(eliteimg);
            } else {
                var collectionAdd = document.getElementById('unownedGrid');
                const unownedimg = document.createElement('img');
                unownedimg.src = "./assets/cards/" + cards.imageID;
                collectionAdd.append(unownedimg);
            }
        } else {
        }
    });

    garageGrid.addEventListener("click", (e) => { // e = event object
        if (e.target.tagName === 'IMG') {
            handSize = playerHand.length;
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
    if (handSize >= 5) {
        document.getElementById('fullhandbox').innerText = "Your hand is full!";
    } else {
        let inHand = newHandCard - 1;
        let newButton = handButton(newHandCard, inHand);
        let enteringHand = document.getElementById(newHandCard);
        enteringHand.appendChild(newButton);
        handAdder(inHand);
        getHandCards(...playerHand);
    }
};