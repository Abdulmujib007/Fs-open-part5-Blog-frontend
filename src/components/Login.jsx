

const Login = ({handleSubmit,handleUser,handlePass,username,password}) => {

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
          />{" "}
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
    );
  };
  export default Login