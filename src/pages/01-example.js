import React from 'react';

export default function Example(props) {
    return <div {...props}>
        <span>Example page</span>
    </div>
}

export const page = {
    path: '/example',
    title: 'example'
}


