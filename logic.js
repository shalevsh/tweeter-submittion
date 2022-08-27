const TweeterModule = () => {
    let _posts = [];
    let _postId = 1;
    let _commentId = 1;
    const getPosts = () => _posts;

    const addPost = (postText) =>
        _posts.unshift({ text: postText, id: "p" + _postId++, comments: [] });

    const removePost = (postId) =>
        (_posts = _posts.filter((post) => post.id !== postId));

    const addComment = (postId, commentText) => {
        for (const post of _posts) {
            if (postId === post.id) {
                post.comments.push({
                    id: "c" + _commentId++,
                    text: commentText,
                });
            }
        }
    };
    
    const removeComment = (postId, commentId) => {
        for (const post of _posts) {
            if (postId === post.id) {
                post.comments = post.comments.filter(
                    (comment) => comment.id !== commentId
                );
            }
        }
    };

    return {
        getPosts,
        addPost,
        removePost,
        addComment,
        removeComment,
    };
};
