/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types'


const Login = ({ handleSubmit,handleUser,handlePass,username,password }) => {

  return (
    <>
      <h1>login to application</h1>
      <form onSubmit={handleSubmit}>
          username
        <input
          className="rounded-full"
          type="text"
          value={username}
          onChange={handleUser}
        />{''}
        <br />
          password
        <input
          type="text"
          value={password}
          onChange={handlePass}
        />
        <button type="submit">login</button>
      </form>
    </>
  )
}
Login.propTypes =  {
  handleSubmit: PropTypes.func.isRequired,
  handleUser:PropTypes.func.isRequired,
  handlePass:PropTypes.func.isRequired,
  username:PropTypes.string.isRequired,
  password:PropTypes.string.isRequired
}
export default Login