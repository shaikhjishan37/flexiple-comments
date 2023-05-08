export const GLOBAL_CONSTANTS = {
    ESCAPE_KEY: 27,
    ENTER_KEY: 13,
    F1_KEY: 112,
    YES: 'Y',
    NO: 'N',

    //Tab Constants
    TAB_PARENT_ORDER: '1',
    TAB_CHILD_ORDER: '2',
    TAB_POSITIONS: '3',

    //ORDER Constants
    ORDER_STATUS_OPEN: 'Open',
    ORDER_STATUS_PARTIAL: 'Partial',
    ORDER_STATUS_CANCELLED: 'Cancelled',
    ORDER_STAUTS_COMPLETED: 'Completed',
    ORDER_STATUS_REJECTED: 'Rejected'
}

export const APP_URL_CONSTANTS = {
    
}

export const setAppUrls = config => {
	if ( config ) {
		for ( const key in config ) {
			APP_URL_CONSTANTS[key] = config[key];
		}
	}
}