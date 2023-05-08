/**
 * NOTE: This file is AMD supported
 *
 * This file will only contain methods written in plain javascript
 *
 **/
(function ( root, factory ) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    }
} (this, function () {
    let config;
    let paramsConfig = {};

    return {
        /**
         * this api return the json object of logged in User.
         */
        getLoggedInUser () {
            return config && config.userData;
        },

        /**
         * this api return the param value passed in story mapping URL.
         */
        getParamData ( key ) {
            return paramsConfig[key];
        },

        /**
         * this api return the param value passed in story mapping URL.
         */
        setParamData ( paramsData ) {
            paramsConfig = paramsData;
        },

        /**
         * This method will send an ajax call to get the application/user related config from the server
         */
        initConfig ( configData ) {
            config = configData;
        },

        /**
         * this api return the config value given in initConfig api.
         */
        getAppData ( key ) {
            return config ? config[ key ] : undefined;
        },

        /**
         * this api sets app config according to passed key and value
         */
        setAppData ( key, value ) {
            if ( config ) {
                config[ key ] = value;
            }
        },

        /**
         * this api return the user action
         */
        getUserAction ( key ) {
            return config && config.actions ? config.actions[ key ] : undefined;
        },

        /**
         * this api sets the user action
         */
        setUserAction ( key, value ) {
            config.actions[ key ] = value;
        },

        setParamMap (paramConfigData) {
            if ( paramConfigData ) {
                paramsConfig = paramConfigData;
            } else {
                let paramsData;

                if ( window.location.href.indexOf('?') !== -1 ) {
                    paramsData = window.location.href.slice( window.location.href.indexOf('?') + 1, window.location.href.length );
                } else {
                    paramsData = window.location.href.slice( window.location.href.indexOf('&') + 1, window.location.href.length );
                }

                if (paramsData !== '') {
                    const paramsArr = paramsData.split( '&' );
        
                    paramsArr.forEach( p => {
                        const paramSplit = p.split( '=' );
        
                        paramsConfig[ paramSplit[0] ] = paramSplit[1];
                    } );
                }
            }
        }
    };
}));
