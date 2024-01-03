'use strict';

import { playerGarage } from "/js/playerGarage.js";

const rarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']
let cards;

let restockButton = document.getElementById('restocker');
console.log(restockButton);

restockButton.addEventListener('click', () => {
    document.getElementById('shopGrid').innerText = "";
    populateShop();
});

function ownedButton(id) {
    let ownedbtn = document.createElement('button');
    ownedbtn.id = id;
    ownedbtn.classList.add('shopbtn'); // Use classList to add a class
    ownedbtn.innerHTML = "OWNED";
    console.log(ownedbtn);
    return ownedbtn;
};

function populateShop() {
    fetch('./js/data.json')
        .then((response) => response.json())
        .then((data) => {
            let cars = data.cars;
            cars = cars.filter(c => c.elite !== "yes");
            const inStock = [];
                for (let rarity = 1; rarity < 6; rarity++) {
                    const selected = cars.filter(c => c.rarity === rarity);
                    let shopCar = selected[Math.floor(Math.random() * selected.length)];
                    var shopContainer = document.getElementById('shopGrid');
                    var shopCard = document.createElement('div');
                    const shopImg = document.createElement('img');
                    shopImg.src = "/assets/cards/" + shopCar.imageID;
                    if (playerGarage.includes(shopCar.carID)) {
                        let button = ownedButton(shopCar.carID);
                        shopImg.appendChild(button);
                    }
                    shopCard.appendChild(shopImg);
                    shopContainer.append(shopCard);
            }
            let elites = data.cars;
            const eliteCars = elites.filter(c => c.elite == "yes")
            let eliteShopCar = eliteCars[Math.floor(Math.random() * eliteCars.length)];
            var shopContainer = document.getElementById('shopGrid');
            const eliteImg = document.createElement('img');
            eliteImg.src = "/assets/cards/" + eliteShopCar.imageID;
            shopContainer.append(eliteImg);
        })
    
}


