var buttons = document.querySelectorAll(".btn-1");
var input = document.querySelector(".input");
var equals = document.querySelector("#equals");
var clear = document.querySelector("#clear");
var back = document.querySelector("#back");
var str = "";
var j=0;

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

clear.addEventListener("click", function() {
	str = "";
	input.value = str;
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
  const keyName = event.key;

  // console.log(keyName);

  if(!isNaN(keyName)||keyName=="*"||keyName=="/"||keyName=="+"||keyName=="-"||keyName=="."){
	  	str += keyName;
	  	input.value = str;
	  	var i = effect(keyName);
	  	setTimeout(function() {
  			buttons[i].classList.remove("effect");
		}, 200);
	} if(keyName=="Enter"||keyName=="="){
		findAnswer(str);
	} if (keyName=="Backspace") {
		backSpace();
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
