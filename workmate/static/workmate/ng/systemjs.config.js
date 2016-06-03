(function(global) {

    var ngVer = '@2.0.0-rc.1';

    var  map = {
        'app':                              '/static/workmate/ng',

        '@angular':                         'https://npmcdn.com/@angular',
        'ng2-dragula':                      'https://npmcdn.com/ng2-dragula',
        'dragula':                          'https://npmcdn.com/dragula',
        'crossvent':                        'https://npmcdn.com/crossvent',
        'custom-event':                     'https://npmcdn.com/custom-event',
        'contra':                           'https://npmcdn.com/contra',
        'ticky':                            'https://npmcdn.com/ticky',
        'atoa':                             'https://npmcdn.com/atoa',
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
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": true,
            "suppressImplicitAnyIndexErrors": true
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
