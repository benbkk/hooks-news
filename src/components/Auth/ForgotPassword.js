import React, { useState, useContext } from "react";
import FirebaseContext from '../../firebase/context'

function ForgotPassword() {
  const { firebase } = useContext(FirebaseContext)

  const [resetPasswordEmail, setResetPasswordEmail] = useState('')
  const [isPasswordReset, setIsPasswordReset] = useState(false)
  const [passwordResetError, setPasswordResetError] = useState(null)

  const handleChange = e => {
    setResetPasswordEmail(e.target.value)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    try {
      await firebase.resetPassword(resetPasswordEmail)
      setIsPasswordReset(true)
    } catch (err) {
      setPasswordResetError(err.message)
      setIsPasswordReset(false)
    }
  }

  return (
    <>
      <h1>Forgot your password?</h1>
      <form
              onSubmit={handleResetPassword}
            >
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
          >
            Reset Password
          </button>
          </form>
          {isPasswordReset && (
            <p>We just sent you an email with a link to reset your password. Please check your email</p>
          )}
          {!passwordResetError && !isPasswordReset ? null : <p className="error-text">{passwordResetError}</p>}
      </>
  )
}

export default ForgotPassword;
