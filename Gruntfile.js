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

		template: {
			build: {
				options: {
					data: {
						pkg: '<%= pkg %>'
					}
				},
				files: {
					'index.html': 'src/index.html'
				}
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
	grunt.loadNpmTasks("grunt-template");

	grunt.registerTask("default", [
		"copy",
		"uglify",
		"usebanner",
		"template" // Build src/index.html -> ./index.html
	]);
};
