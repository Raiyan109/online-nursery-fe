import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import { Toaster } from 'sonner'


function App() {

  return (
    <div>
      <Toaster />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
