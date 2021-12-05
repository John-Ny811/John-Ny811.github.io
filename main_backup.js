// listOfBirds holds the constants as defined in Url-List.js
let ListOfBirds = [parus_major,passer_domesticus,cyanistes_caeruleus,passer_montanus,turdus_merula,pica_pica,fringilla_coelebs,chloris_chloris,corvus_corone,columba_palumbus];

let BirdNamesLatin = ["Parus Major","Passer Domesticus","Cyanistes Caeruleus", "Passer Montanus","Turdus Merula", "Pica Pica","Fringilla Coelebs","Chloris Chloris","Corvus Corone","Columba Palumbus"];

let BirdNamesGerman = ["Kohlmeise","Haussperling","Blaumeise", "Feldsperling","Amsel", "Elster","Buchfink","Grünfink","Rabenkrähe","Ringeltaube"];

//MatchBirdNames ist ein Map wo jedem Lateinischen Namen die deutsche Entsprechung zugeordnet wird
let MatchBirdNames = new Map();

for (let i=0; i < BirdNamesLatin.length;i++){
  MatchBirdNames.set(BirdNamesLatin[i], BirdNamesGerman[i]);
}
//console.log(MatchBirdNames);

//Objekt Bird erhält einen deutschen und englischen Namen - bisher hat Bird keine weiteren Eigenschaften
var bird = new Object();

let num = Math.floor(Math.random() * 10);
let randBird = ListOfBirds[num];
bird.nameLatin =  BirdNamesLatin[num];
bird.nameGerman = BirdNamesGerman[num];
console.log(bird.name);

document.getElementById("birdnameGerman").innerHTML = bird.nameGerman;
document.getElementById("birdnameLatin").innerHTML = bird.nameLatin;



let randomSounds = [];

while (randomSounds.length < 3) {
  var randNum = Math.floor(Math.random()*randBird.length);
  var birdSound = randBird[randNum];
  //console.log('In While')
  if (!(randomSounds.includes(birdSound))){
    randomSounds.push(birdSound);
  }
}
//console.log('while finished. The length is '+randomSounds.length);
  

/*var randomSound = Math.floor(Math.random()*randBird.length);
var testBird = randBird[randomSound];
*/
//console.log(parus_major.length)
//console.log(testBird);

var buttonSound1 = new Audio(randomSounds[0]);
var buttonSound2 = new Audio(randomSounds[1]);
var buttonSound3 = new Audio(randomSounds[2]);

function stopSound(a_button) {
    a_button.pause();
    a_button.currentTime = 0;
}

function playSound(a_button) {
    stopSound(buttonSound1);
    stopSound(buttonSound2);
    stopSound(buttonSound3);
   
    a_button.play();
}

function refresh() {


//stop any sound that is playing
	stopSound(buttonSound1);
    stopSound(buttonSound2);
    stopSound(buttonSound3);
    
	bird = new Object();

	let num = Math.floor(Math.random() * 10);
	let randBird = ListOfBirds[num];
	bird.nameLatin =  BirdNamesLatin[num];
	bird.nameGerman = BirdNamesGerman[num];
	
	document.getElementById("birdnameGerman").innerHTML = bird.nameGerman;
	document.getElementById("birdnameLatin").innerHTML = bird.nameLatin;
	

	
	let randomSounds = [];

	while (randomSounds.length < 3) {
  		var randNum = Math.floor(Math.random()*randBird.length);
  		var birdSound = randBird[randNum];
  		//console.log('In While')
  		if (!(randomSounds.includes(birdSound))){
    	randomSounds.push(birdSound);
  		}
	}
	buttonSound1 = new Audio(randomSounds[0]);
	buttonSound2 = new Audio(randomSounds[1]);
	buttonSound3 = new Audio(randomSounds[2]);

}
	
/*function search(ele) {
    if(event.key === 'Enter') {
        alert(ele.value);        
    }
}

*/





//liefert eine Liste von Urls, die JSON-Datei muss lokal gespeichert sein??, zu finden auf Xeno

/*    
    $.getJSON("columba-palumbus.json", function(data) {
    console.log('test');
    	$.each(data.recordings, function(key, val) { 
    	console.log(val["file"]);
    	// do some String-replacement so its easier to copy the whole thing
    	let string_mod = val['file'];
    	string_mod = string_mod.replace('//', "'https://");
    	string_mod = string_mod.replace('download', "download',");
    	
    	
    	$("p").append(string_mod);
    	$("p").append("<br>");
    	
    
    	var Beispiel = val["file-name"];
    	
    	});
    });


*/


