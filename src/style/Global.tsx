import { createGlobalStyle } from 'styled-components'


declare module 'styled-components' {
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface DefaultTheme {}

}

const GlobalStyle = createGlobalStyle`
* {
  font-family: 'Exo', sans-serif;
}

#root {
  background-image: url('/images/bg.png');
  background-repeat: no-repeat;
  height: 100%;
  -webkit-background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

div {
  color: #FFFFFF !important;
}

button {
  background-color: #FFFFFF;
}

button:hover {
  background-color: #FFFFFF;
}

a:hover{
  text-decoration: none !important;
  color: #D6D6D6;
}

.nav-links:hover{
  color: #D6D6D6;
}

::-webkit-scrollbar-thumb {
  background: #2D3544;
  border-radius: 0px;
  height: 10px;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #3C4557;
}

`
export default GlobalStyle
