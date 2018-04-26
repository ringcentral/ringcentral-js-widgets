import Registry from '../registry/registry';

/**
 * @Module() decorator
 * Used for declaring dependencies and metadata when defines a module
 */
export default function Module(metadata) {
  /* eslint-disable */
  return function (constructor) {
    Registry.registerModule(constructor, metadata);
    return constructor;
  };
}
