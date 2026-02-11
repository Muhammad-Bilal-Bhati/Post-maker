let express = require('express');
const app = express();
const Post = require('./models/posts.model');
const uploadImage = require('./service/storage.service');
const cors = require('cors');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(cors())
app.post("/create-post", upload.single('img'), async (req, res) => {
    const result = await uploadImage(req.file.buffer);
    const post = await Post.create({
        caption: req.body.caption,
        img: result.url
    })
    res.status(201).json({message: "Post created successfully", post});
});

app.get("/posts",async(req,res)=>{
    const posts = await Post.find();
    res.status(200).json({message: "Posts fetched successfully", posts});
})

app.delete("/posts/:id",async(req,res)=>{
    const {id} = req.params;
    await Post.findByIdAndDelete(id);
    res.status(200).json({message: "Post deleted successfully"});
})

app.patch("/posts/:id",async(req,res)=>{
    const {id} = req.params;
    const {caption} = req.body;
    const post = await Post.findByIdAndUpdate(id,{caption:caption},{new: true});
    res.status(200).json({message: "Post updated successfully", post});
})


module.exports = app;