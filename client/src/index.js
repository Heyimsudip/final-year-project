import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './components/Routes';
import { UserProvider } from './context';
import './index.css';
import 'antd/dist/antd.css';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { rootReducer } from './components/Redux';
import ChatProvider from './context/ChatProvider';

const store = createStore(rootReducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

ReactDOM.render(
  <ChatProvider>
    <UserProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </UserProvider>
  </ChatProvider>,
  document.getElementById('root')
);


