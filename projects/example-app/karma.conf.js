// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// Used by the @angular/build:karma builder (esbuild), which injects the Angular build itself.

const path = require('path');

const coverageDir = path.join(__dirname, '../../coverage/example-app');

module.exports = async function (config) {
    // puppeteer >= 25 resolves the bundled Chrome path asynchronously
    process.env.CHROME_BIN ||= await require('puppeteer').executablePath();

    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-nyan-reporter'),
            require('karma-junit-reporter')
        ],

        client: {
            clearContext: false, // leave Jasmine Spec Runner output visible in browser
            jasmine: {
                timeoutInterval: 30000
            }
        },

        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            dir: coverageDir,
            subdir: '.',
            reporters: [
                {type: 'html'},
                {type: 'lcovonly'},
                {type: 'text-summary'},
                {type: 'json-summary'}
            ]
        },
        nyanReporter: {
            suppressErrorReport: false,
            suppressErrorHighlighting: false,
            numberOfRainbowLines: 4,
            renderOnRunCompleteOnly: true
        },
        junitReporter: {
            outputDir: coverageDir, // results will be saved as $outputDir/$browserName.xml
            outputFile: 'JUNITX-test-report.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
            properties: {}, // key value pair of properties to add to the <properties> section of the report
            xmlVersion: null // use '1' if reporting to be per SonarQube 6.2 XML format
        },

        customLaunchers: {
            ChromeHeadlessCI: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--disable-translate',
                    '--disable-extensions',
                    '--disable-dev-shm-usage'
                ]
            }
        },

        reporters: ['progress', 'kjhtml', 'coverage', 'nyan', 'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessCI'],
        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 150000,
        singleRun: true,
        restartOnFileChange: true
    });
};
