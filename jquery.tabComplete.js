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
		options = $.extend({
			after: "",
			caseSensitive: false,
		}, options);
		
		var self = this;
		if (self.length > 1) {
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
				words = args(word);
			} else {
				words = $.grep(args, function(w) {
					if (!options.caseSensitive) {
						return 0 === w.toLowerCase().indexOf(word.toLowerCase());
					} else {
						return 0 === w.indexOf(word);
					}
				});
			}
		});
		
		self.on("keydown.tabComplete", function(e) {
			var key = e.which;
			if (key == 9) {
				var input = self.val();
				var word = words[i++ % words.length];
				
				if (word) {
					self.val(input.trim().split(" ").slice(0, -1).concat(word).join(" ")
						+ options.after);
				}
				
				return false;
			}
		});
	}
})(jQuery);
