const express = require("express");
const { Recognizers } = require("../Model/RecognizedModel");
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const RecognizersBody = new Recognizers({
    Title: req.body.RecognizersTitle,
    Image: req.body.RecognizersImage,
    Link: req.body.RecognizersLink,
    Name: req.body.RecognizersName,
  });
  const PostedRecognizersBody = await RecognizersBody.save();
  if (!PostedRecognizersBody)
    return res
      .status(400)
      .json({ success: false, message: "submission failed" });
  res.status(200).json({
    success: true,
    content: PostedRecognizersBody,
    message: "submission successful",
  });
});

router.get("/getAllRecognizers", async (req, res) => {
  // console.log()
  const Recognizerss = await Recognizers.find();
  if (!Recognizerss) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Recognizerss });
});

router.get("/:id", async (req, res) => {
  Recognizers.findById(req.params.id)
    .then((theRecognizers) => {
      if (!theRecognizers) {
        res
          .status(404)
          .json({ success: false, message: "the Entity does not exists" });
      } else {
        res.status(200).send(theRecognizers);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Recognizers.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res
          .status(404)
          .json({ success: false, message: "the Entity does not exists" });
      } else {
        res.status(200).send(result);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Recognizers.findByIdAndUpdate(req.params.id, {
    Title: req.body.RecognizersTitle,
    Image: req.body.RecognizersImage,
    Link: req.body.RecognizersLink,
    Name: req.body.RecognizersName,
  })
    // console.log(req.body.images)
    .then((result) => {
      if (result) return res.status(200).json({ success: true });
      console.log(result);
      return res.status(400).json({ success: false });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

module.exports = router;
