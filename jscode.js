	// Array of pictures
	var imgSource = [
	  "<div class='container'><div class='ear'></div><div class='face'><div class='eye1'></div><div class='eye2'></div><div class='center'></div><div class='nose'></div></div><div class='ear2'></div>",
	  "<div class='container'><div class='earpig'></div><div class='facepig'><div class='eye1'> </div><div class='eye2'> </div><div class='centerpig'> </div><div class='nosepig'> </div></div><div class='ear2pig'></div>",
	  "<div class='container'><div class='earmouse'></div><div class='facemouse'><div class='eye1'> </div><div class='eye2'> </div><div class='centermouse'> </div><div class='nosemouse'> </div></div><div class='ear2mouse'></div>",
	  "<div class='container'><div class='earbird'></div><div class='facebird'><div class='eye1'> </div><div class='eye2'> </div><div class='centerbird'> </div><div class='nosebird'> </div></div><div class='ear2bird'></div>",
	  "<div class='container'><div class='earcat'></div><div class='facecat'><div class='eye1'> </div><div class='eye2'> </div><div class='centercat'> </div><div class='nosecat'> </div></div><div class='ear2cat'></div>",
	  "<div class='container'><div class='earcow'></div><div class='facecow'><div class='eye1'> </div><div class='eye2'> </div><div class='centercow'> </div><div class='nosecow'> </div></div><div class='ear2cow'></div>",
	  "<div class='container'><div class='earmonkey'></div><div class='facemonkey'><div class='eye1'> </div><div class='eye2'> </div><div class='centermonkey'> </div><div class='nosemonkey'> </div></div><div class='ear2monkey'></div>",
	  "<div class='container'><div class='eardog'></div><div class='facedog'><div class='eye1'> </div><div class='eye2'> </div><div class='centerdog'> </div><div class='nosedog'> </div></div><div class='ear2dog'></div>"
	];

	
	const UPPLIM = imgSource.length;
	// Html elements
	const STARTGAME = $('#startGame');
	const BUTTONS = $('#buttons');
	const COUNTER = $('.cntr');
	const REPLAY = $(".replay");
	const CONTEINER = $('.container2');
	const SOURCE = $('#containercards');
	
	var uppLimArray = [];
	var tempSource = [];
	var duration = 3; //in seconds


	var inpLvl = 3;  //Start level 
	var levelUp = 3; // Number of cards in a level
	const MAXLEVELUP = 3; // Number of consecutive succesful guess to move one level up
		
	const Game = function () {
		const game = {};
	    game.Mixer = function () {
			
			for(let y = 0; y < inpLvl; y++){
				uppLimArray[y] = y;
			}
			var newIndexArray = uppLimArray.sort(function() {
				return Math.random() - 0.5;
			});
			
			for (let y = 0; y < inpLvl; y++) {
				tempSource[y] = imgSource[newIndexArray[y]];
			}

			for (let y = 0; y < inpLvl; y++) {
				imgSource[y] = tempSource[newIndexArray[y]];
			}
        }
		
		game.ImageCreate = function() {
			$.each(tempSource, function(i, val) {
				SOURCE.append("<div id=card" + i + " class='card'>" + val);
			});
		}
		
		game.ButtonCreate = function() {
			for (var i = 0; i < inpLvl; i++) {
				BUTTONS.append("<a class='idselect' id=" + i + ">" + (i + 1) + "</a>");
			}
		}
		
		game.Timer = function() {
			
			var initNmbr = duration;
			
			var cntr = setInterval(function() {
			
				REPLAY.show();
			
				if (initNmbr > 0) {
					initNmbr--;
					$(".cntr span").html(initNmbr);
				} else {
					// myTimer stop
					clearInterval(cntr);

					$(".card").hide("slow");
					COUNTER.hide("slow");

					var nmbr = Math.floor(Math.random() * inpLvl);
					
					Game.Reply(nmbr);
				}
			}, 1000)
		}		
		
		game.Next = function() {
			BUTTONS.hide("slow");
			$("img").hide("slow");
			REPLAY.hide("slow");
			REPLAY.text("");
			COUNTER.show("slow");
			$("h3").hide();
			$("h1").css("font-size", "1.5em", "padding-top", "5px;");
		}

		game.Reply = function(nmbr) {
			$("#card" + nmbr).show("slow");
			BUTTONS.show("slow");
			REPLAY.show("slow");		 

			$(".idselect").click(function() {
				var butVal = $(this).attr("id");
				var butValue = parseInt(butVal);
				var looser = [
				  "<p>nop</p>",
				  "<p>try again</p>",
				  "<p>not quite</p>",
				  "<p>could be, but it is not</p>",
				  "<p> another one was in this position</p>",
				  "<p>keep trying</p>",
				  "<p>uh oh memory check</p>",
				  "<p>maybe next time you right</p>"
				];

				var lost = looser[Math.floor(Math.random() * looser.length)];

				if (nmbr == butValue) {
					REPLAY.html("<p><b>You are amazing!</b></p>");
					$("p:first").addClass("bounce-top");

					CONTEINER.css("display", "flex");
					CONTEINER.addClass("jump");	
					levelUp--;					
				}else {
					REPLAY.html(lost);
					$("p").addClass("try");
					
					levelUp = MAXLEVELUP;
				}
				
				$(".card, .idselect").fadeOut(100, function() {
					$(this).remove();
				});
				
				Game.Finish();
			});
		}
		
		game.Finish = function() {			
			
			$(".score").show();
			
			if(levelUp == 0 && inpLvl != 8 ){
				uppLimArray = [];
				tempSource = [];		
				inpLvl++;
				levelUp = MAXLEVELUP;
				$(".score").text("Great Job! Ready for next level! - "+ inpLvl);
					if(inpLvl >= 5) {
						duration++;
					}
			}else if(inpLvl == 8) {
				$(".score").text("Congratulations! Highest Level now! ");
			}else {
				$(".score").text("The remaining number of consecutive correct guess is " + levelUp);
			}
			STARTGAME.prop("disabled", false);					
		}
		return game;
	}();
	

    $("#startGame").click(function () {
		STARTGAME.prop("disabled", true);
		CONTEINER.hide();
		$(".score").hide();
		
		Game.Next();
        Game.Mixer();
		Game.ImageCreate();
		Game.ButtonCreate();
		Game.Timer();		
    })

