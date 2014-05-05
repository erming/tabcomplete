/*!
 * tabComplete
 * https://github.com/erming/tabComplete
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 0.2.4
 */
(function($) {
	$.fn.tabComplete = function(words, options) {
		return this.each(function() {
			tabComplete.call(this, words, options);
		});
	};
	
	function tabComplete(words, options) {
		options = $.extend({
			// ..
		}, options);
		
		$(this).on("keydown.tabComplete", function(e) {
			console.log(e.which);
		});
	}
})(jQuery);
