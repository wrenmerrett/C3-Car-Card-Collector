'use strict';

const garageButton = document.getElementById('garageDrop');

export const playerGarage = [0, 1, 2, 3, 4];
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');
import { playerHand } from "/js/playerHand.js";
import { rarities } from "/js/app.js";

tabs.forEach(tab => tab.addEventListener('click', handleTabClick));

var garageList = [];
var options;
var common = rarities[0];
var uncommon = rarities[1];
var rare = rarities[2];
var superRare = rarities[3];
var ultraRare = rarities[4];
var epic = rarities[5];
var legendary = rarities[6];

function handleTabClick(event) {
    const target = event.target;
    const id = target.id;

    cards.forEach(card => {
        if (card.dataset.rarity !== id) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });
}

export function carSwapper() {
    fetch('/js/data.json')
        .then(response => response.json())
        .then(data => {
            const selectableCars = playerGarage.filter(val => !playerHand.includes(val));
            for (var i = 0; i < selectableCars.length; i++) {
                var checkNumber = selectableCars[i];
                namePull(checkNumber);
            }
            function namePull(c) {
                var table = "";

                for (var c in data) {
                    table += "<tr>";
                    table += "<td>"
                        + data[c].carID + "</td>"
                        + "<td>" + data[c].rq + "</td>"
                        + "<td>" + data[c].year + "</td>";
                    + "<td>" + data[c].make + "</td>";
                    +"<td>" + data[c].model + "</td>";
                    table += "</tr>";
                }
                document.getElementById("result").innerText = table;
                const checker = num;
                garageList.unshift("RQ"+(data[checker].rq) + " " +(data[checker].year) + " " + (data[checker].make) + " " + (data[checker].model));
            };
            
        }
    )
};

