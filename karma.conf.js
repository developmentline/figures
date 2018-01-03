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
            'src/notebook.js',
            'src/calculator.js',
            'src/coordinates.js',
            'src/toolBox.js',
            'src/painter.js',
            '__test__/utils/utils.js',
            '__test__/notebook.spec.js',
            '__test__/calculator.spec.js',
            '__test__/coordinates.spec.js',
            '__test__/toolBox.spec.js',
            '__test__/painter.spec.js',
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
