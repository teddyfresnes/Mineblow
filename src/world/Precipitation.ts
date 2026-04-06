import type { LocalPrecipitationType } from '../types/weather';
import { WORLDGEN_PROFILE } from './WorldgenProfile';
import { SEA_LEVEL } from './BetaBiomes';

export const getAltitudeAdjustedTemperature = (
  baseTemperature: number,
  worldY: number,
): number => baseTemperature - ((worldY - SEA_LEVEL) / SEA_LEVEL) * 0.3;

export const getSignedPrecipitationTemperature = (
  baseTemperature: number,
  worldY: number,
  temperatureCelsius = 0,
): number =>
  getAltitudeAdjustedTemperature(baseTemperature, worldY) -
  WORLDGEN_PROFILE.hydrology.freezeTemperature +
  temperatureCelsius;

export const getLocalPrecipitationType = (
  temperatureCelsius: number,
): LocalPrecipitationType =>
  temperatureCelsius < 0
    ? 'snow'
    : 'rain';
