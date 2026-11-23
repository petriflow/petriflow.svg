// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
// Used by the @angular/build:karma builder (esbuild), which injects the Angular build itself.

const path = require('path');

const coverageDir = path.join(__dirname, '../../coverage/petriflow-svg');

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
            require('karma-junit-reporter'),
            require('karma-sonarqube-unit-reporter')
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
                {type: 'text-summary'},
                {type: 'json-summary'},
                {type: 'lcovonly'}
            ]
        },
        nyanReporter: {
            suppressErrorReport: false,
            suppressErrorHighlighting: false,
            numberOfRainbowLines: 4,
            renderOnRunCompleteOnly: true
        },
        junitReporter: {
            outputDir: coverageDir,
            outputFile: 'JUNITX-test-report.xml',
            suite: 'petriflow.svg',
            useBrowserName: false,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {},
            xmlVersion: null
        },
        sonarQubeUnitReporter: {
            sonarQubeVersion: 'LATEST',
            outputFile: path.join(coverageDir, 'sonarqube-report.xml'),
            useBrowserName: false
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

        reporters: ['progress', 'kjhtml', 'coverage', 'nyan', 'junit', 'sonarqubeUnit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadlessCI'],
        singleRun: true,
        restartOnFileChange: false
    });
};
