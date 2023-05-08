import React from 'react';
import Comment from './Comment';
import AppHelper from './../../app/AppHelper';

class CommentsView extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
        this.postComment = this.postComment.bind(this);
	}

	componentDidMount() {
        this.props.loadComments();
	}
	
	render() {
        const { comments } = this.props;

        if ( !comments ) {
            return false;
        }

		return (
			<React.Fragment>
                <div className='comments-list'>
                    {
                        this.getCreateCommentJSX()
                    }
                    {
                        this.getCommentsJSX(comments)
                    }
                </div>
            </React.Fragment>
		)
	}

    getCreateCommentJSX(replyOnComment) {
        const { updateComment } = this.props;

        return (
            <Comment user={ AppHelper.getAppData('loggedInUser') } editMode={ true } 
                postComment={ this.postComment } replyOnComment={ replyOnComment }
                updateComment={ updateComment }
            />
        )
    }

    getCommentsJSX(comments) {
        const { upvoteComment, updateComment } = this.props;

        return (
            <div className='comment-list-item'>
                {
                    comments.map( comment => {
                        return (
                            <React.Fragment key={ comment.id }>
                                <Comment
                                    user={ comment.createdBy }
                                    comment={ {
                                        id: comment.id,
                                        text: comment.comment,
                                        upvote: comment.upvote,
                                        children: comment.children
                                    } }
                                    upvoteComment={ upvoteComment }
                                    updateComment={ updateComment } 
                                />
                                {
                                    comment.showReplyBox && this.getCreateCommentJSX(comment)
                                }
                                {
                                    comment.children && this.getCommentsJSX(comment.children)
                                }
                            </React.Fragment>
                        )
                    } )   
                }
            </div>
        )
    }

    postComment(comment, user) {
        this.props.createComment({
            id: crypto.randomUUID(),
            comment: comment,
            createdBy: user
        })
    }
}

export default CommentsView;
