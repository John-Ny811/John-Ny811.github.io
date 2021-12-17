
// listOfBirds holds the constants as defined in Url-List.js
let ListOfBirds = [parus_major,passer_domesticus,cyanistes_caeruleus,passer_montanus,turdus_merula,pica_pica,fringilla_coelebs,
  chloris_chloris,corvus_corone,columba_palumbus];


//used when changing difficulty from 2 back to 1
let ListOfBirds_original = [...ListOfBirds]

let ListOfBirdsMiddle = [dendrocopos_major, garrulus_glandarius, sylvia_borin, pyrrhula_pyrrhula, sitta_europaea,
  cuculus_canorus, delichon_urbicum, apus_apus, streptopelia_decaocto, carduelis_carduelis]

let BirdNamesLatin = ["Parus Major","Passer Domesticus","Cyanistes Caeruleus", "Passer Montanus","Turdus Merula",
 "Pica Pica","Fringilla Coelebs","Chloris Chloris","Corvus Corone","Columba Palumbus", "Dendrocopos Major",
 "Garrulus Glandarius", "Sylvia Borin", "Pyrrhula Pyrrhula", "Sitta Europaea", "Cuculus Canorus", "Delichon Urbicum",
 "Apus Apus", "Streptopelia Decaocto", "Carduelis Carduelis"];

let BirdNamesGerman = ["Kohlmeise","Haussperling","Blaumeise", "Feldsperling","Amsel", "Elster","Buchfink","Grünfink","Rabenkrähe","Ringeltaube",
"Buntspecht", "Eichelhäher", "Gartengrasmücke", "Gimpel", "Kleiber", "Kuckuck", "Mehlschwalbe", "Mauersegler", "Türkentaube", "Stieglitz"];

//MatchBirdNames ist ein Map wo jedem Lateinischen Namen die deutsche Entsprechung zugeordnet wird
let MatchBirdNames = new Map();

let diff = 1;

for (let i=0; i < BirdNamesLatin.length;i++){
  MatchBirdNames.set(BirdNamesLatin[i], BirdNamesGerman[i]);
}

let diff_prev = 1;

//declaring some variables
var buttonSound1;
var buttonSound2;
var buttonSound3;

//used for attributing the authors of certain pictures
var attribution_string = "";
var birdFileTest = "";

var _img = document.getElementById('img1');
var newImg = new Image;

//refresh is the main-function and gets called when page is loaded and after user makes a guess or wants to see the next question
window.onload = refresh();

//stopSound takes a button as an input and stops the sound of this button
function stopSound(a_button) {
    a_button.pause();
    a_button.currentTime = 0;
}

//playSound is called when user presses one of the three Sound-Buttons
function playSound(a_button) {
    stopSound(buttonSound1);
    stopSound(buttonSound2);
    stopSound(buttonSound3);

    a_button.play();
}

//showSolution is used when user presses "Lösung anzeigen" and also when user makes a guess but then testSolution() is called first
function showSolution(){

	//display the name of the chosen bird in German and Latin
	document.getElementById("birdnameGerman").innerHTML = bird.nameGerman + " ("+bird.nameLatin+")";
	

	//chose a random bird picture
	birdFileName = bird.nameLatin.replace(/ /g,"_").toLowerCase();

  //just for testing:
  //birdFileName = "cuculus_canorus"

	var i = Math.floor(Math.random()*3);

  //just for testing:
  //var i = 2;

	newImg.src = `/pics/${birdFileName}${i}.jpg`;

  //test if image has an author that needs to be displayed
  birdFileName += i.toString();
  if (authors.has(birdFileName)) {

    //console.log("in if birdFileName: "+birdFileName)
    //create the string and add it to the element with the id "attribution"
    //authors is a Map with the name of the file as index and an array of strings as value
    // the array is structured like this [title,author,license]
    attribution_string = "'"+ authors.get(birdFileName)[0] + "' by " + authors.get(birdFileName)[1] +
      ", licensed under: " + authors.get(birdFileName)[2] +".";
    document.getElementById("attribution").innerHTML = attribution_string;
  }

}

// testSolution is called when user makes a guess
function testSolution(solution) {
	  if (solution == bird.nameLatin || solution == bird.nameGerman) {
            	document.getElementById("solutionText").innerHTML = "Richtige Lösung";
            } else {
                document.getElementById("solutionText").innerHTML = "Leider Falsch - die richtige Antwort lautet:";
            }
         }

// updateAutocomplete is creating the list for the autocomplete-textinput
// we don't call it from inside refresh() because it shouldn't be called everytime
// on refresh, instead it only gets called when the difficulty is changed (=updateDiff())
updateAutocomplete();

//the main function
function refresh() {

  updateDiff();



	//stop any sound that is playing - it is wrapped in an if-clause so that there is no referenceError when refresh is loaded on startup
	if (buttonSound1 && buttonSound2 && buttonSound3){
	  stopSound(buttonSound1);
    stopSound(buttonSound2);
    stopSound(buttonSound3);
    }

    //set all the solution fields to an empty String again

    if (document.getElementById("birdnameGerman") && document.getElementById("birdnameLatin")) {

    	document.getElementById("birdnameGerman").innerHTML = "";
		document.getElementById("birdnameLatin").innerHTML = "";

	}


	if (document.getElementById("textfield1")) {
		document.getElementById("textfield1").value ="";
	}

  if (document.getElementById("solutionText")) {
    document.getElementById("solutionText").innerHTML = "";
  }

  document.getElementById("attribution").innerHTML = "";

    //create Bird-Object - so far Bird only has the properties nameLatin and nameGerman
	bird = new Object();

	//chose a random Bird from ListOfBirds
	let num = Math.floor(Math.random() * ListOfBirds.length);
	let randBird = ListOfBirds[num];
	bird.nameLatin =  BirdNamesLatin[num];
	bird.nameGerman = BirdNamesGerman[num];

	//set a placeholder image
	_img = document.getElementById('img1');
	newImg = new Image;
	newImg.src = '/pics/placeholder.png';
	newImg.onload = function() {
    	_img.src = this.src;
	}

	//choose 3 random Sounds for the chosen Bird
	let randomSounds = [];

	while (randomSounds.length < 3) {
  		var randNum = Math.floor(Math.random()*randBird.length);
  		var birdSound = randBird[randNum];
  		//console.log('In While')
  		//check if sound was already chosen -> if not then add sound to the list of the three sounds (called randomSounds)

  		if (!(randomSounds.includes(birdSound))){
    		randomSounds.push(birdSound);
  		}
	}
	buttonSound1 = new Audio(randomSounds[0]);
	buttonSound2 = new Audio(randomSounds[1]);
	buttonSound3 = new Audio(randomSounds[2]);

}

//search is used when user presses enter
function search(ele) {

   	if(event.key === 'Enter') {
         testSolution(ele.value);
         showSolution();
		}
}

//getInput is used when user clicks "abschicken"
function getInput() {

	 var inputVal = document.getElementById("textfield1").value;
	 testSolution(inputVal);
	 showSolution();
}

function updateDiff() {
  var d = document.getElementById("difficulty");
  diff = d.options[d.selectedIndex].value;

  //if you want to get the text value: var myDiff_text = myDiff.options[d.selectedIndex].text;

  console.log("difficulty value "+ diff)
  console.log("previous diff "+diff_prev)

  if (diff == 2){

    if (diff_prev == diff) {
      return;
    }
    console.log("old length: " + ListOfBirds.length)

    ListOfBirds = ListOfBirds.concat(ListOfBirdsMiddle)
    console.log("new List :" + ListOfBirds.length)
    diff_prev = diff;
  }

  if (diff == 1) {
    if (diff_prev == diff) {
      console.log("diff = prev so im returning")
      return;
    }
    ListOfBirds = [...ListOfBirds_original];
    console.log("set diff back - new List " + ListOfBirds.length)
    diff_prev = diff;
  }

  updateAutocomplete();

}



function updateAutocomplete(){

  //updating the autocomplete-textfield1
  var dList = document.getElementById("dliste");
  //remove all elements from autocomplete-textfield1
  while (dList.firstChild) {
    dList.removeChild(dList.lastChild);
  }
  //append the names to autocomplete-textfied
  for (var i = 0; i < ListOfBirds.length; i++) {
    var opt = document.createElement('option');
    opt.value = BirdNamesGerman[i];
    dList.appendChild(opt);
    console.log("appended: "+opt.value)
  }

}









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
