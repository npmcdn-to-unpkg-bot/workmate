(function(global) {

    var ngVer = '@2.0.0-rc.1';

    var  map = {
        'app':                              '/static/ng',

        '@angular':                         'https://unpkg.com/@angular',
        'ng2-bootstrap':                    'https://unpkg.com/ng2-bootstrap',
        'ng2-dnd':                          'https://unpkg.com/ng2-dnd',
        'ng2-select':                       'https://unpkg.com/ng2-select',
        'crossvent':                        'https://unpkg.com/crossvent',
        'custom-event':                     'https://unpkg.com/custom-event',
        'contra':                           'https://unpkg.com/contra',
        'ticky':                            'https://unpkg.com/ticky',
        'atoa':                             'https://unpkg.com/atoa',
        'rxjs':                             'https://unpkg.com/rxjs@5.0.0-beta.6',
        'ts':                               'https://unpkg.com/plugin-typescript@4.0.10/lib/plugin.js',
        'typescript':                       'https://unpkg.com/typescript@1.8.10/lib/typescript.js'
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
        map['@angular/'+pkgName] = 'https://unpkg.com/@angular/' + pkgName + ngVer;
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
