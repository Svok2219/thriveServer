const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello world! once again"));

const TeamRouter = require("./Router/TeamRouter");
const EventsRouter = require("./Router/EventsRouter");
const PartnersRouter = require("./Router/PartnersRouter");
const InternOpeningsRouter = require("./Router/InternOpeningsRouter");
const ThrivesdailyRouter = require("./Router/ThrivesdailyRouter");
const RecognizedRouter = require("./Router/RecognizedRouter");
const MentorshipRouter = require("./Router/MentorshipRouter");
const payment = require("./Router/payment");
const ProjectDetails = require("./Router/ProjectDetailsRouter");
const Contact = require("./Router/ContactRouter");
const Authenticate = require("./Router/Authenticate");

app.use("/EventsRouter", EventsRouter);
app.use("/InternOpeningsRouter", InternOpeningsRouter);
app.use("/ThrivesDailyRouter", ThrivesdailyRouter);
app.use("/MentorshipRouter", MentorshipRouter);
app.use("/payment", payment);
app.use("/PartnersRouter", PartnersRouter);
app.use("/TeamRouter", TeamRouter);
app.use("/RecognizedRouter", RecognizedRouter);
app.use("/ProjectRouter", ProjectDetails);
app.use("/Authenticate", Authenticate);
app.use("/Contact", Contact);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.noivltl.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "ThrivesBase",
    }
  )
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// router.get("/getAllBlog", async (req, res) => {
//   const Blogs = await Blog.find();
//   if (!Blogs) return res.status(400).json({ success: false });
//   return res.status(200).json({ success: true, content: Blogs });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
