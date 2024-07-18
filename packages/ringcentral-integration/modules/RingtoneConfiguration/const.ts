import acousticDreamsMP3 from './audio/AcousticDreams.mp3';
import airRaidMP3 from './audio/AirRaid.mp3';
import allusiveMP3 from './audio/Allusive.mp3';
import attentionMP3 from './audio/Attention.mp3';
import blubBlubMP3 from './audio/BlubBlub.mp3';
import buzzyMP3 from './audio/Buzzy.mp3';
import channelOpenMP3 from './audio/ChannelOpen.mp3';
import contemplationMP3 from './audio/Contemplation.mp3';
import crystalBallMP3 from './audio/CrystalBall.mp3';
import discoMP3 from './audio/Disco.mp3';
import doorBellMP3 from './audio/DoorBell.mp3';
import fabMP3 from './audio/Fairy.mp3';
import fastBellsMP3 from './audio/FastBells.mp3';
import highGongMP3 from './audio/HighGong.mp3';
import immersionMP3 from './audio/Immersion.mp3';
import indeedMP3 from './audio/Indeed.mp3';
import lazyDayMP3 from './audio/LazyDay.mp3';
import neuralFunkMP3 from './audio/NeuralFunk.mp3';
import niceMP3 from './audio/Nice.mp3';
import phoneRingMP3 from './audio/PhoneRing.mp3';
import ringMP3 from './audio/Ring.mp3';
import ringingBellsMP3 from './audio/RingingBells.mp3';
import simpleMP3 from './audio/Simple.mp3';
import soothingMP3 from './audio/Soothing.mp3';
import sunshineMP3 from './audio/Sunshine.mp3';
import incomingMP3 from './audio/incoming.mp3';

export enum RINGS_TYPE {
  Phone_Ring1 = 'phone_ring1',
  Phone_Ring2 = 'phone_ring2',
  Acoustic_Dreams = 'acoustic_dreams',
  Air_Raid = 'air_raid',
  Allusive = 'allusive',
  Attention = 'attention',
  Blub_Blub = 'blub_blub',
  Buzzy = 'buzzy',
  Channel_Open = 'channel_open',
  Contemplation = 'contemplation',
  Crystal_Ball = 'crystal_ball',
  Disco = 'disco',
  Door_Bell = 'door_bell',
  Fairy = 'fairy',
  Fast_Bells = 'fast_bells',
  High_Gong = 'high_gong',
  Immersion = 'immersion',
  Indeed = 'indeed',
  Lazy_Day = 'lazy_day',
  Neural_Funk = 'neural_funk',
  Nice = 'nice',
  Ring = 'ring',
  Ringing_Bells = 'ringing_bells',
  Simple = 'simple',
  Soothing = 'soothing',
  Sunshine = 'sunshine',
  Off = 'off',
}

export const DEFAULT_RINGTONE_LIST = [
  { id: RINGS_TYPE.Phone_Ring1, url: incomingMP3 },
  { id: RINGS_TYPE.Phone_Ring2, url: phoneRingMP3 },
  { id: RINGS_TYPE.Acoustic_Dreams, url: acousticDreamsMP3 },
  { id: RINGS_TYPE.Air_Raid, url: airRaidMP3 },
  { id: RINGS_TYPE.Allusive, url: allusiveMP3 },
  { id: RINGS_TYPE.Attention, url: attentionMP3 },
  { id: RINGS_TYPE.Blub_Blub, url: blubBlubMP3 },
  { id: RINGS_TYPE.Buzzy, url: buzzyMP3 },
  { id: RINGS_TYPE.Channel_Open, url: channelOpenMP3 },
  { id: RINGS_TYPE.Contemplation, url: contemplationMP3 },
  { id: RINGS_TYPE.Crystal_Ball, url: crystalBallMP3 },
  { id: RINGS_TYPE.Disco, url: discoMP3 },
  { id: RINGS_TYPE.Door_Bell, url: doorBellMP3 },
  { id: RINGS_TYPE.Fairy, url: fabMP3 },
  { id: RINGS_TYPE.Fast_Bells, url: fastBellsMP3 },
  { id: RINGS_TYPE.High_Gong, url: highGongMP3 },
  { id: RINGS_TYPE.Immersion, url: immersionMP3 },
  { id: RINGS_TYPE.Indeed, url: indeedMP3 },
  { id: RINGS_TYPE.Lazy_Day, url: lazyDayMP3 },
  { id: RINGS_TYPE.Neural_Funk, url: neuralFunkMP3 },
  { id: RINGS_TYPE.Nice, url: niceMP3 },
  { id: RINGS_TYPE.Ring, url: ringMP3 },
  { id: RINGS_TYPE.Ringing_Bells, url: ringingBellsMP3 },
  { id: RINGS_TYPE.Simple, url: simpleMP3 },
  { id: RINGS_TYPE.Soothing, url: soothingMP3 },
  { id: RINGS_TYPE.Sunshine, url: sunshineMP3 },
  { id: RINGS_TYPE.Off, url: '' },
];

export const MAX_CUSTOM_RINGTONE_COUNT = 10;

export const MAX_RINGTONE_SIZE = 5 * 1024 * 1024;
