import { Button } from '@components/ui/button'
import { SettingsIcon } from 'lucide-react'
import { Outlet, useNavigate } from 'react-router-dom'

const AppLayout = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4 px-6 lg:container lg:px-40">
      <div className="grid grid-cols-2">
        <h1
          onClick={() => navigate('/')}
          className="cursor-pointer scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
        >
          Skoova
        </h1>
        <div className="text-right">
          <Button variant={'ghost'} size={'icon'} onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default AppLayout
