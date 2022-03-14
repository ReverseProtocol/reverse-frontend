// CONFIGURE HERE THE VARIABLES THAT WILL BE CHANGED BEFORE THE PRESALE

//----------------------------------------------------------------------------------------------------------------------------------------------

// RVRS Addresses

const masterChef = '0xeEA71889c062c135014Ec34825a1958c87A2Ac61'

// Labo ADDRESSES
const LaboUstAddr = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const LaboBnbAddr = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const LaboUstAddrV2 = '0xfc417a0368263140c59b7aab646d4a270c37d8cb'
const LaboBnbAddrV2 = '0x60e0d939d4b0c71918088278bcf600470a6c8f26'
const LaboAddr = '0xAe0E6F11f0decc8a59B51bc56e52421970B552dF'
const misWheel = '0x9F310757333e6083372d2603CFbd3B61c0F21C54'
// testnet addresses
const LaboBusdAddrTestnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrTestnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-WONE LP
const LaboBusdAddrV2Testnet = '0xf73dc3652b3619312ddd3de7dbf3f354eb5c00b5' // MIS-BUSD LP
const LaboBnbAddrV2Testnet = '0x31222d37568bd54be95ece3749f0559c45a85634' // MIS-BUSD LP
const LaboAddrTestnet = '0xF2f587fD8A423880037F39828d593d4cE1961A98' // MIS ADDRESS
const masterChefTestnet = '0xa385399B4dE3B5f01a31b0E753f32E18e526db8f' // MIS MASTERCHEF

// Labo RELATED PIDS

const pidLaboUst = 0
const pidLaboBnb = 2
const pidLabo = 10

// OTHER PIDS THAT ARE REFERENCED THROUGHOUT THE CODE

const pidBnbBusd = 1

// SET countBack TO TRUE TO COUNT BACK AS FAR AS countLength

const countBack = false
const countLength = 2

// CHANGE Labo FOR THE TOKEN BEIGN TESTED

const xPerBlock = "rewardPerSecond" // referenced in getMasterChefAddress()
const pendingX = "pendingReward"

// SEARCH AND REPLACE THIS STRING IF USING ANY OTHER THAN LABO: await masterChefContract.methods.pendingLabo in \src\state\pools\fetchPoolsUser.ts

// USE OUR CUSTOM WAY OF FETCHING PRICE

const fetchAutomatic = false;
const fetchPriceCustom = false;

// BitQuery RESPONSE POSITIONS

const busdPosition = 0
const tokenPosition = 1

// IS LOCKED

const unlockWalletButton = false;

// IS FARMS CONFIGURED

const isFullyConfigured = true;
const showFarmInfoModal = true;


//----------------------------------------------------------------------------------------------------------------------------------------------

// EDIT ABOVE NOT HERE

const labo = {
    addr: {
        LaboUstAddr,
        LaboBnbAddr,
        LaboUstAddrV2,
        LaboBnbAddrV2,
        LaboAddr,
        masterChef,
        misWheel,
        LaboBusdAddrTestnet,
        LaboBnbAddrTestnet,
        LaboBusdAddrV2Testnet,
        LaboBnbAddrV2Testnet,
        LaboAddrTestnet,
        masterChefTestnet,
    },
    pids: {
        pidLaboBnb,
        pidLaboUst, 
        pidLabo,
        pidBnbBusd,
        pidList: [
            pidLaboUst, // MIS-UST LP [0]
            pidBnbBusd, // Labo-BNB LP [1]
            pidLaboBnb, // Labo [2]
            3, // BNB-BUSD LP [3]
            4, // ONE-1ETH LP [4]
            5, // BTCB-BNB LP [4]
            6, // ETH-BNB LP [5]
            7, // DAI-BUSD LP [6]
            8, // USDC-BUSD LP [7]
            9, // DOT-BNB LP [8]
            10, // CAKE-BUSD LP [9]
            11, // CAKE-BNB LP [10] */
            // pidLabo, // Labo [3]
            /* 10, // BUSD [12]
            11, // WBNB [13]
            12, // EGG [14]
            18, // BTCB [15]
            14, // ETH [16]
            15, // DAI [17]
            16, // USDC [18]
            17, // DOT [19]
            19, // BSCX [20]
            13, // AUTO [21]
            22, // Labo-GYA [22]
            23, // Labo-DSL [23]
            24, // Labo-BUSD LP V2 [24]
            25, // Labo-BNB LP V2 [25]
            26, // BUSD-BNB LP V2 [26]
            27, // USDT-BUSD LP V2 [27]
            28, // BTCB-BNB LP V2 [28] 
            29, // ETH-BNB LP V2 [29]
            30, // DAI-BUSD LP V2 [30] 
            31, // USDC-BUSD LP V2 [31]
            31, // DOT-BNB LP V2 [32]
            32, // CAKE-BNB LP V2 [33]
            33, // ADA-WBNB LP V2 [34] */


        ],
    },
    strings: {
        xPerBlock,
        pendingX
    },
    fetch: {
        fetchAutomatic,
        fetchPriceCustom
    },
    queryPosition: {
        busd: busdPosition,
        token: tokenPosition
    },
    isLocked: {
        unlockWalletButton
    },
    isFullyConfigured,
    showFarmInfoModal
}
 
export default labo;
