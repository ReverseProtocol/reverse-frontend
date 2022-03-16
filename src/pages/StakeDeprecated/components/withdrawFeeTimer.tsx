import React from 'react';
import { Text } from '@pancakeswap-libs/uikit'
import getTimePeriods from 'utils/getTimePeriods';
import styled from 'styled-components';

const Text1 = styled.p`
  color: #EBEBEB;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 0px;
  text-shadow: 0px 0px 0px #ccc;
`


const WithdrawalFeeTimer: React.FC<{ secondsRemaining }> = ({ secondsRemaining }) => {
    const { days, hours, minutes } = getTimePeriods(secondsRemaining);

    return (
        <Text1>
            {days && days}d, {hours && hours}h Remaining
    </Text1>
)
};

export default WithdrawalFeeTimer;