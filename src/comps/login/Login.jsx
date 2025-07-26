import "./login.css"

const Login = () => {
  return (
    <div className='login'>
        <div className="item">
            <h2>Welcome</h2>
            <form>
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button>Sign in</button>
            </form>
        </div>
        <div className="separator">
            
        </div>
        <div className="item">
            <h2>Create an account</h2>
            <form>
                <input type="text" placeholder="Username" name="username" />
                <input type="text" placeholder="Email" name="email" />
                <input type="password" placeholder="Password" name="password" />
                <button><span>Sign up</span></button>
            </form>
        </div>
    </div>
  )
}

export default Login