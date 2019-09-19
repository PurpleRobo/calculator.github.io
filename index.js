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
	str = str.toString();
	str = str.slice(0,str.length-1);
	input.value = str;
})
