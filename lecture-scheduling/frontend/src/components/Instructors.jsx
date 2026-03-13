import { useState, useEffect } from 'react'
import axios from 'axios'

function Instructors() {
  const [instructors, setInstructors] = useState([])
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('https://lecture-scheduling-backend-tdrq.onrender.com/api/instructors', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setInstructors(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h2 style={styles.heading}>All Instructors</h2>
      <div style={styles.grid}>
        {instructors.map(inst => (
          <div key={inst._id} style={styles.card}>
            <div style={styles.avatar}>{inst.name.charAt(0)}</div>
            <div>
              <h3 style={styles.name}>{inst.name}</h3>
              <p style={styles.email}>{inst.email}</p>
              <span style={styles.badge}>Instructor</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  heading: { marginBottom: '20px', color: '#333' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid #eee',
    backgroundColor: '#fafafa'
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#e85d04',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    flexShrink: 0
  },
  name: { margin: '0 0 4px 0', color: '#333' },
  email: { margin: '0 0 8px 0', color: '#888', fontSize: '13px' },
  badge: {
    padding: '3px 10px',
    backgroundColor: '#fff3e0',
    color: '#e85d04',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  }
}

export default Instructors