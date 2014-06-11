module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			js: {
				files: {
					"src/tabcomplete.min.js": ["src/tabcomplete.js"]
				},
				options: {
					banner: "/*!\n"
						+ " * tabcomplete\n"
						+ " * http://github.com/erming/tabcomplete\n"
						+ " * v<%= pkg.version %>\n"
						+ " */\n",
				}
			}
		}
	});
	
	// Load and run uglify.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.registerTask(
		"default",
		["uglify"]
	);
};
