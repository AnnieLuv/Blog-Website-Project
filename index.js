import express from "express";
import fs from "fs";
import path from "path";
import multer from 'multer';

const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Set up the public directory to serve static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Function to get data stored in our database JSON file
function getDB() {
  try {
    const fileData = fs.readFileSync('database/data.json', 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(error);
  }
}
const data = getDB();
// Initialize multer with no storage (since we won't store files)
const upload = multer();

app.get("/", (req, res) => {
  res.render("home.ejs", {
    featuredData: data.featuredData,
    trending: data.trending,
    posts: data.posts,
    userPosts: data.userPosts
  });
});

app.post('/submitPost', upload.single("image"), (req, res) => {
  const { name, title, message } = req.body;
  const imageFile = req.file;

  if (!imageFile) {
    return res.status(400).send('File upload failed. No image uploaded.');
  }
  // Convert the image buffer to Base64 so we can store the data directly in the src attributes 
  const base64Image = `data:${imageFile.mimetype};base64,${imageFile.buffer.toString("base64")}`;
  
  //store the users post in the database
  data.userPosts.push(
  { 
    id: Date.now().toString(),
    tag: {name: "Dynamic", color: "pink"},
    title: title,
    author: name,
    timeago: "1 sec ago",
    message: message,
    image: base64Image
  });
  
  //write the new memory to the database file
  fs.writeFileSync("./database/data.json", JSON.stringify(data, null, 2), "utf-8");
  
  res.render("home.ejs", {
    featuredData: data.featuredData,
    trending: data.trending,
    posts: data.posts,
    userPosts: data.userPosts
  });
});
app.post("/deletePost", (req,res)=>{
  
  const idToDelete = req.body.itemId;
 
  // Filter the userPosts array to exclude the post with the matching id
  data.userPosts = data.userPosts.filter( (post) => post.id.trim() !== idToDelete.trim()); //use trim to remove any whitespace etc.
  
  //write the new memory to the database file
  fs.writeFileSync("./database/data.json", JSON.stringify(data, null, 2), "utf-8");

  res.render("home.ejs", {
    featuredData: data.featuredData,
    trending: data.trending,
    posts: data.posts,
    userPosts: data.userPosts
  });
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
