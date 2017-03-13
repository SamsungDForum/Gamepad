function handleKeydown(event) {
	console.log('[TestApp] handleKeydown : ' + event.keyCode);

	log(event.keyCode);

	switch(event.keyCode) {
		case 10009:
			console.log('[TestApp] return');
			tizen.application.getCurrentApplication().exit();
			
		break;
        default:

            break;
	}
}

var result = '';
var text = '';

var gamepad0 = undefined;
var gamepad1 = undefined;

function main() {
	console.log('[TestApp] onload');

	window.addEventListener('webkitgamepadconnected', function(event) {
		if(event.gamepad.index == 0) {
			gamepad0 = event.gamepad;
			log('event.gamepad0 : ' + JSON.stringify(event.gamepad));
			
			setInterval(pollGamepad0, 100);
		}
		else if(event.gamepad.index == 1) {
			gamepad1 = event.gamepad;
			log('event.gamepad1 : ' + JSON.stringify(event.gamepad));
			
			setInterval(pollGamepad1, 100);
		}
	});

	window.addEventListener('webkitgamepaddisconnected', function(event) {
		if(event.gamepad.index == 0) {
			gamepad0 = undefined;
		}
		else if(event.gamepad.index == 1) {
			gamepad1 = undefined;
		}
	});
}

function pollGamepad0() {
	if(gamepad0) {
    	for(i=0; i<gamepad0.axes.length; i++) {
    		if(gamepad0.axes[i] != 0 && gamepad0.axes[i] != -1) {
    			log('gamepad0.axes[' + i + '] : ' + gamepad0.axes[i]);
    		}
    	}
    	
    	for(i=0; i<gamepad0.buttons.length; i++) {
    		if(gamepad0.buttons[i] == 1) {
    			log('gamepad0.buttons[' + i + '] : ' + gamepad0.buttons[i]);
    		}
    	}
    }  
}

function pollGamepad1() {
	if (gamepad1) {
    	for(i=0; i<gamepad1.axes.length; i++) {
    		if(gamepad1.axes[i] != 0 && gamepad1.axes[i] != -1) {
    			log('gamepad1.axes[' + i + '] : ' + gamepad1.axes[i]);
    		}
    	}
    	
    	for(i=0; i<gamepad1.buttons.length; i++) {
    		if(gamepad1.buttons[i] == 1) {
    			log('gamepad1.buttons[' + i + '] : ' + gamepad1.buttons[i]);
    		}
    	}
    }  
}

function log(string) {
	result = result +' ' + string;
	document.getElementById('result').innerHTML = result;
}

function logClear() {
	result = '';
	document.getElementById('result').innerHTML = '';
}
