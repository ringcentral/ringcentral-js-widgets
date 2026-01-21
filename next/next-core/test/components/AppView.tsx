import React, { FunctionComponent } from 'react';

import { Route, Switch } from '../..';

const Link: FunctionComponent<{
  active: boolean;
  onClick: () => any;
  id?: string;
}> = ({ active, children, onClick, id }) => {
  return (
    <div onClick={onClick} style={{ color: active ? 'red' : 'black' }} id={id}>
      {children}
    </div>
  );
};

export const AppView: FunctionComponent<{
  currentPath: string;
  push: (path: string) => void;
  counterViewPath: string;
  counterViewName: string;
  counterView: FunctionComponent;
}> = ({ currentPath, push, counterViewPath, counterViewName, counterView }) => {
  return (
    <>
      <ul>
        <li>
          <Link
            active={currentPath === '/'}
            onClick={() => push('/')}
            id="home"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            active={currentPath === counterViewPath}
            onClick={() => push(counterViewPath)}
            id={counterViewName}
          >
            {counterViewName}
          </Link>
        </li>
      </ul>

      <div id="content">
        <Switch>
          <Route exact path="/">
            <h2>home</h2>
          </Route>
          <Route path={counterViewPath} component={counterView} />
          <Route path="/counterList/:id" component={counterView} />
        </Switch>
      </div>
    </>
  );
};
