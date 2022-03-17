import React from 'react'
import styled from 'styled-components'
import Page from 'components/page'
import useI18n from 'hooks/useI18n'

// Components imports
import AirdropCard from './components/airdropCard'
import ClaimButton from './components/buttons/claimButton'
import TypographyTitle from './components/typography/typographyTitle'

const Airdrop = () => {
    const toClaim = 12.43528371921 // TODO
    const toClaimString = toClaim.toLocaleString('en-us', { maximumFractionDigits: 3 })

  return (
    <Page>
        <AirdropCard>
            <TypographyTitle>UST Is Distributed Weekly to Protocol Participants</TypographyTitle>
            <ClaimButton>
                Claim {toClaimString} UST
            </ClaimButton>
        </AirdropCard>
    </Page>
  )
}

export default Airdrop