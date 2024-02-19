import { useState } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa"
import { IconContext } from "react-icons"
import '../styles/otp.css'

const Otp = () => {
    const [ otp, setOtp ] = useState(new Array(6).fill(""))

    const handleChange = (e, index) => {
        if (isNaN(e.target.value)) return false

        const newOtp = [ ...otp ]
        newOtp[index] = e.target.value
        setOtp(newOtp)

        if (index < otp.length - 1 && e.target.value !== "") {
            e.target.nextSibling.focus();
        }

        if (index > 0 && e.target.value === "" && newOtp[index - 1] === "") {
            e.target.previousSibling.focus();
        }
    }

    const handleClick = (e) => {
        const digit = e.target.innerText

        const focusedInputIndex = otp.findIndex((value) => value === "")

        if (focusedInputIndex !== -1) {
            const newOtp = [...otp]
            newOtp[focusedInputIndex] = digit
            setOtp(newOtp)

            if (focusedInputIndex < otp.length - 1) {
                const nextInput = e.target.parentNode.querySelector(`input:nth-child(${focusedInputIndex + 2})`)
                if (nextInput) {
                    nextInput.focus()
                }
            }
        }
    }

    const handleDelete = () => {
        let focusedInputIndex = otp.findIndex((value) => value === "")

        if (focusedInputIndex) {
            if (focusedInputIndex === -1) focusedInputIndex = 6
            const newOtp = [ ...otp ]
            newOtp[focusedInputIndex - 1] = ""
            setOtp(newOtp)
        }
    }

    const handlePasteFromClipboard = async () => {
        try {
            const pastedCode = await navigator.clipboard.readText()
            const otpFromClipboard = pastedCode.match(/\d{6}/)

            if (otpFromClipboard) {
                const newOtp = otpFromClipboard.input.split('').splice(0, 6)
                setOtp(newOtp)
            }
        } catch (err) {
            console.error(`OTP failed to paste: ${ err }`)
        }
    }

    const buttonNumberRender = () => {
        const num = 10
        const numArray = []

        for (let i = 1; i < num; i++) {
            numArray.push(<button key={i} onClick={(e) => handleClick(e)} className='num__btn'>{ i }</button>)
        }
        return numArray
    }

    return (
        <>
            <div className="top">
                <IconContext.Provider value={{ size: "30px" }}>
                    <button className="back__btn">
                        <FaLongArrowAltLeft/>
                    </button>
                </IconContext.Provider>
                <p>
                    Didn't receive a code? <a href='dummy.com'>Resend</a>
                </p>
            </div>

            <h3>Enter OTP</h3>
            <p className="text">
                We just sent a six digit code to your email address, enter it into the field below to complete account registration process.
            </p>

            <div className="otp">
                <div className="otp__area-copy__text">
                    <div className="otp__area">
                        {
                            otp.map((data, i) => {
                                return (
                                <input
                                    key={i}
                                    type='text'
                                    value={data}
                                    onChange={(e) => handleChange(e, i)}
                                    maxLength={1}
                                    readOnly
                                />)
                            })
                        }
                    </div>

                    <p className='copy__text'>
                        Copied Code? <span onClick={ handlePasteFromClipboard }>Tap to paste code</span>
                    </p>
                </div>

            <div className="keyboard__area">
                { buttonNumberRender() }
                <button className="num__btn not__visible"></button>
                <button className="num__btn" onClick={ (e) => handleClick(e)}>0</button>
                <button className="num__btn del__btn" onClick={ handleDelete }>Del</button>
                </div>
            </div>
        </>
    )
}

export default Otp