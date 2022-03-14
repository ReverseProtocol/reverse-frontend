import React from 'react'
import styled from 'styled-components'
import { Image, Button, LinkExternal } from '@pancakeswap-libs/uikit'
import { CommunityTag } from 'components/Tags'
import useI18n from 'hooks/useI18n'
import { FaBuilding, FaMountain, FaRegBuilding, FaToolbox, FaTools } from 'react-icons/fa'
import Card from './Card'
import CardTitle from './CardTitle'

const Balance = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 40px;
  font-weight: 600;
`

const FlexFull = styled.div`
  flex: 1;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 0px;
  margin-top: 20px;
`

const Divider = styled.div`
background-color: #1E2129;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 5px;
width: 100%;
`

const Label2 = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
  margin-bottom: 0px;
  margin-top: 20px;
`

const DetailPlaceholder = styled.div`
  display: flex;
  font-size: 14px;
`
const Value = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
`

const Footer = styled.div`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#1E2129')};
  padding: 24px;
`
const Coming: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Card>
      <div style={{ padding: '34px' }}>


        <Image src="/images/incubatorbanner.svg" width={300} height={140} />


        <Label>{TranslateString(4216, 'Join Artemis Incubator program and distribute your token while building liquidity for it. ')}</Label>
        <Label2>{TranslateString(4216, 'Applications will go through governance and be reviewed by a third party up until permissionless listings are implemented.')}</Label2>
        <Label2><FaTools/> {TranslateString(4216, "Let's build, together. ")}</Label2>
        
        <Divider />
        <LinkExternal href="https://artemisprotocol.gitbook.io/artemis/the-protocol/launchpad-1/incubator" mr="16px" mt='20px'>
              {TranslateString(999, 'Read More')}
        </LinkExternal>
        
        

        <Button
          variant="secondary"
          as="a"
          href="https://kv2i2vx5rwe.typeform.com/to/yEQE9cV9"
          external
          fullWidth
          mb="0px"
          mt='20px'
          style={{
            'borderRadius': '5px'
          }}
        >
          {TranslateString(4128, 'Apply')}
        </Button>


      </div>

    </Card>
  )
}

export default Coming
