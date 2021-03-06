/*
 Copyright 2017 KiKe. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { ipcRenderer, remote } from 'electron';
import Local from './local';
import * as path from 'path';

declare global {
    interface Window {
        aapi: any;
    }
}

window.aapi = window.aapi || {};
preload();

function preload() {

    const local = new Local({name: 'akon'});

    document.addEventListener('DOMContentLoaded', () => {
        initDom();
    });

    function initDom() {
        local.server.listen(0);

        local.server.on('peer', (socket) => {
            console.log(socket);
        });

        local.server.on('UserConnected', (socket) => {
            alert(socket);
        });

        local.server.getConnections((err, count) => {
            console.log(count);
        });
    }

    window.aapi = {
        Config: remote.require(path.join(__dirname, '..', 'config')).Config
    };

    Object.freeze(window.aapi);

}
