import express from "express"
import cors from "cors"
import { BetterPay } from "better-pay"
import * as dotenv from "dotenv"
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());

const provider = new BetterPay({
  provider: 'razorpay',
  keyId: process.env.KEY_ID,
  keySecret: process.env.KEY_SECRET
});

app.post("/confirm", async (req,res) => {
  const data = req.body;
  const response = await provider.createPaymentLink({
    upiLink: data.upiLink,
    amount: data.amount,
    currency: data.currency,
    email: data.email,
    returnUrl: data.returnUrl
  });

  res.json({
    message:response
  })
  
})

app.listen(4000, () => {
  console.log("running");
})
