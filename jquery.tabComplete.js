/*!
 * tabComplete
 * https://github.com/erming/tabComplete
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 1.0.0-alpha2
 */
(function($) {
	var defaults = {
		after: "",
		caseSensitive: false,
		hint: true,
		minLength: 1,
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
			var word = input.split(/ |\n/).pop();
			
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
				words = match(args, word, options.caseSensitive);
			}
			
			if (options.hint) {
				if (word.length >= options.minLength && words.length) {
					hint.call(self, words[0]);
				} else {
					// Clear hinting.
					// This call is needed when using backspace.
					hint.call(self, "");
				}
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
				last = last || input.split(/ |\n/).pop();
				
				if (last.length < options.minLength) {
					return;
				}
				
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
	function match(array, word, caseSensitive) {
		return $.grep(
			array,
			function(w) {
				if (caseSensitive) {
					return !w.indexOf(word);
				} else {
					return !w.toLowerCase().indexOf(word.toLowerCase());
				}
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
			hint = text + word.substr(text.split(/ |\n/).pop().length);
		}
		
		clone.val(hint);
	}
})(jQuery);
