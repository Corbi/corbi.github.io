// Obtiene los botones del documento
var words = ["dog", "cat", "cow", "horse", "pig", "sheep", "goat", "chicken", "duck",
	"goose", "turkey", "deer", "elk", "moose", "bear", "wolf", "coyote", "fox", "raccoon",
	"skunk", "otter", "beaver", "muskrat", "squirrel", "chipmunk", "rabbit", "hare", "deer",
	"antelope", "bison", "crocodile", "dolphin", "shark", "whale", "seagull", "pelican",
	"crane", "heron", "egret", "flamingo", "ostrich", "emu", "cassowary", "rhea", "kangaroo",
	"wallaby", "wombat", "platypus", "echidna", "porcupine", "opossum", "armadillo", "sloth",
	"anteater", "giraffe", "zebra", "hyena", "lion", "tiger", "leopard", "jaguar", "cheetah",
	"lynx", "puma", "cougar", "ocelot", "gazelle", "ibex", "impala", "gazelle", "okapi",
	"oryx", "table", "chair", "sofa", "bed", "book", "pen", "computer", "laptop",
	"smartphone", "television", "clock", "watch", "pencil", "paper", "book", "notebook",
	"desk", "chair", "computer", "laptop", "woman", "man", "girl", "robot", "boy",
    "monitor", "mouse", "keyboard", "printer", "scanner", "telephone", "cellphone",
    "tablet", "television", "refrigerator", "stove", "oven", "microwave", "dishwasher",
    "sink", "toaster", "coffee maker", "blender", "food processor", "bowl", "plate",
    "glass", "cup", "fork", "knife", "spoon", "pot", "pan", "towel", "soap", "shampoo",
    "toothbrush", "toothpaste", "floss", "brush", "comb", "mirror", "clock", "watch",
    "alarm", "lamp", "lightbulb", "candle", "matches", "lighter", "umbrella", "raincoat",
    "jacket", "coat", "sweater", "shirt", "pants", "jeans", "shorts", "skirt", "dress",
    "shoes", "socks", "hat", "gloves", "scarf", "belt", "bag", "backpack", "purse",
    "wallet", "keys", "coin", "cash", "credit card", "ID card", "passport", "ticket",
    "picture frame", "vase", "plant", "flower", "cushion", "blanket", "pillow", "bed",
    "mattress", "sheet", "comforter", "duvet", "curtain", "blind", "carpet", "rug",
	"beach", "mountain", "island", "desert", "jungle", "rainforest", "forest", "lake", "river", "ocean",
    "cave", "valley", "waterfall", "canyon", "hill", "cliff", "plateau", "plain", "city", "town",
    "village", "suburb", "metropolis", "capital", "port", "harbor", "dock", "airport", "train station", "bus station",
    "hotel", "motel", "resort", "spa", "campground", "national park", "state park", "city park", "garden", "zoo",
    "aquarium", "museum", "art gallery", "library", "theater", "cinema", "stadium", "arena", "amusement park", "carnival",
    "fairground", "market", "mall", "shopping center", "grocery store", "convenience store", "department store", "boutique", "bakery", "cafe",
    "restaurant", "bar", "nightclub", "casino", "gas station", "car rental", "car repair", "car wash", "bank", "post office",
    "school", "university", "college", "hospital", "clinic", "dentist", "pharmacy", "gym"];
	
	
var tipos =	["painting", "draw", "illustration", "cgi", "3d", "shape", "colors", "anime", "cartoon", "photo", ""];
var selectedFunction;

const MIN_DATE = "2015-01-01";
const MAX_DATE = "2022-05-01";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var humanButton = document.getElementById("human-button");
var iaButton = document.getElementById("ia-button");

var hits = document.getElementById("hits");
var misses = document.getElementById("misses");

var hits2 = document.getElementById("hits2");
var misses2 = document.getElementById("misses2");

var thumbUp = document.getElementById("thumbUp");
var thumbDown = document.getElementById("thumbDown");

var record = document.getElementById("record");

var hitCounter = 0;
var missCounter = 3;

var correctAudio = new Audio("https://opengameart.org/sites/default/files/bell.wav");
var incorrectAudio = new Audio("https://opengameart.org/sites/default/files/error_0.ogg");
var endAudio = new Audio("https://opengameart.org/sites/default/files/Win%20sound.wav");

// Agrega un evento al botón "Human"
humanButton.addEventListener("click", function() {
	showOverlay();
	if(selectedFunction == "loadImageToCanvasFake"){
		incorrectAudio.play();
		thumbDown.style.display = "block";
		thumbUp.style.display = "none";
		missCounter--;
		misses.innerHTML = missCounter;
		misses2.innerHTML = missCounter;
		comprobarPerder();
	}else{
		correctAudio.play();
		thumbUp.style.display = "block";
		thumbDown.style.display = "none";
		hitCounter++;
		hits.innerHTML = hitCounter;
		hits2.innerHTML = hitCounter;
	}
	setTimeout(loadRandomImage, 200);
});

iaButton.addEventListener("click", function() {
	showOverlay();
	if(selectedFunction == "loadImageToCanvasFake"){
		correctAudio.play();
		thumbUp.style.display = "block";
		thumbDown.style.display = "none";
		hitCounter++;
		hits.innerHTML = hitCounter;
		hits2.innerHTML = hitCounter;
	}else{
		incorrectAudio.play();
		thumbDown.style.display = "block";
		thumbUp.style.display = "none";
		missCounter--;
		misses.innerHTML = missCounter;
		misses2.innerHTML = missCounter;
		comprobarPerder();
	}
	setTimeout(loadRandomImage, 200);
});

//Función para obtener una palabra aleatoria de la lista
function getRandomWord(){
  return words[Math.floor(Math.random()*words.length)];
}

//Función para realizar la llamada a la API y cargar la imagen en el canvas
async function loadImageToCanvasFake(){
	var images = [];
	var urlVerdadera = obtenerImagenReal();
    try {
      let response = await fetch('https://lexica.art/api/v1/search?q='+urlVerdadera);
      let data = await response.json();
      images = data.images;
      
    } catch(error) {
      console.log(error);
	  setTimeout(loadRandomImage, 3000);
    }
	
	var numeroImg = Math.floor(Math.random() * 5);
	var imgSrc = images[numeroImg].src;
	var img = new Image();
	img.src = imgSrc;
	img.onload = function(){
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		humanButton.disabled = false;
		iaButton.disabled = false;
	}
}

function loadImageToCanvasReal() {
 
  // Crear la URL de la imagen utilizando la palabra aleatoria
  var imgUrl = obtenerImagenReal();
  
  // Crear una nueva imagen y establecer su src con la URL de la imagen
  var img = new Image();
  img.src = imgUrl;

  // Esperar a que la imagen se cargue antes de dibujarla en el canvas
  img.onload = function() {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
	humanButton.disabled = false;
	iaButton.disabled = false;
  }
}

function obtenerImagenReal(){
	// Obtener una palabra aleatoria de la lista de palabras
  var randomWord = words[Math.floor(Math.random() * words.length)];
  var randomTipo = tipos[Math.floor(Math.random() * tipos.length)];
  
  // Crear la URL de la imagen utilizando la palabra aleatoria
  return "https://source.unsplash.com/512x512/?" + randomWord + " " + randomTipo;
}

function getRandomDate() {
  var start = new Date(MIN_DATE).getTime();
  var end = new Date(MAX_DATE).getTime();
  var randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().slice(0, 10);
}

function loadRandomImage() {
	clearCanvas();
    var randomNumber = Math.random();
    if (randomNumber < 0.5) {
        selectedFunction = "loadImageToCanvasFake";
        loadImageToCanvasFake();
    } else {
        selectedFunction = "loadImageToCanvasReal";
        loadImageToCanvasReal();
    }
}

function showOverlay() {
	
	humanButton.disabled = true;
	iaButton.disabled = true;
	
  var overlay = document.getElementById("overlay");
  overlay.style.top = "0";
  setTimeout(function(){ 
    overlay.style.top = "-100%";
  }, 4000);
}

function clearCanvas(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "30px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "center";
	ctx.fillText("Loading...", canvas.width/2, canvas.height/2);
}

document.getElementById("myButton").addEventListener("click", function(){
    window.open('https://twitter.com/intent/tweet?text=I%20got%20a%20result%20of%20'+hitCounter+'%20hits%20on%20Real%20or%20AI:%20https://corbi.github.io/juegos/realorai.html')
});

function comprobarPerder(){
	if(missCounter <= 0){
		endAudio.play();
		var overlay = document.getElementById("overlayResultado");
		record.innerHTML = hitCounter;
		overlay.style.top = "0";
	}
}

document.getElementById("buttonReiniciar").addEventListener("click", function(){
    location.reload();
});

//Carga la función al cargar la página
window.onload = loadRandomImage();