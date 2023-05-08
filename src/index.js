import AppHelper from 'js/app/AppHelper';
import AppUtil, { setAppStore } from 'js/utils/AppUtil';
import { setAppUrls } from './js/common/constants/GlobalConstants';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './assets/sass/styles.scss';
import './i18n';
import AppContainer from './js/app/components/AppContainer';
import store from './js/store/StoreConfigure';

setAppStore(store);

AppHelper.setParamMap();

AppUtil.ajax( '/data/AppConfig.json', undefined, responseConfig => {
    AppHelper.initConfig( responseConfig );

    setAppUrls( responseConfig.URLs );

    ReactDOM.render((
        <Provider store={ store }>
            <AppContainer />
        </Provider>)
    , document.getElementById('root'));
} );
