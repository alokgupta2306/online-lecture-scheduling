import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login({ setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setUser(res.data.user)
      if (res.data.user.role === 'admin') navigate('/admin')
      else navigate('/instructor')
    } catch (err) {
      setError('Invalid email or password!')
    }
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.logo}>idea<span style={{color:'#e85d04'}}>magix</span></h1>
        <h2 style={styles.title}>Lecture Scheduling</h2>
        <p style={styles.subtitle}>Login to continue</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          style={styles.button}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={styles.credentials}>
          <p><strong>Admin:</strong> admin@ideamagix.com / admin123</p>
          <p><strong>Instructor:</strong> rahul@ideamagix.com / rahul123</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  box: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '380px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    textAlign: 'center',
    fontSize: '28px',
    margin: '0 0 5px 0',
    color: '#333'
  },
  title: {
    textAlign: 'center',
    fontSize: '18px',
    margin: '0 0 5px 0',
    color: '#555'
  },
  subtitle: {
    textAlign: 'center',
    color: '#999',
    marginBottom: '25px'
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '15px',
    outline: 'none'
  },
  button: {
    padding: '12px',
    backgroundColor: '#e85d04',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px'
  },
  credentials: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#666'
  }
}

export default Login