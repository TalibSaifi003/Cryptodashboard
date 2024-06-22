
const INIT_CRYPTOCURRENCY = "Bitcoin";
const INIT_CURRENCY = "USD";
const NO_OF_DAYS = 365;
const CHART_TYPE = "Line-Chart";
const INIT_ERROR = false;

export const currentCryptoCurrency = (state=INIT_CRYPTOCURRENCY,action) =>{
    if(action.type==="CRYPTO_CURRENCY"){
        return action.payload;
    }
    return state;

}

export const currentCountry = (state=INIT_CURRENCY,action)=>{
    if(action.type==="COUNTRY_CURRENCY"){
        return action.payload;
    }
    return state;
}

export const daysCount = (state=NO_OF_DAYS,action)=>{
if(action.type==="NUMBER_OF_DAYS"){
    return action.payload
}
return state
}

export const chartTypeSelector = (state= CHART_TYPE,action)=>{
    if(action.type==="CHART_TYPE"){
        return action.payload
    }
    return state
}

export const NetworkErrorHandler = (state = INIT_ERROR, action) => {
    if (action.type === "NETWORK_ERROR") {
      return action.payload;
    }
    return state;
  };
  