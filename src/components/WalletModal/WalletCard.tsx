import { Button } from "@pancakeswap-libs/uikit";
import typographyBold from "components/layout/typography/typographyBold";
import React from "react";
import Ripples, { createRipples } from 'react-ripples'
import styled from "styled-components";
import { localStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <div
      style={{
        display: 'inline-flex',
        borderRadius: 15,
        overflow: 'hidden',
        marginLeft: '10px',
      }}
    >
      <Ripples>
        <ConnectButton
          onClick={() => {
            login(walletConfig.connectorId);
            window.localStorage.setItem(localStorageKey, "1");
          }}
          style={{ justifyContent: "space-between" }}
          id={`wallet-connect-${title.toLocaleLowerCase()}`}
        >
          <Txt style={{ justifyContent: "space-between" }}>
            {title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Icon width="40px" />
          </Txt>
        </ConnectButton>
      </Ripples>
    </div>
  );
};

const Txt = styled.p`
    font-size: 18px;
    font-weight: 700;
    color: #506063;
`

const ConnectButton = styled.button`
    font-size: 18px;
    font-weight: 600;
    padding: 10px;
    justify-content: center;
    background-image: linear-gradient(to right, #FFFF, #FFFF);
    border-radius: 20px;
    border: 0px;
    box-shadow: 0px 0px 15px #506063;
    :hover {
        background-image: linear-gradient(to right, #E9E9E9, #FFFF);
    }

    min-width: 340px;
    
`

export default WalletCard;
