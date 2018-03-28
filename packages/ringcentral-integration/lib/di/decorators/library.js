import Registry from '../registry/registry';

/**
 * @Library() decorator
 * Used for declaring dependencies and metadata when defines a library
 * This is only a facade of Module metadata, they behave exactly the same.
 */
export default function Lib(metadata) {
  /* eslint-disable */
  return function(constructor) {
    Registry.registerModule(constructor, metadata);
    return constructor;
  };
}
