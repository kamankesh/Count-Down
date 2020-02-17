(function ($) {
    jQuery.fn.countDown = function(options) {
        var defaults = {
            wholeTime: 2 * 60,
            autoStart: true,
			clockWise : true,
        };
		
		
        var settings = $.extend({}, defaults, options);
		var template = '<div class="circle"><svg width="100" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg"><g transform="translate(110,110)"><circle r="100" class="e-c-base"/><g transform="rotate(-90)"><circle r="100" class="e-c-progress"/><g  class="e-pointer"><circle cx="100" cy="0" r="8" class="e-c-pointer"/></g></g></g></svg></div><div class="controlls"><div class="display-remain-time">00:30</div></div>';
		
		
		var $this = this;
		$this.html(template);
		
		
		var progressBar = $this.find('.e-c-progress'),
        indicator = $this.find('#e-indicator'),
        pointer = $this.find('.e-pointer'),
        length = Math.PI * 2 * 100,
		displayOutput = $this.find('.display-remain-time');
		
		progressBar.css('stroke-dasharray' , length );
		
	
		function update(value, timePercent) {
			var offset = - length - length * value / (timePercent);
			if(settings.clockWise){
				offset = -offset;
				value = -value;
			}
			progressBar.animate({'stroke-dashoffset': offset}, 100); 
			pointer.css('transform' , `rotate(${360 * value / (timePercent)}deg)`); 
		};
			

		function displayTimeLeft(timeLeft) { //displays time on the input

            var hours = Math.floor(timeLeft / 3600);
            var minutes = hours <= 0 ? Math.floor(timeLeft / 60) : Math.floor((timeLeft % 3600) / 60);
            var seconds = timeLeft % 60;
            if (hours > 0)
                $this.find('.controlls').css('left', "17px");
            var displayString = hours > 0 ? `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}` : `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            // alert(displayString)
            displayOutput.text(displayString);
			
            update(timeLeft, settings.wholeTime);
        }

		
		
		
		var intervalTimer;
		var timeLeft;
		var isPaused = false;
		var isStarted = false;
		
		
        update(settings.wholeTime, settings.wholeTime); //refreshes progress bar
        displayTimeLeft(settings.wholeTime);

        function changesettings(seconds) {
            if ((settings.wholeTime + seconds) > 0) {
                settings.wholeTime += seconds;
                update(settings.wholeTime, settings.wholeTime);
            }
        }



        function timer(seconds) { //counts time, takes seconds
            let remainTime = Date.now() + (seconds * 1000);
            displayTimeLeft(seconds);
			
            intervalTimer = setInterval(function() {
                timeLeft = Math.round((remainTime - Date.now()) / 1000);
                if (timeLeft < 0) {
                    clearInterval(intervalTimer);
                    isStarted = false;
                    //displayTimeLeft(settings.wholeTime);
                    return;
                }
                displayTimeLeft(timeLeft);
            }, 1000);
        }

        function pauseTimer() {
            if (isStarted === false) {
                timer(settings.wholeTime);
                isStarted = true;

            } else if (isPaused) {
                timer(timeLeft);
                isPaused = isPaused ? false : true
            } else {
                clearInterval(intervalTimer);
                isPaused = isPaused ? false : true;
            }
        }

       
		
		if(settings.autoStart)
			pauseTimer();
		return this;

    }
  
})(jQuery)