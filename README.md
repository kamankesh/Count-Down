# Count Down In Sweet Alert 2
<img src="CountDown.png"/>

$(document).ready(function(){
		Swal.fire({
			title: 'تایمر',
 			html: '<div id="container" class="container"></div>',
			showCloseButton: true,
			showCancelButton: true,
			focusConfirm: false	,		
			onRender  : function(){
				$('#container').countDown({clockWise : false}).show();
			}
		})
});

options : {
      wholeTime: 2 * 60, // secends
     	clockWise : true
}
