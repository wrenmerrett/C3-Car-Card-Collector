export const button = document.querySelector('[data-collect-card]');
import { playerGarage, loadGarage, playerPrestigeGarage, collectionHandDisplay } from "./playerGarage.js";
import { playerHand, handLoader, getHandCards, totalRQ } from "./playerHand.js";
import { eliteTools, eliteLevels, toolUpdater, populateText, toolAdder, equippedKits } from "./elite.js";
export let money = 100;
let buttonCooldown = 0;
let moneyBonus = 0;
let gachaLuck = 0;
let gachaMod = 0;
let gambleValue = 0;
let gachaStable;
export let restockCost = 0;
export let shopStorage;
let storedGarage;
let storedPrestige;
let storedHand;
let storedTools;
let eliteStorage;
let kitStorage;
let rqLimit = 600;
let heatLevel = 0;
let synergies;
var heatData;
let mechanicValue = 0;
let synswitch = false;
let standardBonus = 1;
let allsurfBonus = 1;
let offroadBonus = 1;
let awdBonus = 1;
let fwdBonus = 1;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

document.getElementById('cashDisplay').innerText = "Cash: $" + money;
document.getElementById('eliteDisplay').innerText = "Elite Tools: " + eliteTools;
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
    localStorage.setItem('etools', JSON.stringify(eliteTools));
    localStorage.setItem('elevels', JSON.stringify(eliteLevels));
    localStorage.setItem('kits', JSON.stringify(equippedKits));
    document.getElementById('saveWarning').innerText = "Game saved."
})

document.getElementById('loadButton').addEventListener('click', () => {
    storedGarage = JSON.parse(localStorage.getItem("garage"));
    storedPrestige = JSON.parse(localStorage.getItem("prestigeGarage"));
    loadGarage(storedGarage,storedPrestige);
    storedHand = JSON.parse(localStorage.getItem('hand'));
    handLoader(storedHand);
    getHandCards(...playerHand);
    collectionHandDisplay();
    money = JSON.parse(localStorage.getItem('cashBalance'));
    restockCost = JSON.parse(localStorage.getItem('restockTracker'));
    document.getElementById('cashDisplay').innerText = "Cash: $" + money;
    shopStorage = JSON.parse(localStorage.getItem('shopCars'));
    restoreShop(shopStorage);
    storedTools = JSON.parse(localStorage.getItem('etools'));
    console.log(storedTools);
    eliteStorage = JSON.parse(localStorage.getItem('elevels'));
    kitStorage = JSON.parse(localStorage.getItem('kits'));
    restoreElite(storedTools, eliteStorage, kitStorage);
    console.log(eliteStorage);
    populateText();
    document.getElementById('saveWarning').innerText = "Game loaded."
})

button.addEventListener('click', () => {
    document.getElementById('RQLimiter').innerText = "";
    if (rqLimit < totalRQ) {
        document.getElementById('RQLimiter').innerText = "Hand too strong. Reduce RQ by " + (totalRQ - rqLimit);
        return;
    } else if (playerHand.length < 5) {
        document.getElementById('RQLimiter').innerText = "Incomplete hand. Check your Collection."
        return;
    } 



    button.disabled = true;
    document.getElementById('saveWarning').innerText = ""
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            data = data.cars;
            standardBonus = 0;
            allsurfBonus = 0;
            offroadBonus = 0;
            awdBonus = 0;
            let gachaMod = 0;
            let gachaLuck = 0 + (heatLevel*62);
            let buttonVar = 0 - (heatLevel * 2.1); 
            console.log(buttonVar);
            let slipstreamBonus = 400;
            let moneyVar = 0 + (heatLevel *22);
            let buttonZero = 0;
            gambleValue = 0;
            document.getElementById('synergyRender').innerHTML = "";
            let makeTracker = [];
            let yearTracker = [];
            let countryTracker = [];
            let driveTracker = [];
            let tyreTracker = [];
            console.log(buttonVar);
            let luckyData = eliteLevels[0]
            let luckyValue = luckyData.baseVal + (luckyData.increment * ((luckyData.level)-1));

            let quickChargeData = eliteLevels[1]
            let quickChargeValue = quickChargeData.baseVal + (quickChargeData.increment * (quickChargeData.level-1));

            let highRollerData = eliteLevels[2]
            let highRollerValue = highRollerData.baseVal + (highRollerData.increment * (highRollerData.level-1));

            let gamblerData = eliteLevels[3]
            let gamblerValue = gamblerData.baseVal + (gamblerData.increment * (gamblerData.level-1));

            let doubleTapData = eliteLevels[4]
            let doubleTapValue = doubleTapData.baseVal + (doubleTapData.increment * (doubleTapData.level-1));

            let refresherData = eliteLevels[5]
            let refresherValue = refresherData.baseVal + (refresherData.increment * (refresherData.level-1));

            let slipstreamData = eliteLevels[6]
            let slipstreamValue = slipstreamData.baseVal + (slipstreamData.increment * (slipstreamData.level-1));

            let standardBearerData = eliteLevels[7]
            let standardBearerValue = standardBearerData.baseVal + (standardBearerData.increment * ((standardBearerData.level)-1));
            console.log(standardBearerValue);
            console.log(standardBearerData);

            let allStarData = eliteLevels[8]
            let allStarValue = allStarData.baseVal + (allStarData.increment * (allStarData.level-1));

            let offTheChainData = eliteLevels[9]
            let offTheChainValue = offTheChainData.baseVal + (offTheChainData.increment * (offTheChainData.level-1));

            let actionTractionData = eliteLevels[10]
            let actionTractionValue = actionTractionData.baseVal + (actionTractionData.increment * (actionTractionData.level-1));

            let frontLineData = eliteLevels[11]
            let frontLineValue = frontLineData.baseVal + (frontLineData.increment * (frontLineData.level-1));

            let mechanicData = eliteLevels[12]
            mechanicValue = mechanicData.baseVal + (mechanicData.increment * (mechanicData.level-1));
            playerHand.forEach(bonusCalcs);
            function bonusCalcs(id) {
                let car = (data[id]);
                if (equippedKits.find(e => e.carID === car.carID)) {
                    let perkIndex = equippedKits.find(e => e.carID === car.carID)
                    car.perk = perkIndex.perk;
                }
                console.log(car.perk);
                buttonVar += (car.zeroToSixty);

                if (car.perk == "Quick Charge") {
                    buttonVar -= ((car.zeroToSixty) * quickChargeValue);
                }
                if (car.perk == "Slipstream") {
                    slipstreamBonus -= (slipstreamValue/car.zeroToSixty);
                }
                if (car.perk == "Double Tap") {
                    let refreshChance = Math.random();
                    refreshChance = refreshChance * 1+(car.topSpeed/1000)
                    console.log(doubleTapValue);
                    if (refreshChance > (1-doubleTapValue)) {
                        buttonZero += 1;
                    }
                }
                moneyVar += (car.handling);
                if (car.perk == "High Roller") {
                    moneyVar += ((car.handling) * highRollerValue);
                    console.log(moneyVar);
                }
                if (car.perk == "Refresher") {
                    restockCost -= refresherValue;
                    if (restockCost <= 0) {
                        restockCost = 0;
                    }
                    document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
                }
                if (car.perk == "Standard Bearer") {
                    standardBonus += standardBearerValue;
                }
                if (car.perk == "All-Star") {
                    allsurfBonus += allStarValue;
                }
                if (car.perk == "Off The Chain") {
                    offroadBonus += offTheChainValue;
                }
                if (car.perk == "Action Traction") {
                    awdBonus += actionTractionValue;
                }
                if (car.perk == "Front Line") {
                    fwdBonus += frontLineValue;
                }
                makeTracker.push(car.make);
                let yearFilter = Math.floor(car.year / 10);
                yearTracker.push(yearFilter);
                countryTracker.push(car.country);
                driveTracker.push(car.drive);
                tyreTracker.push(car.tyres);
                gachaLuck += (car.topSpeed);
                if (car.perk == "Lucky") {
                    gachaLuck += ((car.topSpeed)*luckyValue);
                }
                if (car.perk == "Gambler") {
                    gambleValue += gamblerValue;
                }
            }
            console.log(standardBonus);
            console.log(buttonVar);

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

            let buttonBoost = 0;

            synergies.forEach(synergyPerks);
            function synergyPerks(synergy) {
                if (synergy == 'Standard' && standardBonus > 0) {
                    console.log(standardBearerData);
                    moneyVar = moneyVar + 3.54^(standardBonus);
                    buttonBoost = buttonBoost + 0.92*(standardBonus);
                    gachaLuck = gachaLuck + 3.54^(standardBonus);
                }
                if (synergy == 'All-Surface' && allsurfBonus > 0) {
                    moneyVar = moneyVar + 3.77^(allsurfBonus);
                    buttonBoost = buttonBoost + 0.98*(allsurfBonus);
                    gachaLuck = gachaLuck * 3.97^(allsurfBonus);
                }
                if (synergy == 'Off-Road' && offroadBonus > 0) {
                    moneyVar = moneyVar + 3.80^(offroadBonus);
                    buttonBoost = buttonBoost + 1.01*(offroadBonus);
                    gachaLuck = gachaLuck + 4.00^(offroadBonus);
                }
                if (synergy == '4WD' && awdBonus > 0) {
                    moneyVar = moneyVar + 3.54^(awdBonus);
                    buttonBoost = buttonBoost + 0.9*(awdBonus);
                    gachaLuck = gachaLuck + 3.746^(awdBonus);
                }
                if (synergy == 'FWD' && fwdBonus > 0) {
                    moneyVar = moneyVar + 3.53^(fwdBonus);
                    buttonBoost = buttonBoost + 0.92*(fwdBonus);
                    gachaLuck = gachaLuck + 3.73^(fwdBonus);
                }
            }

            buttonVar -= buttonBoost;

            moneyBonus = Math.round((((moneyVar - 265)/100) + 1)*100)/100;
            buttonCooldown = Math.round((buttonVar * slipstreamBonus))*100/100;
            if (buttonZero > 0) {
                buttonCooldown = 1;
            } else if (buttonCooldown < 1000) {
                let buttonOverflow = buttonCooldown - 999;
                buttonCooldown = 1000;
                money += buttonOverflow;
            };
            gachaMod = Math.round(((1 + (gachaLuck - 400)) / 300)*100)/100;
            gachaStable = gachaMod;
            carPicker();
            document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + buttonCooldown / 1000 + " seconds";
            document.getElementById('earningsBonus').innerHTML = "Earnings Bonus: x" + moneyBonus;
            setTimeout(function () {
                button.disabled = false;
            }, buttonCooldown);
        })
});

export function moneyChanger(transaction) {
    money -= transaction;
    document.getElementById('cashDisplay').innerText = "Cash: $" + money;
    document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
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
    let prestiges = document.querySelectorAll('.prestigebtn');
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
    };
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
        buttonID.remove();
    } else {
        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
    }

}

function restoreElite(tools,levels, kits) {

    toolUpdater(tools);
    if (levels.length > 0) {for (let i = 0; i < levels.length; i++) {
        levels[i].increment = eliteLevels[i].increment;
        levels[i].baseVal = eliteLevels[i].baseVal;
    }};
    
    eliteLevels.splice.apply(eliteLevels, [0, levels.length].concat(levels));
    equippedKits.splice.apply(equippedKits, [0, kits.length].concat(kits));
    populateText();
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
            let eliteNumber = 0;
            var select = document.getElementById("heatSelector");
            document.getElementById('heatSelector').innerText = '';
            for (const key in elites) {
                if(playerGarage.includes(elites[key].carID)) {
                    if (maxHeat < 10)  {
                        let sum = 0;
                        eliteNumber += 1;
                        console.log(eliteNumber);
                        let num = eliteNumber;
                        for (let n=1; sum<=num; n++)
                            {
                                sum = sum + n;
                                if (sum==num) {
                                    maxHeat += 1;
                                    var opt = maxHeat;
                                    var el = document.createElement("option");
                                    el.textContent = opt;
                                    el.value = opt;
                                    select.appendChild(el);
                                }
                                
                            }
                        
                        
                    }
                    let nx = maxHeat + 1;
                    let requirement = (nx*(nx+1)/2) - eliteNumber;
                    if (maxHeat < 10) {
                        document.getElementById('nextText').innerText = "Next Heat Level unlocks with " + requirement + " more Elites";
                    } else if (maxHeat == 10) {
                        document.getElementById('nextText').innerText = "Maximum Heat Level unlocked!";
                    }  else {
                        document.getElementById('nextText').innerText = "Buy an Elite car to unlock Heat.";
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
            let prestigeDupe = false;
            let dupePrestigeChance = 0.1;

            let eliteList = data.filter(data => data.elite === "yes")
            let eliteCount = 0;
            for (const key in eliteList) {
                if(playerGarage.includes(eliteList[key].carID)) {
                    eliteCount += 1;
                }
            };

            data = data.filter(c => c.elite !== "yes");

            document.getElementById('luckFactor').innerHTML = "Luck Factor: " + gachaStable;
            let basegacha = Math.floor(Math.random() * 100) + 1;
            let gacha = basegacha * gachaStable;
            if (gacha < 28) {
                var carSelection = data.filter(data => data.rarity === 1);
            } else
            if (gacha < 55) {
                var carSelection = data.filter(data => data.rarity === 2);
            } else
            if (gacha < 88) {
                var carSelection = data.filter(data => data.rarity === 3);
            } else
            if (gacha < 115) {
                var carSelection = data.filter(data => data.rarity === 4);
            } else
            if (gacha < 155) {
                var carSelection = data.filter(data => data.rarity === 5);
            } else
            if (gacha < 200) {
                var carSelection = data.filter(data => data.rarity === 6);
                prestigeDupe = true;
            } else {
                var carSelection = data.filter(data => data.rarity === 7);
                prestigeDupe = true;
                                }

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
            money += Math.floor(Math.random() * 500 * (gachaStable) * (gambleValue));
            for (let r = 0; r < eliteCount; r++) {
                let toolGachaBase = Math.random();
                let toolGachaMod = toolGachaBase * mechanicValue;
                if (toolGachaMod > 0.96) {
                    toolAdder(1);
                    document.getElementById('eliteDisplay').innerText = "Elite Tools: " + eliteTools;
                } 
            }
            document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            if (playerGarage.includes(garageAdd)) {
                money += Math.round((chosenCar.rarity * chosenCar.rq) * moneyBonus);
                document.getElementById('cashDisplay').innerText = "Cash: $" + money;
                let prestigeRoll = Math.random();
                dupePrestigeChance = 0.1 * gachaStable;
                if (playerPrestigeGarage.includes(garageAdd)) {
                    money += Math.round((chosenCar.rarity * chosenCar.rq) * moneyBonus);
                }
                else if (prestigeRoll < dupePrestigeChance && prestigeDupe === true) {
                    playerPrestigeGarage.push(garageAdd);
                    document.getElementById('newCardPopup').innerText = "PRESTIGE DUPE!";
                } 

            } else { playerGarage.unshift(garageAdd);
            document.getElementById('newCardPopup').innerText = "NEW!";}
            document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}