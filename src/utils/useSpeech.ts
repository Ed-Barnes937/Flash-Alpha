import useSettingsStore from '@stores/SettingsStore'
import { useCallback } from 'react'

const useSpeech = () => {
  const pitch = useSettingsStore((store) => store.pitch)
  const rate = useSettingsStore((store) => store.rate)

  const speak = useCallback(
    (text: string) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.pitch = pitch
        utterance.rate = rate
        speechSynthesis.speak(utterance)
      } else {
        alert('Sorry, your browser does not support text-to-speech.')
      }
    },
    [pitch, rate]
  )

  return { speak }
}

export default useSpeech
