const ABVinAnHour = {
  drinkValue: 0,
  amountValue: 0,
  totalabv: 0,
  totalbac: 0,
};

//60% at 1 fl oz is 1 standard drink.
function dropdownChange(a) {
    ABVinAnHour.drinkValue = parseInt(document.getElementById('dropdown').value, 10);
    
    ABVinAnHour.amountValue = document.getElementById('number').value;
    ABVinAnHour.totalabv = ABVinAnHour.drinkValue * ABVinAnHour.amountValue /60;
    var weight = document.getElementById('weightnumber').value * document.getElementById('weight').value;
    var genderConstant = document.getElementById('gender').value;

    //bac = standard drinks / (weight*genderConstant) - Time * metabolic rate constant
    document.getElementById('totalabv').innerHTML = ABVinAnHour.totalabv;
    document.getElementById('totalbac').innerHTML = (ABVinAnHour.totalabv * .6 * 5.14)/(weight * genderConstant);

}


