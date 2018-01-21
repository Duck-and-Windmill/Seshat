var multChoice = ['a','b','c','d'];

var numQ = 5;
var correctAns = ['b','c','d','b','d'];

var questionsArray = ['If Logx (1 / 8) = - 3 / 2, then x is equal to', '20 % of 2 is equal to',
	 'If Log 4 (x) = 12, then log 2 (x / 4) is equal to', 'f is a function such that f(x) < 0. The graph of the new function g defined by g(x) = | f(x) | is a reflection of the graph of f',
	 'The graphs of the two linear equations ax + by = c and bx - ay = c, where a, b and c are all not equal to zero,'];

var answersArray = ['-4','4','1/4','10','20','4','0.4','0.04','11','48','-12','22','on the y axis','on the x axis',
	'on the line y=x','on the line y=-x','are parallel','intersect at one point','intersect at two points','perpendicular'];

function createQuestion(num) {
	var qHeader = '<p class="question">' + (num+1) + '. ' + questionsArray[num] + '</p>' ;
	var qBody = '<ul class="answers">';

	for(var i = 0; i < 4; i++) {
		var inde = num * 4 + i;
		qBody += '<input type="radio" name="q' + (num+1) + '" value="' + multChoice[i] + '" name="q' + (num+1) + multChoice[i] + '"><label for="q' + num + multChoice[i] + '">' + answersArray[inde] + '</label><br/>';
	}          
			     
	qBody += '</ul>'

	return qHeader + qBody;
}

function readyClick() {
	$(".se-pre-con").show();
	setTimeout(function () {
      $(".se-pre-con").fadeOut("slow");
  	}, 2000);
	for(var i = 0; i < numQ; i++){
		$('.test').append(createQuestion(i))
	};
	$('.test').append('<button class="mdc-button" id="submit" onclick="grade()">Submit</button>')
	$('.test').css('margin-top','10%');
	$('.test').css('padding-left','5%');
	$('#ready').hide();
}

function grade() {
	$(".se-pre-con").show();
	setTimeout(function () {
     $(".se-pre-con").fadeOut("slow");
  	}, 2000);
	              
	if (!$("input[name=q1]:checked").val() ||            
		!$("input[name=q2]:checked").val() ||            
		!$("input[name=q3]:checked").val() ||            
		!$("input[name=q4]:checked").val() ||            
		!$("input[name=q5]:checked").val()          
	) {            
		alert("You're not done yet!");        
	} else { 
		$('.test').hide();
		var correct = 0
		for(var x = 0; x < numQ; x++) {
			if($("input[name=q" + (x+1) + "]:checked").val() == correctAns[x]) {
				correct += 1
			}
		}
		var result = '<h1 id="result">' + (correct/numQ * 100) + '%</h1>';
		$('body').append(result) 
		$('body').append('<p id=resulttext>Score is being sent to your profile.</p>')        
		return correct/numQ                    
   	}
}

$(document).ready(function() {


});