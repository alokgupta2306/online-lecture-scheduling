import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Instructors from '../components/Instructors'
import Courses from '../components/Courses'
import Lectures from '../components/Lectures'

function AdminDashboard({ setUser }) {
  const [activeTab, setActiveTab] = useState('instructors')
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const handleLogout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/')
  }

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1 style={styles.logo}>idea<span style={{color:'#e85d04'}}>magix</span> <span style={styles.panel}>Admin Panel</span></h1>
        <div style={styles.navRight}>
          <span style={styles.welcome}>Welcome, {user?.name}</span>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={activeTab === 'instructors' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('instructors')}
        >Instructors</button>
        <button
          style={activeTab === 'courses' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('courses')}
        >Courses</button>
        <button
          style={activeTab === 'lectures' ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab('lectures')}
        >Lectures</button>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {activeTab === 'instructors' && <Instructors />}
        {activeTab === 'courses' && <Courses />}
        {activeTab === 'lectures' && <Lectures />}
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
  navbar: {
    backgroundColor: 'white',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: { margin: 0, fontSize: '22px', color: '#333' },
  panel: { fontSize: '16px', color: '#999', fontWeight: 'normal' },
  navRight: { display: 'flex', alignItems: 'center', gap: '15px' },
  welcome: { color: '#555', fontSize: '14px' },
  logoutBtn: {
    padding: '8px 16px',
    backgroundColor: '#e85d04',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    padding: '20px 30px 0',
  },
  tab: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    backgroundColor: '#ddd',
    cursor: 'pointer',
    fontSize: '15px'
  },
  activeTab: {
    padding: '10px 24px',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#e85d04'
  },
  content: {
    backgroundColor: 'white',
    margin: '0 30px 30px',
    borderRadius: '0 8px 8px 8px',
    padding: '25px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  }
}

export default AdminDashboard