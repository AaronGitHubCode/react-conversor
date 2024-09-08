import { useState } from 'react'

import Conversion from './Conversion'
import Recorder from './Recorder'

function unitOperation(type, value) {
    switch (type) {
        case 'ms':
            return (parseFloat(value) / 1.609).toFixed(2)
        case 'km':
            return (parseFloat(value) * 1.609).toFixed(2)
        case 'ft':
            return (parseFloat(value) / 3.281).toFixed(2)
        case 'mt':
            return (parseFloat(value) * 3.281).toFixed(2)
        case 'pg':

        case 'cm':
    }
}

const Conversor = () => {
    let [input, setInput] = useState('')
    let [data, setData] = useState(0.0)
    let [type, setType] = useState('ms')
    let [conversions, setConversions] = useState([])

    const handleSelect = (option) => {
        const target = option.target

        switch (target.value) {
            case 'km_milles': {
                setType('ms')
                if (input != "") {
                    const data = unitOperation('ms', input)
                    setData(data)
                } else {
                    setData(0.0)
                }
            }   break
            case 'milles_km': {
                setType('km')
                if (input != "") {
                    const data = unitOperation('km', input)
                    setData(data)
                } else {
                    setData(0.0)
                }
            }   break
            case 'foot_meters': {
                setType('mt')
                if (input != "") {
                    const data = unitOperation("ft", input)
                    setData(data)
                }
            }   break
            case 'meters_foot': {
                setType('ft')
                if (input != "") {
                    const data = unitOperation("ft", input)
                    setData(data)
                }
            } break
            case 'inch_cm': {
                setType('cm')
                if (input != "") {
                    const data = unitOperation("cm", input)
                    setData(data)
                }
            } break
            case 'cm_inch': {
                setType('inch')
                if (input != "") {
                    const data = unitOperation("cm", input)
                    setData(data)
                }
            } break
        }
    }

    const addConversion = () => {
        setConversions(conversions.concat(new Conversion(input, data)))
    }

    /**
     * 
     * @param {React.ChangeEvent<HTMLInputElement>} input 
     */

    const handleInput = (keyboard) => {
        const target = keyboard.target

        setInput(target.value)

        if (target.value != "") {
            const data = unitOperation(type, target.value)
            setData(data)
        } else {
            setData(0.0)
        }
    }

    const deleteConversion = (element) => {
        const target = element.target
        setConversions(conversions.filter((value, index) => index != target.id))
    }

    return (
        <div className={"box"}>
            <h3>convert</h3>
            <div id={"values"}>
                <div>
                    <select onChange={ handleSelect }>
                        <option value={"km_milles"}>Km to Milles</option>
                        <option value={"milles_km"}>Milles to Km</option>
                        <option value={"foot_meters"}>Foots to Meters</option>
                        <option value={"meters_foot"}>Meters to Foots</option>
                        <option value={"inch_cm"}>Inch to Cm</option>
                        <option value={"cm_inch"}>Cm to Inch</option>
                    </select>
                    <input type={'number'} onChange={ handleInput } />
                </div>
            </div>
            <div>
                <h3>{`${ data }${ type }`}</h3>
                <button onClick={ addConversion } onChange={ addConversion }>Save</button>
            </div>
            <Recorder conversions={ conversions.map((value, index) => {
                return (
                    <>
                        <div>
                            <span>{`${ value.input } - ${ value.output }`}</span>
                            <button id={ index } onClick={ deleteConversion }>Delete</button>
                        </div>
                    </>
                )})}/>

            <style>
                {
                    `
                        .box {
                            display: flex;

                            flex-flow: column;

                            background-color: rgba(46, 0, 57, 1);

                            color: white;

                            width: 714px;
                            height: 193px;

                            border-radius: 21px;

                            font-family: system-ui;
                        }

                        #values {
                            display: flex;


                            flex-flow: column wrap;

                            align-items: center;
                        }

                        #values select {
                            width: 254px;
                            height: 32px;
                        }

                        #values input {
                            width: 254px;
                            height: 32px;
                        }

                        h3 {
                            margin: 20px;
                        }
                    `
                }
            </style>
        </div>
    )
}

export default Conversor