import axios from "axios";

let flavors = Array.from(document.querySelectorAll('.flavors'));
flavors = flavors.map(function(flavor) {
  let newFlavor = flavor.innerHTML;
  if (newFlavor.endsWith("!")) {
    newFlavor = newFlavor.slice(0, (newFlavor.length - 1))
  }
  return newFlavor.toLowerCase();
})
flavors = flavors.map(function(flavor) {
  switch (flavor) {
    case "spicy":
      let spicy = {
        "spicy": ["biryani", "butter-chicken", "dosa", "samosa"] 
      }
      return spicy;
    case "sweet":
      let sweet = {
        "sweet": ["dessert"]
      }
      return sweet;
    case "rice":
      let rice = {
        "rice": ["biryani", "idly", "rice"]
      }
      return rice;
    case "pasta":
      let pasta = {
        "pasta": ["pasta"]
      }
      return pasta;
    case "burger":
      let burger = {
        "burger": ["burger"]
      }
      return burger;
    case "pizza":
      let pizza = {
        "pizza": ["pizza"]
      }
      return pizza;
  }
})

async function fetchFlavor(flavor) {
  try {
    const allFoods = await axios.get(`https://foodish-api.herokuapp.com/api/images/${flavor}/`);
    if (allFoods.status == 200) {
      return allFoods.data.image;
    }
  } catch {error} {
    console.log("Oh no we are in a bad place");
    console.log(error);
  }
}

function randomFlavor(flavors) {
  let num = Math.floor(Math.random() * flavors);
  return num;
}

function flavorFood() {
  let flavorButton = document.getElementById("submitFlavor");
  let flavorImg = document.getElementById("flavorFood");
  flavorButton.addEventListener("click", async function() {
    let flavor = document.getElementById("flavor").value;
    for (let i = 0; i < flavors.length; i++) {
      if (flavors[i][flavor]) {
        let dishes = flavors[i][flavor].length;
        let dish = flavors[i][flavor][randomFlavor(dishes)];
        let img = await fetchFlavor(dish);
        flavorImg.src = img;
        flavorImg.style.maxHeight = "50vh";
      }
    }  
  })
}

flavorFood()

async function fetchFood() {
  try {
    const allFoods = await axios.get("https://foodish-api.herokuapp.com/api/");
    if (allFoods.status == 200) {
      return allFoods.data.image;
    }
  } catch {error} {
    console.log("Oh no we are in a bad place");
    console.log(error);
  }
}

function randomFood() {
  let randomButton = document.getElementById("randomDish");
  let randomImg = document.getElementById("randomFood");
  randomButton.addEventListener("click", async function() {
    let img = await fetchFood();
    randomImg.src = img;
    randomImg.style.maxHeight = "50vh"; 
  })
}

randomFood();