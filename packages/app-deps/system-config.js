/* global System */

System.config({
    packages: {
        'app-deps': {
            main: 'main',
            format: 'register',
            map: {
                '.': System.normalizeSync('{app-deps}')
            }
        }
    }
});
