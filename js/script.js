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
      <label for="volume">Volume:</label>
      <input type="number" class="volume" min="0" step="any">
      <select class="volume-unit">
         <option value="fl-oz">fl oz</option>
          <option value="ml">ml</option>
      </select><br><br>
      <label for="time">Time since drink (hours):</label>
      <input type="number" class="time" min="0" step="any"><br><br>
      <button onclick="removeDrink(${newDrinkId})">Remove</button>
  `;
  drinkList.appendChild(newDrinkItem);
}

function removeDrink(id) {
  var drinkItem = document.querySelector(`[data-id="${id}"]`);
  drinkItem.remove();
}

function calculateBAC() {
  var gender = document.getElementById("gender").value;
  var weight = parseFloat(document.getElementById("weight").value);
  if (weight <= 0) weight = 1;
  var weightUnit = document.querySelector('input[name="weight-unit"]:checked').value;//get checked value
  if (weightUnit === "lbs") {
      weight *= 0.453592; // Convert pounds to kilograms
  }
  var drinks = document.querySelectorAll(".drink-item");
  var totalAlcConsumed = 0;

  drinks.forEach(function(drink) {
      var alcoholPercentage = parseFloat(drink.querySelector(".alcohol").value); //percent
      var volume = parseFloat(drink.querySelector(".volume").value); //amount
      var volumeUnit = drink.querySelector(".volume-unit").value; //unit  of amount
      if (volumeUnit === "fl-oz") {
          volume *= 29.5735; // Convert fluid ounces to milliliters
      }
      var time = parseFloat(drink.querySelector(".time").value);
      if (gender === "male") {
        var r = 0.68;
      } else {
        var r = 0.55;
      } //if gender is male, r = 0.68, else r = 0.55
      var standardDrinkAmount = (volume * alcoholPercentage/100 * 0.789)
      if (time < 0) time = 0;
      var alcConsumed = standardDrinkAmount / (weight * r) - (0.015 * time); 
      totalAlcConsumed += alcConsumed;
  });

  var bac = totalAlcConsumed / 10; //somewhere in my calculations, I multiplied by 100, so I need to divide by 10 to get the correct BAC

  if (bac < 0) {
    bac = 0;
  }

  // Convert BAC to percentage
  if (!isNaN(bac) && bac!=null) { //honestly dont know which works
    document.getElementById("result").innerHTML = "Your Blood Alcohol Content (BAC) is: " + bac.toFixed(3) + "%";
  } else {
    alert("Please fill in all fields!");
  }
  
}
