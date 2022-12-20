const express = require("express");
const { Team } = require("../Model/TeamModel");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const TeamBody = new Team({
    Name: req.body.TeamName,
    Position: req.body.TeamPosition,
    Image: req.body.TeamImage,
    LinkedIN: req.body.LinkedIN,
  });
  const PostedTeamBody = await TeamBody.save();
  if (!PostedTeamBody)
    return res
      .status(400)
      .json({ success: false, message: "Submission was not Successful" });
  res
    .status(200)
    .json({
      success: true,
      content: PostedTeamBody,
      message: "Submission Successful",
    });
});

router.get("/getAllTeam", async (req, res) => {
  const Teams = await Team.find();
  const TeamPresident = await Team.find({ Position: { $regex: /^President/ } });
  const TeamMentor = await Team.find({
    Position: { $regex: /Mentor/ },
  });
  const TeamLead = await Team.find({
    Position: { $regex: /Lead/ },
  });
  if (!Teams) return res.status(400).json({ success: false });
  return res.status(200).json({
    success: true,
    content: Teams,
    TeamPresident: TeamPresident,
    TeamMentor: TeamMentor,
    TeamLead: TeamLead,
  });
});

router.get("/:id", async (req, res) => {
  Team.findById(req.params.id)
    .then((theTeam) => {
      if (!theTeam) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theTeam);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  Team.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot delete Data with id=${req.params.id}. Maybe Team was not found!`,
        });
      } else {
        res.send({
          message: "Team was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Team with id=" + req.params.id,
      });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Team.findByIdAndUpdate(req.params.id, {
    Name: req.body.TeamName,
    Position: req.body.TeamPosition,
    Image: req.body.TeamImage,
    LinkedIN: req.body.LinkedIN,
  })
    // console.log(req.body.Positions)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: `Cannot upImage Data with id=${req.params.id}. Maybe Team was not found!`,
        });
      } else {
        res.send({
          message: "Team was upImage successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not UpImage Team with id=" + req.params.id,
      });
    });
});

module.exports = router;
