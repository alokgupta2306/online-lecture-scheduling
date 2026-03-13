import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function InstructorDashboard() {
  const [lectures, setLectures] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    axios.get('https://lecture-scheduling-backend-tdrq.onrender.com/api/lectures/my-lectures', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setLectures(res.data))
    .catch(err => console.log(err))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h1 style={styles.logo}>idea<span style={{color:'#e85d04'}}>magix</span> <span style={styles.panel}>Instructor Panel</span></h1>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Welcome, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={styles.content}>
        <h2 style={styles.heading}>My Assigned Lectures</h2>
        {lectures.length === 0
          ? <p style={styles.empty}>No lectures assigned yet!</p>
          : (
            <table style={styles.table}>
              <thead>
                <tr style={styles.thead}>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Level</th>
                  <th style={styles.th}>Batch</th>
                  <th style={styles.th}>Date</th>
                </tr>
              </thead>
              <tbody>
                {lectures.map(l => (
                  <tr key={l._id} style={styles.tr}>
                    <td style={styles.td}>{l.course?.name}</td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{l.course?.level}</span>
                    </td>
                    <td style={styles.td}>{l.batchName}</td>
                    <td style={styles.td}>{new Date(l.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
  navbar: { backgroundColor: 'white', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
  logo: { margin: 0, fontSize: '22px', color: '#333' },
  panel: { fontSize: '16px', color: '#999', fontWeight: 'normal' },
  navRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  welcome: { color: '#555', fontSize: '14px' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  content: { margin: '30px', backgroundColor: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
  heading: { marginBottom: '20px', color: '#333' },
  empty: { color: '#999', textAlign: 'center', padding: '40px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#f5f5f5' },
  th: { padding: '12px', textAlign: 'left', borderBottom: '2px solid #eee', color: '#555' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px', color: '#333' },
  badge: { padding: '3px 10px', backgroundColor: '#fff3e0', color: '#e85d04', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }
}

export default InstructorDashboard