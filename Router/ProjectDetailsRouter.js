const express = require("express");
const { ProjectDetails } = require("../Model/ProjectDetailsModel");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const ProjectDetailsBody = new ProjectDetails({
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    Title: req.body.ProjectTitle,
    Description: req.body.Description,
    Deadline: req.body.Deadline,
    SRS: req.body.SRS,
  });
  const PostedProjectDetailsBody = await ProjectDetailsBody.save();
  if (!PostedProjectDetailsBody)
    return res.status(400).json({ success: false });
  res.status(200).json({ success: true, content: PostedProjectDetailsBody });
});

router.get("/getAllProjects", async (req, res) => {
  const ProjectDetailss = await ProjectDetails.find();
  if (!ProjectDetailss) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: ProjectDetailss });
});
module.exports = router;
