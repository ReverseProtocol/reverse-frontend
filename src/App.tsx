import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import MenuBottom from 'components/navigation/footer'
import Style from 'components/Style'
import Page from 'components/layout/containers/page'
import Nav from './components/navigation/nav'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const BONDS = lazy(() => import('./pages/Bonds'))
const STAKEDEPRECATED = lazy(() => import('./pages/Staking'))
const NOTFOUND = lazy(() => import('./pages/NotFound'))
const DASHBOARD = lazy(() => import('./pages/Dashboard'))
const AIRDROP = lazy(() => import('./pages/Airdrops'))
const VERVRS = lazy(() => import('./pages/veRVRS'))
const UNLOCK = lazy(() => import('./pages/Unlock'))


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
      <Style />
      <Nav />
      {!account ?
        <Suspense fallback={null}>
          <Switch>
            <Route component={UNLOCK} />
          </Switch>
        </Suspense>
        :
        <Suspense fallback={null}>
          <Switch>
            <Route path="/bonds" component={BONDS} />
            <Route path="/staking" component={STAKEDEPRECATED} />
            <Route path="/airdrop" component={AIRDROP} />
            <Route path="/" component={DASHBOARD} />
            <Route component={NOTFOUND} />
          </Switch>
        </Suspense>
      }
      <MenuBottom />
    </Router>
  )
}

export default React.memo(App)
