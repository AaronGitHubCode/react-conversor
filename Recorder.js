import { useState } from 'react'

const Recorder = (args) => (
    <div className='conversion'>
        <ul>{ args.conversions }</ul>
        <style>
            {
                `
                    .conversion {
                        background-color: gray;
                        color: black;
                    }
                `
            }
        </style>
    </div>
)

export default Recorder