import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import MenuBottom from 'components/layout/natigation/footer'
import Style from 'components/Style'
import Nav from './components/layout/natigation/nav'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const Bonds = lazy(() => import('./pages/Bonds'))
const StakeDeprecated = lazy(() => import('./pages/StakeDeprecated'))
const NotFound = lazy(() => import('./pages/notFound'))
const Airdrop = lazy(() => import('./pages/Airdrop'))

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
          <Route path="/bonds" component={Bonds} />
          <Route path="/stakeDeprecated" component={StakeDeprecated} />
          <Route path="/airdrop" component={Airdrop} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
      <MenuBottom />
    </Router>
  )

}

export default React.memo(App)
