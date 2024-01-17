'use strict';

import { buttonClicks, money, moneyChanger, populateStats } from "./app.js";
import { toolAdder, eliteTools } from "./elite.js";
import { ownedButton } from "./shop.js";
import { playerGarage, playerPrestigeGarage, collectionHandDisplay } from "./playerGarage.js";

const activeSlots = document.querySelectorAll('.activeBox');
const trackerSlots = document.querySelectorAll('.trackerBox');
activeSlots.forEach(tab => tab.addEventListener('click', activateSlot));

console.log(trackerSlots);

export let slotQuantity = 1;
let activeContracts = 0;
export let stars = 0;
let starRestocker = document.getElementById('starRestock');

export let slotsActivated = [false, false, false];

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
        "missionDesc": "Refresh the Dealership 10 times",
        "targetValue": 10,
        "difficulty": 1
    },
    {
        "missionID": 'c3',
        "missionName": "Lucky Collector",
        "missionDesc": "Collect 40 times with a Luck Factor over 1.2",
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
        "missionDesc": "Collect 100 times with 3+ FWD cars in hand",
        "targetValue": 100,
        "difficulty": 2
    },
    {
        "missionID": 'c7',
        "missionName": "Standardised",
        "missionDesc": "Collect 100 times with 3+ Standard-tyre cars in hand",
        "targetValue": 100,
        "difficulty": 2
    },
    {
        "missionID": 'c8',
        "missionName": "Quick Collector",
        "missionDesc": "Collect 40 times with a Collect Cooldown under 12.5 seconds",
        "targetValue": 40,
        "difficulty": 1
    },
    {
        "missionID": 'c9',
        "missionName": "Four Up",
        "missionDesc": "Collect 100 times with 3+ 4WD cars in hand",
        "targetValue": 100,
        "difficulty": 2
    },
    {
        "missionID": 'c10',
        "missionName": "Elite Collector",
        "missionDesc": "Collect 150 times with an Elite car in hand",
        "targetValue": 150,
        "difficulty": 3
    },
    {
        "missionID": 'c11',
        "missionName": "Czech Me Out",
        "missionDesc": "Collect 175 times with 3+ Czech cars in hand",
        "targetValue": 175,
        "difficulty": 4
    },
    {
        "missionID": 'c12',
        "missionName": "Amateur Earner",
        "missionDesc": "Earn $15,000 from collecting",
        "targetValue": 15000,
        "difficulty": 2
    },
    {
        "missionID": 'c13',
        "missionName": "Big Earner",
        "missionDesc": "Earn $100,000 from collecting",
        "targetValue": 100000,
        "difficulty": 3
    },
    {
        "missionID": 'c14',
        "missionName": "Moneybags",
        "missionDesc": "Earn $750,000 from collecting",
        "targetValue": 750000,
        "difficulty": 4
    },
    {
        "missionID": 'c15',
        "missionName": "Aussie Aussie Aussie",
        "missionDesc": "Collect 175 times with 3+ Australian cars in hand",
        "targetValue": 175,
        "difficulty": 4
    },
    {
        "missionID": 'c16',
        "missionName": "Need for Swede",
        "missionDesc": "Collect 175 times with 3+ Swedish cars in hand",
        "targetValue": 175,
        "difficulty": 4
    },
    {
        "missionID": 'c17',
        "missionName": "Indecisive",
        "missionDesc": "Spend $15,000 on Dealership  refreshes",
        "targetValue": 15000,
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
        "missionDesc": "Reduce the Dealership refresh cost to $0 15 times",
        "targetValue": 15,
        "difficulty": 3
    },
    {
        "missionID": 'c20',
        "missionName": "Seoul Mates",
        "missionDesc": "Collect 175 times with 3+ South Korean cars in hand",
        "targetValue": 175,
        "difficulty": 4
    },
    {
        "missionID": 'c21',
        "missionName": "Rapid Fire",
        "missionDesc": "Activate Double Tap 100 times",
        "targetValue": 100,
        "difficulty": 3
    },
    {
        "missionID": 'c22',
        "missionName": "Impossible Isn't French",
        "missionDesc": "Collect 150 times with 3+ French cars in hand",
        "targetValue": 150,
        "difficulty": 3
    },
    {
        "missionID": 'c23',
        "missionName": "Crouching Tiger, Hidden Dragon",
        "missionDesc": "Collect 175 times with 3+ Chinese cars in hand",
        "targetValue": 150,
        "difficulty": 4
    },
    {
        "missionID": 'c24',
        "missionName": "My Other Job is Delivering Tofu",
        "missionDesc": "Collect 125 times with 3+ Japanese cars in hand",
        "targetValue": 125,
        "difficulty": 2
    },
    {
        "missionID": 'c25',
        "missionName": "American Rush",
        "missionDesc": "Collect 125 times with 3+ American cars in hand",
        "targetValue": 125,
        "difficulty": 2
    },
    {
        "missionID": 'c26',
        "missionName": "British Racing Green",
        "missionDesc": "Collect 175 times with 3+ British cars in hand",
        "targetValue": 175,
        "difficulty": 3
    },
    {
        "missionID": 'c27',
        "missionName": "Ruhr of Engines",
        "missionDesc": "Collect 150 times with 3+ German cars in hand",
        "targetValue": 150,
        "difficulty": 2
    },
    {
        "missionID": 'c28',
        "missionName": "P Rank",
        "missionDesc": "Collect 175 times with 3+ Italian cars in hand",
        "targetValue": 175,
        "difficulty": 3
    },
    {
        "missionID": 'c29',
        "missionName": "I Solve Practical Problems",
        "missionDesc": "Install 3 Elite Kits",
        "targetValue": 3,
        "difficulty": 3
    },
    {
        "missionID": 'c30',
        "missionName": "Insult to Injury",
        "missionDesc": "Install an Overheat Elite Kit on a Zenvo or Mazda",
        "targetValue": 1,
        "difficulty": 3
    },
    {
        "missionID": 'c31',
        "missionName": "Average OEM Business Plan",
        "missionDesc": "Install 3 Quick Charge Elite Kits on All-Surface-tyre cars",
        "targetValue": 3,
        "difficulty": 4
    },
    {
        "missionID": 'c32',
        "missionName": "Golden Era",
        "missionDesc": "Collect 150 times with 3+ 1990s cars in your hand",
        "targetValue": 150,
        "difficulty": 3
    },
    {
        "missionID": 'c33',
        "missionName": "Early Adopter",
        "missionDesc": "Collect 125 times with 3+ 2020s cars in your hand",
        "targetValue": 125,
        "difficulty": 2
    },
    {
        "missionID": 'c34',
        "missionName": "Back to the Past",
        "missionDesc": "Collect 175 times with 3+ 1980s cars in your hand",
        "targetValue": 175,
        "difficulty": 4
    },
    {
        "missionID": 'c35',
        "missionName": "Button Blitz",
        "missionDesc": "Collect 225 times with a Collect Cooldown under 2 seconds",
        "targetValue": 225,
        "difficulty": 4
    }
];

export const milestones = [
    {
        "milestoneID": 'm1',
        "milestoneName": 'Button Masher',
        "milestoneDesc": 'Click the Collect button 500 times',
        "targetValue": 500,
        "rewardCar": 910,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm2',
        "milestoneName": 'Mansion Apartment Shack House',
        "milestoneDesc": 'Click the Collect button 10,000 times',
        "targetValue": 10000,
        "rewardCar": 924,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm3',
        "milestoneName": 'Monster Mash',
        "milestoneDesc": 'Click the Collect button 666,666 times',
        "targetValue": 666666,
        "rewardCar": 926,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm4',
        "milestoneName": 'Millionaire',
        "milestoneDesc": 'Have $1,000,000 in your account',
        "targetValue": 1000000,
        "rewardCar": 918,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm5',
        "milestoneName": 'Filthy Rich',
        "milestoneDesc": 'Have $50,000,000 in your account',
        "targetValue": 50000000,
        "rewardCar": 906,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm6',
        "milestoneName": 'Ready the Guillotine',
        "milestoneDesc": 'Have $1 billion in your account',
        "targetValue": 100000000,
        "rewardCar": 916,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm7',
        "milestoneName": 'Gonna Need A Bigger Garage',
        "milestoneDesc": 'Own 100 cars',
        "targetValue": 100,
        "rewardCar": 920,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm8',
        "milestoneName": 'Slot Machine',
        "milestoneDesc": 'Own 500 cars',
        "targetValue": 500,
        "rewardCar": 917,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm9',
        "milestoneName": 'Fully Upgraded Garage',
        "milestoneDesc": '0wn 969 cars',
        "targetValue": 969,
        "rewardCar": 902,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm10',
        "milestoneName": 'Elite Heat Agent',
        "milestoneDesc": 'Own 55 Elite cars',
        "targetValue": 55,
        "rewardCar": 925,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm11',
        "milestoneName": 'Not Quite 1337',
        "milestoneDesc": 'Own 137 Elite cars',
        "targetValue": 137,
        "rewardCar": 905,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm12',
        "milestoneName": 'Elite Dangerous',
        "milestoneDesc": '0wn 200 Elite cars',
        "targetValue": 200,
        "rewardCar": 922,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm13',
        "milestoneName": 'Almost Sub-Zero',
        "milestoneDesc": 'Have a hand with a Collect Cooldown at the 1-second cap',
        "targetValue": 1000,
        "rewardCar": 919,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm14',
        "milestoneName": 'Stack the Deck',
        "milestoneDesc": 'Have a hand with a Luck Factor over 3.25',
        "targetValue": 3.25,
        "rewardCar": 937,
        "icon": '',
        "complete": false
    },
    {
        "milestoneID": 'm15',
        "milestoneName": 'An Honest Living',
        "milestoneDesc": 'Have a hand with an Earnings Bonus over 4',
        "targetValue": 4,
        "rewardCar": 921,
        "icon": '',
        "complete": false
    }
]

export const contractBGColours = ["rgba(60, 179, 113, 0.45)","rgba(0, 0, 255, 0.45)","rgba(255, 165, 0, 0.45)","rgba(238, 130, 238, 0.45)"];



window.onload = populateContracts(), populateStarShop(), populateMilestones;

export function saveParser(st,ms,sc,at) {
    stars = st;
    contractTrackers = at;
    for (let t = 0; t < milestones.length; t++) {
        if (ms[t].complete === true && milestones[t].complete !== true) {
            milestones[t].complete === true
        };
    };
    for (let s = 0; s < 4; s++) {
        if (sc[s] === true && slotsActivated[s] !== true) {
            slotsActivated[s] = true
            let slotToActivate = "active" + (s + 2);
            let chosenSlot = document.getElementById(slotToActivate);
            chosenSlot.innerHTML = "Active Slot " + (s+2);
            slotQuantity += 1;
            chosenSlot.removeEventListener('click', activateSlot);
        }
    };
};

export function populateContracts() {
    document.getElementById('contractGrid').innerHTML = "";
    document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
    for (let contNo = 1; contNo < 5; contNo++) {
        const contractSelect = contracts.filter(c => c.difficulty === contNo);
        let newContract = contractSelect[Math.floor(Math.random() * contractSelect.length)];
        console.log(newContract);
        let contractContainer = document.getElementById('contractGrid');
        var contractTab = document.createElement('div');
        let contractReward = document.createElement('span');
        if (contNo === 4) {
            contractReward.innerHTML = "1500 Elite Tools, " + contNo + " Stars";
        } else {
            contractReward.innerHTML = 250 * Math.pow(10, contNo) + " Cash, " + contNo + " Stars";
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
        let controller = new AbortController;
        let { signal } = controller;
        contractTab.addEventListener('click', () => {
            
            contractActivator(contractID,newContract,contractContent,contractColour,contractTarget, controller);
        }, { signal });
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
        slotsActivated[0] = true;
    }
    if (activatingSlot === 'active3' && money >= 125000 && eliteTools >= 100) {
        
        chosenSlot.innerHTML = "Active Slot 3";
        slotQuantity += 1;
        chosenSlot.removeEventListener('click', activateSlot);
        moneyChanger(125000);
        toolAdder(-100);
        slotsActivated[1] = true;
    }
    if (activatingSlot === 'active4' && money >= 1000000 && eliteTools >= 1000) {
        
        chosenSlot.innerHTML = "Active Slot 4";
        slotQuantity += 1;
        chosenSlot.removeEventListener('click', activateSlot);
        moneyChanger(1000000);
        toolAdder(-1000);
        slotsActivated[2] = true;
    }
}

export function contractActivator(ID,contract,tab, colour, target, control) {
    
    
    let contractid = document.getElementById(ID)
    let openSlots = slotQuantity - activeContracts
    if (openSlots > 0) {
        contractid.innerHTML = "Complete previous contract to refresh.";
        let possibleSlots = document.querySelectorAll('.activeBox');
        for (let s = 0; s < possibleSlots.length; s++) {
            if (possibleSlots[s].innerHTML.startsWith('Active')) {
                let contractSlot = possibleSlots[s]; 
                contractAdder(contractSlot);
                control.abort();
                break;
            }
        }
        function contractAdder(slot) {
            activeContracts += 1;
            let slotID = slot.id
            let trackingSlot = contractTrackers.findIndex(t => t.trackerSlot === slotID);
            slot.innerHTML = tab;
            slot.style.backgroundColor = colour;
            let trackerTile = document.getElementById(slotID).nextElementSibling;
            console.log(contractTrackers[trackingSlot].currentVal);
            trackerTile.innerHTML = "Progress: " + contractTrackers[trackingSlot].currentVal + " / " + target;
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
        let payout = 1500;
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
            contractReward.innerHTML = "1500 Elite Tools, " + diff + " Stars";
        } else {
            contractReward.innerHTML = 250 * Math.pow(10, diff) + " Cash, " + diff + " Stars";
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

starRestocker.addEventListener('click', () => {
    if (stars > 0) {
        stars -= 1;
        document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
        document.getElementById('starShopGrid').innerText = "";
        populateStarShop();
    }

}
);

export function populateStarShop() {
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
    let price = car.rarity * 7;
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
        let pricetag = starBuyButton(car.carID, price, car.perk)
        shopCard.appendChild(pricetag);
    }
    starContainer.append(shopCard);
}


   

function starBuyButton(id, price, perk) {
    let buybtn = document.createElement('button');
    buybtn.id = id;
    buybtn.classList.add('starbtn'); // Use classList to add a class
    buybtn.innerHTML = "BUY: " + price + " Stars - " + perk; 
    buybtn.addEventListener('click', () => {
        buyStarCar(buybtn.id, price);
    });
    return buybtn;
};

function starPrestigeButton(id, price) {
    let pbtn = document.createElement('button');
    pbtn.id = id;
    pbtn.classList.add('prestigebtn'); // Use classList to add a class
    pbtn.innerHTML = "PRESTIGE: " + price + " Stars";
    pbtn.addEventListener('click', () => {
        prestigeStarCar(pbtn.id, price);
    });
    return pbtn;
}

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

function prestigeStarCar(id,pricetag) {
    let buttonID = document.getElementById(id);
    let purchaseCost = pricetag;
    let prestigedCar = id * 1;
    if (purchaseCost <= money) {
        stars -= purchaseCost;
        document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
        playerPrestigeGarage.push(prestigedCar);
        collectionHandDisplay();
        buttonID.remove();
    } else {
        
    }

}

export function populateMilestones() {
    let tabPopulator = document.getElementById('milestonesGrid');
    tabPopulator.innerHTML = "";
    milestones.forEach(element => {
        let id = element.milestoneID;
        
        
        const milestoneDiv = document.createElement('div');
        const milestoneImg = document.createElement('img');
        milestoneImg.src = "./assets/cards/" + element.rewardCar + ".png";
        
        milestoneDiv.append(milestoneImg);
        if (element.complete === true) {
            CompletionTag();
            function CompletionTag() {
                let completeMarker = document.createElement('button');
                completeMarker.id = id;
                completeMarker.classList.add('completebtn'); // Use classList to add a class
                completeMarker.innerHTML = "COMPLETE - CAR CLAIMED";
                
                milestoneDiv.appendChild(completeMarker);
            }
        } else {
            milestoneTag();
            function milestoneTag() {
                let mileMarker = document.createElement('button');
                mileMarker.id = id;
                mileMarker.classList.add('milebtn'); // Use classList to add a class
                mileMarker.innerHTML = element.milestoneName + " - " + element.milestoneDesc;
                
                milestoneDiv.appendChild(mileMarker);
            };
        };
        tabPopulator.appendChild(milestoneDiv);
        
    });
};