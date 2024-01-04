export const button = document.querySelector('[data-collect-card]');
import { playerGarage } from "/js/playerGarage.js";
import { playerHand } from "/js/playerHand.js";
export let money = 1000;
let buttonCooldown = 0;
let moneyBonus = 0;
export var rarities = ["F", "E", "D", "C", "B", "A", "S"];
'use strict';

document.getElementById('cashDisplay').innerText = "Cash: $" + money;

button.addEventListener('click', () => {
    button.disabled = true;
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            data = data.cars;
            let buttonVar = 0;
            let moneyVar = 0;
            document.getElementById('synergyRender').innerHTML = "";
            playerHand.forEach(bonusCalcs);
            function bonusCalcs(id) {
                let car = (data[id]);
                buttonVar += (car.zeroToSixty);
                if (car.perk == "Quick Charge") {
                    buttonVar -= ((car.zeroToSixty) * 0.55);
                }
                moneyVar += (car.handling);
                if (car.perk == "High Roller") {
                    moneyVar += ((car.handling) * 0.40);
                }
            }
            moneyBonus = ((moneyVar - 275)/100) + 1;
            buttonCooldown = buttonVar;
            carPicker();
            document.getElementById('handAttributes').innerHTML = "Collect Cooldown: " + buttonCooldown / 1000 + " seconds"
            document.getElementById('earningsBonus').innerHTML = "Earnings Bonux: x" + moneyBonus;
            setTimeout(function () {
                button.disabled = false;
            }, buttonCooldown);
        })
});

export function moneyChanger(transaction) {
    money -= transaction;
    document.getElementById('cashDisplay').innerText = "Cash: $" + money;
}

// Read file asynchronously
function carPicker() {
    // Assuming data.json contains your JSON data
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            // Work with your JSON data here
            data = data.cars;
            let gachaLuck = 0;
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
            let gachaMod = (1 + (gachaLuck - 410)) / 300;
            document.getElementById('luckFactor').innerHTML = "Luck Factor: " + gachaMod;
            let basegacha = Math.floor(Math.random() * 100) + 1;
            let gacha = basegacha * gachaMod;
            if (gacha < 19) {
                var carSelection = data.filter(data => data.rarity === 1);
            } else
            if (gacha < 37) {
                var carSelection = data.filter(data => data.rarity === 2);
            } else
            if (gacha < 57) {
                var carSelection = data.filter(data => data.rarity === 3);
            } else
            if (gacha < 75) {
                var carSelection = data.filter(data => data.rarity === 4);
            } else
            if (gacha < 90) {
                var carSelection = data.filter(data => data.rarity === 5);
            } else
            if (gacha < 105) {
                var carSelection = data.filter(data => data.rarity === 6);
            } else {
                var carSelection = data.filter(data => data.rarity === 7);
                                }

            let synergies = [];
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
            synergies.forEach(synergyBonus);
            function synergyBonus(synergy) {
                let synergyContainer = document.getElementById('synergyRender');
                const synergyTile = document.createElement('div');
                synergyTile.class = 'synergyGrid';
                synergyTile.innerText = synergy;
                synergyContainer.append(synergyTile);
                let focus = Math.random();
                const filteredItems = carSelection.filter(item => `${item.make} ${item.year} ${item.country} ${item.drive} ${item.tyres}`.includes(synergy));
                if (focus > 0.75 && filteredItems.length > 0) {
                    carSelection = filteredItems;
                }
                    }
            var chosenCar = carSelection[Math.floor(Math.random() * carSelection.length)];
            var carImage = chosenCar.imageID
            document.getElementById('newestCard').innerHTML = `<img src="assets/cards/${carImage}" id="imageBox"//>`
            var garageAdd = chosenCar.carID;
            money += Math.round(moneyBonus * 2);
            money += (Math.floor((Math.random() * (gachaLuck/5)) * gambleValue));
            document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            if (playerGarage.includes(garageAdd)) {
                money += Math.round((chosenCar.rarity * chosenCar.rq) * moneyBonus);
                document.getElementById('cashDisplay').innerText = "Cash: $" + money;
            } else { playerGarage.unshift(garageAdd); }
        })
        .catch(error => {
            console.log('Error fetching data:', error);
        });

}