(function(global) {

    var ngVer = '@2.0.0-rc.1';

    var  map = {
        'app':                              '/static/workmate/ng',

        '@angular':                         'https://npmcdn.com/@angular',
        'rxjs':                             'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'ts':                               'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
        'typescript':                       'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
    };

    var packages = {
        'app':                          { defaultExtension: 'ts' },
        'rxjs':                         { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];


    ngPackageNames.forEach(function(pkgName) {
        map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    });

    ngPackageNames.forEach(function(pkgName) {
        packages['@angular/'+pkgName] = { main: pkgName + '.umd.js', defaultExtension: 'js' };
    });

    var config = {
        transpiler: 'ts',
        typescriptOptions: {
            "target": "es5",
            "module": "system",
            "declaration": false,
            "noImplicitAny": false,
            "removeComments": true,
            "noLib": false,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true
        },
        meta: {
            'typescript': {
                "exports": "ts"
            }
        },
        map: map,
        packages: packages
    };
    
    System.config(config);

})(this);
