const express = require("express");
const { Contact } = require("../Model/ContactModel");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const ContactBody = new Contact({
    Name: req.body.Name,
    Email: req.body.Email,
    ContactNumber: req.body.ContactNumber,
    College: req.body.College,
    Branch: req.body.Branch,
    PassoutYear: req.body.PassoutYear,
    Query: req.body.Query,
  });
  const PostedContactBody = await ContactBody.save();
  if (!PostedContactBody) return res.status(400).json({ success: false });
  res.status(200).json({ success: true, content: PostedContactBody });
});

router.get("/getAllMessege", async (req, res) => {
  const Contacts = await Contact.find();
  if (!Contacts) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Contacts });
});

module.exports = router;
