/* global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		watch: {
			css: {
			    files: ['css/*.scss'],
			    tasks: ['sass'],
			    options: {	
			        spawn: false,
			    }
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/styles.css': 'css/scss/styles.scss',
				}
			}
		},

		});

	// Dependencies
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	
	//Run
	grunt.registerTask('default', ['sass'])
	
};
