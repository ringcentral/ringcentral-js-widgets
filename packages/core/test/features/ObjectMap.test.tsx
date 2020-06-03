import {
  autorun,
  title,
  Scenario,
  Given,
  When,
  Then,
  Step,
  examples,
} from 'crius-test';
import { find } from 'ramda';

import { ObjectMap } from '../../lib/ObjectMap';

export class GenericInstance extends Step {
  run() {
    return (
      <>
        <Given
          desc="Generic definition object"
          action={(props, context) => {
            context.definition = {
              foo: 'bar',
              whisky: 'tango',
            } as const;
          }}
        />
        <When
          desc="Create an ObjectMap instance"
          action={(props, context) => {
            context.instance = ObjectMap.fromObject(context.definition);
          }}
        />
      </>
    );
  }
}

@autorun(test)
@title('Access value with keys')
export class GetUseCase extends Step {
  run() {
    return (
      <Scenario desc="Access value with keys">
        <GenericInstance />
        <Then
          desc="The ObjectMap instance should allow values to be accessed by using the keys as property accessors"
          action={(props, { instance, definition }) => {
            expect(instance instanceof ObjectMap).toBe(true);
            for (const key of Object.keys(definition)) {
              expect(instance[key]).toBe(definition[key]);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.getKey(instance)')
export class GetKeyUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.getKey(instance)">
        <GenericInstance />
        <Then
          desc="ObjectMap.getKey(instance) should return the key when passing in the value"
          action={(props, { instance, definition }) => {
            expect(ObjectMap.getKey(instance, 'bad value')).toBeNull();
            for (const key of Object.keys(definition)) {
              expect(ObjectMap.getKey(instance, definition[key])).toBe(key);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.entries(instance)')
export class EntriesUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.entries(instance)">
        <GenericInstance />
        <Then
          desc="entries(instance) should return an iterator contain all the key value pairs"
          action={(props, { instance, definition }) => {
            const kvPairs = [...ObjectMap.entries(instance)];
            expect(kvPairs.length).toBe(Object.keys(definition).length);
            for (const key of Object.keys(definition)) {
              const pair = find((entry) => entry[0] === key, kvPairs);
              expect(pair).toBeDefined();
              expect(pair[1]).toBe(definition[key]);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.size(instance)')
export class SizeUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.size(instance)">
        <GenericInstance />
        <Then
          desc="ObjectMap.size(instance) should return the number of key-value pairs"
          action={(props, { instance, definition }) => {
            expect(ObjectMap.size(instance)).toBe(
              Object.keys(definition).length,
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.has(instance, key)')
export class HasUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.has(instance, key)">
        <GenericInstance />
        <Then
          desc="ObjectMap.has(instance, key) should return true if the key exists"
          action={(props, { instance, definition }) => {
            expect(ObjectMap.has(instance, 'bad key')).toBe(false);
            for (const key of Object.keys(definition)) {
              expect(ObjectMap.has(instance, key)).toBe(true);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.hasValue(instance, value)')
export class HasValueUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.hasValue(instance, value)">
        <GenericInstance />
        <Then
          desc="ObjectMap.hasValue(instance, value) should return true if the value exists"
          action={(props, { instance, definition }) => {
            expect(ObjectMap.hasValue(instance, 'bad value')).toBe(false);
            for (const key of Object.keys(definition)) {
              expect(ObjectMap.hasValue(instance, definition[key])).toBe(true);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.keys(instance)')
export class KeysUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.keys(instance)">
        <GenericInstance />
        <Then
          desc="ObjectMap.keys(instance) should return an iterable containing all the keys"
          action={(props, { instance, definition }) => {
            const keys = [...ObjectMap.keys(instance)];
            expect(keys.length).toBe(Object.keys(definition).length);
            for (const key of Object.keys(definition)) {
              expect(find((k) => k === key, keys)).toBeDefined();
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.values(instance)')
export class ValuesUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.values(instance)">
        <GenericInstance />
        <Then
          desc="ObjectMap.values(instance) should return an iterable containing all the values"
          action={(props, { instance, definition }) => {
            const values = [...ObjectMap.values(instance)];
            expect(values.length).toBe(Object.keys(definition).length);
            for (const key of Object.keys(definition)) {
              expect(find((v) => v === definition[key], values)).toBeDefined();
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.forEach(fn, instance)')
export class ForEachUseCase extends Step {
  run() {
    return (
      <Scenario desc="ObjectMap.forEach(fn, instance)">
        <GenericInstance />
        <Then
          desc="ObjectMap.forEach(fn, instance) should behave the same as Map.forEach"
          action={(props, { instance }) => {
            const keys = [];
            const values = [];
            ObjectMap.forEach((value, key, map) => {
              expect(map).toBe(instance);
              expect(instance[key]).toBe(value);
              keys.push(key);
              values.push(value);
            }, instance);
            expect(keys.length).toBe(ObjectMap.size(instance));
            expect(keys.sort()).toEqual([...ObjectMap.keys(instance)].sort());
            expect(values.length).toBe(ObjectMap.size(instance));
            expect(values.sort()).toEqual(
              [...ObjectMap.values(instance)].sort(),
            );
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.fromKeys(keys: string[])')
export class FromKeysUseCase extends Step {
  @examples([
    {
      keys: ['foo', 'bar'],
    },
    {
      keys: ['whisky', 'tango'],
    },
  ])
  run() {
    return (
      <Scenario desc="ObjectMap.fromKeys(keys: string[])">
        <Given desc="A set of keys and a getValue function" />
        <When
          desc="Calling ObjectMap.fromKeys(keys: string[])"
          action={(props, context) => {
            const { keys } = context.example;
            context.instance = ObjectMap.fromKeys(keys);
          }}
        />
        <Then
          desc="The instance should contain all the key-getValue(key) pairs"
          action={(props, { instance, example: { keys } }) => {
            expect(ObjectMap.size(instance)).toBe(keys.length);
            for (const key of keys) {
              expect(instance[key]).toBe(key);
            }
          }}
        />
      </Scenario>
    );
  }
}

@autorun(test)
@title('ObjectMap.prefixKeys(keys: string[], prefix?: string)')
export class PrefixKeysUseCase extends Step {
  @examples([
    {
      keys: ['foo', 'bar', 'whisky', 'tango'],
      prefix: null,
    },
    {
      keys: ['foo', 'bar', 'whisky', 'tango'],
      prefix: 'pre',
    },
  ])
  run() {
    return (
      <Scenario desc="ObjectMap.prefixKeys(keys: string[], prefix?: string)">
        <Given desc="A set of keys and a prefix" />
        <When
          desc="Calling ObjectMap.prefixKeys(keys: string[], prefix?: string)"
          action={(props, context) => {
            const { keys, prefix } = context.example;
            context.instance = ObjectMap.prefixKeys(keys, prefix);
          }}
        />
        <Then
          desc="The values will be equal to the keys or in the form '{prefix}-{key}' if a prefix is provided"
          action={(props, { instance, example: { keys, prefix } }) => {
            expect(ObjectMap.size(instance)).toBe(keys.length);
            for (const key of keys) {
              expect(instance[key]).toBe(
                prefix === '' ? key : `${prefix}-${key}`,
              );
            }
          }}
        />
      </Scenario>
    );
  }
}
