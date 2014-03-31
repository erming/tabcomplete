/*!
 * jquery-tab-complete
 * https://github.com/erming/jquery-tab-complete
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 0.0.1
 */

(function($) {
	$.fn.tabComplete = function(values) {
		if (this.size() > 1) {
			return this.each(function() {
				$(this).tabComplete(values);
			});
		}
	};
})(jQuery);
