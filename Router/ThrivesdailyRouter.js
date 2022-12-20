const express = require("express");
const { Blog } = require("../Model/ThrivesdailyModel");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const BlogBody = new Blog({
    Title: req.body.BlogTitle,
    Writer: req.body.BlogWriter,
    Date: new Date().toISOString().slice(0, 10),
    Blog: req.body.Blog,
  });
  const PostedBlogBody = await BlogBody.save();
  if (!PostedBlogBody)
    return res.status(400).json({
      success: false,
      message: "error attempting sending the request",
    });
  res.status(200).json({
    success: true,
    content: PostedBlogBody,
    message: "data haas been sent successfully",
  });
});

router.get("/getAllBlog", async (req, res) => {
  const Blogs = await Blog.find();
  if (!Blogs) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Blogs });
});

router.get("/:id", async (req, res) => {
  Blog.findById(req.params.id)
    .then((theBlog) => {
      if (!theBlog) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theBlog);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Blog.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Blog was not found!`,
        });
      } else {
        res.send({
          message: "Blog was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Blog with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Blog.findByIdAndUpdate(req.params.id, {
    title: req.body.BlogTitle,
    Writer: req.body.BlogWriter,
    Date: req.body.BlogDate,
    Blog: req.body.Blog,
  })
    // console.log(req.body.Writers)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Data with id=${req.params.id}. Maybe Blog was not found!`,
        });
      } else {
        res.send({
          message: "Blog was update successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Update Blog with id=" + req.params.id,
      });
    });
});

// router.get("/getLatest", async (req, res) => {
//   const Blogs = await Blog.find({Date:""});
//   if (!Blogs) return res.status(400).json({ success: false });
//   return res.status(200).json({ success: true, content: Blogs });
// });

module.exports = router;
