import { useState } from 'react'

const Recorder = (args) => (
    <div className='conversion'>
        <ul>{ args.conversions }</ul>
    </div>
)

export default Recorder