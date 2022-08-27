const Renderer = () => {
    const renderPosts = function (posts, animationFlag) {
        cleanPostsFromDom();
        addPostsToDom(posts, animationFlag);
        addTrashIconToPosts();
        addTrashIconToComments();
    };

    function cleanPostsFromDom() {
        $(".post").remove();
        $(".last-post").remove();
    }
    function addPostsToDom(posts, animationFlag) {
        posts.forEach((post, idx) => {
            const comments = post.comments;
            if (idx === 0 && post.comments.length === 0 && animationFlag) {
                classPost = "last-post";
            } else {
                classPost = "post";
            }
            $("#posts").append(
                `<div class=${classPost} post id=${post.id}>
                <span class="post-text">${(post.id, post.text)}</span>
                <br><br>
                </div>`
            );

            comments.forEach((comment, idx) => {
                $(`#${post.id}`).append(
                    `<div class="comments" id=${comment.id}>${
                        (comment.id, comment.text)
                    }</div>`
                );
            });
            $(`#${post.id}`).append(
                `
                <input type="submit" value="Comment" class="comment-submit">`
            );
            $(`#${post.id}`).append(
                `<textarea type="text" placeholder="Write some comment ..." class="input-comment" style="width: 451px;height: 16px;"></textarea>`
            );
        });
    }

    function addTrashIconToPosts() {
        $(".post").prepend(`<br>`);
        $(".post").prepend(`<i class="fa fa-trash" aria-hidden="true"></i>`);
        $(".last-post").prepend(`<br>`);
        $(".last-post").prepend(
            `<i class="fa fa-trash" aria-hidden="true"></i>`
        );
    }

    function addTrashIconToComments() {
        $(".comments").append(`<i class="fa fa-trash" aria-hidden="true"></i>`);
    }

    return {
        renderPosts,
    };
};
