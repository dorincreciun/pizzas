import {createRoot} from 'react-dom/client'
import {Router} from "./router";
import './styles/index.css'

const RootLayout = () => {
    return (
        <>
            <Router />
        </>
    )
}

createRoot(document.getElementById('root')!).render(<RootLayout />)