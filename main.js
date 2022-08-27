const tweeterManager = TweeterModule();
const renderer = Renderer();

//on load
renderer.renderPosts(tweeterManager.getPosts(), true);

//on adding post
clickListenerToAddPost();

//on delete item (post or comment)
clickListenerToDelete();

//on adding comment
clickListenerToAddComment();

//listener for flexible input
autuSizeTextAreaListner();

function autuSizeTextAreaListner() {
    document.addEventListener(
        "input",
        function (event) {
            if (event.target.tagName.toLowerCase() !== "textarea") return;
        },
        //if in future want to add some hight flex to text erea - put it here.
        false
    );
}

function clickListenerToAddPost() {
    $("body").on("click", "#post", function () {
        const inputElement = $(this).siblings("textarea");
        const postText = inputElement.val();
        inputElement.val("");
        if (postText) {
            tweeterManager.addPost(postText);
        } else {
            alert("pls insert post input ");
        }
        renderer.renderPosts(tweeterManager.getPosts(), true);
    });
}

function clickListenerToDelete() {
    $("body").on("click", ".fa-trash", function () {
        let postId;
        let commentId;
        let isPost = true;
        isPost = $(this).parent().attr("class") === "post" ? true : false;
        if (isPost) {
            postId = $(this).parent().attr("id");
        } else {
            postId = $(this).parent().parent().attr("id");
            commentId = $(this).parent().attr("id");
        }
        $(this).parent().remove();
        isPost
            ? tweeterManager.removePost(postId)
            : tweeterManager.removeComment(postId, commentId);
        renderer.renderPosts(tweeterManager.getPosts(), true);
    });
}

function clickListenerToAddComment() {
    $("body").on("click", ".comment-submit", function () {
        const postId = $(this).parent().attr("id");
        const commentText = $(this).siblings("textarea").val();
        if (commentText) {
            tweeterManager.addComment(postId, commentText);
        } else {
            alert("pls insert comment input ");
        }
        renderer.renderPosts(tweeterManager.getPosts(), false);
    });
}
