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
	$.fn.tabComplete = function(args, options) {
		// Set default options.
		options = $.extend({
			after: ""
		}, options);
		
		var self = this;
		if (self.length > 1) {
			// If the jQuery object is a collection of objects, iterate
			// them and call .tabComplete() on each item.
			return self.each(function() {
				$(this).tabComplete(args, options);
			});
		}
		
		// Unbind namespace.
		// This allows us to override the plugin if necessary.
		self.unbind(".tabComplete");
		
		var i = 0;
		var words = [];
		
		self.on("input.tabComplete", function() {
			var input = self.val();
			var word = input.split(" ").pop();
			if (!word) {
				i = 0;
				words = [];
			} else if (typeof args === "function") {
				// If the user supplies a function, invoke it
				// and keep the result.
				words = args(word);
			} else {
				// Otherwise, we'll call the .match() function.
				words = match(args, word);
			}
		});
		
		self.on("keydown.tabComplete", function(e) {
			var key = e.which;
			if (key == 9) {
				e.preventDefault();
				
				// Get next match.
				var word = words[i++ % words.length];
				if (!word) {
					return;
				}
				
				// Replace the last word in the input.
				var text = self.val().trim().replace(/[^ ]*$/, word) + options.after;
				self.val(text);
			}
		});
		
		return this;
	}
	
	// Simple matching.
	// Filter the array and return the items that beings with word.
	function match(array, word) {
		return $.grep(array, function(w) { return w.indexOf(word) == 0; });
	}
})(jQuery);
