import { useState } from 'react'

import Conversion from './Conversion'
import Recorder from './Recorder'

import arrows from './asset/arrows.svg'
import heart from './asset/heart.svg'
import cross from './asset/cross.svg'

const DECIMALS = 2

function unitOperation(type, value) {
    switch (type) {
        case 'ms':
            return Math.fround((parseFloat(value) / 1.609)).toFixed(DECIMALS)
        case 'km':
            return Math.fround((parseFloat(value) * 1.609)).toFixed(DECIMALS)
        case 'ft':
            return Math.fround((parseFloat(value) / 3.281)).toFixed(DECIMALS)
        case 'mt':
            return Math.fround((parseFloat(value) * 3.281)).toFixed(DECIMALS)
        case 'pg':
            return Math.fround((parseFloat(value) / 2.54)).toFixed(DECIMALS)
        case 'cm':
            return Math.fround((parseFloat(value) * 2.54)).toFixed(DECIMALS)
    }
}

function readLocalStorage() {
    const array = []

    for (let i = 0; i < localStorage.length; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const split = item.split('.')
        array.push(new Conversion(parseFloat(split[0]), parseFloat(`${ split[1] }.${ split[2] }`), split[3]))
    }

    return array
}

const Conversor = () => {
    let [input, setInput] = useState('')
    let [data, setData] = useState(0.0)
    let [type, setType] = useState('ms')
    let [conversions, setConversions] = useState(readLocalStorage())

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
            } break
            case 'milles_km': {
                setType('km')
                if (input != "") {
                    const data = unitOperation('km', input)
                    setData(data)
                } else {
                    setData(0.0)
                }
            } break
            case 'foot_meters': {
                setType('mt')
                if (input != "") {
                    const data = unitOperation("ft", input)
                    setData(data)
                }
            } break
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

    const reverseType = (type) => {
        switch (type) {
            case 'ms':
                return 'km'
            case 'km':
                return 'ms'
            case 'mt':
                return 'ft'
            case 'ft':
                return 'mt'
            case 'cm':
                return 'inch'
            case 'inch':
                return 'cm'
        }
    }

    const addConversion = () => {
        const conversion = new Conversion(input, data, type)
        localStorage.setItem(`${conversion.input}${conversion.data}${type}${Math.round(Math.random() * 3600)}`, `${conversion.input}.${conversion.output}.${conversion.type}`)
        setConversions(conversions.concat(conversion))
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
        localStorage.removeItem(localStorage.key(target.id))
        setConversions(conversions.filter((value, index) => index != target.id))
    }

    const changeTypes = () => {
        setType(reverseType(type))
        setData(input)
        setInput(data)
    }

    return (
        <div className={"box"}>
            <h2 id={"convert"}>convert</h2>
            <div id={"values"}>
                <div>
                    <select onChange={handleSelect}>
                        <option value={"km_milles"}>Km to Milles</option>
                        <option value={"milles_km"}>Milles to Km</option>
                        <option value={"foot_meters"}>Foots to Meters</option>
                        <option value={"meters_foot"}>Meters to Foots</option>
                        <option value={"inch_cm"}>Inch to Cm</option>
                        <option value={"cm_inch"}>Cm to Inch</option>
                    </select>
                    <img src={ arrows } onClick={ changeTypes }/>
                    <input type={'text'} onChange={handleInput} value={input}/>
                    <span>{reverseType(type)}</span>
                </div>
            </div>
            <div className={"data-box"}>
                <div className={"data-info"}>
                    <h3>{`${data}${type}`}</h3>
                </div>
                <div className={"save"}>
                    <img onClick={ addConversion } src={ heart }/>
                </div>
            </div>
            <br /><br />
            <h3 id={"saved"}>saved</h3>
            <Recorder conversions={conversions.map((value, index) => {
                return (
                    <>
                        <div id={"element"}>
                            <span>{`${value.input}${reverseType(value.type)} - ${value.output}${value.type}`}</span>
                            <img id={ index } src={ cross } onClick={ deleteConversion }/>
                        </div>
                    </>
                )
            })} />

            <style>
                {
                    `
                        body {
                            display: flex;

                            flex-flow: row wrap;

                            align-items: center;
                            justify-content: center;
                        
                            font-family: "Poppins";

                            cursor: default;
                        }

                        .box {
                            display: flex;

                            flex-flow: column;

                            background-color: rgba(46, 0, 57, 1);

                            color: white;

                            width: 714px;
                            height: 193px;

                            border-radius: 21px;

                            box-shadow: 0px 0px 5px black;
                        }

                        .data-box {
                            display: flex;
                            
                            flex-flow: row wrap;

                            alignt-items: center;
                            justify-content: center;
                        }

                        .save {
                            flex-direction: row;
                        }

                        .data-info {
                            flex-direction: row-reverse;
                        }

                        #convert {
                            margin-left: 20px;
                        }

                        #values {
                            display: flex;

                            flex-flow: column wrap;

                            align-items: center;
                            justify-content: center;
                        }

                        #values select {

                            width: 254px;
                            height: 32px;
                        }

                        #values input {
                            margin-left: 100px;

                            width: 254px;
                            height: 32px;
                        }

                        #element {
                            display: flex;

                            flex-flow: column wrap;

                            background-color: gray;

                            align-items: center;
                            justify-content: center;

                            width: 349px;
                            height: 38px;

                            border-radius: 10px;

                            color: black;

                            background: #E3E3E3;
                            box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
                            border-radius: 10px;
                        }

                        #index {
                            flex-direction: end;
                        }

                        #saved {
                            color: black;
                        }

                        select {
                            border: none;
                            border-bottom: solid 2px white;
                            color: white; 
                            background-color: transparent;
                        }

                        option {
                            color: black;
                        }

                        input {
                            border: none;
                            border-bottom: solid 2px white;
                            color: white;
                            background-color: transparent;
                            text-align: right;
                        }
                    `
                }
            </style>
        </div>
    )
}

export default Conversor