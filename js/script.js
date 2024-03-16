function addDrink() {
  var drinkList = document.getElementById("drink-list");
  var drinkItems = document.querySelectorAll(".drink-item"); //get all the drinks
  var newDrinkId = drinkItems.length + 1; //get the number of drinks and add 1 to it for the id (basically drink number)
  var newDrinkItem = document.createElement("div");
  newDrinkItem.classList.add("drink-item"); 
  newDrinkItem.setAttribute("data-id", newDrinkId);
  newDrinkItem.innerHTML = `
      <h3>Drink ${newDrinkId}</h3>
      <label for="alcohol">Alcohol Percentage:</label>
      <select class="alcohol">
                    <option value="5">Beer, Hard Seltzer (5%)</option>
                    <option value="7">Malt Liquor (7%)</option>
                    <option value="12">Table Wine (12%)</option>
                    <option value="40">Distilled Spirit (40%)</option>
      </select><br><br>
      <input type="number" class="volume" min="0" step="any">
      <label for="volume">fl oz</label><br><br>
      <button onclick="removeDrink(${newDrinkId})">Remove</button>
  `;
  drinkList.appendChild(newDrinkItem);
}

function removeDrink(id) {
  var drinkItem = document.querySelector(`[data-id="${id}"]`);
  drinkItem.remove();
}

function calculateBAC() {
  var bac = 0;
  var gender = document.getElementById("gender").value;
  var weight = parseFloat(document.getElementById("weight").value);
  var timeUnit = document.querySelector('select.time-unit').value;
  
  if (weight <= 0) weight = 1; //dont divide by zero
  var weightUnit = document.querySelector('input[name="weight-unit"]:checked').value;//get checked value
  if (weightUnit === "kg") {
      weight /= 0.453592; // Convert pounds to kilograms
  }
  var drinks = document.querySelectorAll(".drink-item");
  var totalPureAlcohol = 0;
  drinks.forEach(function(drink) {
    var alcoholPercentage = parseFloat(drink.querySelector(".alcohol").value); //percent
    var volume = parseFloat(drink.querySelector(".volume").value); //amount
    var pureAlcohol = volume * (alcoholPercentage/100);
    totalPureAlcohol += pureAlcohol;
  });
  
  //determine level of alcoholism
  var lvlOfAlcoholism = 0;
  var totalStandardDrinks = (totalPureAlcohol / .6).toFixed(0);
  var typeOfDrinker = "Sober";
  if ((gender === "male" && totalStandardDrinks <= 2) ||(gender === "female" && totalStandardDrinks <= 1)) {lvlOfAlcoholism = .012; typeOfDrinker = "Light";}
  else if ((gender === "male" && totalStandardDrinks <= 4) ||(gender === "female" && totalStandardDrinks <= 3)) {lvlOfAlcoholism = .017;typeOfDrinker = "Moderate"}
  else if ((gender === "male" && totalStandardDrinks > 4) ||(gender === "female" && totalStandardDrinks > 3)){lvlOfAlcoholism = .02;typeOfDrinker="Heavy"}
  
  

  drinks.forEach(function(drink) {
      var alcoholPercentage = parseFloat(drink.querySelector(".alcohol").value); //percent
      var volume = parseFloat(drink.querySelector(".volume").value); //amount
      var pureAlcohol = volume * (alcoholPercentage/100);
      

      
      if (gender === "male") { var r = 0.68; } else { var r = 0.55; } //if gender is male, r = 0.68, else r = 0.55

      var addedBac = ((pureAlcohol/.6 * 14) / (weight * 453.592 * r)) * 100; //added bac
      bac += addedBac;
  });
  var time =parseFloat(document.querySelector(".time").value);
  if (timeUnit === "minutes") time /=60;
  bac -= lvlOfAlcoholism * time;

  if (bac < 0) {
    bac = 0;
  }

  // Convert BAC to percentage
  if (!isNaN(bac) && bac!=null) { 
    document.getElementById("result").innerHTML = "You've drank a total of " + totalPureAlcohol.toFixed(2) + " fl oz of pure alcohol. <br><br> That's " + totalStandardDrinks+" standard drinks. You're a " + typeOfDrinker+" drinker. <br><br> Your Blood Alcohol Content (BAC) is: " + bac.toFixed(3) + "%";
  } else {
    alert("Please fill in all fields!");
  }

  var image = document.createElement("img");
  var existingImage = document.querySelector("#image-container img");
  if (existingImage) {
    if (typeOfDrinker === "Light") existingImage.src = "images/light-drinker.jpg";
    else if (typeOfDrinker === "Moderate") existingImage.src = "images/moderate-drinker.jpg";
    else if (typeOfDrinker === "Heavy") existingImage.src = "images/heavy-drinker.png";
  } else {
    var image = document.createElement("img");
    if (typeOfDrinker === "Light") image.src = "images/light-drinker.jpg";
    else if (typeOfDrinker === "Moderate") image.src = "images/moderate-drinker.jpg";
    else if (typeOfDrinker === "Heavy") image.src = "images/heavy-drinker.png";
    
    document.getElementById("image-container").appendChild(image);
  }
  
  
}
