import wrapDescriptor from './wrapDescriptor';

export default function deprecated(prototype, property, descriptor) {
  let warned = false;
  function warning() {
    if (!warned) {
      warned = true;
      console.warn(
        `${prototype.constructor.name}.${property} is deprecated. Please stop use it soon before the feature is completely removed`,
      );
    }
  }
  return wrapDescriptor(descriptor, warning);
}
