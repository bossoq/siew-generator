import axios from "axios";
import type { Request, Response } from "express";

const generate = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const reqText: string = req.body.text;
    if (reqText !== "") {
      const resp = await axios.post(
        "https://siewapi.picturo.us/generate",
        { text: reqText },
        {
          headers: {
            token: process.env.TOKEN,
          },
        }
      );
      res.send(`${JSON.stringify(resp.data)}`);
    } else {
      res.send("");
    }
  } else {
    res.send("Your request is not valid");
  }
};

export default generate;
