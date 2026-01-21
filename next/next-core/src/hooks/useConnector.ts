import {
  getRef,
  PortDetector,
  type ShallowEqual,
  useConnector as useConnectorWithReactant,
} from 'reactant-share';

export const useConnector = <T>(
  selector: (getModules: <P>(moduleKey: string) => P) => T,
  shallowEqual?: ShallowEqual,
) => {
  return useConnectorWithReactant(
    (container) =>
      selector(
        (moduleKey) => getRef(container.got(PortDetector)!).modules![moduleKey],
      ),
    shallowEqual,
  );
};
