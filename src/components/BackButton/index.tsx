import { ChevronLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <Button variant={'ghost'} size={'sm'} onClick={() => navigate(-1)}>
      <ChevronLeftIcon />
    </Button>
  )
}

export default BackButton
