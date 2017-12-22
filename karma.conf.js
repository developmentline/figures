module.exports = function(config) {
    var appRoot = ''; // ~/

    config.set( {
        // base path, that will be used to resolve files and exclude
        basePath: appRoot, // ~/

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        //  note: IS ORDER-DEPENDENT
        files: [
            'scripts/*.js'
        ],

        // web server port
        port: 50485,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
    })
}