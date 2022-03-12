import * as googleTTS from 'google-tts-api'
import axios from 'axios'
import type { Request, Response } from 'express'

const tts = (req: Request, res: Response) => {
  if (req.method === 'GET') {
    const reqText: string = req.query.text as string
    if (reqText !== '') {
      const resp = googleTTS.getAudioUrl(reqText, {
        lang: 'th-TH',
      })
      axios.get(resp, { responseType: 'arraybuffer' }).then((response) => {
        const audio = Buffer.from(response.data, 'base64')
        res.writeHead(200, {
          'Content-Type': 'audio/mpeg',
          'Content-Length': audio.length,
        })
        res.end(audio)
      })
    } else {
      res.send('')
    }
  } else {
    res.send('Your request is not valid')
  }
}

export default tts
