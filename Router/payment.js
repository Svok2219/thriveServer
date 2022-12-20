const router = require("express").Router();
const Stripe = require("stripe");
require("dotenv").config();
// console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", null);

router.post("/payout", async (req, res) => {
  const { token = {}, amount = 0 } = req.body;

  if (!Object.keys(token).length || !amount) {
    res.status(400).json({ success: false });
  }

  const { id: customerId } = await stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .catch((e) => {
      console.log(e);
      return null;
    });

  if (!customerId) {
    res.status(500).json({ success: false });
    return;
  }

  const idempotencyKey = `${
    token.email
  }${Math.random().toString()}${Date.now().toString()}`;
  // console.log(idempotencyKey);
  const charge = await stripe.charges
    .create(
      {
        amount: amount * 100,
        currency: "USD",
        customer: customerId,
        receipt_email: token.email,
        description: "Paying for accesing the mentorsip program",
      },
      { idempotencyKey: idempotencyKey }
    )
    .catch((e) => {
      console.log(e);
      return null;
    });

  if (!charge) {
    res.status(500).json({ success: false });
    return;
  }

  res.status(201).json({ success: true });
});

router.post("/refund", (req, res) => {
  console.log(req.body);
  stripe.refunds
    .create({
      charge: req.body.charge,
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({ success: true, content: result });
    })
    .catch((e) => {
      console.log(e.code);
      res.status(500).json({ success: false, content: e.code });
    });

  // if (!req.body.charge) {
  //   res.status(500).json({ success: false });
  //   return;
  // }
});
module.exports = router;
