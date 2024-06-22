import {createStore , combineReducers} from 'redux'
import { currentCountry, currentCryptoCurrency, daysCount } from '../reducer'
import { chartTypeSelector, NetworkErrorHandler } from '../reducer'

export const store = createStore(combineReducers({
   currentCryptoCurrency:currentCryptoCurrency,
   currentCountry:currentCountry,
   daysCount:daysCount,
   chartTypeSelector:chartTypeSelector,
   NetworkErrorHandler:NetworkErrorHandler
})

)