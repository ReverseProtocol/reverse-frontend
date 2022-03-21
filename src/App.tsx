import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import MenuBottom from 'components/layout/navigation/footer'
import Style from 'components/Style'
import Nav from './components/layout/navigation/nav'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const BONDS = lazy(() => import('./pages/Bonds'))
const STAKEDEPRECATED = lazy(() => import('./pages/StakeDeprecated'))
const NOTFOUND = lazy(() => import('./pages/notFound'))
const AIRDROP = lazy(() => import('./pages/Airdrop'))
const VERVRS = lazy(() => import('./pages/veRVRS'))

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
      <Suspense fallback={null}>
        <Switch>
          <Route path="/bonds" component={BONDS} />
          <Route path="/stakeDeprecated" component={STAKEDEPRECATED} />
          <Route path="/airdrop" component={AIRDROP} />
          <Route component={NOTFOUND} />
        </Switch>
      </Suspense>
      <MenuBottom />
    </Router>
  )
}

export default React.memo(App)
