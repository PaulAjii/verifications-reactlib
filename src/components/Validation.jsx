// import ValidationSuccessful from "./ValidationSuccessful"
import Otp from "./Otp"

import '../styles/validation.css'

const Validation = () => {
  return (
    <div className="container">
      <div className="step__container">
        {/* <ValidationSuccessful /> */}
        <Otp />
      </div>
    </div>
  )
}

export default Validation