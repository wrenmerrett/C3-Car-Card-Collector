export const button = document.querySelector('[data-collect-card]');
import { playerGarage, loadGarage, playerPrestigeGarage } from "./playerGarage.js";
import { playerHand, handLoader, getHandCards, totalRQ } from "./playerHand.js";
export let money = 100;
let buttonCooldown = 0;
let moneyBonus = 0;
let gachaLuck = 0;
export let restockCost = 0;
export let shopStorage;
let storedGarage;
let storedPrestige;
let storedHand;
let rqLimit = 500;
let heatLevel = 0;
let synergies;
var heatData;
let synswitch = false;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

document.getElementById('cashDisplay').innerText = "Cash: $" + money;
document.getElementById('saveButton').addEventListener('click', () => {
    let shop = document.getElementById('shopGrid');
    shopStorage = shop.innerHTML;
    if (shopStorage.length === 0) {
        document.getElementById('saveWarning').innerText = "No saveable data detected. Aborting."
        return;
    };
    localStorage.setItem("garage", JSON.stringify(playerGarage));
    localStorage.setItem("prestigeGarage", JSON.stringify(playerPrestigeGarage));
    localStorage.setItem('hand', JSON.stringify(playerHand));
    localStorage.setItem('cashBalance', JSON.stringify(money));
    localStorage.setItem('restockTracker', JSON.stringify(restockCost));
    localStorage.setItem('shopCars', JSON.stringify(shopStorage));
    document.getElementById('saveWarning').innerText = "Game saved."
})

document.getElementById('loadButton').addEventListener('click', () => {
    storedGarage = JSON.parse(localStorage.getItem("garage"));
    storedPrestige = JSON.parse(localStorage.getItem("prestigeGarage"));
    loadGarage(storedGarage,storedPrestige);
    storedHand = JSON.parse(localStorage.getItem('hand'));
    handLoader(storedHand);
    getHandCards(...playerHand);
    money = JSON.parse(localStorage.getItem('cashBalance'));
    restockCost = JSON.parse(localStorage.getItem('restockTracker'));
    document.getElementById('cashDisplay').innerText = "Cash: $" + money;
    shopStorage = JSON.parse(localStorage.getItem('shopCars'));
    restoreShop(shopStorage);
    document.getElementById('saveWarning').innerText = "Game loaded."
})

button.addEventListener('click', () => {
    document.getElementById('RQLimiter').innerText = "";
    if (rqLimit < totalRQ) {
        document.getElementById('RQLimiter').innerText = "Hand too strong. Reduce RQ by " + (totalRQ - rqLimit);
        return;
    }
    button.disabled = true;
    document.getElementById('saveWarning').innerText = ""
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            data = data.cars;
            let buttonVar = 0 - (heatLevel * 2.5); 
            let slipstreamBonus = 400;
            let moneyVar = 0 + (heatLevel *22);
            let buttonZero = 0;
            document.getElementById('synergyRender').innerHTML = "";
            playerHand.forEach(bonusCalcs);
            function bonusCalcs(id) {
                let car = (data[id]);
                buttonVar += (car.zeroToSixty);
                if (car.perk == "Quick Charge") {
                    buttonVar -= ((car.zeroToSixty) * 0.45);
                }
                if (car.perk == "Slipstream") {
                    slipstreamBonus -= (105/car.zeroToSixty);
                }
                if (car.perk == "Double Tap") {
                    let refreshChance = Math.random();
                    refreshChance = refreshChance * 1+(car.topSpeed/1000)
                    if (refreshChance > 0.93) {
                        buttonZero += 1;
                    }
                }
                moneyVar += (car.handling);
                if (car.perk == "High Roller") {
                    moneyVar += ((car.handling) * 0.40);
                }
                if (car.perk == "Refresher") {
                    restockCost -= 10;
                    document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
                }
            }
            moneyBonus = Math.round((((moneyVar - 265)/100) + 1)*100)/100;
            buttonCooldown = Math.round((buttonVar * slipstreamBonus))*100/100;
            if (buttonZero > 0) {
                buttonCooldown = 1;
            }
            carPicker();
            document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + buttonCooldown / 1000 + " seconds"
            document.getElementById('earningsBonus').innerHTML = "Earnings Bonus: x" + moneyBonus;
            setTimeout(function () {
                button.disabled = false;
            }, buttonCooldown);
        })
});

export function moneyChanger(transaction) {
    money -= transaction;
    document.getElementById('cashDisplay').innerText = "Cash: $" + money;
}

export function restockUp() {
    moneyChanger(restockCost);
    restockCost += 150;
}

export function restockDown(cashback) {
    restockCost -= cashback;
    if (restockCost < 0) {
        restockCost = 0;
    };
}

function restoreShop(shopData) {
    document.getElementById('shopGrid').innerHTML = shopData;
    let buttons = document.querySelectorAll('.buybtn, .elitebtn');
    let prestiges = document.querySelectorAll('.pbtn');
    buttons.forEach(restorePurchase);
    function restorePurchase(btn) {
        let str = btn.innerText;
        let price = str.replace(/\D/g, "");
        btn.addEventListener('click', () => {
            buyCar(btn.id, price);
        });
    };
    prestiges.forEach(restorePrestige);
    function restorePrestige(btn) {
        let str = btn.innerText;
        let price = str.replace(/\D/g, "");
        btn.addEventListener('click', () => {
            prestigeCar(btn.id, price);
        });
    }
}

function buyCar(id,pricetag) {
    let buttonID = document.getElementById(id);
    let purchaseCost = pricetag;
    let newCar = id * 1;
    if (purchaseCost <= money) {
        document.getElementById("brokeMessage").innerText = "Thanks for your purchase!";
        moneyChanger(purchaseCost);
        playerGarage.push(newCar);
        buttonID.remove();
    } else {
        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
    }

}

function prestigeCar(id,pricetag) {
    let buttonID = document.getElementById(id);
    let purchaseCost = pricetag;
    let prestigedCar = id * 1;
    if (purchaseCost <= money) {
        document.getElementById("brokeMessage").innerText = "Thanks for your purchase!";
        moneyChanger(purchaseCost);
        let reimburse = Math.round((purchaseCost * 0.075));
        restockDown(reimburse);
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
        playerPrestigeGarage.push(prestigedCar);
        console.log(playerPrestigeGarage);
        buttonID.remove();
    } else {
        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
    }

}

document.getElementById('synergySwitch').addEventListener('click', () => {
    const synergyOn = document.getElementById('synergySwitch').checked;
    if (synergyOn === true) {
        synswitch = true;
    } else {
        synswitch = false;
    }
        
})

document.getElementById('heatSwitch').addEventListener('click', () => {
    const heatOn = document.getElementById('heatSwitch').checked;
    if (heatOn === true) {
        fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            document.getElementById('newCardPopup').innerText = "";
            heatData = data.cars;
            let elites = heatData.filter(heatData => heatData.elite === "yes")
            let maxHeat = 0;
            var select = document.getElementById("heatSelector");
            document.getElementById('heatSelector').innerText = '';
            for (const key in elites) {
                if(playerGarage.includes(elites[key].carID)) {
                    if (maxHeat < 10)  {
                        maxHeat += 1;
                        var opt = maxHeat;
                        var el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        select.appendChild(el);
                    }
                }
            }
            document.getElementById('heatSelector').addEventListener('click', () => {
                let selectList1 = document.getElementById('heatSelector');
                heatLevel = selectList1.value;
                heatApply(heatLevel);
                function heatApply(heat) {
                    rqLimit = 500 - (heat*40);
                    document.getElementById('heatText').innerText = "RQ Limit: " + rqLimit;
                }
            });
        })
    } else {
        document.getElementById('heatText').innerHTMl = "";
        heatLevel = 0;
        rqLimit = 500;
    };
})

// Read file asynchronously
function carPicker() {
    // Assuming data.json contains your JSON data
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            document.getElementById('newCardPopup').innerText = "";
            data = data.cars;
            gachaLuck = 0 + (heatLevel*62);
            let gambleValue = 0;
            let makeTracker = [];
            let yearTracker = [];
            let countryTracker = [];
            let driveTracker = [];
            let tyreTracker = [];
            playerHand.forEach(bonusAdder);
            function bonusAdder(id) {
                let car = (data[id]);
                makeTracker.push(car.make);
                let yearFilter = Math.floor(car.year / 10);
                yearTracker.push(yearFilter);
                countryTracker.push(car.country);
                driveTracker.push(car.drive);
                tyreTracker.push(car.tyres);
                gachaLuck += (car.topSpeed);
                if (car.perk == "Lucky") {
                    gachaLuck += ((car.topSpeed)*0.25);
                }
                if (car.perk == "Gambler") {
                    gambleValue += 1;
                }
            };
            data = data.filter(c => c.elite !== "yes");
            let gachaMod = Math.round(((1 + (gachaLuck - 410)) / 300)*100)/100;
            document.getElementById('luckFactor').innerHTML = "Luck Factor: " + gachaMod;
            let basegacha = Math.floor(Math.random() * 100) + 1;
            let gacha = basegacha * gachaMod;
            if (gacha < 25) {
                var carSelection = data.filter(data => data.rarity === 1);
            } else
            if (gacha < 50) {
                var carSelection = data.filter(data => data.rarity === 2);
            } else
            if (gacha < 80) {
                var carSelection = data.filter(data => data.rarity === 3);
            } else
            if (gacha < 105) {
                var carSelection = data.filter(data => data.rarity === 4);
            } else
            if (gacha < 145) {
                var carSelection = data.filter(data => data.rarity === 5);
            } else
            if (gacha < 190) {
                var carSelection = data.filter(data => data.rarity === 6);
            } else {
                var carSelection = data.filter(data => data.rarity === 7);
                                }

            synergies = [];
            let makeSorted = makeTracker.sort();
            let yearSorted = yearTracker.sort();
            let countrySorted = countryTracker.sort();
            let driveSorted = driveTracker.sort();
            let tyreSorted = tyreTracker.sort()
            let sorted = makeSorted.concat(yearSorted,countrySorted,driveSorted,tyreSorted)
            

            for (let index in sorted) {
                if (sorted[index] === sorted[index - 2]) {
                    synergies.push(sorted[index]);
                }
            };
            if (synswitch === true) {
                synergies.forEach(synergyBonus);
                function synergyBonus(synergy) {
                let synergyContainer = document.getElementById('synergyRender');
                const synergyTile = document.createElement('div');
                synergyTile.class = 'synergyGrid';
                if (Number.isInteger(synergy) == true) {
                    synergyTile.innerText = synergy + "0s";
                } else {synergyTile.innerText = synergy;}
                synergyContainer.append(synergyTile);
                let focus = Math.random();
                const filteredItems = carSelection.filter(item => `${item.make} ${item.year} ${item.country} ${item.drive} ${item.tyres}`.includes(synergy));
                if (focus > 0.75 && filteredItems.length > 0) {
                    carSelection = filteredItems;
                }
                    }
            }
            
            var chosenCar = carSelection[Math.floor(Math.random() * carSelection.length)];
            var carImage = chosenCar.imageID
            document.getElementById('newestCard').innerHTML = `<img src="assets/cards/${carImage}" id="imageBox"//>`
            var garageAdd = chosenCar.carID;
            money += Math.round(moneyBonus * (30 + playerPrestigeGarage.length));
            money += (Math.floor((Math.random() * (gachaLuck/2)) * gambleValue));
            document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            if (playerGarage.includes(garageAdd)) {
                money += Math.round((chosenCar.rarity * chosenCar.rq) * moneyBonus);
                document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            } else { playerGarage.unshift(garageAdd);
            document.getElementById('newCardPopup').innerText = "NEW!";}
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}