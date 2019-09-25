var buttons = document.querySelectorAll(".btn-1");
var input = document.querySelector(".input");
var equals = document.querySelector("#equals");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");
var str = "";
var j=0;
var k=0;
var r=0;

input.value = 0;

for (var i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function() {
		if(this.textContent=="/"||this.textContent=="+"||this.textContent=="-"||this.textContent=="*") {
			j++;
		}
		if (j==2) {
			findAnswer(str);
			j=1;
		}
		str += this.textContent;
		input.value = str;
	});
}

equals.addEventListener("click", findAnswer);

function findAnswer() {
	str = input.value;
	ans = findNextOperator(str);
	if(str!="" && ans!=null){
		input.value = ans;
		str = ans;	
	}
}

function findNextOperator(str) {

	for(var i=0; i<str.length;i++){
		var a = parseFloat(str.slice(0,i));
		var b =parseFloat(str.slice(i+1,str.length));
		if(str[i]=="/")
			return a/b;
		if(str[i]=="*")
			return a*b;
		if(str[i]=="+")
			return a+b;
		if(str[i]=="-")
			return a-b;	
	}
	return null;
}

function clearInput() {
	str = "";
	input.value = str;
}

clear.addEventListener("click", function() {
	clearInput();
})

back.addEventListener("click", function() {
	backSpace();
});

function backSpace() {
	str = str.toString();
	str = str.slice(0,str.length-1);
	input.value = str;
}

document.addEventListener('keydown', function(event){
  var keyName = event.key;

  // console.log(keyName);

  if(keyName=="*"||keyName=="/"||keyName=="+"||keyName=="-"||keyName=="."){
  		k++;
  		if(k==2) {
  			findAnswer(str);
  			k=1;
  		}
	  	str += keyName;
	  	input.value = str;
	  	var i = effect(keyName);
	  	setTimeout(function() {
  			buttons[i].classList.remove("effect");
		}, 200);
	} 
	if(!isNaN(keyName)) {
		str += keyName;
	  	input.value = str;
	  	var i = effect(keyName);
	  	setTimeout(function() {
  			buttons[i].classList.remove("effect");
		}, 200);
	}
	if(keyName=="Enter"||keyName=="="){
		k=1;
		equals.classList.add("effect");
		setTimeout(function() {
  			equals.classList.remove("effect");
		}, 200);
		findAnswer(str);
	} if (keyName=="Backspace") {
		backSpace();
		back.classList.add("effect");
		setTimeout(function() {
  			back.classList.remove("effect");
		}, 200);
	} 
	if (keyName == "Control") {
		document.addEventListener("keydown", function(event){
			if(event.key == "c"){
				clearInput();
			}
		});
	}
});

function effect(keyName) {
	for(var i=0;i<buttons.length;i++) {
		if(buttons[i].textContent==keyName){
			buttons[i].classList.add("effect");
			return i;
		} 
	}
}
