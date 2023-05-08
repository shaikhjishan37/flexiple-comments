import { connect } from 'react-redux';
import CommentsView from './CommentsView';
import { loadComments, createComment, upvoteComment, updateComment } from '../actions/CommentsActions';

const mapStateToProps = state => {
    const { comments } = state.comments;
    
    return {
        comments
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadComments: () => {
            dispatch( loadComments() )
        },
        createComment: comment => {
            dispatch( createComment(comment) )
        },
        upvoteComment: comment => {
            dispatch( upvoteComment(comment) )
        },
        updateComment: comment => {
            dispatch( updateComment(comment) )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsView);
