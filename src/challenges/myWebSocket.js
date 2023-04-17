class MyWebSocket {
    event = "";
    handlers = [];
    constructor() {
      let port = window.location.port;
      if (process.env.NODE_ENV !== 'production') {
        port = 3000;
      }
  
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.hostname}:${port}/ws`);
      this.socket.onopen = (event) => {
        console.log("System Connected");
        this.handlers.forEach((handler) => {
            handler(`System Connected`);
        });
      };
      this.socket.onclose = (event) => {
        this.handlers.forEach((handler) => {
            handler(`System Connected`);
        });
      };
      this.socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        this.receiveEvent(msg.from, msg.value)
      };
    }
  
  
    broadcastEvent(from, value) {
      const event = {
        from: from,
        value: value,
      };
      this.socket.send(JSON.stringify(event));
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }
    
    removeHandler(handler) {
    this.handlers.filter((h) => h !== handler);
    }

    receiveEvent(from, value) {
        this.handlers.forEach((handler) => {
            handler(`${from} is at ${value} points`);
        });
    }
  }


const GameNotifier = new MyWebSocket();
export { GameNotifier };