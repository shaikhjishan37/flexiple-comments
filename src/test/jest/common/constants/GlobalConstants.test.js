import { setAppUrls, APP_URL_CONSTANTS } from 'js/common/constants/GlobalConstants';

describe('GlobalConstants', () => {
    describe('setAppUrls', () => {
        it('Urls with undefined config', () => {
            setAppUrls();

            expect(APP_URL_CONSTANTS).toEqual({
            });
        });

        it('It sets all URLs required by ajax', () => {
            setAppUrls({
                save: 'save data URL'
            });

            expect(APP_URL_CONSTANTS).toEqual({
                save: 'save data URL'
            });
        });
    });
});