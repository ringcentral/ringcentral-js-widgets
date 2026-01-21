import React from 'react';

/**
 * Checks if a value or its children contain React nodes
 * @param value - The value to check
 * @returns boolean indicating if the value contains React nodes
 */
function hasReactNodes(value: any): boolean {
  // Check if the value itself is a React node
  if (React.isValidElement(value)) {
    return true;
  }

  // Check if it's an array
  if (Array.isArray(value)) {
    return value.some((item) => hasReactNodes(item));
  }

  // Check if it's an object
  if (typeof value === 'object' && value !== null) {
    // Check all properties of the object
    return Object.values(value).some((prop) => hasReactNodes(prop));
  }

  return false;
}

/**
 * Checks if a value is serializable (does not contain React nodes or other non-serializable values)
 * @param value - The value to check
 * @returns boolean indicating if the value is serializable
 */
export function isSerializable(value: any): boolean {
  JSON.stringify(value);

  if (hasReactNodes(value)) {
    throw new Error('The value contains React nodes');
  }

  return true;
}
