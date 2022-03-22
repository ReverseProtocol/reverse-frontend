import { SvgProps } from "@pancakeswap-libs/uikit";
import { FC } from "react";

export type ConnectorId =
  | "authereum"
  | "fortmatic"
  | "frame"
  | "injected"
  | "portis"
  | "squarelink"
  | "torus"
  | "walletconnect"
  | "walletlink"
  | "bsc";

export type Login = (connectorId: ConnectorId) => void;

export interface Config {
  title: string;
  icon: FC<SvgProps>;
  connectorId: ConnectorId;
}
