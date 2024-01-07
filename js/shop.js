'use strict';

import { playerGarage, playerPrestigeGarage } from "./playerGarage.js";
import { money, restockCost, moneyChanger, restockUp, restockDown } from "./app.js";

export let shopContainer;

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

function prestigeButton(id, price) {
    let pbtn = document.createElement('button');
    pbtn.id = id;
    pbtn.classList.add('prestigebtn'); // Use classList to add a class
    pbtn.innerHTML = "PRESTIGE: $" + price;
    pbtn.addEventListener('click', () => {
        prestigeCar(pbtn.id, price);
    });
    return pbtn;
}

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
        let reimburse = Math.round((purchaseCost * 0.05));
        restockDown(reimburse);
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
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
        let reimburse = Math.round((purchaseCost * 0.05));
        restockDown(reimburse);
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
        playerPrestigeGarage.push(prestigedCar);
        console.log(playerPrestigeGarage);
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
                    shopContainer = document.getElementById('shopGrid');
                    var shopCard = document.createElement('div');
                    shopCard.id = shopCar.carID;
                    const shopImg = document.createElement('img');
                    shopImg.src = "./assets/cards/" + shopCar.imageID;
                    shopCard.appendChild(shopImg);
                    let price = (shopCar.rarity * shopCar.rq)*(2^(shopCar.rarity)+9)
                    if (playerPrestigeGarage.includes(shopCar.carID)) {
                        let buttonID = shopCar.carID;
                        let ownedTag = ownedButton(buttonID);
                        shopCard.appendChild(ownedTag);
                    }
                    else if (playerGarage.includes(shopCar.carID)) {
                        let buttonID = shopCar.carID;
                        let prestigeTag = prestigeButton(buttonID,price);
                        shopCard.appendChild(prestigeTag);
                    } else {
                        let pricetag = buyButton(shopCar.carID, price)
                        shopCard.appendChild(pricetag);
                    }
                    shopContainer.append(shopCard);
            }
            let elites = data.cars;
            const eliteCars = elites.filter(c => c.elite == "yes");
            let shopgacha = Math.floor(Math.random() * 100) + 1;
            if (shopgacha < 15) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 1);
            } else
            if (shopgacha < 30) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 2);
            } else
            if (shopgacha < 50) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 3);
            } else
            if (shopgacha < 75) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 4);
            } else
            if (shopgacha < 85) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 5);
            } else
            if (shopgacha < 96) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 6);
            } else {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 7);
                        }
            let eliteShopCar = eliteSelect[Math.floor(Math.random() * eliteSelect.length)];
            shopContainer = document.getElementById('shopGrid');
            var eliteShopCard = document.createElement('div');
            eliteShopCard.id = eliteShopCar.carID;
            const eliteImg = document.createElement('img');
            eliteImg.src = "./assets/cards/" + eliteShopCar.imageID;
            eliteShopCard.append(eliteImg);
            let price = ((eliteShopCar.rarity * eliteShopCar.rq)*180);
            if (playerPrestigeGarage.includes(eliteShopCar.carID)) {
                let buttonID = eliteShopCar.carID;
                let ownedTag = ownedButton(buttonID);
                eliteShopCard.appendChild(ownedTag);
            }
            else if (playerGarage.includes(eliteShopCar.carID)) {
                let buttonID = eliteShopCar.carID;
                let prestigeTag = prestigeButton(buttonID, price);
                eliteShopCard.appendChild(prestigeTag);
            } else {
                
                let pricetag = eliteButton(eliteShopCar.carID, price, eliteShopCar.perk)
                eliteShopCard.appendChild(pricetag);
            }
            shopContainer.append(eliteShopCard);
        });
    }

