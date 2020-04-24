import { NavBar } from './NavBar'
import { Footer } from './Footer'

export const AppFrame = ({ children }) => {
  return (
    <>
      <NavBar/>
      <div>{children}</div>
      <Footer/>
      <style jsx>{`
        div { padding: 2em 0 1em 0; }
      `}</style>
    </>
  )
}
