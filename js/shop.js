'use strict';

import { playerGarage, playerPrestigeGarage, collectionHandDisplay } from "./playerGarage.js";
import { money, restockCost, moneyChanger, restockUp, restockDown } from "./app.js";
import { toolAdder, eliteTools } from "./elite.js";

export let shopContainer;
let price;

let restockButton = document.getElementById('restocker');

export const shopUpgrades = [
    {
        "upgradeID" : 'u1',
        "upgradeName" : "High-End Import",
        "upgradeCostCash" : 250000,
        "upgradeCostTools" : 0,
        "upgradeImgURL": "./assets/highendimp.png",
        "upgradeActive" : false
    },
    {
        "upgradeID" : 'u2',
        "upgradeName" : "Double Elites",
        "upgradeCostCash" : 1000000,
        "upgradeCostTools" : -1000,
        "upgradeImgURL": "./assets/doubleleet.png",
        "upgradeActive" : false
    },
    {
        "upgradeID" : 'u3',
        "upgradeName" : "High-End Elites",
        "upgradeCostCash" : 10000000,
        "upgradeCostTools" : -5000,
        "upgradeImgURL": "./assets/highendleet.png",
        "upgradeActive" : false
    }
];

document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost + " (Applies shop upgrades)";
document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;

restockButton.addEventListener('click', () => {
    if (money >= restockCost) {restockUp();
        document.getElementById("brokeMessage").innerText = "";
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
        document.getElementById('shopGrid').innerText = "";
        document.getElementById('dealerCashDisplay').innerText = "Cash: $" + money;
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
        fetch('./js/data.json')
        .then((response) => response.json())
        .then((data) => {
            let boughtCar = data.cars
            const isElite = boughtCar.filter(c => c.elite == "yes");
            if (isElite.find(e => e.carID === newCar)) {
                let tokenDrop = Math.ceil(purchaseCost / 20000);
                toolAdder(tokenDrop);
            }
        });
        document.getElementById("brokeMessage").innerText = "Thanks for your purchase!";
        moneyChanger(purchaseCost);
        let reimburse = Math.round((purchaseCost * 0.03));
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
        fetch('./js/data.json')
        .then((response) => response.json())
        .then((data) => {
            let boughtCar = data.cars
            const isElite = boughtCar.filter(c => c.elite == "yes");
            if (isElite.find(e => e.carID === prestigedCar)) {
                let tokenDrop = Math.ceil(purchaseCost / 20000);
                console.log(tokenDrop);
            }
        });
        document.getElementById("brokeMessage").innerText = "Thanks for your purchase!";
        moneyChanger(purchaseCost);
        let reimburse = Math.round((purchaseCost * 0.03));
        restockDown(reimburse);
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost;
        playerPrestigeGarage.push(prestigedCar);
        console.log(playerPrestigeGarage);
        collectionHandDisplay();
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
                    const HESelected = cars.filter(c => c.rarity === rarity);
                    let shopCar = HESelected[Math.floor(Math.random() * HESelected.length)];
                    shopContainer = document.getElementById('shopGrid');
                    var shopCard = document.createElement('div');
                    shopCard.id = shopCar.carID;
                    const shopImg = document.createElement('img');
                    shopImg.src = "./assets/cards/" + shopCar.imageID;
                    shopCard.appendChild(shopImg);
                    let price = (shopCar.rarity * shopCar.rq)*(3^(shopCar.rarity)+18)
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
            if (shopgacha < 12) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 1);
            } else
            if (shopgacha < 25) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 2);
            } else
            if (shopgacha < 45) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 3);
            } else
            if (shopgacha < 70) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 4);
            } else
            if (shopgacha < 85) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 5);
            } else
            if (shopgacha < 4) {
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
            let price = ((eliteShopCar.rarity * eliteShopCar.rq)*270);
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
            shopgrades();
            
        });
    }


    export function shopgrades() {
        document.getElementById("restockPrice").innerHTML = "Restock Price: $" + restockCost + " (Applies shop upgrades)";
        fetch('./js/data.json')
        .then((response) => response.json())
        .then((data) => {
            let cars = data.cars;
            if (shopUpgrades[0].upgradeActive === false) {
                shopContainer = document.getElementById('shopGrid');
                var SlotUpgrade = document.createElement('div');
                const upgImage = document.createElement('img');
                upgImage.src = shopUpgrades[0].upgradeImgURL;
                upgImage.id = shopUpgrades[0].upgradeID;
                upgImage.onclick = (event) => {
                    price = shopUpgrades[0].upgradeCostCash;
                    if (money < price) {
                        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
                    } else {
                        moneyChanger(price);
                        shopUpgrades[0].upgradeActive = true;
                        event.target.parentNode.remove(); // Use event.target to reference the clicked button
                    };
                    
                };
                    
                SlotUpgrade.append(upgImage)
                shopContainer.append(SlotUpgrade);
            } else {
                let HERarityCheck = Math.random();
                let rarity = 0;
                if (HERarityCheck >= 0.75) {
                    rarity = 7;
                } else {
                    rarity = 6;
                }
                console.log(rarity);
                let HESelected = cars.filter(c => c.rarity === rarity);
                HESelected = HESelected.filter(c => c.elite !== 'yes')

                let protectionRNG = Math.random();
                if (protectionRNG > 0.8) {
                    let dupeProtected = HESelected.filter(HESelected => !playerGarage.includes(HESelected.carID))
                    if (dupeProtected.length > 0) {
                        HESelected = dupeProtected;
                    }
                };
                let HECar = HESelected[Math.floor(Math.random() * HESelected.length)];
                
                console.log(HECar);
                shopContainer = document.getElementById('shopGrid');
                var shopCard = document.createElement('div');
                shopCard.id = HECar.carID;
                const shopImg = document.createElement('img');
                shopImg.src = "./assets/cards/" + HECar.imageID;
                shopCard.appendChild(shopImg);
                let price = (HECar.rarity * HECar.rq)*135;
                if (playerPrestigeGarage.includes(HECar.carID)) {
                    let buttonID = HECar.carID;
                    let ownedTag = ownedButton(buttonID);
                    shopCard.appendChild(ownedTag);
                }
                else if (playerGarage.includes(HECar.carID)) {
                    let buttonID = HECar.carID;
                    let prestigeTag = prestigeButton(buttonID,price);
                    shopCard.appendChild(prestigeTag);
                } else {
                    let pricetag = buyButton(HECar.carID, price)
                    shopCard.appendChild(pricetag);
                }
                shopContainer.append(shopCard);
            }
    
            if (shopUpgrades[1].upgradeActive === false) {
                shopContainer = document.getElementById('shopGrid');
                var SlotUpgrade = document.createElement('div');
                const upgImage = document.createElement('img');
                upgImage.src = shopUpgrades[1].upgradeImgURL;
                upgImage.id = shopUpgrades[1].upgradeID;
                SlotUpgrade.append(upgImage)
                shopContainer.append(SlotUpgrade);
                upgImage.onclick = (event) => {
                    price = shopUpgrades[1].upgradeCostCash;
                    let toolPrice = shopUpgrades[1].upgradeCostTools;
                    let toolCheck = toolPrice * -1;
                    if (money < price || eliteTools < toolCheck) {
                        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
                    } else {
                        moneyChanger(price);
                        toolAdder(toolPrice);
                        shopUpgrades[1].upgradeActive = true;
                        event.target.parentNode.remove(); // Use event.target to reference the clicked button
                    };
                    
                };
            } else {
            let elites = data.cars;
            const eliteCars = elites.filter(c => c.elite == "yes");
            let shopgacha = Math.floor(Math.random() * 100) + 1;
            if (shopgacha < 12) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 1);
            } else
            if (shopgacha < 25) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 2);
            } else
            if (shopgacha < 45) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 3);
            } else
            if (shopgacha < 70) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 4);
            } else
            if (shopgacha < 85) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 5);
            } else
            if (shopgacha < 4) {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 6);
            } else {
                var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 7);
                        }
            let protectionRNG = Math.random();
            if (protectionRNG > 0.8) {
                let dupeProtected = eliteSelect.filter(eliteSelect => !playerGarage.includes(eliteSelect.carID))
                if (dupeProtected.length > 0) {
                    eliteSelect = dupeProtected;
                }
            };
            let eliteShopCar = eliteSelect[Math.floor(Math.random() * eliteSelect.length)];
            shopContainer = document.getElementById('shopGrid');
            var eliteShopCard = document.createElement('div');
            eliteShopCard.id = eliteShopCar.carID;
            const eliteImg = document.createElement('img');
            eliteImg.src = "./assets/cards/" + eliteShopCar.imageID;
            eliteShopCard.append(eliteImg);
            let price = ((eliteShopCar.rarity * eliteShopCar.rq)*270);
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
            }
    
            if (shopUpgrades[2].upgradeActive === false) {
                shopContainer = document.getElementById('shopGrid');
                var SlotUpgrade = document.createElement('div');
                const upgImage = document.createElement('img');
                upgImage.src = shopUpgrades[2].upgradeImgURL;
                upgImage.id = shopUpgrades[2].upgradeID;
                SlotUpgrade.append(upgImage)
                shopContainer.append(SlotUpgrade);
                upgImage.onclick = (event) => {
                    price = shopUpgrades[2].upgradeCostCash;
                    let toolPrice = shopUpgrades[2].upgradeCostTools;
                    let toolCheck = toolPrkce * -1;
                    if (money < price || eliteTools < toolCheck) {
                        document.getElementById("brokeMessage").innerText = "Come back when you're a little... richer!";
                    } else {
                        moneyChanger(price);
                        toolAdder(toolPrice);
                        shopUpgrades[2].upgradeActive = true;
                        event.target.parentNode.remove(); // Use event.target to reference the clicked button
                    };
                    
                };
            } else {
                let elites = data.cars;
                const eliteCars = elites.filter(c => c.elite == "yes");
                let shopgacha = Math.random();
                
                if (shopgacha > 0.75) {
                    var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 7);
                } else {
                    var eliteSelect = eliteCars.filter(eliteCars => eliteCars.rarity === 6);
                            }
                let protectionRNG = Math.random();
                if (protectionRNG > 0.8) {
                    let dupeProtected = eliteSelect.filter(eliteSelect => !playerGarage.includes(eliteSelect.carID))
                    if (dupeProtected.length > 0) {
                        eliteSelect = dupeProtected;
                    }
                };
                let eliteShopCar = eliteSelect[Math.floor(Math.random() * eliteSelect.length)];
                shopContainer = document.getElementById('shopGrid');
                var eliteShopCard = document.createElement('div');
                eliteShopCard.id = eliteShopCar.carID;
                const eliteImg = document.createElement('img');
                eliteImg.src = "./assets/cards/" + eliteShopCar.imageID;
                eliteShopCard.append(eliteImg);
                let price = ((eliteShopCar.rarity * eliteShopCar.rq)*270);
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
            }
        })
        
    }
