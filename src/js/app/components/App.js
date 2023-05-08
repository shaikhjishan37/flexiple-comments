import { changeLanguage } from 'I18N/I18NHelper';
import React from 'react';
import { GLOBAL_CONSTANTS } from './../../common/constants/GlobalConstants';
import CommentsCnt from '../../comment/components/CommentsCnt';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.source = this.props.source;

        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleClickEvents = this._handleClickEvents.bind(this);
        this._handleWindowResize = this._handleWindowResize.bind(this);

        document.addEventListener("keydown", this._handleKeyDown);
        document.addEventListener("click", this._handleClickEvents);
        window.addEventListener("resize", this._handleWindowResize);

        changeLanguage(navigator.language || navigator.userLanguage);
    };

    componentDidMount() {
        this.props.initAppComp();
    };

    render() {
        return (
            <div id="flexiple-comments">
               <CommentsCnt />
            </div>
        )
    };

    _handleKeyDown(event) {
        switch (event.keyCode) {
            case GLOBAL_CONSTANTS.ESCAPE_KEY:
                break;
            case GLOBAL_CONSTANTS.ENTER_KEY:
                break;
            case GLOBAL_CONSTANTS.F1_KEY:
                break;
            default:
                break;
        }
    };

    _handleClickEvents() {
        // click event hadling
    };

    _handleWindowResize() {
        //window resize
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown);
        document.removeEventListener("click", this._handleClickEvents);
        window.removeEventListener("resize", this._handleWindowResize);
    };
}

export default App;
