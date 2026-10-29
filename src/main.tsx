import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Enfant,Parent } from './ParentEnfant'
import { RegisterForm } from './ControlleInput'
import { TeamForm } from './Forms'





// fichier racine de notre root
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   {/* <App/> */}
   {/* <Parent/> */}
   {/* <RegisterForm/> */}

  <TeamForm/>
  </StrictMode>,
)
