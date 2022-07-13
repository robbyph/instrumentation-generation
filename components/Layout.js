import Navigation from './Navigation'
import Header from './Header'
import { useRouter } from 'next/router'

const Layout = ({children}) => {
    
    const curPage = () =>{
        const router = useRouter()
        return router.pathname
    }


    return (
        <>
        <meta content="width=device-width, initial-scale=1" name="viewport"/>

        <Navigation currentPage={curPage()}></Navigation>
        <div>
            <main>
                <Header></Header>
                {children}
            </main>
        </div>
        </>
    )
}

export default Layout
