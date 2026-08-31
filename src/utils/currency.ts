import type { CalculationInputs, Currency } from '../types/calculator';

export type ExchangeRates = Record<Currency, number>;

// Base USD rates as fallback (updated reference)
export const DEFAULT_EXCHANGE_RATES: ExchangeRates = {
  USD: 1.0,
  TRY: 36.45,
  EUR: 0.96,
  GBP: 0.79,
};

const STORAGE_KEY_RATES = 'layercost_exchange_rates_v1';
const STORAGE_KEY_RATES_TIME = 'layercost_exchange_rates_time_v1';

// Cache validity: 1 hour (in ms)
const CACHE_DURATION_MS = 60 * 60 * 1000;

export const getCachedExchangeRates = (): ExchangeRates => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_RATES);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.USD && parsed.TRY && parsed.EUR && parsed.GBP) {
        return parsed as ExchangeRates;
      }
    }
  } catch (e) {
    console.warn('Could not read cached exchange rates:', e);
  }
  return DEFAULT_EXCHANGE_RATES;
};

export const fetchLiveExchangeRates = async (): Promise<{ rates: ExchangeRates; isLive: boolean }> => {
  try {
    // Check if cache is still fresh (< 1 hour old)
    const cachedTime = localStorage.getItem(STORAGE_KEY_RATES_TIME);
    const cachedRates = getCachedExchangeRates();

    if (cachedTime && Date.now() - parseInt(cachedTime, 10) < CACHE_DURATION_MS) {
      return { rates: cachedRates, isLive: true };
    }

    // Try reliable free open exchange rate API
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`Exchange rate API responded with status ${response.status}`);
    }

    const data = await response.json();
    if (data && data.rates) {
      const newRates: ExchangeRates = {
        USD: 1.0,
        TRY: data.rates.TRY || DEFAULT_EXCHANGE_RATES.TRY,
        EUR: data.rates.EUR || DEFAULT_EXCHANGE_RATES.EUR,
        GBP: data.rates.GBP || DEFAULT_EXCHANGE_RATES.GBP,
      };

      try {
        localStorage.setItem(STORAGE_KEY_RATES, JSON.stringify(newRates));
        localStorage.setItem(STORAGE_KEY_RATES_TIME, Date.now().toString());
      } catch (e) {
        console.warn('Failed to cache exchange rates:', e);
      }

      return { rates: newRates, isLive: true };
    }
  } catch (error) {
    console.info('Using fallback exchange rates:', error);
  }

  return { rates: getCachedExchangeRates(), isLive: false };
};

export const convertCurrencyAmount = (
  amount: number,
  from: Currency,
  to: Currency,
  rates: ExchangeRates = DEFAULT_EXCHANGE_RATES
): number => {
  if (from === to || !amount || isNaN(amount)) return amount;
  
  const fromRate = rates[from] || 1;
  const toRate = rates[to] || 1;

  // Convert to USD base first, then to target currency
  const inUSD = amount / fromRate;
  const inTarget = inUSD * toRate;

  return inTarget;
};

export const roundMonetaryValue = (value: number, currency: Currency): number => {
  if (isNaN(value)) return 0;
  if (currency === 'TRY') {
    // For TRY, keep round or 1 decimal if large, 2 decimal if small
    return value >= 100 ? Math.round(value) : parseFloat(value.toFixed(2));
  }
  // For USD, EUR, GBP, 2 decimal precision
  return parseFloat(value.toFixed(2));
};

export const convertAllMonetaryInputs = (
  inputs: CalculationInputs,
  newCurrency: Currency,
  rates: ExchangeRates
): CalculationInputs => {
  const oldCurrency = inputs.currency;
  if (oldCurrency === newCurrency) return inputs;

  const convert = (val: number, isPricePerKwh = false) => {
    if (!val) return 0;
    const converted = convertCurrencyAmount(val, oldCurrency, newCurrency, rates);
    if (isPricePerKwh) {
      // Electricity prices can be small decimals (e.g. 0.15 $/kWh or 3.20 ₺/kWh)
      return parseFloat(converted.toFixed(3));
    }
    return roundMonetaryValue(converted, newCurrency);
  };

  return {
    ...inputs,
    currency: newCurrency,
    spoolPrice: convert(inputs.spoolPrice),
    electricityPrice: convert(inputs.electricityPrice, true),
    printerPrice: convert(inputs.printerPrice),
    hourlyLaborRate: convert(inputs.hourlyLaborRate),
    additionalCosts: convert(inputs.additionalCosts),
  };
};
