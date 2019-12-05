import React, { useState, useEffect } from "react";

export default function Fade({ page, delay }) {
    //on every render, render a black div then using timer add another css class that animates fading out
    let [endAnimation, setEndAnimation] = useState(false);

    useEffect(() => {
        setEndAnimation(false);
    }, [page]);


    setTimeout(function () {
        setEndAnimation(true);
    }, delay);

    let classes = ['fader'];

    if (endAnimation) {
        classes.push('hide');
    }

    return (<div className={classes.join(' ')}></div>);
}