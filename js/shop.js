'use strict';

import { playerGarage } from "./playerGarage.js";
import { money, restockCost, moneyChanger, restockUp } from "./app.js";

const rarities = ['common', 'uncommon', 'rare', 'superRare', 'ultraRare', 'epic', 'legendary']
let cards;
let perkInfo;

let restockButton = document.getElementById('restocker');
document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;

restockButton.addEventListener('click', () => {
    if (money >= restockCost) {restockUp();
        document.getElementById("brokeMessage").innerText = "";
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
        document.getElementById('shopGrid').innerText = "";
        populateShop();}
    else {
        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
    }
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
    buybtn.classList.add('buybtn'); // Use classList to add a class
    buybtn.innerHTML = "BUY: $" + price;
    buybtn.addEventListener('click', () => {
        buyCar(buybtn.id, price);
    });
    return buybtn;
};

function eliteButton(id, price, perk) {
    let elitebtn = document.createElement('button');
    elitebtn.id = id;
    elitebtn.classList.add('elitebtn'); // Use classList to add a class
    elitebtn.innerHTML = "ELITE - " + perk + " - PRICE: $" + price;
    elitebtn.addEventListener('click', () => {
        buyCar(elitebtn.id, price);
    });
    return elitebtn;
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
                    shopImg.src = "./assets/cards/" + shopCar.imageID;
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
            var eliteShopCard = document.createElement('div');
            eliteShopCard.id = eliteShopCar.carID;
            const eliteImg = document.createElement('img');
            eliteImg.src = "./assets/cards/" + eliteShopCar.imageID;
            eliteShopCard.append(eliteImg);
            if (playerGarage.includes(eliteShopCar.carID)) {
                let buttonID = eliteShopCar.carID;
                let ownedtag = ownedButton(buttonID);
                eliteShopCard.appendChild(ownedtag);
            } else {
                let price = ((eliteShopCar.rarity * eliteShopCar.rq)*200);
                let pricetag = eliteButton(eliteShopCar.carID, price, eliteShopCar.perk)
                eliteShopCard.appendChild(pricetag);
            }
            shopContainer.append(eliteShopCard);
        })
    
}


