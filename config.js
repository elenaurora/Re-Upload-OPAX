const appConfig = {

    version: '1.0.11',
    lastPrivacyPolicyChangeTimestamp: 1685349098096,
    lastManualChangeTimestamp: 1697795141000,
    
    fontFamily_1: 'AlegreyaSans-Medium',
    fontFamily_2_bold: 'AlegreyaSans-Bold',
    fontFamily_3: 'Cinzel-Regular',

    fontColor_1: '#272643',  
    fontColor_2: '#FFFFFF',  

    backgroundColor_1: '#D2DEEB', 
    backgroundColor_2: '#272643', 
    backgroundColor_3: '#FFFFFF'

}

const networkConfig = {

    // serverUrl: 'http://spatola.isti.cnr.it/'
    serverUrl: 'https://raw.githubusercontent.com/elenaurora/TEST_OPA/main/'
};

const proximityConfig = {

    interval: 5000,
    selectionCount: 3
};

export {
    appConfig,
    networkConfig,
    proximityConfig
}
