/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme')
      if (typeof storedPrefs === 'string') {
        return storedPrefs === 'dark' ? true : false
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
      if (userMedia.matches) {
        return true
      }
    }
    return false
  }

  const [darkTheme, setDarkTheme] = useState<boolean>(getInitialTheme())
  const [text, setText] = useState<string>('ถ้าเธอยังว่าง')
  const [reqText, setReqText] = useState<string>('')
  const [respText, setRespText] = useState<string>('')

  const rawSetTheme = (dark: boolean) => {
    const rawTheme = dark ? 'dark' : 'light'
    const root = window.document.documentElement
    setDarkTheme(dark)
    root.classList.remove(dark ? 'light' : 'dark')
    root.classList.add(rawTheme)
    localStorage.setItem('color-theme', rawTheme)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const generateText = (text: string, reqtext: string) => {
    if (text !== reqtext) {
      setReqText(text)
      axios.post('/api/generate', { text: text }).then((res) => {
        setRespText(res.data.respText)
      })
    }
  }

  useEffect(() => {
    rawSetTheme(darkTheme)
  }, [darkTheme])

  useEffect(() => {
    const timeout = setTimeout(() => {
      generateText(text, reqText)
    }, 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [text])

  return (
    <>
      <div className="grid h-screen place-items-center bg-white dark:bg-black">
        <div className="m-4">
          <div className="flex flex-col justify-center gap-6">
            <div className="md:text-8xl text-6xl m-4 text-center font-bold">
              <p className="inline-block text-black dark:text-white">
                สร้าง คำ เสี่ยว 💘
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-4 gap-4 items-center">
                <span className="text-black dark:text-white md:text-xl text-lg">
                  ใส่ข้อความที่นี่:{' '}
                </span>
                <input
                  type={'text'}
                  className="md:text-xl text-lg col-span-3 border border-grey-500 bg-amber-200 rounded-lg p-3"
                  placeholder={'ใส่คำเสี่ยวๆ ที่นี่'}
                  value={text}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="grid grid-cols-4 gap-4 items-center">
                <span className="text-black dark:text-white md:text-xl text-lg">
                  ข้อความเสี่ยวๆ:{' '}
                </span>
                <input
                  type={'text'}
                  disabled
                  className="md:text-xl text-lg col-span-3 border border-grey-500 bg-orange-200 rounded-lg p-3"
                  placeholder={'กำลังคิดคำเสี่ยวๆให้อยู่...'}
                  value={respText}
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-2 text-grey-500 text-2xl">
        <p onClick={() => setDarkTheme(!darkTheme)} className="cursor-pointer">
          {darkTheme ? '🌞' : '🌙'}
        </p>
      </div>
    </>
  )
}

export default App
