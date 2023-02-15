const addButton = document.getElementById("add-button");
const commentsDiv = document.getElementById("comments");

let comments = [];

// Load comments from local storage on page load
if (localStorage.getItem("comments")) {
  comments = JSON.parse(localStorage.getItem("comments"));
  renderComments();
}

addButton.addEventListener("click", function() {
  const username = document.getElementById("username").value;
  const comment = document.getElementById("comment").value;

  if(username.length==0){
    alert("Please enter your username")
  } else if(comment.length==0) {
    alert("Please enter your comment")
  } else {
    comments.push({username: username, comment: comment, likes: 0, dislikes:0});
    // Below line Saves comments to local storage
    localStorage.setItem("comments", JSON.stringify(comments));
  }
  renderComments();
});

function renderComments() {
  commentsDiv.innerHTML = "";

  for (let i = 0; i < comments.length; i++) {
    const commentDiv = document.createElement("div");
    commentDiv.innerHTML = `
      <p class="renderusername">${comments[i].username}: ${comments[i].comment}</p>
      <button class="like-button" data-index="${i}">Like</button>
      <button class="dislike-button" data-index="${i}">Dislike</button>
      <button class="delete-button" data-index="${i}">Delete</button>
      <p>Likes: ${comments[i].likes}</p>
    `;
    commentsDiv.appendChild(commentDiv);

    const likeButton = commentDiv.querySelector(".like-button");
    likeButton.addEventListener("click", function() {
      const index = likeButton.getAttribute("data-index");
      comments[index].likes++;
      
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
    });

    const dislikeButton = commentDiv.querySelector(".dislike-button");
    dislikeButton.addEventListener("click", function() {
      const index = dislikeButton.getAttribute("data-index");
      if(comments[index].dislikes<=0){
        const index = dislikeButton.getAttribute("data-index");
        comments[index].likes--;
        
        localStorage.setItem("comments", JSON.stringify(comments));
        renderComments();
      } else {
        alert("nope")
      }
    });

    const deleteButton = commentDiv.querySelector(".delete-button");
    deleteButton.addEventListener("click", function() {
      const index = deleteButton.getAttribute("data-index");
      comments.splice(index, 1);
      
      localStorage.setItem("comments", JSON.stringify(comments));
      renderComments();
    });
  }
}