export const button = document.querySelector('[data-collect-card]');
import { playerGarage, loadGarage, playerPrestigeGarage, collectionHandDisplay } from "./playerGarage.js";
import { playerHand, handLoader, getHandCards, totalRQ } from "./playerHand.js";
import { eliteTools, eliteLevels, toolUpdater, populateText, toolAdder, equippedKits } from "./elite.js";
import { shopUpgrades, shopgrades } from "./shop.js";
import { contracts, contractTrackers, completeContract, milestones, populateMilestones, stars, slotsActivated, saveParser, contractBGColours, populateContracts, activeContracts, slotQuantity, activeContractTracker } from "./missions.js";
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
let eliteTracker = false;
let moneyCheck = 0;
let moneyDiff = 0;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

window.onload=populateStats();

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
    localStorage.setItem('shopUpgrades', JSON.stringify(shopUpgrades));
    localStorage.setItem('contracts', JSON.stringify(contractStorage));
    localStorage.setItem('activecont', JSON.stringify(contractTrackers));
    localStorage.setItem('starcars', JSON.stringify(starShopStorage));
    localStorage.setItem('milestones', JSON.stringify(milestones));
    localStorage.setItem('stars', JSON.stringify(stars));
    localStorage.setItem('clicks', JSON.stringify(buttonClicks));
    localStorage.setItem('contractSlots', JSON.stringify(slotsActivated));
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
    restoreElite(storedTools, eliteStorage, kitStorage);
    populateText();
    contractStorage = JSON.parse(localStorage.getItem('contracts'));
    activeStorage = JSON.parse(localStorage.getItem('activecont'));
    console.log(activeStorage);
    starShopStorage = JSON.parse(localStorage.getItem('starcars'));
    milestoneParser = JSON.parse(localStorage.getItem('milestones'));
    starParser = JSON.parse(localStorage.getItem('stars'));
    buttonClicks = JSON.parse(localStorage.getItem('clicks'));
    slotsParser = JSON.parse(localStorage.getItem('contractSlots'));
    restoreMissions(contractStorage, activeStorage, starShopStorage, milestoneParser, starParser,slotsParser);
    document.getElementById('saveWarning').innerText = "Game loaded."
})

button.addEventListener('click', () => {
    document.getElementById('RQLimiter').innerText = "";
    
    heatApply(heatLevel);


    button.disabled = true;
    buttonClicks += 1;
    if (buttonClicks >= 1000 && milestones[0].complete !== true)
    {
        milestones[0].complete = true;
        playerGarage.push(milestone[0].rewardCar);
        populateMilestones;
    }
    if (buttonClicks >= 100000 && milestones[1].complete !== true)
    {
        milestones[1].complete = true;
        playerGarage.push(milestone[1].rewardCar);
        populateMilestones;
    }
    if (buttonClicks >= 1000000 && milestones[2].complete !== true)
    {
        milestones[2].complete = true;
        playerGarage.push(milestone[2].rewardCar);
        populateMilestones;
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
            let gachaMod = 0;
            let gachaLuck = 0 + (heatLevel*62);
            let buttonVar = 0 - (heatLevel * 2.1); 
            let slipstreamBonus = 400;
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
            }

            buttonVar -= buttonBoost;

            let moneyCheck = money;
            console.log(moneyCheck);

            moneyBonus = Math.round((((moneyVar - 265)/100) + 1)*100)/100;
            buttonCooldown = Math.round((buttonVar * slipstreamBonus))*100/100;
            if (buttonZero > 0) {
                buttonCooldown = 1;
            } else if (buttonCooldown < 1000) {
                let buttonOverflow = buttonCooldown - 999;
                buttonCooldown = 1000;
                money += buttonOverflow;
                if (milestones[12] !== true) {
                    console.log("ayo wtf");
                    milestones[12].complete = true;
                    playerGarage.push(milestones[12].rewardCar);
                }
            };
            gachaMod = Math.round(((1 + (gachaLuck - 400)) / 300)*100)/100;
            gachaStable = gachaMod;
            carPicker();
            console.log(money);
            console.log(moneyDiff);
            collectContracts();
            function collectContracts() {
                contractTrackers.forEach(element => {
                    if (element.active === true) {
                        if (element.trackedContract === 'Rookie Collector') {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Lucky Collector' && gachaStable > 1.2) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Rich Collector' && moneyBonus > 2) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Front Facing' && synergies.includes('FWD')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Four Up' && synergies.includes('4WD')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Standardised' && synergies.includes('Standard')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Quick Collector' && buttonCooldown < 12500) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Button Blitz' && buttonCooldown < 2000) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Elite Collector' && eliteTracker === true) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Czech Me Out' && synergies.includes('CZ')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Aussie Aussie Aussie' && synergies.includes('AU')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Need for Swede' && synergies.includes('SE')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Seoul Mates' && synergies.includes('KR')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === 'Rapid Fire' && buttonZero > 0) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Impossible Isn't French" && synergies.includes('FR')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Crouching Tiger, Hidden Dragon" && synergies.includes('CN')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "British Racing Green" && synergies.includes('GB')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "P Rank" && synergies.includes('IT')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Golden Era" && synergies.includes('1990s')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Early Adopter" && synergies.includes('2020s')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Back to the Past" && synergies.includes('1980s')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "American Rush" && synergies.includes('US')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "Ruhr of Engines" && synergies.includes('DE')) {
                            element.currentVal += 1;
                        } if (element.trackedContract === "My Other Job is Delivering Tofu" && synergies.includes('JP')) {
                            element.currentVal += 1;
                        }
                        console.log(element.currentVal);
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

                if (money >= 1000000000 && milestones[5].complete !== true) {
                    milestones[5].complete = true;
                    playerGarage.push(milestones[5].rewardCar);
                };
                if (money >= 10000000 && milestones[4].complete !== true) {
                    milestones[4].complete = true;
                    playerGarage.push(milestones[4].rewardCar);
                };
                if (money >= 1000000 && milestones[3].complete !== true) {
                    milestones[3].complete = true;
                    playerGarage.push(milestones[3].rewardCar);
                };
            document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + buttonCooldown / 1000 + " seconds";
            document.getElementById('earningsBonus').innerHTML = "Earnings Bonus: x" + moneyBonus;

            if (moneyBonus >= 4 && milestones[14].complete !== true) {
                milestones[14].complete = true;
                playerGarage.push(milestones[14].rewardCar);
            };
            setTimeout(function () {
                button.disabled = false;
            }, buttonCooldown);
        })
});

export function moneyChanger(transaction) {
    money -= transaction;
    console.log(money);
    if (money >= 1000000000 && milestones[5].complete !== true) {
        milestones[5].complete = true;
        playerGarage.push(milestones[5].rewardCar);
    };
    if (money >= 10000000 && milestones[4].complete !== true) {
        milestones[4].complete = true;
        playerGarage.push(milestones[4].rewardCar);
    };
    if (money >= 1000000 && milestones[3].complete !== true) {
        milestones[3].complete = true;
        playerGarage.push(milestones[3].rewardCar);
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
        document.getElementById('contractGrid').innerHTML = conts;
        document.getElementById('starShopGrid').innerHTMl = starcars;

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
    let { signal } = controller;
    ct.addEventListener('click', () => {
        contractActivator(contractID,newContract,contractContent,contractColour,contractTarget,controller);
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
                console.log(contractTarget);
                let fuckyou = newContract.missionID;
                console.log(fuckyou);
                let controller = new AbortController;
                contractActivator(fuckyou,newContract,contractContent,contractColour,contractTarget,controller);
    }
    
        
    
};

function contractActivator(ID,contract,tab, colour, target, control) {
    
    console.log(ID);
    let contractid = document.getElementById(ID)
    console.log(contractid);
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

let shitfuck = document.getElementById('statRefresher');
shitfuck.addEventListener('click', populateStats);

export function populateStats() {
    
    fetch('./js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            data = data.cars;
            let eliteStat = 0;
            let eliteList = data.filter(data => data.elite === "yes")
            for (const key in eliteList) {
                if(playerGarage.includes(eliteList[key].carID)) {
                    eliteStat += 1;
                }
    let garageStat = playerGarage.length;
    let statContainer = document.getElementById('statsGrid');
    statContainer.innerHTML = "";
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
    populateMilestones();
            };
        });
    
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
            if (gachaStable > 3.25 && milestones[13 !== true]) {
                milestones[13] = true;
                playerGarage.push(milestones[13].rewardCar);
            };
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
            let moneyBoost = Math.ceil(Math.round(moneyBonus * (30 + (playerPrestigeGarage.length + 1))));
            console.log(moneyBoost);
            money += moneyBoost;
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
            if (playerGarage.length >= 100 && milestones[6].complete !== true) {
                milestones[6].complete = true;
                playerGarage.push(milestones[6].rewardCar);
            };
            if (playerGarage.length >= 400 && milestones[7].complete !== true) {
                milestones[7].complete = true;
                playerGarage.push(milestones[7].rewardCar);
            };
            if (playerGarage.length >= 777 && milestones[8].complete !== true) {
                milestones[8].complete = true;
                playerGarage.push(milestones[8].rewardCar);
            };

            if (eliteCount >= 55 && milestones[9].complete !== true) {
                milestones[9].complete = true;
                playerGarage.push(milestones[9].rewardCar);
            }
            if (eliteCount >= 137 && milestones[10].complete !== true) {
                milestones[10].complete = true;
                playerGarage.push(milestones[10].rewardCar);
            }
            if (eliteCount >= 200 && milestones[11].complete !== true) {
                milestones[11].complete = true;
                playerGarage.push(milestones[11].rewardCar);
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
                    document.getElementById('newCardPopup').innerText = "PRESTIGE DUPE!";
                } 

            } else { playerGarage.unshift(garageAdd);

                
            
            moneyContracts();
            function moneyContracts() {
                contractTrackers.forEach(element => {
                    if (element.active === true) {
                        if (element.trackedContract === 'Rookie Earner' || element.trackedContract === 'Amateur Earner' || element.trackedContract === 'Big Earner' || element.trackedContract === "Moneybags") {
                            console.log(moneyDiff);
                            element.currentVal += moneyDiff;
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
                    
                    
                }
                )
            }

            

            document.getElementById('newCardPopup').innerText = "NEW!";}
            document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}