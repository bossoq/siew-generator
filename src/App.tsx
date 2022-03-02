/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { RWebShare } from 'react-web-share'
import WordLists from './wordLists'

const App = () => {
  const getInitialTheme = (): boolean => {
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
  const [shared, setShared] = useState<boolean>(false)
  const [copied, setCopied] = useState<boolean>(false)
  const [random, setRandom] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const rawSetTheme = (dark: boolean) => {
    const rawTheme = dark ? 'dark' : 'light'
    const root = window.document.documentElement
    setDarkTheme(dark)
    root.classList.remove(dark ? 'light' : 'dark')
    root.classList.add(rawTheme)
    localStorage.setItem('color-theme', rawTheme)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match('[ก-์]+') !== null || e.target.value === '') {
      setText(e.target.value)
    }
  }

  const generateText = (text: string, reqtext: string) => {
    if (text !== reqtext) {
      setReqText(text)
      axios.post('/api/generate', { text: text }).then((res) => {
        setRespText(res.data.respText)
        setLoaded(true)
      })
    }
  }

  const shareText = () => {
    setShared(true)
    setTimeout(() => {
      setShared(false)
    }, 2000)
  }

  const copyText = () => {
    navigator.clipboard.writeText(`${respText} #สร้างคำเสี่ยว`)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const getShuffle = (words: string[]): string[] => {
    const array = words.slice(0)
    let curIdx = array.length
    let temporaryValue, randomIndex
    while (0 !== curIdx) {
      randomIndex = Math.floor(Math.random() * curIdx)
      curIdx -= 1
      temporaryValue = array[curIdx]
      array[curIdx] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    const retIdx = Math.min(array.length, 10)
    return array.slice(0, retIdx)
  }

  const randomText = () => {
    const wordLists = getShuffle(WordLists)
    setRandom(true)
    let i = 0
    const interval = setInterval(() => {
      setText(wordLists[i])
      i++
      if (i === wordLists.length) {
        clearInterval(interval)
        setRandom(false)
      }
    }, 100)
  }

  useEffect(() => {
    rawSetTheme(darkTheme)
  }, [darkTheme])

  useEffect(() => {
    setLoaded(false)
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
            <div className="md:text-8xl text-5xl m-4 text-center font-bold">
              <p className="animate-pulse inline-block text-black dark:text-white">
                สร้าง คำ เสี่ยว 💘
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-6 sm:grid-cols-4 gap-4 items-center">
                <span className="text-black dark:text-white md:text-xl text-base col-span-2 sm:col-span-1">
                  ใส่ข้อความที่นี่:{' '}
                </span>
                <input
                  type={'text'}
                  className="md:text-xl max-w-lg text-base col-span-4 sm:col-span-3 border border-gray-500 bg-amber-200 rounded-lg p-3"
                  placeholder={'ใส่คำเสี่ยวๆ ที่นี่'}
                  value={text}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-4 gap-4 items-center relative">
                <span className="text-black dark:text-white md:text-xl text-base col-span-2 sm:col-span-1">
                  ข้อความเสี่ยวๆ:{' '}
                </span>
                {!loaded && (
                  <span className="absolute right-4 w-8 h-8 border-b-2 border-r-2 border-gray-900 rounded-full animate-spin inline-block"></span>
                )}
                <div
                  className={`md:text-xl max-w-lg break-words break-all min-h-0 max-h-max text-base col-span-4 sm:col-span-3 border border-gray-500 bg-orange-200 rounded-lg p-3 ${
                    !loaded && 'text-zinc-600'
                  }`}
                >
                  {loaded ? respText : 'กำลังคิดคำเสี่ยวๆให้อยู่...'}
                </div>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 sm:gap-4 items-center py-4">
                <RWebShare
                  data={{
                    text: `${respText} #สร้างคำเสี่ยว`,
                    title: `${respText} #สร้างคำเสี่ยว`,
                  }}
                  onClick={shareText}
                >
                  <button className="sm:col-start-2 col-span-2 rounded border mx-2 p-3 border-green-300 md:text-lg text-base font-bold cursor-pointer bg-green-200 hover:bg-green-300 active:bg-green-400">
                    {shared ? 'แชร์แล้ว' : 'แชร์คำเสี่ยว'}
                  </button>
                </RWebShare>
                <button
                  className="col-span-2 rounded border mx-2 p-3 border-green-300 md:text-lg text-base font-bold cursor-pointer bg-green-200 hover:bg-green-300 active:bg-green-400"
                  onClick={copyText}
                >
                  {copied ? 'คัดลอกแล้ว' : 'คัดลอก'}
                </button>
                <button
                  className="col-span-2 rounded border mx-2 p-3 border-red-300 md:text-lg text-base font-bold cursor-pointer bg-red-200 hover:bg-red-300 active:bg-red-400"
                  onClick={randomText}
                >
                  {random ? 'สุ่มคำแล้ว' : 'สุ่มคำใหม่'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 p-2 text-gray-500 text-2xl">
        <p onClick={() => setDarkTheme(!darkTheme)} className="cursor-pointer">
          {darkTheme ? '🌞' : '🌙'}
        </p>
      </div>
      <div className="absolute top-0 right-0 p-2 text-gray-500 dark:text-white text-lg">
        <a href="https://github.com/bossoq/siew-generator">
          Made by{' '}
          <span className="text-emerald-900 dark:text-emerald-200">bossoq</span>
        </a>
      </div>
    </>
  )
}

export default App
