import { Currencies } from '@/constants'

export const getResponseAssetRate = (assetId: Currencies) => {
    return `${process.env.REACT_APP_RESPONSE_ASSET_RATE}/${assetId}?apikey=${process.env.REACT_APP_API_KEY}&filter_asset_id=${Currencies.AustralianDollar};${Currencies.Bitcoin};${Currencies.Bovespa};${Currencies.CanadianDollar};${Currencies.Dollar};${Currencies.Euro};${Currencies.Libra};${Currencies.Peso};${Currencies.Won};${Currencies.YEN};`
}
