import AppHelper from 'js/app/AppHelper';

describe('AppHelper', () => {
    beforeAll(() => {
        AppHelper.initConfig({
            sourceType: 'SE',
            userData: {
                username: 'Jishan SHaikh'
            },
            actions: {
                zoom: 2
            }
        });

        AppHelper.setParamData({
            ownerType: 'prj'
        });
    });

    describe('getLoggedInUser', () => {
        it('It gives logged in user data', () => {
            expect(AppHelper.getLoggedInUser()).toEqual({
                username: 'Jishan SHaikh'
            });
        });
    });

    describe('getParamData', () => {
        it('It return param value according passed key', () => {
            expect(AppHelper.getParamData('ownerType')).toEqual('prj');
        });
    });

    describe('getAppData', () => {
        it('It return app data value according passed key', () => {
            expect(AppHelper.getAppData('sourceType')).toEqual('SE');
        });
    });

    describe('setAppData ', () => {
        it('It sets app data value according passed key', () => {
            AppHelper.setAppData('ownerId', 123);
            expect(AppHelper.getAppData('ownerId')).toEqual(123);
        });
    });

    describe('getUserAction', () => {
        it('It return user action value according passed key', () => {
            expect(AppHelper.getUserAction('zoom')).toEqual(2);
        });

        it('It return user action value undefined for non existing data', () => {
            expect(AppHelper.getUserAction('itemType')).toEqual(undefined);
        });
    });

    describe('setUserAction', () => {
        it('It sets user action value according passed key', () => {
            AppHelper.setUserAction('dislpaymode', 'list');

            expect(AppHelper.getUserAction('dislpaymode')).toEqual('list');
        });
    });

    /* describe('setAppAppAuthToken', () => {
        it('It sets app auth token', () => {
            AppHelper.setAppAppAuthToken('token');
            
            expect(AppHelper.getAppAppAuthToken()).toEqual('token');
        });
    }); */
});