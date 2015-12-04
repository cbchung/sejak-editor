//Grunt is just JavaScript running in node, after all...
module.exports = function(grunt) {

	grunt.initConfig({
	    distFolder: '../js',
	    pkg: grunt.file.readJSON('package.json'),

	    concat: {
	    	options: {
	    		// Specifies string to be inserted between concatenated files.
	    		separator: ';'
	    	},
	    	dist: {
	    		src: [
	    		      'bower_components/angular/angular.min.js',
	    		      'works/*.min.js'
	    		],
	    		dest: '<%= distFolder %>/<%= pkg.name %>.js'
	    	}
	    },
	    
	    uglify: {
	    	options: {
	    		banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
//    			report: 'min',
//                mangle: false
	        },
	        build: {
//	        js: {
	        	files: {
	        		'works/clabsTest.min.js': 'works/ngmins-temporaries/clabsTest.js'
	        	}
	        }
	    },
	    ngmin: {
//	    	controllers: {
//	    		src: ['test/src/controllers/one.js'],
//	    		dest: 'test/generated/controllers/one.js'
//	    	},
	    	directives: {
	    	    expand: true,
	    	    cwd: 'works/ngDriectives',
	    	    src: ['*.js'],
	    	    dest: 'works/ngmins-temporaries'
	    	}
    	},
	    
	    // compile less stylesheets to css -----------------------------------------
	    less: {
	    	build: {
	    		files: {
	    			'<%= distFolder %>/css/pretty.css': 'scripts/css/pretty.less'
	    		}
	    	}
	    }
	    
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-ngmin');

	grunt.registerTask('build', ['concat']);
	grunt.registerTask('default',['ngmin', 'uglify', 'build'])
};