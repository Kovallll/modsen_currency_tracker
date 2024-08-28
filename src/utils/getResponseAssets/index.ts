import { Currencies } from '@/constants'

export const getResponseAssets = () => {
    return `${process.env.REACT_APP_RESPONSE_ASSETS}?apikey=${process.env.REACT_APP_API_KEY}&filter_asset_id=${Currencies.AustralianDollar};${Currencies.Bitcoin};${Currencies.Bovespa};${Currencies.CanadianDollar};${Currencies.Dollar};${Currencies.Euro};${Currencies.Libra};${Currencies.Peso};${Currencies.Won};${Currencies.YEN};`
}
