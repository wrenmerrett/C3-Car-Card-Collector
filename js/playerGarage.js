'use strict';

const garageButton = document.getElementById('garageDrop');

export const playerGarage = [0, 1, 2, 3, 4];
import { playerHand } from "/js/playerHand.js";

var garageList = [];
var options;

export function openRarity(evt, rarityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
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