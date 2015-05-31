(function () {

	angular.module('remo').directive('toWindowHeight', toWindowHeight);
	
	function toWindowHeight($window) {
		
		var directive = {
			link: link
		};
		
		return directive;
		
		function link(scope, element, attrs) {
			
			var w = angular.element($window);
			
			function resize() {
				var height = w.height();
				var width = w.width();
				
				height -= width < 768 ? 51 : 20;
				
				scope.$apply(function() {
                	element.height(height);
            	});
			}
			
			w.ready(resize);
			w.bind('resize', resize);
			
		}
	}
	
}());