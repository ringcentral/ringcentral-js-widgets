import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import availabilityTypes from '../../enums/availabilityTypes';
import removeUri from '../../lib/removeUri';
import syncStatus from './syncStatus';

export function getSyncStatusReducer(types) {
  return (state = syncStatus.idle, { type }) => {
    switch (type) {
      case types.sync:
        return syncStatus.syncing;
      case types.syncError:
      case types.syncSuccess:
        return syncStatus.idle;
      default:
        return state;
    }
  };
}

export function getContactListReducer(types) {
  return (state = [], { type, records }) => {
    const contacts = [];
    const contactMap = {};
    switch (type) {
      case types.syncSuccess:
        if (!records || records.length === 0) {
          return state;
        }
        state.forEach((contact) => {
          contacts.push(contact);
          contactMap[contact.id] = contacts.length - 1;
        });
        records.forEach((record) => {
          const isDeleted = (record.availability === availabilityTypes.deleted);
          const oldIndex = contactMap[record.id];
          if (oldIndex !== undefined && oldIndex !== null) {
            if (isDeleted) {
              contacts[oldIndex] = null;
              delete contactMap[record.id];
            } else {
              const oldContact = contacts[oldIndex];
              contacts[oldIndex] = {
                ...oldContact,
                ...(removeUri(record)),
              };
            }
          } else if (!isDeleted) {
            contacts.push(removeUri(record));
            contactMap[record.id] = contacts.length - 1;
          }
        });
        return contacts.filter(contact => !!contact);
      case types.resetSuccess:
      case types.cleanUp:
        return [];
      default:
        return state;
    }
  };
}

export function getSyncTokenReducer(types) {
  return (state = null, { type, syncToken }) => {
    switch (type) {
      case types.syncSuccess:
        return syncToken;
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export function getSyncTimestampReducer(types) {
  return (state = null, { type, syncTime }) => {
    switch (type) {
      case types.syncSuccess:
        return (new Date(syncTime)).getTime();
      case types.resetSuccess:
      case types.cleanUp:
        return null;
      default:
        return state;
    }
  };
}

export default function getAddressBookReducer(types, reducers = {}) {
  return combineReducers({
    ...reducers,
    status: getModuleStatusReducer(types),
    syncStatus: getSyncStatusReducer(types),
  });
}
