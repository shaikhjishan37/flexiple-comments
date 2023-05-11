import React from 'react';
import Button from '@mui/material/Button';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './../../../assets/sass/comment/Comment.scss';

class Comment extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
            commentTxt: '',
            initialEditComment: '',
            commentEditMode: false,
            showDeleteConfirmation: false
        };

        this.commentRef = React.createRef();

        this.onCommentChange = this.onCommentChange.bind(this);
        this.addComment = this.addComment.bind(this);
        this.openEditMode = this.openEditMode.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.replyComment = this.replyComment.bind(this);
        this.cancelReply = this.cancelReply.bind(this);
        this.showDeleteBox = this.showDeleteBox.bind(this);
        this.closeDeleteBox = this.closeDeleteBox.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
	}

	render() {
        const { user, comment, editMode, upvoteComment, replyOnComment } = this.props;
        const { commentTxt, commentEditMode, initialEditComment, showDeleteConfirmation } = this.state;
        const isEditMode = editMode || commentEditMode;
        const commentEditProps = {
            placeholder: 'Enter comment to post...',
            onInput: this.onCommentChange,
            ref: this.commentRef,
            contentEditable: 'true'
        }

        if ( commentEditMode ) {
            commentEditProps.dangerouslySetInnerHTML = {
                __html: initialEditComment
            }
        }
        
		return (
			<div className={`comment-box ${ replyOnComment ? 'comment-box-reply' : '' }`}>
                <div className='comment'>
                    <div className='comment-user'>
                        <img src={ user.profilePhoto } alt={ user.name } className='user-img'></img>
                    </div>
                    <div className='comment-cnt'>
                        <div className='comment-hdr'>
                            <span className='user-name bold'>{ user.name }</span>
                            {
                                comment.id &&
                                    <DeleteIcon onClick={ this.showDeleteBox } />
                            }
                        </div>
                        <div className={`comment-body ${ editMode ? '' : 'comment-body-read' }`} >
                            {
                                isEditMode &&
                                    <div className='comment-input' { ...commentEditProps }></div>
                            }
                            {
                                !isEditMode && 
                                    <div className='comment-txt'
                                        dangerouslySetInnerHTML= {{
                                            __html: comment.text
                                        }}
                                        onClick={ this.openEditMode }
                                    ></div>
                            }
                        </div>
                    </div>
                </div>
                <div className={`comment-action ${ isEditMode ? 'comment-action-edit' : '' }`}>
                    {
                        replyOnComment &&
                            <Button onClick={ this.cancelReply }>Cancel</Button>
                    }
                    {
                        !comment.id &&
                            <Button variant='contained' disabled={ !commentTxt || !commentTxt.trim() }
                                onClick={ this.addComment    }>Post</Button>
                    }
                    {
                        comment.id &&
                            <div className='comment-action-list'>
                                <div className='comment-act-upvote'>
                                    <ArrowDropUpIcon onClick={ upvoteComment.bind(this, comment) } />
                                    <span className='upvote-count'>{ comment.upvote??0 }</span>
                                    <Button
                                        onClick={ this.replyComment }
                                        className='reply-bnt'
                                        startIcon={ <ChatBubbleOutlineOutlinedIcon /> }
                                    >
                                        Reply
                                    </Button>
                                </div>
                                {
                                    commentEditMode &&
                                        <div className='comment-act-buttons'>
                                            <Button onClick={ this.cancelUpdate }>Cancel</Button>
                                            <Button variant='contained' disabled={ initialEditComment === commentTxt }
                                                onClick={ this.updateComment }>Update</Button>
                                        </div>
                                }
                            </div>
                    }
                </div>
                {
                    <Dialog open={ showDeleteConfirmation } onClose={ this.closeDeleteBox }>
                        <DialogTitle >
                            Are your sure about deleting post?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Deleting a post will remove it permanently along with any replies added on it.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.closeDeleteBox }>CANCEL</Button>
                            <Button onClick={ this.deleteComment } variant='contained'>DELETE</Button>
                        </DialogActions>
                    </Dialog>
                }
            </div>
		)
	}

    showDeleteBox() {
        this.setState({
            showDeleteConfirmation: true
        })
    }

    closeDeleteBox() {
        this.setState({
            showDeleteConfirmation: false
        })
    }

    deleteComment() {
        this.props.deleteComment( this.props.comment );
    }

    onCommentChange(event) {
        this.setState({
            commentTxt: event.currentTarget.innerHTML
        })
    }

    addComment() {
        const { replyOnComment, postComment, user } = this.props;

        if ( replyOnComment ) {
            this.props.updateComment({
                ...replyOnComment,
                comment: replyOnComment.text,
                createdBy: this.props.user,
                showReplyBox: false,
                children: [{
                    id: crypto.randomUUID(),
                    comment: this.state.commentTxt.trim(),
                    createdBy: user
                }, ...(replyOnComment.children??[])]
            });
        } else {
            this.commentRef.current.innerHTML = '';

            postComment(this.state.commentTxt.trim(), user);
        }
    }

    openEditMode() {
        this.setState({
            commentEditMode: true,
            initialEditComment: this.props.comment.text,
            commentTxt: this.props.comment.text
        })
    }

    updateComment() {
        this.props.updateComment({
            ...this.props.comment,
            comment: this.state.commentTxt,
            createdBy: this.props.user
        });

        this.cancelUpdate();
    }

    cancelUpdate() {
        this.setState({
            commentEditMode: false,
            initialEditComment: '',
            commentTxt: ''
        })
    }

    replyComment() {
        this.props.updateComment({
            ...this.props.comment,
            comment: this.props.comment.text,
            createdBy: this.props.user,
            showReplyBox: true
        });
    }

    cancelReply() {
        this.props.updateComment({
            ...this.props.replyOnComment,
            comment: this.props.replyOnComment.text,
            createdBy: this.props.user,
            showReplyBox: false
        });
    }
}

Comment.defaultProps = {
    comment: {}
}

export default Comment;
