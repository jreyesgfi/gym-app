import { Fragment } from "react"
import GlobalStyles from './theme/globalStyles'
import AnimatedPage, { withAnimation } from './theme/components/AnimatedPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/Home/HomePage"

const App = (): JSX.Element => {

  return (
    <Fragment>
      <GlobalStyles />
      <BrowserRouter>
        <AnimatedPage>
          <Routes>
            <Route index element={withAnimation(HomePage)({})} />
          </Routes>
        </AnimatedPage>
      </BrowserRouter>
    </Fragment >

  )
}

export default App
