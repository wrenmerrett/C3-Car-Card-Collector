'use strict';

import { playerGarage } from "/js/playerGarage.js";
import { money, moneyChanger } from "/js/app.js";

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
    return ownedbtn;
};

function buyButton(id, price) {
    let buybtn = document.createElement('button');
    buybtn.id = id;
    console.log(buybtn.id);
    buybtn.classList.add('buybtn'); // Use classList to add a class
    buybtn.innerHTML = "BUY: $" + price;
    buybtn.onclick = (buyCar(buybtn.id, buybtn.innerText));
    return buybtn;
};

function buyCar(id,pricetag) {
    let purchaseCost = pricetag.replace(/\D/g, "");
    let newCar = id * 1;
    console.log(newCar);
    if (purchaseCost <= money) {
        console.log(purchaseCost);
        moneyChanger(purchaseCost);
        playerGarage.push(newCar);
        console.log(playerGarage);
    } else {
        console.log("ur broke lol");
    }

}

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
                    shopCard.id = shopCar.carID;
                    const shopImg = document.createElement('img');
                    shopImg.src = "/assets/cards/" + shopCar.imageID;
                    shopCard.appendChild(shopImg);
                    if (playerGarage.includes(shopCar.carID)) {
                        let buttonID = shopCar.carID;
                        let ownedtag = ownedButton(buttonID);
                        shopCard.appendChild(ownedtag);
                    } else {
                        let price = (shopCar.rarity * shopCar.rq)*(2^(shopCar.rarity)+10)
                        let pricetag = buyButton(shopCar.carID, price)
                        shopCard.appendChild(pricetag);
                    }
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


