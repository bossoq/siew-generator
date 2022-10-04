import axios from 'axios'
import type { Request, Response } from 'express'

const genrandom = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const resp = await axios.get('https://siewapi.picturo.us/random')
    res.send(resp.data)
  } else {
    res.send('Your request is not valid')
  }
}

export default genrandom
