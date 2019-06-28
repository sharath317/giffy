import React from 'react';
import {render} from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import {BrowserRouter,Route} from 'react-router-dom';
import ProfileStore from './stores/ProfileStore.js';
import {Provider} from 'mobx-react';
import registerServiceWorker from './registerServiceWorker'


const appName = 'root';

window.addEventListener('DOMContentLoaded', () => {
    let container = document.getElementById(appName);

    if (!container) {
        container = document.createElement('div');
        container.id = appName;
        container.className = appName;
        document.body.appendChild(container);
    }

    render(
      <Provider ProfileStore={ProfileStore}>
      <BrowserRouter>
        <div>
          <div>
            <Route  path='/' component = {App} />
          </div>
        </div>
      </BrowserRouter>
    </Provider>, container
    );
});

registerServiceWorker();
