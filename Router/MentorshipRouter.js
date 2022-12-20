const express = require("express");
const { Mentorship, MentorshipProgram } = require("../Model/MentorshipModel");
const router = express.Router();

router.post("/postOrder", async (req, res) => {
  // console.log(req.body);
  const MentorshipBody = new Mentorship({
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    College: req.body.College,
    Branch: req.body.Branch,
    PassoutYear: req.body.PassoutYear,
    FormProvider: req.body.FormProvider,
  });
  const PostedMentorshipBody = await MentorshipBody.save();
  if (!PostedMentorshipBody) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, content: PostedMentorshipBody });
});
router.get("/getAllApplication", async (req, res) => {
  const Applications = await Mentorship.find();
  if (!Applications) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Applications });
});
router.post("/", async (req, res) => {
  console.log(req.body);
  const MentorshipProgramBody = new MentorshipProgram({
    title: req.body.MentorshipProgramTitle,
    Image: req.body.MentorshipProgramImage,
    PriceDetail: req.body.MentorshipProgramPriceDetail,
  });
  const PostedMentorshipProgramBody = await MentorshipProgramBody.save();
  if (!PostedMentorshipProgramBody)
    return res
      .status(400)
      .json({ success: false, message: "couldn't succeed the attempt" });
  res.status(201).json({
    success: true,
    content: PostedMentorshipProgramBody,
    message: "Data sent successfully",
  });
});

router.get("/getAllMentorshipProgram", async (req, res) => {
  const MentorshipPrograms = await MentorshipProgram.find();
  if (!MentorshipPrograms) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: MentorshipPrograms });
});

router.get("/:id", async (req, res) => {
  MentorshipProgram.findById(req.params.id)
    .then((theMentorshipProgram) => {
      if (!theMentorshipProgram) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theMentorshipProgram);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  MentorshipProgram.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Data with id=${id}. Maybe MentorshipProgram was not found!`,
        });
      } else {
        res.send({
          message: "MentorshipProgram was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete MentorshipProgram with id=" + id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  MentorshipProgram.findByIdAndUpdate(req.params.id, {
    title: req.body.MentorshipProgramTitle,
    Image: req.body.MentorshipProgramImage,
    PriceDetail: req.body.MentorshipProgramPriceDetail,
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Data with id=${req.params.id}. Maybe MentorshipProgram was not found!`,
        });
      } else {
        res.send({
          message: "MentorshipProgram was update successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Update MentorshipProgram with id=" + req.params.id,
      });
    });
});

module.exports = router;
