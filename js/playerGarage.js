'use strict';

export var playerGarage = [4, 76, 42, 47, 18];
export var playerPrestigeGarage = [];
import { button } from "./app.js";
import { playerHand, getHandCards, handUpdater, handAdder, totalRQ } from "./playerHand.js";
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

function eliteTag(id, perk) {
    let eliteMarker = document.createElement('button');
    eliteMarker.id = id;
    eliteMarker.classList.add('btn'); // Use classList to add a class
    eliteMarker.innerHTML = "ELITE - " + perk;
    return eliteMarker;
}

export function loadGarage(garage, prestige) {
    playerGarage = garage;
    playerPrestigeGarage = prestige;
    console.log(playerGarage);
};

let makeList = [];
let countryList = [];
let decadeList = [];
let filterArray = [];
let filteredMake = [];
let filteredCountry = [];
let filteredDecade = [];
let filteredDrive = [];
let filteredTyres = [];
let rarityMemory;

document.getElementById('filterButton').addEventListener('click', () => {
    fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => {
        cards = data.cars;
    })
    cards = cards.sort(
        (p1, p2) => (p1.rq < p2.rq) ? 1 : (p1.rq > p2.rq) ? -1 : 0)
    let filteredCards = [];
    if (filteredMake.length > 0) {
        cards = cards.filter(obj => obj.make == filteredMake);
    }
    if (filteredCountry.length > 0) {
        cards = cards.filter(obj => obj.country == filteredCountry);
    }
    if (filteredDecade.length > 0) {
        let decadeCheck = parseInt(filteredDecade);
        cards = cards.filter(obj => obj.year >= decadeCheck && obj.year < decadeCheck +10 );
    }
    if (filteredDrive.length > 0) {
        cards = cards.filter(obj => obj.drive == filteredDrive);
    }
    if (filteredTyres.length > 0) {
        cards = cards.filter(obj => obj.tyres == filteredTyres);
    }
    handleTabClick(rarityMemory);
    filteredMake = [];
    filteredCountry = [];
    filteredDecade = [];
    filteredDrive = [];
    filteredTyres = [];
})

function handleTabClick(event) {
    rarityMemory = event;
    document.getElementById('handRQ').innerHTML = "Hand RQ: " + totalRQ;
    document.getElementById('fullhandbox').innerText = "";
    const target = event.target;
    const id = target.id;
    let carRarity = rarities.indexOf(id) + 1;
    document.getElementById('garageGrid').innerText = "";
    document.getElementById('unownedGrid').innerText = "";
    document.getElementById('eliteGrid').innerText = "";
    cards = cards.sort(
        (p1, p2) => (p1.rq < p2.rq) ? 1 : (p1.rq > p2.rq) ? -1 : 0)
        console.log(cards);
    cards.forEach(cards => {
        if (cards.rarity == carRarity) {
            makeList.push(cards.make);
            countryList.push(cards.country);
            let yearFilter = Math.floor(cards.year / 10)*10;
            decadeList.push(yearFilter);
            if (playerGarage.includes(cards.carID)) {
                var gridContainer = document.getElementById('garageGrid');
                const garageCard = document.createElement('div');
                var img = document.createElement('img');
                img.src = "./assets/cards/" + cards.imageID;
                img.id = parseInt(cards.carID);
                garageCard.appendChild(img);
                
                var carIndex = cards.carID - 1;
                if (cards.elite === "yes") {
                    let perk = cards.perk;
                    garageCard.appendChild(eliteTag(img.id,perk));
                }
                if (playerHand.includes(carIndex)) {
                    garageCard.appendChild(handButton(img.id, carIndex));
                }
                gridContainer.append(garageCard);
                if (playerPrestigeGarage.includes(cards.carID)) {
                    console.log("gold!");
                    document.getElementById(cards.carID).classList.add('border');
                };
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

    let uniqueMakes = [...new Set(makeList)]
    uniqueMakes.sort();

    var select = document.getElementById("makeSelect");
    document.getElementById('makeSelect').innerText = '';
    var options = uniqueMakes;
    var firstElement = document.createElement("option")
    firstElement.textContent = "N/A";
    firstElement.value = "N/A";
    select.appendChild(firstElement);
    for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }

    let uniqueCountries = [...new Set(countryList)]
    uniqueCountries.sort();

    var select = document.getElementById("countrySelect");
    document.getElementById('countrySelect').innerText = '';
    var options = uniqueCountries;
    var firstElement = document.createElement("option")
    firstElement.textContent = "N/A";
    firstElement.value = "N/A";
    select.appendChild(firstElement);
    for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }

    let uniqueDecades = [...new Set(decadeList)]
    uniqueDecades.sort();

    var select = document.getElementById("decadeSelect");
    document.getElementById('decadeSelect').innerText = '';
    var options = uniqueDecades;
    var firstElement = document.createElement("option")
    firstElement.textContent = "N/A";
    firstElement.value = "N/A";
    select.appendChild(firstElement);
    for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }

    let uniqueDrives = ['FWD','RWD','4WD'];

    var select = document.getElementById("driveSelect");
    document.getElementById('driveSelect').innerText = '';
    var options = uniqueDrives;
    var firstElement = document.createElement("option")
    firstElement.textContent = "N/A";
    firstElement.value = "N/A";
    select.appendChild(firstElement);
    for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    }

    let uniqueTyres = ['Standard','Performance','All-Surface','Off-Road','Slick'];

    var select = document.getElementById("tyreSelect");
    document.getElementById('tyreSelect').innerText = '';
    var options = uniqueTyres;
    var firstElement = document.createElement("option")
    firstElement.textContent = "N/A";
    firstElement.value = "N/A";
    select.appendChild(firstElement);
    for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
    };

    document.getElementById('makeSelect').addEventListener('click', () => {
        let selectList1 = document.getElementById('makeSelect');
        filteredMake = selectList1.value;
    });

    document.getElementById('countrySelect').addEventListener('click', () => {
        let selectList2 = document.getElementById('countrySelect');
        filteredCountry = selectList2.value;
    });

    document.getElementById('decadeSelect').addEventListener('click', () => {
        let selectList3 = document.getElementById('decadeSelect');
        filteredDecade = selectList3.value;
    });

    document.getElementById('driveSelect').addEventListener('click', () => {
        let selectList4 = document.getElementById('driveSelect');
        filteredDrive = selectList4.value;
    });
    
    document.getElementById('tyreSelect').addEventListener('click', () => {
        let selectList5 = document.getElementById('tyreSelect');
        filteredTyres = selectList5.value;
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
        document.getElementById('handRQ').innerHTML = "Hand RQ: " + totalRQ;
    }
};