import {createRoot} from 'react-dom/client'
import {Routing} from "./router";
import {Providers} from "@app/providers";
import {Header} from "@widgets/header";
import {AuthModal} from "@widgets/auth-modal";
import './styles/index.css'

const RootLayout = () => {
    return (
        <Providers>
            <Header />
            <Routing />
            <AuthModal />
        </Providers>
    )
}

createRoot(document.getElementById('root')!).render(<RootLayout />)