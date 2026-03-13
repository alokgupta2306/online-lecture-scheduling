import { useState, useEffect } from 'react'
import axios from 'axios'

function Courses() {
  const [courses, setCourses] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => { fetchCourses() }, [])

  const fetchCourses = () => {
    axios.get('http://localhost:5000/api/courses', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCourses(res.data))
      .catch(err => console.log(err))
  }

  const handleAdd = async () => {
    if (!name || !description) return setError('Please fill all fields!')
    setLoading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('level', level)
      formData.append('description', description)
      if (image) formData.append('image', image)

      await axios.post('http://localhost:5000/api/courses', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      setName(''); setLevel('Beginner'); setDescription(''); setImage(null)
      setShowForm(false)
      fetchCourses()
    } catch (err) {
      setError('Failed to add course!')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course?')) return
    await axios.delete(`http://localhost:5000/api/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchCourses()
  }

  return (
    <div>
      <div style={styles.header}>
        <h2 style={styles.heading}>All Courses</h2>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>Add New Course</h3>
          {error && <p style={styles.error}>{error}</p>}
          <input style={styles.input} placeholder="Course Name" value={name} onChange={e => setName(e.target.value)} />
          <select style={styles.input} value={level} onChange={e => setLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <textarea style={styles.textarea} placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
          <label style={styles.fileLabel}>
            Course Image (optional)
            <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} style={{marginTop:'8px'}} />
          </label>
          <button style={styles.submitBtn} onClick={handleAdd} disabled={loading}>
            {loading ? 'Adding...' : 'Add Course'}
          </button>
        </div>
      )}

      <div style={styles.grid}>
        {courses.map(course => (
          <div key={course._id} style={styles.card}>
            {course.image
              ? <img src={`http://localhost:5000/uploads/${course.image}`} alt={course.name} style={styles.img} />
              : <div style={styles.noImg}>No Image</div>
            }
            <div style={styles.cardBody}>
              <div style={styles.cardTop}>
                <h3 style={styles.courseName}>{course.name}</h3>
                <span style={styles.levelBadge}>{course.level}</span>
              </div>
              <p style={styles.desc}>{course.description}</p>
              <button style={styles.deleteBtn} onClick={() => handleDelete(course._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  heading: { margin: 0, color: '#333' },
  addBtn: { padding: '10px 20px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  form: { backgroundColor: '#fafafa', padding: '20px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #eee' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', minHeight: '80px', boxSizing: 'border-box' },
  fileLabel: { display: 'block', marginBottom: '12px', fontSize: '14px', color: '#555' },
  submitBtn: { padding: '10px 25px', backgroundColor: '#e85d04', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden', backgroundColor: 'white' },
  img: { width: '100%', height: '160px', objectFit: 'cover' },
  noImg: { width: '100%', height: '160px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' },
  cardBody: { padding: '15px' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  courseName: { margin: 0, color: '#333', fontSize: '16px' },
  levelBadge: { padding: '3px 10px', backgroundColor: '#fff3e0', color: '#e85d04', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' },
  desc: { color: '#777', fontSize: '13px', marginBottom: '12px' },
  deleteBtn: { padding: '6px 14px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }
}

export default Courses