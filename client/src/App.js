import React from 'react';
// import LongPolling from "./LongPolling";
// import EventSourcing from "./EventSourcing";
import WebSockets from "./WebSockets";

const App = () => {
    return (
        <div className={'container'}>
            {/*<LongPolling />*/}
            {/*<EventSourcing/>*/}
            <WebSockets />
        </div>
    );
};

export default App;