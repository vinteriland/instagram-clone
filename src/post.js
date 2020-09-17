import React , {useState ,useEffect} from 'react';
import './post.css';
import Avatar from "@material-ui/core/Avatar";
import {db } from './FireBase.js';
import firebase from 'firebase';

function Post({postId,user,username,caption,imgUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
            })  
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);
    
    const postComment = (event) =>{
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").orderBy("timestamp","asc").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp() 
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="post__header">
                <Avatar className="post__avatar"
                src="/static/images/avatar/jpg"
                alt={username}/>
                <h3>{username}</h3>
            </div>
            
            <img className="post__image" alt="abc" src={imgUrl}></img>           
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
            <div className = "post__comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}</strong> {comment.text}
                        </p>
                    ))
                }
            </div>
            {user && (

                <form className = "post__commentsBox">
                    <input 
                        className="post__input"
                        type="text"
                        placeholder="Add a comment.."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button 
                        className="post__button" 
                        disabled={!comment} 
                        type="submit"
                        onClick={postComment} >Post
                    </button>
                    
                </form>
            )}    
        </div>
    )
}

export default Post;
