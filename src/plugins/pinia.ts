import {createPinia, defineStore} from "pinia";

export const pinia = createPinia();

export const useStore = defineStore("settings", () => {
    let _host = "localhost";
    let _port = 8080;

    function init() {
        const host = localStorage.getItem("novasearch_host");
        const port = localStorage.getItem("novasearch_port");

        if (host !== null) {
            _host = host;
        }

        if (port !== null) {
            _port = parseInt(port);
        }
    }

    function host() {
        return _host;
    }

    function port() {
        return _port;
    }

    function setHost(newHost: string) {
        _host = newHost;
        localStorage.setItem("novasearch_host", newHost);
    }

    function setPort(newPort: number) {
        _port = newPort;
        localStorage.setItem("novasearch_port", newPort.toString());
    }

    return {
        init,
        host,
        port,
        setHost,
        setPort,
    };
});