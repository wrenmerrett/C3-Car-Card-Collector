'use strict';

export let eliteTools = 0;
let maxPerkLevel = 5;
import { money, moneyChanger } from './app.js';

const levelButtons = document.querySelectorAll('.levelButton');
var chosenPerk;
let upgradingCar;

levelButtons.forEach(button => button.addEventListener('click', handleLevelUp));

export const eliteLevels = [
    {
        "perkID": 1,
        "name": "Lucky",
        "level": 1,
        "baseVal": 0.2,
        "increment": 0.06
    },
    {
        "perkID": 2,
        "name": "Quick Charge",
        "level": 1,
        "baseVal": 0.35,
        "increment": 0.06
    },
    {
        "perkID": 3,
        "name": "High Roller",
        "level": 1,
        "baseVal": 0.3,
        "increment": 0.06
    },
    {
        "perkID": 4,
        "name": "Gambler",
        "level": 1,
        "baseVal": 1,
        "increment": 0.1
    },
    {
        "perkID": 5,
        "name": "Double Tap",
        "level": 1,
        "baseVal": 0.05,
        "increment": 0.02
    },
    {
        "perkID": 6,
        "name": "Refresher",
        "level": 1,
        "baseVal": 10,
        "increment": 10
    },
    {
        "perkID": 7,
        "name": "Slipstream",
        "level": 1,
        "baseVal": 100,
        "increment": 10
    },
    {
        "perkID": 8,
        "name": "Standard Bearer",
        "level": 1,
        "baseVal": 1.1,
        "increment": 0.1
    },
    {
        "perkID": 9,
        "name": "All-Star",
        "level": 1,
        "baseVal": 1.1,
        "increment": 0.1
    },
    {
        "perkID": 10,
        "name": "Off The Chain",
        "level": 1,
        "baseVal": 1.1,
        "increment": 0.1
    },
    {
        "perkID": 11,
        "name": "Action Traction",
        "level": 1,
        "baseVal": 1.1,
        "increment": 0.1
    },
    {
        "perkID": 12,
        "name": "Front Line",
        "level": 1,
        "baseVal": 1.1,
        "increment": 0.1
    },
    {
        "perkID": 13,
        "name": "Mechanic",
        "level": 1,
        "baseVal": 1.2,
        "increment": 0.2
    }
];

export const equippedKits = [];

window.onload = populateText();

export function populateText() {
    document.getElementById('toolsDisplay').innerHTML = "Elite Tools: " + eliteTools;
    document.getElementById('NotEnoughTools').style.display = "none";
    eliteLevels.forEach(item => {
        let perkPop = item.name;
        let perkdiv = document.getElementById(perkPop);
        let perkLev = item.level;
        let base = item.baseVal;
        let inc = item.increment;
        if (perkLev == maxPerkLevel) {
            perkdiv.querySelector(".levelButton").disabled = true;
            perkdiv.querySelector(".perkLevel").innerHTML = "Level MAX";
        } else {
            perkdiv.querySelector(".perkLevel").innerHTML = "Level " + perkLev + " > " + (perkLev+1) + " - " + (((perkLev)*750)) + " Elite Tools required";
        perkdiv.querySelector(".perkBonus").innerHTML = "Bonus: " + Math.round((base + (inc *( perkLev -1)))*100)/100 + " > " + Math.round((base + (inc * perkLev))*100)/100;
        }
        
    })
};


function handleLevelUp(event) {
    let perkToLevel = event.target.id;
    let perkdiv = document.getElementById(perkToLevel);
    console.log(perkToLevel);
    const perkUp = eliteLevels.find(e => e.name == perkToLevel);
    const index = eliteLevels.findIndex(e => e.name == perkToLevel);
    console.log(index);
    let perkLev = perkUp.level;
    if (perkLev * 750 > eliteTools) {
        document.getElementById('NotEnoughTools').style.display = "inline-block";
        return;
    }
    eliteTools -= perkLev *750;
    eliteLevels[index].level += 1;
    perkLev = eliteLevels[index].level;
    console.log(eliteLevels[index])
    console.log(perkLev);
    document.getElementById('NotEnoughTools').style.display = "none";
    let base = perkUp.baseVal;
    let inc = perkUp.increment;
    if (perkLev == maxPerkLevel) {
        let maxButton = perkdiv.querySelector('.levelButton')
        maxButton.disabled = true;
        perkdiv.querySelector(".perkLevel").innerHTML = "Level MAX";
        perkdiv.querySelector(".perkBonus").innerHTML = "Bonus: " + Math.round((base + (inc *( perkLev -1)))*100)/100;
    } else {
        perkdiv.querySelector(".perkLevel").innerHTML = "Level " + perkLev + " > " + (perkLev+1) + " - " + (((perkLev)*750)) + " Elite Tools required";;
    perkdiv.querySelector(".perkBonus").innerHTML = "Bonus: " + Math.round((base + (inc *( perkLev -1)))*100)/100 + " > " + Math.round((base + (inc * perkLev))*100)/100;
    document.getElementById('toolsDisplay').innerHTML = "Elite Tools: " + eliteTools;
    document.getElementById('eliteDisplay').innerHTML = "Elite Tools: " + eliteTools;
    }
};

export function craftKit(id,cash,tools) {
    upgradingCar = "";
    document.getElementById('perkSelect').innerHTML = "";
    document.getElementById("confirmText").innerText = "";
    document.getElementById("partsCounter").innerText = eliteTools + " Elite Tools";
    let menuDiv = document.getElementById('kitCrafter');
    menuDiv.style.display = 'inline-block';
    let menu = document.getElementById('kitMenu');
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('cancelButton');
    cancelButton.innerText = "Cancel";
    cancelButton.addEventListener('click', () => {
            menuDiv.style.display = 'none';
            cancelButton.remove();
            confirmButton.remove();
    })
    let confirmButton = document.createElement('button');
    confirmButton.id = "confirmButton";
        confirmButton.classList.add('kitButton');
        confirmButton.innerText = "Confirm";
        
    menu.appendChild(confirmButton);
    menu.appendChild(cancelButton);
    menu.style.visibility = 'visible';
    if (money < cash || eliteTools < tools) {
        document.getElementById('insufficientText').innerText = "Insufficient resources. Access denied."
        document.getElementById('confirmButton').disabled = true;
    } else {
        
        document.getElementById('insufficientText').innerText = "Initiating crafting sequence. Please select desired Elite Perk."
        document.getElementById('perkSelect').style.display = "inline-block";
        var perkSelector = document.getElementById('perkSelect');
        var firstElement = document.createElement("option")
         firstElement.textContent = "N/A";
        firstElement.value = "N/A";
        perkSelector.appendChild(firstElement);
        for(var i = 0; i < eliteLevels.length; i++) {
            var opt = eliteLevels[i].name;
            var el = document.createElement("option");
            el.id = i;
            el.textContent = opt;
            el.value = opt;
            perkSelector.appendChild(el);
            }
            
            
            document.getElementById('perkSelect').addEventListener('click', () => {
                let perkChosen = document.getElementById('perkSelect');
                var perkID      = perkChosen[perkChosen.selectedIndex].id;
                let perkLevel = eliteLevels[perkID].level;
                console.log(perkLevel);
                fetch('./js/data.json')
                    .then(response => response.json())
                    .then(data => {
                    data = data.cars;
                    let carIndex = id - 1;
                    upgradingCar = data[carIndex];
                    console.log(upgradingCar);
                    chosenPerk   = perkChosen[perkChosen.selectedIndex].value;
                    document.getElementById('confirmText').innerHTML = "Confirm applying " + chosenPerk + " (Level " + perkLevel + ") to " + upgradingCar.year + " " + upgradingCar.make + " " + upgradingCar.model + "?";
                   

                    
                })
                
            });
            confirmButton.addEventListener('click', () => {
                confirmUpgrade();
                function confirmUpgrade() {
                    let perkIndex = equippedKits.find(e => e.carID === upgradingCar.carID);
                    
                    moneyChanger(cash);
                    eliteTools -= tools;
                    document.getElementById('eliteDisplay').innerText = "Elite Tools: " + eliteTools;
                    document.getElementById('toolsDisplay').innerHTML = "Elite Tools: " + eliteTools;
                    if (equippedKits.includes(perkIndex)) {
                        perkIndex.perk = chosenPerk;
                    } else {
                        let kitEquip = {
                            "carID": upgradingCar.carID,
                            "perk": chosenPerk
                        };
    
                        equippedKits.unshift(kitEquip);
                    }
                    
                    console.log(equippedKits);
                    menuDiv.style.display = 'none';
                    cancelButton.remove();
                    confirmButton.remove();
                }
            
        })
    }
};

export function toolUpdater(toolCount) {
    eliteTools = toolCount;
    document.getElementById('toolsDisplay').innerHTML = "Elite Tools: " + eliteTools;
    document.getElementById('eliteDisplay').innerHTML = "Elite Tools: " + eliteTools;
};

export function toolAdder(toolPlus) {
    eliteTools += toolPlus;
    document.getElementById('toolsDisplay').innerHTML = "Elite Tools: " + eliteTools;
    document.getElementById('eliteDisplay').innerHTML = "Elite Tools: " + eliteTools;
    console.log(document.getElementById('eliteDisplay').innerHTML);
};