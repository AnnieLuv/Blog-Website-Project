
let submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", onSubmit);
let postCount = 0; // Counter for the number of items added
const maxStringLength = 50;
function createPost(tag, title, message, date, author, img){
  let post = document.createElement("div");
  post.className = "col-md-12 col-lg-6 mb-5";
  post.innerHTML = 
      `
              <div class="card post rounded overflow-hidden shadow1">
                <img src="${img}" class="card-img" alt="post image">
                <div class="card-img-overlay">
                  <h5 class="card-title text-white"> ${title} </h5>
                  <small class="card-text text-white opacity-75">by ${author} | ${date} </small>
                  <p class="card-text text-white">${message}</p>
                  <a class="icon-link icon-link-hover stretched-link" href="#">
                      Continue Reading
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                  </a>
                </div>
              </div>
           `;
    return post;

}

function onSubmit(e) {
  ++postCount; // Increment item count
  const grid = document.getElementById("grid");

  // Calculate the current row using modulo logic
  let currentRowNumber = Math.floor((postCount + 1) / 2); // This simulates the ceiling behavior
  console.log(`current Row Num : ${currentRowNumber}`)
  let currentRow = document.getElementById(`row-${currentRowNumber}`);
  
  // If current row doesn't exist, create it
  if (!currentRow) {
      currentRow = document.createElement("div");
      currentRow.className = "row";
      currentRow.id = `row-${currentRowNumber}`;
      grid.appendChild(currentRow);
  }
  
  const date = new Date();
  //get all the values from the poster
  let author = document.querySelector("#name").value.substr(0,maxStringLength);
  let message = document.querySelector("#message").value.substr(0,maxStringLength);
  let title = document.querySelector("#title").value.substr(0,maxStringLength);
  let imgInput = document.querySelector("#image");
  
  const file = imgInput.files[0]; // Get the first selected file

  console.log(file);
  //make sure we got a file 
  if (file) {
      const reader = new FileReader(); // Create a new FileReader
      reader.onload = function(event) {
          // The result contains the image data URL
          const imgDataUrl = event.target.result; // Access the data URL here which is a base64string that the src attr can read directly
          // Create the post after the image is read
          const post = createPost({text:"World", color: "bg-danger"},title, message, date, author, imgDataUrl); // Pass the image data URL
          currentRow.appendChild(post); // Append the new item to the current row
      };
      reader.readAsDataURL(file); // Read the file as a data URL
  } else {
      // If no file is selected, handle it accordingly
      const post = createPost({text:"World", color: "bg-primary"}, title, message, date, author, null); // Pass null if no image
      currentRow.appendChild(post); // Append the new item to the current row
  }

  author.value = "";
  message.value = "";
  title.value = "";
  imgInput.value = "";
}
function onDelete(e) {
  let cardElement = e.target.closest('.card'); // This gets the nearest ancestor with the class 'card'
  // Remove the card element from the DOM
  cardElement.remove();
}


