const express = require("express");
const { Events } = require("../Model/EventsModel");
const router = express.Router();

router.post("/", async (req, res) => {
  // console.log(req.body);
  const EventsBody = new Events({
    title: req.body.EventsTitle,
    Images: req.body.EventsImages,
    Date: new Date().toISOString().slice(0, 10),
  });
  const PostedEventsBody = await EventsBody.save();
  if (!PostedEventsBody)
    return res
      .status(400)
      .json({
        success: false,
        messege: "data and pics was not sent successfully",
      });
  res
    .status(200)
    .json({
      success: true,
      content: PostedEventsBody,
      message: "data and pics have been sent successfully",
    });
});

router.get("/getAllEvents", async (req, res) => {
  const Eventss = await Events.find();
  // console.log(Eventss);
  if (!Eventss) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: Eventss });
});

router.get("/:id", async (req, res) => {
  Events.findById(req.params.id)
    .then((theEvents) => {
      if (!theEvents) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(theEvents);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.delete("/:id", (req, res) => {
  // console.log(req.params.id);
  Events.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (!result) {
        res
          .status(404)
          .json({ success: false, message: "the Program does not exists" });
      } else {
        res.status(200).send(Events);
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, error: err });
    });
});

router.patch("/:id", (req, res) => {
  // console.log(req)
  Events.findByIdAndUpdate(req.params.id, {
    title: req.body.EventsTitle,
    Images: req.body.EventsImages,
    Date: req.body.EventsDate,
  })
    // console.log(req.body.Imagess)
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

//LatestUpdate
router.get("/getLatestUpdate", async (req, res) => {
  const EventsLatest = await Events.find({ Date: "december" });
  if (!EventsLatest) return res.status(400).json({ success: false });
  return res.status(200).json({ success: true, content: EventsLatest });
});

module.exports = router;
