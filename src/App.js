import React, { Component } from 'react';
import './App.css';
import URLS from './URLS';

// components
import Images from './components/Images';
import Menu from './components/Menu';
import Arrows from './components/Arrows';
import Fade from "./components/Fade";

class App extends Component {
    constructor() {
        super();

        this.state = {
            page: 0,
            urls: URLS,
            duration: 2000,
            paused: false,
            delay: 500,
            lastChanged: null,
            interval: null
        };
    }

    //prefetch images for quick loading.
    componentDidMount() {
        this.state.urls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });

        const interval = this.createInterval();
        this.setState({ ...this.state, interval });
    }

    render() {
        let {
            page,
            urls,
            delay
        } = this.state;

        return (
            <div className="App" >
                <div className="imgContainer" >
                    <Fade page={page} delay={delay} />
                    <Arrows changePage={this.changePage.bind(this)} />
                    <Images url={urls[page]} />
                </div>
                <Menu togglePause={this.togglePause.bind(this)} paused={this.state.paused} />
            </div>
        );
    }

    //change page, but prevent user from chaning too fast as it'd interfere with fading animation.
    changePage(left) {
        let lastChanged = this.state.lastChanged;
        let page = this.state.page;
        let len = this.state.urls.length;
        let delay = this.state.delay;

        if (lastChanged != null && (Date.now() - lastChanged) < delay) {
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

    //clear out the timer if paused, otherwise createa new one!
    togglePause() {
        let paused = !this.state.paused;
        
        if (paused) {
            clearInterval(this.state.interval);
            this.setState({...this.state, paused})
        } else {
            const interval = this.createInterval();
            this.setState({...this.state, paused, interval})
        }
    }

    //clear timer and save it in state so it can be cleared when pausing
    createInterval() {
        const interval = setInterval(() => {
            this.changePage(false);
        }, this.state.duration);
        return interval;
    }
}


export default App;