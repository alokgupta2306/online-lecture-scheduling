import { useState, useEffect } from 'react'
import axios from 'axios'

function Lectures() {
  const [lectures, setLectures] = useState([])
  const [courses, setCourses] = useState([])
  const [instructors, setInstructors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [course, setCourse] = useState('')
  const [instructor, setInstructor] = useState('')
  const [date, setDate] = useState('')
  const [batchName, setBatchName] = useState('')
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => { fetchAll() }, [])

  const fetchAll = () => {
    const headers = { Authorization: `Bearer ${token}` }
    axios.get('http://localhost:5000/api/lectures', { headers }).then(res => setLectures(res.data))
    axios.get('http://localhost:5000/api/courses', { headers }).then(res => setCourses(res.data))
    axios.get('http://localhost:5000/api/instructors', { headers }).then(res => setInstructors(res.data))
  }

  const handleAdd = async () => {
    if (!course || !instructor || !date || !batchName) return setError('Fill all fields!')
    setError('')
    try {
      await axios.post('http://localhost:5000/api/lectures',
        { course, instructor, date, batchName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setCourse(''); setInstructor(''); setDate(''); setBatchName('')
      setShowForm(false)
      fetchAll()
    } catch (err) {
      setError(err.response?.data?.message || 'Error!')
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/lectures/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchAll()
  }

  return (
    <div>
      <div style={styles.header}>
        <h2>All Lectures</h2>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Lecture'}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>Add Lecture</h3>
          {error && <p style={styles.error}>{error}</p>}
          <select style={styles.input} value={course} onChange={e => setCourse(e.target.value)}>
            <option value="">Select Course</option>
            {courses.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <select style={styles.input} value={instructor} onChange={e => setInstructor(e.target.value)}>
            <option value="">Select Instructor</option>
            {instructors.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
          </select>
          <input style={styles.input} type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input style={styles.input} placeholder="Batch Name (e.g. Batch A)" value={batchName} onChange={e => setBatchName(e.target.value)} />
          <button style={styles.addBtn} onClick={handleAdd}>Add Lecture</button>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr style={styles.thead}>
            <th style={styles.th}>Course</th>
            <th style={styles.th}>Batch</th>
            <th style={styles.th}>Instructor</th>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {lectures.map(l => (
            <tr key={l._id} style={styles.tr}>
              <td style={styles.td}>{l.course?.name}</td>
              <td style={styles.td}>{l.batchName}</td>
              <td style={styles.td}>{l.instructor?.name}</td>
              <td style={styles.td}>{new Date(l.date).toLocaleDateString()}</td>
              <td style={styles.td}>
                <button style={styles.deleteBtn} onClick={() => handleDelete(l._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  addBtn: { padding: '10px 20px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  form: { backgroundColor: '#fafafa', padding: '20px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #eee' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  error: { color: 'red', marginBottom: '10px', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { backgroundColor: '#f5f5f5' },
  th: { padding: '12px', textAlign: 'left', borderBottom: '2px solid #eee', color: '#555' },
  tr: { borderBottom: '1px solid #eee' },
  td: { padding: '12px', color: '#333' },
  deleteBtn: { padding: '5px 12px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }
}

export default Lectures