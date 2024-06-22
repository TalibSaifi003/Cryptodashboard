import { CHART_TYPE, COUNTRY_CURRENCY, CRYPTO_CURRENCY, NETWORK_ERROR, NUMBER_OF_DAYS } from "../constant/actionType"

const cryptoCurrency = (currency)=>{
    return {
        type:CRYPTO_CURRENCY,
        payload:currency
    }
}

const currencyOfCountry = (currency) =>{
    return {
        type:COUNTRY_CURRENCY,
        payload:currency
    }

}

const numberOfDays = (days) => {
    return{
        type:NUMBER_OF_DAYS,
        payload:days
    }
}

const chartType = (chart) => {
    return {
        type:CHART_TYPE,
        payload:chart
    }
}

const networkError =(error)=>{
    return {
        type:NETWORK_ERROR,
        payload:error
    }

}

export {networkError,chartType,currencyOfCountry,cryptoCurrency,numberOfDays}