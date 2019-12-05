import React, { Component } from 'react';
import './App.css';
import URLS from './URLS';

// components
import Images from './components/Images';
import TimeBar from './components/TimeBar';
import Arrows from './components/Arrows';
import Fade from "./components/Fade";

class App extends Component {
    constructor() {
        super();

        this.state = {
            page: 0,
            urls: URLS,
            speed: 1200,
            paused: false,
            delay: 500,
            lastChanged: null
        };
    }

    componentDidMount() {
        this.state.urls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }

    render() {
        let {
            page,
            urls,
            speed,
            delay
        } = this.state;

        return (
            <div className="App" >
                <div className="imgContainer" >
                    <Fade page={page} delay={delay}/>
                    <Arrows changePage={this.changePage.bind(this)} />
                    <Images url={urls[page]} />
                </div>
                <TimeBar speed={speed} />
            </div>
        );
    }

    changePage(left) {
        let lastChanged = this.state.lastChanged;
        let page = this.state.page;
        let len = this.state.urls.length;
        let delay = this.state.delay;

        if (lastChanged != null && Date.now() - lastChanged < delay) {
            return;
        }
        if (left) {
            page = --page || this.state.urls.length - 1;
        } else {
            page = ++page % len;
        }

        this.setState({
            ...this.state,
            page,
            lastChanged: Date.now()
        });
    }

}

export default App;