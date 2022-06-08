import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Toggle, useModal } from '@pancakeswap-libs/uikit'
import { usePriceCakeBusd } from 'state/hooks'
import {Link} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import UnlockButton from 'components/UnlockButton'
import {Accordion, Button, Card, useAccordionToggle} from 'react-bootstrap';
import { FaChartLine, FaTelegramPlane, FaTwitter, FaDiscord, FaFileAlt, FaGithub, FaTicketAlt, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram, FaShieldAlt, FaFire, FaCloud, FaPlayCircle, FaClipboard, FaUser, FaPlus, FaExpandArrowsAlt, FaExpand, FaExchangeAlt } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import { Address } from 'config/constants/types'




function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  return {
    viewportWidth,
    viewportHeight
  };
}


const {viewportWidth, viewportHeight} = getWindowDimensions()
const isOnPhone = viewportWidth < 680
const Price = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(transparent, transparent);
  border: 0px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  margin-left: 0px;
`

const Chain = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-color: transparent;
  border: 0px;
  border-style: solid !important;
  border-color: transparent !important;
  border-radius: 10px;
  color: #0094C6;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    border-color: transparent
    cursor: pointer;
    text-shadow: 0px 0px 10px #0094C6;
  }
`

const Balance = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(transparent, transparent);
  border: 0px;
  border-style: solid !important;
  border-color: #transparent !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-right: 10px;
  margin-left: -8px;
`


const Expand = styled.p`
  -webkit-box-align: center;
  align-items: center;
  background-image: linear-gradient(#394454, #394454);
  border: 1px #fff;
  border-style: solid !important;
  border-color: #fff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 14px;
  font-weight: 500;
  width: 120%;
  display: inline-flex;
  min-height: 32px;
  max-height: 37px;
  padding: 10px;
  margin-top: 16px;
  box-shadow: 0px 0px 3px #FFF;
`

const Quote = styled.p`
  font-size: 15px;
  font-weight: 500;
  text-shadow: 0px 0px 10px #ccc;
  &:hover:not(:disabled),
  &:active:not(:disabled),
  &:focus  {
    outline: 0;
    font-weight: 500;
    cursor: pointer;
    text-shadow: 0px 0px 4px #CCCC;
  }
`

const NavBar = (props) => {
  const { account, connect, reset } = useWallet()
  const cakePriceUsd = usePriceCakeBusd()
  const [isChecked, setIsChecked] = useState(false);
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress())).toLocaleString('en-us',{ maximumFractionDigits: 2 });

  const LightSwitch = () => {
    const toggle = () => setIsChecked(!isChecked);
  
    return (
      <>
        <div style={{ marginBottom: "32px" }}>
          <Toggle checked={isChecked} onChange={toggle} />
        </div>
      </>
    );
  }

  function CustomToggle({ eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey);
  
    return (
        <li className="nav-tab dropdown">
        <Link to="/" className="nav-links" onClick={decoratedOnClick}>
          About
        </Link>
        </li>);
  }

  return (
    <div>
      <header>
        <div className="nav-wrapper">
          <nav>
          <object
              type="image/svg+xml"
              data="/images/banner.svg"
              width="230px"
              style={{'marginTop': '50px',
                      'marginBottom': '15px',
                      'marginLeft': '10px'}}>
              &nbsp;
            </object>
            <input className="hidden" type="checkbox" checked={isChecked} id="menuToggle"/>
            <button type="button" className="menu-btn" onClick={()=>{setIsChecked(!isChecked)}}>
              <div className="menu"/>
              <div className="menu"/>
              <div className="menu"/>
            </button>
    
            
            <div className="nav-container">

            

              <ul className="nav-tabs">

                <li className="nav-tab">
                  <Link to="/stake" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Stake</Quote>
                  </Link>
                </li>
                <li className="nav-tab">
                  <Link to="/farm" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Farm</Quote>
                  </Link>
                </li>
                <li className="nav-tab">
                  <Link to="/reverseum" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote>Bond</Quote>
                  </Link>
                </li>
             </ul>
             
             <ul className="nav-icons">
             
             	 <li className="nav-icon">
             <Link to="/stake" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote><FaTractor /></Quote>
                  </Link>
                </li>
                <li className="nav-icon">
                  <Link to="/farm" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote><FaMoneyBillAlt /></Quote>
                  </Link>
                </li>
                <li className="nav-icon">
                  <Link to="/reverseum" className="nav-links" onClick={()=>{setIsChecked(!isChecked)}}>
                    <Quote><FaFileAlt /></Quote>
                  </Link>
                  </li>
                <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/swap?outputCurrency=0xed0b4b0f0e2c17646682fc98ace09feb99af3ade" className="nav-links">
                      <span className="msbitem"><FaExchangeAlt /></span>
                    </a>
                  </li>
                  <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
                      <span className="msbitem"><FaVoteYea /></span>
                    </a>
                  </li>
                  <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
                      <span className="msbitem"><FaTwitter/></span>
                    </a>
                  </li>
                  <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
                      <span className="msbitem"><FaBook /></span>
                    </a>
                  </li>
                  <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://discord.gg/ws3veKrY6r" className="nav-links">
                      <span className="msbitem"><FaDiscord /></span>
                    </a>
                  </li>
                   <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1fNsmVWqtPrtZr7z4i2n1ZgRNAEZdX3coPzMbZNPCZ34/edit#gid=563760963" className="nav-links">
                      <span className="msbitem"><FaClipboard /></span>
                    </a>
                  </li>
                  <li className="nav-icon">
                    <a target="_blanK" rel="noreferrer" href="https://github.com/ReverseProtocol/" className="nav-links">
                      <span className="msbitem"><FaGithub /></span>
                    </a>
                  </li>
                
              </ul>

              <ul className="web3buttons">

                <li className="web3li insideMainNav">
                  {account != null && account.length > 1? 
                    <Price style={{justifyContent:'center'}}>
                      {account.substring(0,( isOnPhone ? 8 : 8))} 
                      <p style={{'color': 'white'}}>...</p></Price>:
                    <UnlockButton style={{
                      fontSize: '14px',
                      marginTop: '15px',
                      width: '100%',
                      minHeight:'21px',
                      maxHeight:'37px'}}>Connect
                    </UnlockButton>
                  }
                </li>

              </ul>
            </div>
          </nav>

            <ul className="nav-tabs outsideMainNav">

             <li className="web3li">
                <Chain>Harmony</Chain> 
              </li>

              <li className="web3li">
                {account != null && account.length > 1? 
                <Price style={{justifyContent:'center'}}> 
                  <Balance>{cakeBalance} RVRS</Balance>{account.substring(0,6)}...
                </Price>
                :
                <UnlockButton style={{
                  fontSize: '14px',
                  marginTop: '15px',
                  width: '100%',
                  minHeight:'21px',
                  maxHeight:'37px'}}>Connect
                </UnlockButton>
                }
              </li>

              <li style={{marginTop:'5px'}} className="nav-tab dropdown" id="wheelToggleDesktop">
                <Expand style={{justifyContent:'center'}}><FaExpand/></Expand>
                <ul className="dropdown-content dropdown-items">
                <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://app.sushi.com/swap?outputCurrency=0xed0b4b0f0e2c17646682fc98ace09feb99af3ade" className="nav-links">
                      <span className="dditem"><FaExchangeAlt/> Purchase</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://snapshot.org/#/rvrsprotocol.eth" className="nav-links">
                      <span className="dditem"><FaVoteYea /> Govern</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://twitter.com/RVRSProtocol" className="nav-links">
                      <span className="dditem"><FaTwitter/> Twitter</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://reverse.gitbook.io/docs/" className="nav-links">
                      <span className="dditem"><FaBook /> Gitbook</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://discord.gg/ws3veKrY6r" className="nav-links">
                      <span className="dditem"><FaDiscord /> Discord</span>
                    </a>
                  </li>
                   <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://docs.google.com/spreadsheets/d/1fNsmVWqtPrtZr7z4i2n1ZgRNAEZdX3coPzMbZNPCZ34/edit#gid=563760963" className="nav-links">
                      <span className="dditem"><FaClipboard /> Treasury</span>
                    </a>
                  </li>
                  <li className="nav-tab">
                    <a target="_blanK" rel="noreferrer" href="https://github.com/ReverseProtocol/" className="nav-links">
                      <span className="dditem"><FaGithub /> Github</span>
                    </a>
                  </li>
                </ul>
              </li>
          </ul>
        </div>
      </header>
    </div>
  )
}


export default NavBar
