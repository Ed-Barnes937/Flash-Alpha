import { AI_PROMPT } from '@utils/consts'
import { useEffect, useState } from 'react'

const useAIGenerate = (input: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState([])

  // trigger fetch when input string is changed
  useEffect(() => {
    if (!input) return

    // define fetch function to call on input change
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAPI_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'user',
                content: generatePrompt(input),
              },
            ],
            temperature: 0.7,
          }),
        })

        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setResults(data.choices)
      } catch (err) {
        // narrow error to string or error
        if (typeof err === 'string') {
          setError(err)
        } else if (err instanceof Error) {
          setError(err.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [input])

  return {
    isLoading: loading,
    isError: error,
    results,
  }
}

export default useAIGenerate
