const express = require("express");
const { Internship, InternApply } = require("../Model/InternOpeningsModel");
const router = express.Router();

router.post("/Apply", async (req, res) => {
  console.log(req.body);
  const InternApplyBody = new InternApply({
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    College: req.body.College,
    Branch: req.body.Branch,
    PassoutYear: req.body.PassoutYear,
    OpeningTitle: req.body.OpeningTitle,
    Resume: req.body.Resume,
  });
  const PostedInternApplyBody = await InternApplyBody.save();
  if (!PostedInternApplyBody) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, content: PostedInternApplyBody });
});

router.get("/getAllApplication", async (req, res) => {
  const Internships = await InternApply.find();
  if (!Internships) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Internships });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const InternshipBody = new Internship({
    title: req.body.InternshipTitle,
    Image: req.body.InternshipImage,
    OpeningDetails: req.body.InternshipDetails,
  });
  const PostedInternshipBody = await InternshipBody.save();
  if (!PostedInternshipBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission failed " });
  res.status(200).json({
    success: true,
    content: PostedInternshipBody,
    message: "data has been sent",
  });
});

router.get("/getAllInternship", async (req, res) => {
  const Internships = await Internship.find();
  if (!Internships) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Internships });
});

router.get("/:id", async (req, res) => {
  Internship.findById(req.params.id)
    .then((theInternship) => {
      if (!theInternship) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theInternship);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  Internship.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Data with id=${id}. Maybe Internship was not found!`,
        });
      } else {
        res.send({
          message: "Internship was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Internship with id=" + id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Internship.findByIdAndUpdate(req.params.id, {
    title: req.body.InternshipTitle,
    Image: req.body.InternshipImage,
    OpeningDetails: req.body.InternshipDetails,
  })
    // console.log(req.body.images)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot update Data with id=${req.params.id}. Maybe Internship was not found!`,
        });
      } else {
        res.send({
          message: "Internship was update successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not Update Internship with id=" + req.params.id,
      });
    });
});

module.exports = router;
