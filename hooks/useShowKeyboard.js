import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

export default function useShowKeyboard() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false)

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () => {
      setIsShowKeyboard(true)
    })
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setIsShowKeyboard(false)
    })

    return () => {
      keyboardDidShow.remove()
      keyboardDidHide.remove()
    }
  }, [])

  return isShowKeyboard
}
