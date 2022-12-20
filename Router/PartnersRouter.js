const express = require("express");
const { Partners } = require("../Model/PartnersModel");
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const PartnersBody = new Partners({
    Title: req.body.PartnersTitle,
    Image: req.body.PartnersImage,
    Link: req.body.PartnersLink,
    Name: req.body.PartnersName,
  });
  const PostedPartnersBody = await PartnersBody.save();
  if (!PostedPartnersBody)
    return res
      .status(400)
      .json({ success: false, message: "submission was not Successful" });
  res.status(200).json({
    success: true,
    content: PostedPartnersBody,
    message: "submission was successful",
  });
});

router.get("/getAllPartners", async (req, res) => {
  const Partnerss = await Partners.find();
  if (!Partnerss) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Partnerss });
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  Partners.findById(req.params.id)
    .then((thePartners) => {
      if (!thePartners) {
        res
          .status(404)
          .json({ success: false, message: "the Entity does not exists" });
      } else {
        res.status(200).send(thePartners);
        console.log(thePartners);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Partners.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe MentorshipProgram was not found!`,
        });
      } else {
        res.send({
          message: "MentorshipProgram was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Partners.findByIdAndUpdate(req.params.id, {
    title: req.body.PartnersTitle,
    Image: req.body.PartnersImage,
    Link: req.body.PartnersLink,
    Name: req.body.PartnersName,
  })
    // console.log(req.body.images)
    .then((result) => {
      if (result) {
        return res.status(200).send(result);
      } else {
        res.status(400).json({ success: false });
      }
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

module.exports = router;
