import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import MenuBottom from 'components/layout/natigation/footer'
import GlobalStyle from './style/Global'
import NavBar from './components/layout/natigation/menu'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// Pages
const Bonds = lazy(() => import('./pages/Bonds'))
const StakeDeprecated = lazy(() => import('./pages/StakeDeprecated'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Airdrop = lazy(() => import('./pages/Airdrop'))

// App
const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])
  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      <NavBar>&nsbp;</NavBar>
      <Suspense fallback>
        <Switch>
          <Route path="/bonds">
            <Bonds />
          </Route>
          <Route path="/stakeDeprecated">
            <StakeDeprecated />
          </Route>
          <Route path="/airdrop">
            <Airdrop />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <MenuBottom>&nsbp;</MenuBottom>
    </Router>
  )
}

export default React.memo(App)
