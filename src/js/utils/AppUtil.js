let appStore;

export const setAppStore = store => {
    appStore = store;
}

export const getAppStore = () => appStore;

const AppUtil = {
    ajax(url, data, successFn, failureFn) {
        const option = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if ( data ) {
            option.body = JSON.stringify(data);
            option.method = 'POST';
        }

        fetch(url, option)
            .then( response => response.json() )
            .then( result => {
                    if (successFn) {
                        successFn(result);
                    }
                }
            )
            .catch(function (err) {
                if (failureFn) {
                    failureFn(err);
                }
            });
    }
}

export default AppUtil;
