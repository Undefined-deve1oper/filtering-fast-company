import { orderBy } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [dispatch, userId]);

    const handleSubmit = (data) => {
        const comment = {
            ...data,
            pageId: userId
        };
        dispatch(createComment(comment));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };

    const sortedComments = orderBy(comments, "created_at", "desc");

    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            "Loading..."
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
