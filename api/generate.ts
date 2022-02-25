import axios from "axios";
import type { Request, Response } from "express";

const generate = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const reqText: string = req.body.text;
    if (reqText !== "") {
      const resp = await axios.post(
        "http://10.0.3.90:5000/generate",
        { text: reqText },
        {
          headers: {
            token: process.env.TOKEN,
          },
        }
      );
      res.send(`${resp.data}`);
    } else {
      res.send("");
    }
  } else {
    res.send("Your request is not valid");
  }
};

export default generate;
