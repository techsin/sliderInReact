import React from "react";

export default function Images({ url }) {
    return (
        <div className='img' style={{ 'backgroundImage': `url("${url}")` }}></div>
    );
}