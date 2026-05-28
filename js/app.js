export const button = document.querySelector('[data-collect-card]');
import { playerGarage, loadGarage, playerPrestigeGarage, collectionHandDisplay } from "./playerGarage.js";
import { playerHand, handLoader, getHandCards, totalRQ } from "./playerHand.js";
import { eliteTools, eliteLevels, toolUpdater, populateText, toolAdder, equippedKits } from "./elite.js";
import { shopUpgrades, shopgrades } from "./shop.js";
import { contracts, contractTrackers, completeContract, milestones, populateMilestones, stars, slotsActivated, saveParser, contractBGColours, populateContracts, activeContracts, slotQuantity, activeContractTracker, completeMilestone, buyStarCar } from "./missions.js";
import {playerPrestigeBank,playerPrestigeCoins,playerPrestigeLevel, playerPermGarage, restorePrestige, unbreakPrestige, bankCoins} from "./prestige.js";
export var money = 100;
export var buttonClicks = 0;
let buttonCooldown = 0;
let moneyBonus = 0;
let gachaLuck = 0;
let gachaMod = 0;
let gambleValue = 0;
let gachaStable;
export var restockCost = 0;
export let shopStorage;
let storedGarage;
let storedPrestige;
let storedHand;
let storedTools;
let eliteStorage;
let kitStorage;
let shopUpgradeStorage;
let contractStorage;
let activeStorage;
let starShopStorage;
let milestoneParser;
let starParser;
let slotsParser;
let completedContracts = 0;
let eliteUpgraded = 0;
let bankStorage;
let coinsStorage;
let levelStorage;
let permStorage;
let rqLimit = 600;
let heatLevel = 0;
let synergies;
var heatData;
let mechanicValue = 0;
let synswitch = false;
let standardBonus = 1;
let allsurfBonus = 1;
let offroadBonus = 1;
let awdBonus = 0;
let fwdBonus = 0;
let mechanicBoost = 0;
let heatSinkBonus = 0;
let timeWarpFactor = 0;
let patriotBonus = 0;
let eliteTracker = false;
let moneyCheck = 0;
let moneyDiff = 0;
let rarityCheck;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

document.getElementById('cashDisplay').innerText = "Cash: $" + money;
document.getElementById('eliteDisplay').innerText = "Elite Tools: " + eliteTools;
document.getElementById('saveButton').addEventListener('click', () => {
    let shop = document.getElementById('shopGrid');
    shopStorage = shop.innerHTML;
    console.log(shopStorage);
    if (shopStorage.length === 0) {
        document.getElementById('saveWarning').innerText = "No saveable data detected. Aborting."
        return;
    };
    let contracts = document.getElementById('contractGrid');
    contractStorage = contracts.innerHTML;
    console.log(contractStorage);
    let starCars = document.getElementById('starShopGrid');
    starShopStorage = starCars.innerHTML;
    localStorage.setItem("garage", JSON.stringify(playerGarage));
    localStorage.setItem("prestigeGarage", JSON.stringify(playerPrestigeGarage));
    localStorage.setItem('hand', JSON.stringify(playerHand));
    localStorage.setItem('cashBalance', JSON.stringify(money));
    localStorage.setItem('restockTracker', JSON.stringify(restockCost));
    localStorage.setItem('shopCars', JSON.stringify(shopStorage));
    localStorage.setItem('etools', JSON.stringify(eliteTools));
    localStorage.setItem('elevels', JSON.stringify(eliteLevels));
    localStorage.setItem('kits', JSON.stringify(equippedKits));
    localStorage.setItem('upgradesDone',JSON.stringify(eliteUpgraded));
    localStorage.setItem('shopUpgrades', JSON.stringify(shopUpgrades));
    localStorage.setItem('contracts', JSON.stringify(contractStorage));
    localStorage.setItem('activecont', JSON.stringify(contractTrackers));
    localStorage.setItem('starcars', JSON.stringify(starShopStorage));
    localStorage.setItem('milestones', JSON.stringify(milestones));
    localStorage.setItem('stars', JSON.stringify(stars));
    localStorage.setItem('clicks', JSON.stringify(buttonClicks));
    localStorage.setItem('completedContracts',JSON.stringify(completedContracts));
    localStorage.setItem('contractSlots', JSON.stringify(slotsActivated));
    localStorage.setItem('permGarage', JSON.stringify(playerPermGarage));
    localStorage.setItem('prestigeBank', JSON.stringify(playerPrestigeBank));
    localStorage.setItem('prestigeCoins',JSON.stringify(playerPrestigeCoins));
    localStorage.setItem('prestigeLevel',JSON.stringify(playerPrestigeLevel));
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
    shopUpgradeStorage = JSON.parse(localStorage.getItem('shopUpgrades'));
    restoreShop(shopStorage, shopUpgradeStorage);
    storedTools = JSON.parse(localStorage.getItem('etools'));
    eliteStorage = JSON.parse(localStorage.getItem('elevels'));
    kitStorage = JSON.parse(localStorage.getItem('kits'));
    eliteUpgraded = JSON.parse(localStorage.getItem('upgradesDone'));
    restoreElite(storedTools, eliteStorage, kitStorage);
    populateText();
    contractStorage = JSON.parse(localStorage.getItem('contracts'));
    activeStorage = JSON.parse(localStorage.getItem('activecont'));
    completedContracts = JSON.parse(localStorage.getItem('completedContracts'));
    starShopStorage = JSON.parse(localStorage.getItem('starcars'));
    milestoneParser = JSON.parse(localStorage.getItem('milestones'));
    starParser = JSON.parse(localStorage.getItem('stars'));
    buttonClicks = JSON.parse(localStorage.getItem('clicks'));
    slotsParser = JSON.parse(localStorage.getItem('contractSlots'));
    restoreMissions(contractStorage, activeStorage, starShopStorage, milestoneParser, starParser,slotsParser);
    permStorage = JSON.parse(localStorage.getItem('permGarage'));
    bankStorage = JSON.parse(localStorage.getItem('prestigeBank'));
    coinsStorage = JSON.parse(localStorage.getItem('prestigeCoins'));
    levelStorage = JSON.parse(localStorage.getItem('prestigeLevel'));
    restorePrestige( bankStorage,coinsStorage,levelStorage,permStorage);
    document.getElementById('saveWarning').innerText = "Game loaded."
})

button.addEventListener('click', () => {
    document.getElementById('RQLimiter').innerText = "";
    
    heatApply(heatLevel);


    button.disabled = true;
    buttonClicks += 1;
    if (buttonClicks >= 500 && milestones[0].complete !== true)
    {
        completeMilestone(0);
    }
    if (buttonClicks >= 10000 && milestones[1].complete !== true)
    {
        completeMilestone(1);
    }
    if (buttonClicks >= 123456 && milestones[2].complete !== true)
    {
        completeMilestone(2);
    }
    document.getElementById('saveWarning').innerText = ""
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            data = data.cars;
            eliteTracker = false;
            standardBonus = 0;
            allsurfBonus = 0;
            offroadBonus = 0;
            awdBonus = 0;
            fwdBonus = 0;
            mechanicBoost = 1;
            heatSinkBonus = 0;
            timeWarpFactor = 0;
            patriotBonus = 0;
            let gachaMod = 0;
            let gachaLuck = 0 + (heatLevel*55);
            let buttonVar = 0 - (heatLevel * 1.9); 
            let slipstreamBonus = 380;
            let moneyVar = 0 + (heatLevel *22);
            let buttonZero = 0;
            let timeWarpYear = 0;
            gambleValue = 0;
            document.getElementById('synergyRender').innerHTML = "";
            let makeTracker = [];
            let yearTracker = [];
            let countryTracker = [];
            let driveTracker = [];
            let tyreTracker = [];
            let patriotCountry;
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

            let overheatData = eliteLevels[13]
            let overheatValue = overheatData.baseVal + (overheatData.increment * (overheatData.level-1));

            let heatSinkData = eliteLevels[14]
            let heatSinkValue = heatSinkData.baseVal + (heatSinkData.increment * (heatSinkData.level-1));

            let timeWarpData = eliteLevels[15]
            let timeWarpValue = timeWarpData.baseVal + (timeWarpData.increment * (timeWarpData.level-1));

            let allInData = eliteLevels[16]
            let allInValue = allInData.baseVal + (allInData.increment * (allInData.level-1));

            let patriotData = eliteLevels[17]
            let patriotValue = patriotData.baseVal + (patriotData.increment * (patriotData.level-1));
            playerHand.forEach(bonusCalcs);
            function bonusCalcs(id) {
                let car = (data[id]);
                if (car.elite == 'yes') {
                    eliteTracker = true;
                }
                if (equippedKits.find(e => e.carID === car.carID)) {
                    let perkIndex = equippedKits.find(e => e.carID === car.carID)
                    car.perk = perkIndex.perk;
                    console.log(car.perk);
                }
                buttonVar += (car.zeroToSixty);

                timeWarpYear += car.year;

                if (car.perk == "Quick Charge") {
                    buttonVar -= ((car.zeroToSixty) * quickChargeValue);
                }
                if (car.perk == "Slipstream") {
                    slipstreamBonus -= (slipstreamValue/car.zeroToSixty);
                }
                if (car.perk == "Double Tap") {
                    let refreshChance = Math.random();
                    refreshChance = refreshChance * 1+(car.topSpeed/1000)
                    if (refreshChance > (1-doubleTapValue)) {
                        buttonZero += 1;
                    }
                }
                moneyVar += (car.handling);
                if (car.perk == "High Roller") {
                    moneyVar += ((car.handling) * highRollerValue);
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
                if (car.perk == "Mechanic") {
                    mechanicBoost += mechanicValue;
                }
                if (car.perk == "Overheat") {
                    rqLimit += overheatValue;
                }
                if (car.perk == "Heat Sink") {
                    heatSinkBonus += heatSinkValue;
                }
                if (car.perk == "Time Warp") {
                    timeWarpFactor += timeWarpValue;
                }
                if (car.perk == "Patriot") {
                    patriotBonus += patriotValue;
                    patriotCountry = car.country;
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
                if (car.perk == "All In") {
                    gachaLuck += ((car.handling)*allInValue);
                }
                if (car.perk == "Gambler") {
                    gambleValue += gamblerValue;
                }
            }

            if (rqLimit < totalRQ) {
                document.getElementById('RQLimiter').innerText = "Hand too strong. Reduce RQ by " + (totalRQ - rqLimit);
                button.disabled = false;
                return;
            } else if (playerHand.length < 5) {
                document.getElementById('RQLimiter').innerText = "Incomplete hand. Check your Collection."
                button.disabled = false;
                return;
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

            let buttonBoost = 0;

            let rqDiff = (rqLimit - totalRQ)/1.5;

            if (heatSinkBonus > 0)  {
                moneyVar = moneyVar + 0.7*(heatSinkBonus * rqDiff);
                buttonBoost = buttonBoost + 0.05*(heatLevel * rqDiff);
                gachaLuck = gachaLuck + 1.1*(heatSinkBonus * rqDiff);
            };

            if (timeWarpFactor > 0) {
                let timeDilation = timeWarpFactor*(9950 - timeWarpYear);
                slipstreamBonus -= timeDilation;
            };

            synergies.forEach(synergyPerks);
            function synergyPerks(synergy) {
                if (synergy == 'Standard' && standardBonus > 0) {
                    moneyVar = moneyVar + 2*(standardBonus);
                    buttonBoost = buttonBoost + 0.92*(standardBonus);
                    gachaLuck = gachaLuck + 1.8*(standardBonus);
                }
                if (synergy == 'All-Surface' && allsurfBonus > 0) {
                    moneyVar = moneyVar + 2.1*(allsurfBonus);
                    buttonBoost = buttonBoost + 0.98*(allsurfBonus);
                    gachaLuck = gachaLuck * 0.7*(allsurfBonus);
                }
                if (synergy == 'Off-Road' && offroadBonus > 0) {
                    moneyVar = moneyVar + 2.2*(offroadBonus);
                    buttonBoost = buttonBoost + 1.01*(offroadBonus);
                    gachaLuck = gachaLuck + 2*(offroadBonus);
                }
                if (synergy == '4WD' && awdBonus > 0) {
                    moneyVar = moneyVar + 2*(awdBonus);
                    buttonBoost = buttonBoost + 0.9*(awdBonus);
                    gachaLuck = gachaLuck + 1.8*(awdBonus);
                }
                if (synergy == 'FWD' && fwdBonus > 0) {
                    moneyVar = moneyVar + 2*(fwdBonus);
                    buttonBoost = buttonBoost + 0.92*(fwdBonus);
                    gachaLuck = gachaLuck + 1.7*(fwdBonus);
                }
                if (synergy == patriotCountry && patriotBonus > 0) {
                    moneyVar = moneyVar + 2*(patriotBonus);
                    buttonBoost = buttonBoost + 0.95*(patriotBonus);
                    gachaLuck = gachaLuck + 1.8*(patriotBonus);
                    console.log(patriotBonus);
                }
            }

            buttonVar -= buttonBoost;

            moneyBonus = Math.round((((moneyVar - 225)/85) + 1)*100)/100;
            buttonCooldown = Math.round((buttonVar * slipstreamBonus))*100/100;
            if (buttonZero > 0) {
                buttonCooldown = 1;
            } else if (buttonCooldown < 1000) {
                let buttonOverflow = buttonCooldown - 999;
                buttonCooldown = 1000;
                money += buttonOverflow;
                if (milestones[12] !== true) {
                    completeMilestone(12);
                }
            };
            gachaMod = Math.round(((1 + (gachaLuck - 400)) / 300)*100)/100;
            gachaStable = gachaMod;
            carPicker();
            collectContracts();
            function collectContracts() {
                contractTrackers.forEach(element => {
                    if (element.active === true) {
                        if (element.trackedContract === 'Rookie Collector') {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Lucky Collector' && gachaStable > 1.2) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Rich Collector' && moneyBonus > 2.75) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Front Facing' && synergies.includes('FWD')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Four Up' && synergies.includes('4WD')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Standardised' && synergies.includes('Standard')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Quick Collector' && buttonCooldown < 12500) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Button Blitz' && buttonCooldown < 2000) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Elite Collector' && eliteTracker === true) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Czech Me Out' && synergies.includes('CZ')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Aussie Aussie Aussie' && synergies.includes('AU')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Need for Swede' && synergies.includes('SE')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Seoul Mates' && synergies.includes('KR')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === 'Rapid Fire' && buttonZero > 0) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Impossible Isn't French" && synergies.includes('FR')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Crouching Tiger, Hidden Dragon" && synergies.includes('CN')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "British Racing Green" && synergies.includes('GB')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "P Rank" && synergies.includes('IT')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Golden Era" && synergies.includes(199)) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Early Adopter" && synergies.includes(202)) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Back to the Past" && synergies.includes(198)) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "American Rush" && synergies.includes('US')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Ruhr of Engines" && synergies.includes('DE')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "My Other Job is Delivering Tofu" && synergies.includes('JP')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Pushing Power" && synergies.includes('RWD')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Peak Performance" && synergies.includes('Performance')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "American Pie" && synergies.includes('Chevrolet')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Absolut Attack" && synergies.includes('Koenigsegg')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "The Bond's Name" && synergies.includes('Aston Martin')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "Vorsprung durch Technik" && synergies.includes('Audi')) {
                            element.currentVal += 1;
                        } else if (element.trackedContract === "The Ultimate Driving Machine" && synergies.includes('BMW')) {
                            element.currentVal += 1;
                        } 
                        let counterUpdate = document.getElementById(element.counterSlot);
                        let nameTracker = element.trackedContract;
                        if (element.currentVal >= element.finishVal) {
                            counterUpdate.innerHTML = "";
                            completeContract(nameTracker);
                        } else {
                            counterUpdate.innerHTML = "Progress: " + element.currentVal + " / " + element.finishVal;
                        }
                    }
                    
                    
                })};

            document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + buttonCooldown / 1000 + " seconds";
            document.getElementById('earningsBonus').innerHTML = "Earnings Bonus: x" + moneyBonus;

            if (moneyBonus >= 4.25 && milestones[14].complete !== true) {
                completeMilestone(14);
            };
            setTimeout(function () {
                button.disabled = false;
            }, buttonCooldown);
        })
});

export function moneyChanger(transaction) {
    money -= transaction;
    console.log(money);
    if (money >= 222222222 && milestones[5].complete !== true) {
        completeMilestone(5);
    }
    else if (money >= 50000000 && milestones[4].complete !== true) {
        completeMilestone(4);
    }
    else if (money >= 1000000 && milestones[3].complete !== true) {
        completeMilestone(3);
    };
    
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

function restoreShop(shopData, upgrades) {
    document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
    document.getElementById('shopGrid').innerHTML = shopData;
    if (upgrades !== null) {
        shopUpgrades.splice.apply(shopUpgrades, [0, upgrades.length].concat(upgrades));
    } else {
        shopgrades();
    }

    if (document.getElementById(shopUpgrades[0].upgradeID) !== null) {
        let upg1 = document.getElementById(shopUpgrades[0].upgradeID);
    upg1.onclick = (event) => {
        let price = shopUpgrades[0].upgradeCostCash;
        if (money < price) {
            document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
        } else {
            moneyChanger(price);
            shopUpgrades[0].upgradeActive = true;
            event.target.parentNode.remove(); // Use event.target to reference the clicked button
        };
        
    };
    };
    
    if (document.getElementById(shopUpgrades[1].upgradeID) !== null) {
        let upg2 = document.getElementById(shopUpgrades[1].upgradeID);
    upg2.onclick = (event) => {
        let price = shopUpgrades[1].upgradeCostCash;
        let toolprice = shopUpgrades[1].upgradeCostTools;
        let toolCheck = toolprice * -1;
        if (money < price || eliteTools < toolCheck) {
            document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
        } else {
            moneyChanger(price);
            shopUpgrades[1].upgradeActive = true;
            event.target.parentNode.remove(); // Use event.target to reference the clicked button
        };
        
    };
    }
    if (document.getElementById(shopUpgrades[2].upgradeID) !== null) {
        let upg3 = document.getElementById(shopUpgrades[2].upgradeID);
        upg3.onclick = (event) => {
            let price = shopUpgrades[2].upgradeCostCash;
            let toolprice = shopUpgrades[2].upgradeCostTools;
            let toolCheck = toolprice * -1;
            if (money < price || eliteTools < toolCheck) {
                document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
            } else {
                moneyChanger(price);
                shopUpgrades[2].upgradeActive = true;
                event.target.parentNode.remove(); // Use event.target to reference the clicked button
            };
            
        };
    }
    
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
        let rarity;
        
        fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            data = data.cars;
            console.log(data);
            console.log(btn.id);
            let carCheck = Number(btn.id);
            rarityCheck = data.find(data => data.carID === carCheck)
            rarity = rarityCheck.rarity;
            console.log(rarity);
        })
        
        btn.addEventListener('click', () => {
            prestigeCar(btn.id, price, rarity);
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

function prestigeCar(id,pricetag,rarity) {
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
        console.log(rarity);
        bankCoins(rarity);
        buttonID.remove();
    } else {
        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
    }

}

function restoreElite(tools,levels, kits) {
    console.log(tools);
    if (tools === null) {
        tools = 0;
    };
    toolUpdater(tools);
    if (levels !== null) {
        if (levels.length > 0) {for (let i = 0; i < levels.length; i++) {
            levels[i].increment = eliteLevels[i].increment;
            levels[i].baseVal = eliteLevels[i].baseVal;
        }};
    };
    
    
    eliteLevels.splice.apply(eliteLevels, [0, levels.length].concat(levels));
    equippedKits.splice.apply(equippedKits, [0, kits.length].concat(kits));
    populateText();
}

function restoreMissions(conts,actives,starcars,miles,stars,slots)  {
    if (stars !== null && (miles !== null || miles > 0)) {
        saveParser(stars, miles, slots, actives);
        document.getElementById('starsDisplay').innerHTML = "Stars: " + stars;
    } if (conts === null && actives === null) {
        populateContracts();
    } else {
        document.getElementById('starShopGrid').innerHTMl = "";
        document.getElementById('contractGrid').innerHTML = conts;
        document.getElementById('starShopGrid').innerHTML = starcars;

        let contractClicks = document.getElementsByClassName('contractBox');
        for (let item of contractClicks) {
            restoreContracts(item);
        };
        for (let item of actives) {
            if (item.active !== null && item.active === true) {
            console.log(item.currentVal)
            restoreActives(item);
            }
        };
        restoreStarBtn();
    };
    
};

function restoreContracts(ct) {
    console.log(ct);
    let contractID = ct.id;
    let newContract = contracts.find(item => item.missionID === ct.id);
    let contractColour = ct.style.backgroundColor;
    let contractContent = ct.innerHTML;
    let contractTarget = newContract.targetValue;
    let controller = new AbortController;
    let tracker = null;
    let { signal } = controller;
    ct.addEventListener('click', () => {
        contractActivator(contractID,newContract,contractContent,contractColour,contractTarget,controller, tracker);
    },{ signal });
};

function restoreActives(at) {
    console.log(at);
    
    if (!('currentVal' in at)) {
        console.log(at);
        at['currentVal'] = at.finishVal;
        console.log('peeman');
    };
    if (at.currentVal >= at.finishVal) {
    at.trackedContract = "";
    at.active = false;
    at.currentVal = 0;
    at.finishVal = 0;
    } else {
        console.log(at.currentVal);
        console.log(at.finishVal);
                console.log(contracts);
                let newContract = contracts.find(item => item.missionName === at.trackedContract);
                console.log(newContract);
                let diff = newContract.difficulty;
                let contractColour = contractBGColours[diff-1];
                let contractReward = document.createElement('span');
                    if (diff === 4) {
                        contractReward.innerHTML = "750 Elite Tools, " + diff + " Stars";
                    } else {
                        contractReward.innerHTML = 250 * Math.pow(10, diff) + " Cash, " + diff + " Stars";
                    };
                let contractContent = "<span>" + newContract.missionName + "</span>" + newContract.missionDesc + " - " + contractReward.innerHTML;
                let contractTarget = newContract.targetValue;
                let tracker = at.trackerSlot;
                let fuckyou = newContract.missionID;
                let controller = new AbortController;
                contractActivator(fuckyou,newContract,contractContent,contractColour,contractTarget,controller,tracker);
    }
    
        
    
};

function restoreStarBtn(){
    let startags = document.getElementsByClassName("starbtn");
    for (let i = 0; i < startags.length; i++) {
        let r = /\d+/;
        let s = startags[i].innerHTML.match(r);
        let restoredPrice = Number(s);
        startags[i].addEventListener('click', () => {
            buyStarCar(startags[i].id, restoredPrice);
        });
     }
};

function contractActivator(ID,contract,tab, colour, target, control, track) {
    
    console.log(ID);
    let contractid = document.getElementById(ID)
    console.log(contractid);
    let openSlots = slotQuantity - activeContracts
    if (openSlots > 0) {
        contractid.innerHTML = "Complete previous contract to refresh.";
        let possibleSlots = document.querySelectorAll('.activeBox');
        for (let s = 0; s < possibleSlots.length; s++) {
            if (track !== null) {
                let contractSlot = document.getElementById(track);
                contractAdder(contractSlot);
                control.abort();
                break;
            }
            else if (possibleSlots[s].innerHTML.startsWith('Active')) {
                let contractSlot = possibleSlots[s]; 
                contractAdder(contractSlot);
                control.abort();
                break;
            }
        }
        function contractAdder(slot) {
            activeContractTracker();
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
        };
    };
    
};

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
                
            });
        })
    } else {
        document.getElementById('heatText').innerHTMl = "";
        heatLevel = 0;
        rqLimit = 500;
    };
})

function heatApply(heat) {
    rqLimit = 500 - (heat*40);
    document.getElementById('heatText').innerText = "RQ Limit: " + rqLimit;
    
};

export function contractIncrement(){
    completedContracts += 1;
};

export function perkIncrement(){
    eliteUpgraded += 1;
}

let statButton = document.getElementById('statRefresher');
statButton.addEventListener('click', populateStats);

export function populateStats() {
    
    let garageCars = playerGarage.filter(onlyUnique);

    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            data = data.cars;
            let USList = data.filter(data => data.country === "US");
            let USStat = 0;
            for (const key in USList) {
                if(garageCars.includes(USList[key].carID)) {
                    USStat += 1;
                }
            }
            if (USStat >= 175 && milestones[24].complete !== true) {
                completeMilestone(24);
            };
            let DEList = data.filter(data => data.country === "DE");
            let DEStat = 0;
            for (const key in DEList) {
                if(garageCars.includes(DEList[key].carID)) {
                    DEStat += 1;
                }
            }
            if (DEStat >= 300 && milestones[25].complete !== true) {
                completeMilestone(25);
            };
            let ITList = data.filter(data => data.country === "IT");
            let ITStat = 0;
            for (const key in ITList) {
                if(garageCars.includes(ITList[key].carID)) {
                    ITStat += 1;
                }
            }
            if (ITStat >= 75 && milestones[26].complete !== true) {
                completeMilestone(26);
            };
            let FRList = data.filter(data => data.country === "FR");
            let FRStat = 0;
            for (const key in FRList) {
                if(garageCars.includes(FRList[key].carID)) {
                    FRStat += 1;
                }
            }
            if (FRStat >= 100 && milestones[27].complete !== true) {
                completeMilestone(27);
            };
            let GBList = data.filter(data => data.country === "GB");
            let GBStat = 0;
            for (const key in GBList) {
                if(garageCars.includes(GBList[key].carID)) {
                    GBStat += 1;
                }
            }
            if (GBStat >= 175 && milestones[28].complete !== true) {
                completeMilestone(28);
            };
            let JPList = data.filter(data => data.country === "JP");
            let JPStat = 0;
            for (const key in JPList) {
                if(garageCars.includes(JPList[key].carID)) {
                    JPStat += 1;
                }
            }
            if (JPStat >= 200 && milestones[29].complete !== true) {
                completeMilestone(29);
            };
            let audiList = data.filter(data => data.make === "Audi");
            let audiStat = 0;
            for (const key in audiList) {
                if(garageCars.includes(audiList[key].carID)) {
                    audiStat += 1;
                }
            }
            if (audiStat >= 50 && milestones[30].complete !== true) {
                completeMilestone(30);
            };
            let porscheList = data.filter(data => data.make === "Porsche");
            let porscheStat = 0;
            for (const key in porscheList) {
                if(garageCars.includes(porscheList[key].carID)) {
                    porscheStat += 1;
                }
            }
            if (porscheStat >= 60 && milestones[31].complete !== true) {
                completeMilestone(31);
            };
            let astonList = data.filter(data => data.make === "Aston Martin");
            let astonStat = 0;
            for (const key in astonList) {
                if(garageCars.includes(astonList[key].carID)) {
                    astonStat += 1;
                }
            }
            if (astonStat >= 45 && milestones[32].complete !== true) {
                completeMilestone(32);
            };
            let eggList = data.filter(data => data.make === "Koenigsegg");
            let eggStat = 0;
            for (const key in eggList) {
                if(garageCars.includes(eggList[key].carID)) {
                    eggStat += 1;
                }
            }
            if (eggStat >= 18 && milestones[33].complete !== true) {
                completeMilestone(33);
            };
            let lotusList = data.filter(data => data.make === "Lotus");
            let lotusStat = 0;
            for (const key in lotusList) {
                if(garageCars.includes(lotusList[key].carID)) {
                    lotusStat += 1;
                }
            }
            if (lotusStat >= 31 && milestones[34].complete !== true) {
                completeMilestone(34);
            };
            let mercList = data.filter(data => data.make === "Mercedes-Benz");
            let mercStat = 0;
            for (const key in mercList) {
                if(garageCars.includes(mercList[key].carID)) {
                    mercStat += 1;
                }
            }
            if (mercStat >= 84 && milestones[35].complete !== true) {
                completeMilestone(35);
            };
            let eliteStat = 0;
            let eliteList = data.filter(data => data.elite === "yes")
            for (const key in eliteList) {
                if(playerGarage.includes(eliteList[key].carID)) {
                    eliteStat += 1;
                }
        
        if(playerPermGarage == null) {
            unbreakPrestige();
        };

        
        let garageStat = garageCars.length;
        
        let permStat = playerPermGarage.filter(onlyUnique).length;
        permStat = permStat - 5;

    
    if (permStat >= 20 && milestones[17].complete !== true) {
        completeMilestone(17);
    };
    if (permStat >= 10 && milestones[16].complete !== true) {
        completeMilestone(16);
    };
    if (permStat >= 5 && milestones[15].complete !== true) {
        completeMilestone(15);
    };
    let contractStat = completedContracts;
    if (contractStat >= 100 && milestones[23].complete !== true) {
        completeMilestone(23);
    };
    if (contractStat >= 20 && milestones[22].complete !== true) {
        completeMilestone(22);
    };
    if (contractStat >= 5 && milestones[21].complete !== true) {
        completeMilestone(21);
    };
    let kitStat = eliteUpgraded;
    console.log(eliteUpgraded);
    if (kitStat >= 50 && milestones[20].complete !== true) {
        completeMilestone(20);
    };
    if (kitStat >= 15 && milestones[19].complete !== true) {
        completeMilestone(19);
    };
    if (kitStat >= 5 && milestones[18].complete !== true) {
        completeMilestone(18);
    };
    console.log(playerPermGarage);
    let statContainer = document.getElementById('statsGrid');
    statContainer.innerHTML = "";
    let masteryContainer = document.getElementById('collectorGrid');
    masteryContainer.innerHTML = "";
    let moneyTile = document.createElement('div');
    moneyTile.classList.add('statBox');
    moneyTile.id = 'money';
    moneyTile.innerHTML = "Money: $" + money;
    statContainer.appendChild(moneyTile);
    let clicksTile = document.createElement('div');
    clicksTile.classList.add('statBox');
    clicksTile.id = 'clicks';
    clicksTile.innerHTML = "Button Clicks: " + buttonClicks;
    statContainer.appendChild(clicksTile);
    let garageTile = document.createElement('div');
    garageTile.classList.add('statBox');
    garageTile.id = 'garage';
    garageTile.innerHTML = "Cars Owned: " + garageStat;
    statContainer.appendChild(garageTile);
    let eliteTile = document.createElement('div');
    eliteTile.classList.add('statBox');
    eliteTile.id = 'garage';
    eliteTile.innerHTML = "Elites Owned: " + eliteStat;
    statContainer.appendChild(eliteTile);
    let permTile = document.createElement('div');
    permTile.classList.add('statBox');
    permTile.id = 'garage';
    permTile.innerHTML = "Cars Permanently Unlocked: " + permStat;
    statContainer.appendChild(permTile);
    let kitTile = document.createElement('div');
    kitTile.classList.add('statBox');
    kitTile.id = 'garage';
    kitTile.innerHTML = "Elite Perks Upgraded: " + kitStat;
    statContainer.appendChild(kitTile);
    let contractTile = document.createElement('div');
    contractTile.classList.add('statBox');
    contractTile.id = 'garage';
    contractTile.innerHTML = "Contracts Completed: " + contractStat;
    statContainer.appendChild(contractTile);
    let usTile = document.createElement('div');
    usTile.classList.add('statBox');
    usTile.id = 'garage';
    usTile.innerHTML = "American Cars Owned: " + USStat;
    masteryContainer.appendChild(usTile);
    let deTile = document.createElement('div');
    deTile.classList.add('statBox');
    deTile.id = 'garage';
    deTile.innerHTML = "German Cars Owned: " + DEStat;
    masteryContainer.appendChild(deTile);
    let itTile = document.createElement('div');
    itTile.classList.add('statBox');
    itTile.id = 'garage';
    itTile.innerHTML = "Italian Cars Owned: " + ITStat;
    masteryContainer.appendChild(itTile);
    let frTile = document.createElement('div');
    frTile.classList.add('statBox');
    frTile.id = 'garage';
    frTile.innerHTML = "French Cars Owned: " + FRStat;
    masteryContainer.appendChild(frTile);
    let gbTile = document.createElement('div');
    gbTile.classList.add('statBox');
    gbTile.id = 'garage';
    gbTile.innerHTML = "British Cars Owned: " + GBStat;
    masteryContainer.appendChild(gbTile);
    let jpTile = document.createElement('div');
    jpTile.classList.add('statBox');
    jpTile.id = 'garage';
    jpTile.innerHTML = "Japanese Cars Owned: " + JPStat;
    masteryContainer.appendChild(jpTile);
    let audiTile = document.createElement('div');
    audiTile.classList.add('statBox');
    audiTile.id = 'garage';
    audiTile.innerHTML = "Audis Owned: " + audiStat;
    masteryContainer.appendChild(audiTile);
    let porscheTile = document.createElement('div');
    porscheTile.classList.add('statBox');
    porscheTile.id = 'garage';
    porscheTile.innerHTML = "Porsches Owned: " + porscheStat;
    masteryContainer.appendChild(porscheTile);
    let astonTile = document.createElement('div');
    astonTile.classList.add('statBox');
    astonTile.id = 'garage';
    astonTile.innerHTML = "Aston Martins Owned: " + astonStat;
    masteryContainer.appendChild(astonTile);
    let eggTile = document.createElement('div');
    eggTile.classList.add('statBox');
    eggTile.id = 'garage';
    eggTile.innerHTML = "Koenigseggs Owned: " + eggStat;
    masteryContainer.appendChild(eggTile);
    let lotusTile = document.createElement('div');
    lotusTile.classList.add('statBox');
    lotusTile.id = 'garage';
    lotusTile.innerHTML = "Lotuses Owned: " + lotusStat;
    masteryContainer.appendChild(lotusTile);
    let mercTile = document.createElement('div');
    mercTile.classList.add('statBox');
    mercTile.id = 'garage';
    mercTile.innerHTML = "Mercedes-Benzes Owned: " + mercStat;
    masteryContainer.appendChild(mercTile);
            };
        });
        populateMilestones();
};

function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  };

// Read file asynchronously
function carPicker() {
    moneyCheck = money;
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
            console.log(gachaStable);
            if (gachaStable > 3.25 && milestones[13] !== true) {
                completeMilestone(13);
            };
            let basegacha = Math.floor(Math.random() * 100) + 1;
            let gacha = basegacha * gachaStable;
            if (gacha < 28) {
                var carSelection = data.filter(data => data.rarity === 1);
            } else
            if (gacha < 55) {
                var carSelection = data.filter(data => data.rarity === 2);
            } else
            if (gacha < 85) {
                var carSelection = data.filter(data => data.rarity === 3);
            } else
            if (gacha < 110) {
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
            let moneyBoost = Math.ceil(Math.round(moneyBonus * (30 + 2*(playerPrestigeGarage.length + 1))));
            console.log(moneyBoost);
            money += moneyBoost;
            if (money >= 1000000000 && milestones[5].complete !== true) {
                completeMilestone(5);
            }
            else if (money >= 50000000 && milestones[4].complete !== true) {
                completeMilestone(4);
            }
            else if (money >= 1000000 && milestones[3].complete !== true) {
                console.log("start");
                completeMilestone(3);
                console.log("end");
            };
            console.log(money);
            money += Math.floor(Math.random() * 500 * (gachaStable) * (gambleValue));
            console.log(moneyCheck);
            moneyDiff = money - moneyCheck;
            
            
            let partsDrop = Math.ceil(eliteCount * 0.7);
            for (let r = 0; r < partsDrop; r++) {
                let toolGachaBase = Math.random();
                let toolGachaMod = toolGachaBase * mechanicBoost;
                if (toolGachaMod > 0.9) {
                    toolAdder(1);
                    document.getElementById('eliteDisplay').innerText = "Elite Tools: " + eliteTools;
                } 
            }
            document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            
              let uniqueCars = playerGarage.filter(onlyUnique);
              
            if (uniqueCars.length >= 100 && milestones[6].complete !== true) {
                completeMilestone(6);
            };
            if (uniqueCars.length >= 500 && milestones[7].complete !== true) {
                completeMilestone(7);
            };
            if (uniqueCars.length >= 969 && milestones[8].complete !== true) {
                completeMilestone(8);
            };

            if (eliteCount >= 55 && milestones[9].complete !== true) {
                completeMilestone(9);
            }
            if (eliteCount >= 137 && milestones[10].complete !== true) {
                completeMilestone(10);
            }
            if (eliteCount >= 200 && milestones[11].complete !== true) {
                completeMilestone(11);
            }
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
                    bankCoins(chosenCar.rarity);
                    document.getElementById('newCardPopup').innerText = "PRESTIGE DUPE!";

                } 

            } else { playerGarage.unshift(garageAdd);
                document.getElementById('newCardPopup').innerText = "NEW!";
            }
            moneyContracts();
            function moneyContracts() {
                console.log("pipis");
                contractTrackers.forEach(element => {
                    if (element.active === true) {
                        console.log(element);
                        if (element.trackedContract === 'Rookie Earner') {
                            console.log(moneyDiff);
                            element.currentVal += moneyDiff;
                        };
                        if (element.trackedContract === 'Amateur Earner') {
                            console.log(moneyDiff);
                            element.currentVal += moneyDiff;
                        };
                        if (element.trackedContract === 'Big Earner') {
                            console.log(moneyDiff);
                            element.currentVal += moneyDiff;
                        };
                        if (element.trackedContract === 'Moneybags') {
                            console.log(moneyDiff);
                            element.currentVal += moneyDiff;
                        };
                        let counterUpdate = document.getElementById(element.counterSlot);
                        let nameTracker = element.trackedContract;
                        if (element.currentVal >= element.finishVal) {
                            counterUpdate.innerHTML = "";
                            completeContract(nameTracker);
                        } else {
                            counterUpdate.innerHTML = "Progress: " + element.currentVal + " / " + element.finishVal;
                        }
                    }
                    
                    
                }
                )
            }
            

            

            
            document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}