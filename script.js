const ABVinAnHour = {
  dropdownValue: 0,
  numberValue: 0,
  totalabv: 0
};


function dropdownChange(a) {
    ABVinAnHour.dropdownValue = parseInt(document.getElementById('dropdown').value, 10);
    
    ABVinAnHour.numberValue = document.getElementById('number').value;
    ABVinAnHour.totalabv = ABVinAnHour.dropdownValue * ABVinAnHour.numberValue;
    document.getElementById('totalabv').innerHTML = ABVinAnHour.totalabv;
    console.log(ABVinAnHour.totalabv); 
}


