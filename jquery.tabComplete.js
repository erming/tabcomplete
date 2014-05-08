/*!
 * tabComplete
 * https://github.com/erming/tabComplete
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 1.0.0-alpha1
 */
(function($) {
	var defaults = {
		after: "",
		hint: true,
	};
	
	$.fn.tabComplete = function(args, options) {
		var self = this;
		options = $.extend(
			{}, defaults, options
		);
		
		if (this.length > 1) {
			return this.each(function() {
				$(this).tabComplete(args, options);
			});
		}
		
		if (options.hint) {
			// Lets turn on hinting.
			hint.call(self, "");
		}
		
		// Unbind namespace.
		// This allows us to override the plugin if necessary.
		this.unbind(".tabComplete");
		
		var i = 0;
		var words = [];
		var last = "";
		
		this.on("input.tabComplete", function(e) {
			var input = self.val();
			var word = input.split(" ").pop();
			
			if (!word) {
				i = 0;
				words = [];
				last = "";
			} else if (typeof args === "function") {
				// If the user supplies a function, invoke it
				// and keep the result.
				words = args(word);
			} else {
				// Otherwise, call the .match() function.
				words = match(args, word);
			}
			
			if (options.hint) {
				hint.call(self, words[0]);
			}
		});
		
		this.on("keydown.tabComplete", function(e) {
			var key = e.which; 
			if (key == 9) {
				// Don't lose focus on tab click.
				e.preventDefault();
				
				// Get next match.
				var word = words[i++ % words.length];
				if (!word) {
					return;
				}
				
				var input = self.val().trim();
				last = last || input.split(" ").pop();
				
				self.val(
					input.substr(0, input.lastIndexOf(last))
							+ word
							+ options.after
				);
				
				// Remember the word until next time.
				last = word;
				
				if (options.hint) {
					// Turn off any additional hinting.
					hint.call(self, "");
				}
			}
		});
		
		return this;
	}
	
	// Simple matching.
	// Filter the array and return the items that begins with `word`.
	function match(array, word) {
		return $.grep(
			array,
			function(w) {
				return !w.toLowerCase().indexOf(word.toLowerCase());
			}
		);
	}

	// Add input hinting.
	// This works by creating a copy of the input and placing it behind
	// the real input.
	function hint(word) {
		var input = this;
		var clone = input.prev(".hint");
		
		input.css({
			backgroundColor: "transparent",
			position: "relative",
		});
		
		// Lets create a clone of the input if it does
		// not already exist.
		if (!clone.length) {
			input.wrap(
				$("<div>").css({position: "relative"})
			);
			clone = input
				.clone()
				.prop("disabled", true)
				.removeAttr("id name placeholder")
				.addClass("hint")
				.insertBefore(input);
			clone.css({
				position: "absolute",
			});
		}
		
		var hint = "";
		if (typeof word !== "undefined") {
			var text = input.val();
			hint = text + word.substr(last(text).length);
		}
		
		clone.val(hint);
	}

	// Get the last word of a string.
	function last(str) {
		return str.split(" ").pop();
	}
})(jQuery);
