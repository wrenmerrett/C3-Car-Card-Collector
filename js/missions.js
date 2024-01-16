'use strict';

import { money, moneyChanger } from "./app.js";
import { toolAdder, eliteTools } from "./elite.js";
import { ownedButton } from "./shop.js";
import { playerGarage, playerPrestigeGarage } from "./playerGarage.js";

const activeSlots = document.querySelectorAll('.activeBox');
const trackerSlots = document.querySelectorAll('.trackerBox');
activeSlots.forEach(tab => tab.addEventListener('click', activateSlot));

console.log(trackerSlots);

let slotQuantity = 1;
let activeContracts = 0;
let stars = 50;

export let contractTrackers = [
    {
        "trackerID": 1,
        "trackerSlot": 'active1',
        "counterSlot": "at1",
        "trackedContract": "",
        "active": false,
        "currentVal": 0,
        "finishVal": 0
    },
    {
        "trackerID": 2,
        "trackerSlot": 'active2',
        "counterSlot": "at2",
        "trackedContract": "",
        "active": false,
        "currentVal": 0,
        "finishVal": 0
    },
    {
        "trackerID": 3,
        "trackerSlot": 'active3',
        "counterSlot": "at3",
        "trackedContract": "",
        "active": false,
        "currentVal": 0,
        "finishVal": 0
    },
    {
        "trackerID": 4,
        "trackerSlot": 'active4',
        "counterSlot": "at4",
        "trackedContract": "",
        "active": false,
        "currentVal": 0,
        "finishVal": 0
    }
];

export const contracts = [
    {
        "missionID": 'c1',
        "missionName": "Rookie Collector",
        "missionDesc": "Press the Collect button 50 times",
        "targetValue": 50,
        "difficulty": 1
    },
    {
        "missionID": 'c2',
        "missionName": "Refreshing!",
        "missionDesc": "Refresh the Dealership 5 times",
        "targetValue": 5,
        "difficulty": 1
    },
    {
        "missionID": 'c3',
        "missionName": "Lucky Collector",
        "missionDesc": "Collect 40 times with a Luck Factor over 1.25",
        "targetValue": 40,
        "difficulty": 1
    },
    {
        "missionID": 'c4',
        "missionName": "Rookie Earner",
        "missionDesc": "Earn $5,000 from collecting",
        "targetValue": 5000,
        "difficulty": 1
    },
    {
        "missionID": 'c5',
        "missionName": "Rich Collector",
        "missionDesc": "Collect 40 times with an Earnings Bonus over 2",
        "targetValue": 40,
        "difficulty": 1
    },
    {
        "missionID": 'c6',
        "missionName": "Front Facing",
        "missionDesc": "Collect 60 times with 3+ FWD cars in hand",
        "targetValue": 60,
        "difficulty": 2
    },
    {
        "missionID": 'c7',
        "missionName": "Standardised",
        "missionDesc": "Collect 60 times with 3+ Standard-tyre cars in hand",
        "targetValue": 60,
        "difficulty": 2
    },
    {
        "missionID": 'c8',
        "missionName": "Quick Collector",
        "missionDesc": "Collect 40 times with a Collect Cooldown under 12 seconds",
        "targetValue": 40,
        "difficulty": 1
    },
    {
        "missionID": 'c9',
        "missionName": "Four Up",
        "missionDesc": "Collect 60 times with 3+ 4WD cars in hand",
        "targetValue": 60,
        "difficulty": 2
    },
    {
        "missionID": 'c10',
        "missionName": "Elite Collector",
        "missionDesc": "Collect 80 times with an Elite car in hand",
        "targetValue": 80,
        "difficulty": 3
    },
    {
        "missionID": 'c11',
        "missionName": "Czech Me Out",
        "missionDesc": "Collect 100 times with 3+ Czech cars in hand",
        "targetValue": 100,
        "difficulty": 4
    },
    {
        "missionID": 'c12',
        "missionName": "Amateur Earner",
        "missionDesc": "Earn $10,000 from collecting",
        "targetValue": 10000,
        "difficulty": 2
    },
    {
        "missionID": 'c13',
        "missionName": "Big Earner",
        "missionDesc": "Earn $50,000 from collecting",
        "targetValue": 50000,
        "difficulty": 3
    },
    {
        "missionID": 'c14',
        "missionName": "Moneybags",
        "missionDesc": "Earn $500,000 from collecting",
        "targetValue": 500000,
        "difficulty": 4
    },
    {
        "missionID": 'c15',
        "missionName": "Aussie Aussie Aussie",
        "missionDesc": "Collect 100 times with 3+ Australian cars in hand",
        "targetValue": 100,
        "difficulty": 4
    },
    {
        "missionID": 'c16',
        "missionName": "Need for Swede",
        "missionDesc": "Collect 100 times with 3+ Swedish cars in hand",
        "targetValue": 100,
        "difficulty": 4
    },
    {
        "missionID": 'c17',
        "missionName": "Indecisive",
        "missionDesc": "Spend $10,000 on Dealership  refreshes",
        "targetValue": 10000,
        "difficulty": 2
    },
    {
        "missionID": 'c18',
        "missionName": "Just Browsing",
        "missionDesc": "Refresh a full Dealership 5 times",
        "targetValue": 5,
        "difficulty": 2
    },
    {
        "missionID": 'c19',
        "missionName": "Cashback Champ",
        "missionDesc": "Reduce the Dealership refresh cost to $0 10 times",
        "targetValue": 10,
        "difficulty": 3
    },
    {
        "missionID": 'c20',
        "missionName": "Seoul Mates",
        "missionDesc": "Collect 100 times with 3+ South Korean cars in hand",
        "targetValue": 100,
        "difficulty": 4
    },
    {
        "missionID": 'c21',
        "missionName": "Rapid Fire",
        "missionDesc": "Activate Double Tap 50 times",
        "targetValue": 50,
        "difficulty": 3
    }
];

const contractBGColours = ["rgba(60, 179, 113, 0.45)","rgba(0, 0, 255, 0.45)","rgba(255, 165, 0, 0.45)","rgba(238, 130, 238, 0.45)"];

window.onload = populateContracts(), populateStarShop();

function populateContracts() {
    document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
    for (let contNo = 1; contNo < 5; contNo++) {
        const contractSelect = contracts.filter(c => c.difficulty === contNo);
        let newContract = contractSelect[Math.floor(Math.random() * contractSelect.length)];
        console.log(newContract);
        let contractContainer = document.getElementById('contractGrid');
        var contractTab = document.createElement('div');
        let contractReward = document.createElement('span');
        if (contNo === 4) {
            contractReward.innerHTML = "750 Elite Tools"
        } else {
            contractReward.innerHTML = 250 * Math.pow(10, contNo) + " Cash"
        };
        let contractTarget = newContract.targetValue;
        contractTab.id = newContract.missionID;
        contractTab.classList.add('contractBox');
        contractTab.style.backgroundColor = contractBGColours[contNo-1];
        contractTab.innerHTML = "<span>" + newContract.missionName + "</span>" + newContract.missionDesc + " - " + contractReward.innerHTML;
        const contHeader = contractTab.querySelector('span');
        contHeader.style.fontWeight = 'bold';
        let contractColour = contractTab.style.backgroundColor;
        let contractContent = contractTab.innerHTML;
        let contractID = contractTab.id;
        contractTab.addEventListener('click', () => {
            contractActivator(contractID,newContract,contractContent,contractColour,contractTarget);
        },);
        contractContainer.appendChild(contractTab);
    }
};

function activateSlot(event) {
    let activatingSlot = event.target.id;
    let chosenSlot = document.getElementById(activatingSlot)
    if (activatingSlot === 'active2' && money >= 25000) {
        
        chosenSlot.innerHTML = "Active Slot 2";
        slotQuantity += 1;
        chosenSlot.removeEventListener('click', activateSlot);
        moneyChanger(2500);
    }
    if (activatingSlot === 'active3' && money >= 125000 && eliteTools >= 100) {
        
        chosenSlot.innerHTML = "Active Slot 3";
        slotQuantity += 1;
        chosenSlot.removeEventListener('click', activateSlot);
        moneyChanger(125000);
        toolAdder(-100);
    }
    if (activatingSlot === 'active4' && money >= 1000000 && eliteTools >= 1000) {
        
        chosenSlot.innerHTML = "Active Slot 4";
        slotQuantity += 1;
        chosenSlot.removeEventListener('click', activateSlot);
        moneyChanger(1000000);
        toolAdder(-1000);
    }
}

function contractActivator(ID,contract,tab, colour, target) {
    
    
    let contractid = document.getElementById(ID)
    let openSlots = slotQuantity - activeContracts
    console.log(openSlots);
    if (openSlots > 0) {
        contractid.innerHTML = "Complete previous contract to refresh.";
        let possibleSlots = document.querySelectorAll('.activeBox');
        for (let s = 0; s < possibleSlots.length; s++) {
            if (possibleSlots[s].innerHTML.startsWith('Active')) {
                let contractSlot = possibleSlots[s]; 
                contractAdder(contractSlot);
                contractid.removeEventListener('click', contractActivator);
                break;
            }
        }
        function contractAdder(slot) {
            activeContracts += 1;
            let slotID = slot.id
            console.log(contract);
            let trackingSlot = contractTrackers.findIndex(t => t.trackerSlot === slotID);
            slot.innerHTML = tab;
            slot.style.backgroundColor = colour;
            let trackerTile = document.getElementById(slotID).nextElementSibling;
            console.log(trackerTile);
            trackerTile.innerHTML = "Progress: 0 / " + target;
            contractTrackers[trackingSlot].finishVal = target;
            contractTrackers[trackingSlot].active = true;
            contractTrackers[trackingSlot].trackedContract = contract.missionName;
        }
    }
    
}

export function completeContract(name) {
    let cc = contracts.findIndex(c => c.missionName === name);
    let activeBoxUpater = (contractTrackers.findIndex(c => c.trackedContract === name))  + 1
    console.log(cc);
    if (contracts[cc].difficulty === 4) {
        let payout = 750;
        toolAdder(payout);
    } else {
        let payout = 250 * Math.pow(10, contracts[cc].difficulty);
        let moneyReward = payout * -1;
        moneyChanger(moneyReward);
    }
    stars += contracts[cc].difficulty;
    document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
    const contractSelect = contracts.filter(c => c.difficulty === contracts[cc].difficulty);
        let newContract = contractSelect[Math.floor(Math.random() * contractSelect.length)];
        let diff = contracts[cc].difficulty;
        let oldSlot = contracts[cc].missionID;
        let contractContainer = document.getElementById(oldSlot);
        var contractTab = document.createElement('div');
        let contractReward = document.createElement('span');
        if (diff === 4) {
            contractReward.innerHTML = "750 Elite Tools"
        } else {
            contractReward.innerHTML = 250 * Math.pow(10, diff) + " Cash"
        };
        let contractTarget = newContract.targetValue;
        contractTab.id = newContract.missionID;
        contractTab.classList.add('contractBox');
        contractTab.style.backgroundColor = contractBGColours[diff-1];
        contractTab.innerHTML = "<span>" + newContract.missionName + "</span>" + newContract.missionDesc + " - " + contractReward.innerHTML;
        const contHeader = contractTab.querySelector('span');
        contHeader.style.fontWeight = 'bold';
        let contractColour = contractTab.style.backgroundColor;
        let contractContent = contractTab.innerHTML;
        let contractID = contractTab.id;
        contractTab.addEventListener('click', () => {
            contractActivator(contractID,newContract,contractContent,contractColour,contractTarget);
        }, {once: true});
        contractContainer.replaceWith(contractTab);
        let activeBoxID = "active" + activeBoxUpater
        let refreshedActive = document.getElementById(activeBoxID);
        refreshedActive.style.backgroundColor = 'rgba(17, 25, 40, 0.25)'
        refreshedActive.innerHTML ="Active Slot " + activeBoxUpater;
}

function populateStarShop() {
    fetch('./js/data.json')
        .then((response) => response.json())
        .then((data) => {
            let cars = data.cars;
            cars = cars.filter(c => c.source === "contracts");
            for (let r = 0; r < 3; r++) {
                if (r == 0) {
                    let lowCars = cars.filter(c => c.rarity <= 4);
                    let lowStarCar = lowCars[Math.floor(Math.random() * lowCars.length)];
                    starShopPop(lowStarCar);
                }
                if (r == 1) {
                    let midCars = cars.filter(c => c.rarity <= 6 && c.rarity >= 5); 
                    let midStarCar = midCars[Math.floor(Math.random() * midCars.length)];
                    starShopPop(midStarCar);
                }
                if (r == 2) {
                    let highCars = cars.filter(c => c.rarity == 7); 
                    let highStarCar = highCars[Math.floor(Math.random() * highCars.length)];
                    starShopPop(highStarCar);
                }
            }
})}

function starShopPop(car) {
    let starContainer = document.getElementById('starShopGrid');
    var shopCard = document.createElement('div');
    shopCard.id = car.carID;
    const shopImg = document.createElement('img');
    shopImg.src = "./assets/cards/" + car.imageID;
    shopCard.appendChild(shopImg);
    let price = car.rarity * 5;
    if (playerPrestigeGarage.includes(car.carID)) {
        let buttonID = car.carID;
        let ownedTag = ownedButton(buttonID);
        shopCard.appendChild(ownedTag);
    }
    else if (playerGarage.includes(car.carID)) {
        let buttonID = car.carID;
        let prestigeTag = starPrestigeButton(buttonID,price);
        shopCard.appendChild(prestigeTag);
    } else {
        let pricetag = starBuyButton(car.carID, price)
        shopCard.appendChild(pricetag);
    }
    starContainer.append(shopCard);
}

function starBuyButton(id, price) {
    let buybtn = document.createElement('button');
    buybtn.id = id;
    buybtn.classList.add('starbtn'); // Use classList to add a class
    buybtn.innerHTML = "BUY: " + price + " Stars"
    buybtn.addEventListener('click', () => {
        buyStarCar(buybtn.id, price);
    });
    return buybtn;
};

function buyStarCar(id,pricetag) {
    let buttonID = document.getElementById(id);
    let purchaseCost = pricetag;
    let newCar = id * 1;
    if (purchaseCost <= stars) {
        stars -= purchaseCost;
        document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
        playerGarage.push(newCar);
        buttonID.remove();
    } else {
    }

}