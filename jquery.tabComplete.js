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
	$.fn.tabComplete = function(options) {
		var settings = $.extend({
			after: '',
			caseSensitive: false,
			list: [],
		}, options);
		
		var self = this;
		if (self.size() > 1) {
			return self.each(function() {
				$(this).tabComplete(options);
			});
		}
		
		// Keep the list stored in the DOM via jQuery.data()
		self.data('list', settings.list);
		
		var match = [];
		self.on('keydown', function(e) {
			var key = e.which;
			if (key != 9) {
				match = [];
				return;
			}
			
			var text = self.val().trim().split(' ');
			var last = text.splice(-1)[0];
			
			if (!match.length) {
				match = [];
				$.each(self.data('list'), function(i, w) {
					var l = last;
					if (l == '') {
						return;
					} else if (typeof w === "function") {
						var words = w(l);
						if (words) {
							match = match.concat(words);
						}
					} else if (!settings.caseSensitive) {
						if (0 == w.toLowerCase().indexOf(l.toLowerCase())) {
							match.push(w);
						}
					} else {
						if (0 ==  w.indexOf(l)) {
							match.push(w);
						}
					}
				});
			}
			
			var i = match.indexOf(last) + 1;
			if (i == match.length) {
				i = 0;
			}
			
			if (match.length) {
				text.push(match[i]);
				self.val(text.join(' ') + settings.after);
			}
			
			return false;
		});
		
		return this;
	};
})(jQuery);
