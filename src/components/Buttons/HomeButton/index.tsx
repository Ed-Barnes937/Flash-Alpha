import { Button } from '@components/ui/button'
import { HomeIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomeButton = () => {
  const navigate = useNavigate()

  return (
    <Button variant={'ghost'} size={'icon'} onClick={() => navigate('/')}>
      <HomeIcon />
    </Button>
  )
}

export default HomeButton
