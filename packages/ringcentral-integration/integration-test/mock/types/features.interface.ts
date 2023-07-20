import type features from '../data/features.json';

export type FeaturesData = typeof features;

export type Record = FeaturesData['records'][0];
