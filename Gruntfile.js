module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		uglify: {
			js: {
				files: {
					"dist/tabcomplete.min.js": ["src/tabcomplete.js"]
				}
			}
		},

		copy: {
			dist: {
				expand: true,
				cwd: "src/",
				dest: "dist/",
				src: "tabcomplete.js"
			}
		},

		usebanner: {
			dist: {
				options: {
					expand: true,
					banner: [
						"/*!",
						" * <%= pkg.name %>",
						" * <%= pkg.homepage %>",
						" * v<%= pkg.version %>",
						" */",
						""
					].join("\n")
				},
				files: {
					src: ["dist/**/*.js"]
				}
			}
		}
	});

	// Load and run uglify.
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-banner");

	grunt.registerTask("default", [
		"copy",
		"uglify",
		"usebanner"
	]);
};
