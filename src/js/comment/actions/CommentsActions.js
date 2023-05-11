import { COMMENT_CONSTANT } from './../constants/CommentConstants';
import AppUtil from 'js/utils/AppUtil';
import { APP_URL_CONSTANTS } from './../../common/constants/GlobalConstants';

export const initComments = data => {
    return {
        type: COMMENT_CONSTANT.INIT_COMMENTS,
        payload: {
            data
        }
    }
}

export const loadComments = () => {
    return dispatch => {
        AppUtil.ajax(APP_URL_CONSTANTS.GET_COMMENTS, undefined, response => {
            dispatch( initComments(response) );
        })
    }
}

export const createComment = comment => {
    return {
        type: COMMENT_CONSTANT.CREATE_COMMENT,
        comment
    }
}

export const upvoteComment = comment => {
    return {
        type: COMMENT_CONSTANT.UPVOTE_COMMENT,
        comment
    }
}

export const updateComment = comment => {
    return {
        type: COMMENT_CONSTANT.UPDATE_COMMENT,
        comment
    }
}

export const replyComment = (replyOnComment, comment) => {
    return {
        type: COMMENT_CONSTANT.REPLY_COMMENT,
        replyOnComment,
        comment
    }
}

export const deleteComment = comment => {
    return {
        type: COMMENT_CONSTANT.DELETE_COMMENT,
        comment
    }
}
