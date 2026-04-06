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
  temperatureOffset = 0,
): number =>
  getAltitudeAdjustedTemperature(baseTemperature, worldY) -
  WORLDGEN_PROFILE.hydrology.freezeTemperature +
  temperatureOffset;

export const getLocalPrecipitationType = (
  baseTemperature: number,
  worldY: number,
  temperatureOffset = 0,
): LocalPrecipitationType =>
  getSignedPrecipitationTemperature(baseTemperature, worldY, temperatureOffset) < 0
    ? 'snow'
    : 'rain';
