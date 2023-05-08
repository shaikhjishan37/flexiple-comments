import { APP_CONSTANT } from 'js/app/constants/AppConstants';
import * as actions from 'js/app/actions/AppActions';

describe('AppActions', () => {
    describe('initAppComp', () => {
        it('It intializes app component', () => {
            expect( actions.initAppComp() ).toEqual( {
                type: APP_CONSTANT.INIT_APP
            } );
        });
    });

    describe('showLoading', () => {
        it('It shows loading mask', () => {
            expect( actions.showLoading() ).toEqual( {
                type: APP_CONSTANT.SHOW_LOADING
            } );
        });
    });

    describe('hideLoading', () => {
        it('It hides loading mask', () => {
            expect( actions.hideLoading() ).toEqual( {
                type: APP_CONSTANT.HIDE_LOADING
            } );
        });
    });

    describe('changeAppPages', () => {
        it('It will change curret page of app', () => {
            expect( actions.changeAppPages([]) ).toEqual( {
                type: APP_CONSTANT.CHANGE_APP_PAGE,
                pages: []
            } );
        });
    });
});