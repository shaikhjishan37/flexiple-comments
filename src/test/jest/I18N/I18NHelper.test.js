import { getI18NMessageString } from 'I18N/I18NHelper';

describe('I18NHelper', () => {
    describe('getI18NMessageString', () => {
        it('It returns i18n text', () => {
            expect( getI18NMessageString('test') ).toEqual('test');
        });
    });
});