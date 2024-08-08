import { Button } from '@components/ui/button'
import { ChevronLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => navigate(-1)}>
      <ChevronLeftIcon />
    </Button>
  )
}

export default BackButton
