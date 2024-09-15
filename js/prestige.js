'use strict';

import {money, moneyChanger} from "./app.js"
import { playerGarage, loadGarage, collectionHandDisplay} from "./playerGarage.js";
import { handLoader, getHandCards, playerHand } from "./playerHand.js";

export var playerPermGarage = [];
export var playerPrestigeCoins = 100;
export var playerPrestigeBank = 0;
export var playerPrestigeLevel = 0;
const prestigeShopTabs = document.querySelectorAll('.ptab');
var prestigecards;
let rarityMemory;

const pRarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']

var headText = document.getElementById('prestigeHeader');
headText.innerHTML = "Prestige Level " + playerPrestigeLevel;
var switchOn = document.getElementById("prestigeSwitch")
var kb = document.getElementById("prestigeButton")
switchOn.addEventListener('click',buttonOn)
kb.addEventListener('click',prestigePlayer)

function buttonOn(){
    if (kb.style.display === "none") {
        kb.style.display = "block";
      } else {
        kb.style.display = "none";
      }
}

function prestigePlayer(){
    let moneyReset = money - 100;
    moneyChanger(moneyReset);
    let baseGarage = [4, 76, 42, 47, 18].concat(playerPermGarage);
    let basePrestigeGarage = [];
    loadGarage(baseGarage,basePrestigeGarage);
    let hand = [];
    handLoader(hand);
    getHandCards(...playerHand);
    collectionHandDisplay();
    document.getElementById('garageGrid').innerText = "";
    document.getElementById('unownedGrid').innerText = "";
    document.getElementById('eliteGrid').innerText = "";
    playerPrestigeCoins = playerPrestigeCoins + playerPrestigeBank;
    playerPrestigeBank = 0;
    playerPrestigeLevel += 1;
    coinCounter.innerHTML = "Prestige Bank: " + playerPrestigeBank + " - Prestige Coins: " + playerPrestigeCoins;
    headText.innerHTML = "Prestige Level " + playerPrestigeLevel;
};

export function restorePrestige(bank,coins,level,garage){
    playerPermGarage = garage;
    playerPrestigeBank = bank;
    playerPrestigeCoins = coins;
    playerPrestigeLevel = level;
    coinCounter.innerHTML = "Prestige Bank: " + playerPrestigeBank + " - Prestige Coins: " + playerPrestigeCoins;
    headText.innerHTML = "Prestige Level " + playerPrestigeLevel;
};

let coinCounter = document.getElementById("pcoinDisplay");
coinCounter.innerHTML = "Prestige Bank: " + playerPrestigeBank + " - Prestige Coins: " + playerPrestigeCoins;
prestigeShopTabs.forEach(tab => tab.addEventListener('click', prestigeTabClick));

function prestigeTabClick(event) {
    fetch('./js/data.json')
    .then((response) => response.json())
    .then((data) => {
        prestigecards = data.cars;
        console.log(data.cars);
    })
    console.log(prestigecards);
    rarityMemory = event;
    const target = event.target;
    const id = target.id;
    let carRarity = pRarities.indexOf(id) + 1;
    document.getElementById('prestigeGrid').innerText = "";
    prestigecards = prestigecards.sort(
        (p1, p2) => (p1.make > p2.make) ? 1 : (p1.make < p2.make) ? -1 : 0)
        console.log(prestigecards);
    prestigecards = prestigecards.sort(
        (p1, p2) => (p1.rq < p2.rq) ? 1 : (p1.rq > p2.rq) ? -1 : 0)
        console.log(prestigecards);
    prestigecards.forEach(prestigecards => {
        if (prestigecards.rarity == carRarity) {
                if (prestigecards.elite === "yes" && prestigecards.source !== "milestone")
            {
                
                var eliteAdd = document.getElementById('prestigeGrid');
                const eliteCard = document.createElement('div');
                let eliteID = prestigecards.carID;
                let coinValue = prestigecards.rq;
                var eliteimg = new Image();
                eliteimg.src = "./assets/cards/" + prestigecards.imageID;
                let perk = prestigecards.perk;
                if (playerPermGarage != null && playerPermGarage.includes(eliteID)) {
                    eliteCard.appendChild(unlockedTag());
                } else {
                    eliteCard.appendChild(prestigeTag(eliteID,perk,coinValue));
                }
                eliteCard.append(eliteimg);
                eliteAdd.append(eliteCard);
            } 
        }
    });
    
    };

function prestigeTag(id, perk, value) {
    let eliteMarker = document.createElement('button');
    eliteMarker.id = id;
    eliteMarker.classList.add('btn'); // Use classList to add a class
    eliteMarker.innerHTML = "UNLOCK: " + value + " Prestige Coins - " + perk;
    eliteMarker.addEventListener('click', () => {
        unlockCar(eliteMarker.id, value);
    });
    return eliteMarker;
}

function unlockedTag() {
    let eliteMarker = document.createElement('button');
    eliteMarker.classList.add('unlockedbtn'); // Use classList to add a class
    eliteMarker.innerHTML = "PERMANENTLY UNLOCKED";
    return eliteMarker;
}

function unlockCar(id,pricetag) {
    let buttonID = document.getElementById(id);
    let purchaseCost = pricetag;
    let newCar = id * 1;
    if (purchaseCost <= playerPrestigeCoins) {
        playerGarage.push(newCar);
        playerPermGarage.push(newCar);
        buttonID.remove();
        coinChanger(pricetag);
    }

}

function coinChanger(coins) {
    playerPrestigeCoins -= coins;
    coinCounter.innerHTML = "Prestige Bank: " + playerPrestigeBank + " - Prestige Coins: " + playerPrestigeCoins;
}

export function bankCoins(value) {
    playerPrestigeBank += value;
    coinCounter.innerHTML = "Prestige Bank: " + playerPrestigeBank + " - Prestige Coins: " + playerPrestigeCoins;
}