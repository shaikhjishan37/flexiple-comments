import { COMMENT_CONSTANT } from './../constants/CommentConstants';

const initialState = {};

const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case COMMENT_CONSTANT.INIT_COMMENTS:
            return {
                ...state,
                comments: action.payload.data
            }
        case COMMENT_CONSTANT.CREATE_COMMENT:
            return {
                ...state,
                comments: [action.comment, ...state.comments]
            }
        case COMMENT_CONSTANT.UPVOTE_COMMENT:
            return {
                ...state,
                comments: upvoteCommentData(state.comments, action.comment)
            }
        case COMMENT_CONSTANT.UPDATE_COMMENT:
            return {
                ...state,
                comments: updateCommentData(state.comments, action.comment)
            }
        default:
            return state;
    }
};

const upvoteCommentData = (comments, comment) => {
    const upvoteComments = [...comments];

    for ( const index in upvoteComments ) {
        const upvoteComment = upvoteComments[index];
        
        if ( upvoteComment.id === comment.id ) {
            upvoteComments[index] = {
                ...upvoteComment,
                upvote: (upvoteComment.upvote??0) + 1
            }

            break;
        } else if ( upvoteComment.children ) {
            upvoteComments[index] = {
                ...upvoteComment,
                children: upvoteCommentData(upvoteComment.children, comment)
            }
        }
    }

    return upvoteComments;
}

const updateCommentData = (comments, comment) => {
    const updateComments = [...comments];

    for ( const index in updateComments ) {
        const updateComment = updateComments[index];
        
        if ( updateComment.id === comment.id ) {
            updateComments[index] = comment;
            break;
        } else if ( updateComment.children ) {
            updateComments[index] = {
                ...updateComment,
                children: updateCommentData(updateComment.children, comment)
            }
        }
    }

    return updateComments;
}

export default CommentReducer;
