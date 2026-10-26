
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_URL =
  'https://YOUR-RENDER-SERVICE.onrender.com/api/question-papers';

function App() {
  const [papers, setPapers] = useState([]);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  const [form, setForm] = useState({
    subject: '',
    year: '',
    semester: '',
    regulation: '',
    examType: '',
    fileUrl: ''
  });

  async function loadPapers() {
    try {
      const response = await axios.get(API_URL);
      setPapers(response.data);
    } catch (error) {
      setMessage('Could not load question papers.');
    }
  }

  useEffect(() => {
    loadPapers();
  }, []);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('Saving question paper...');

    try {
      const response = await axios.post(API_URL, {
        ...form,
        year: Number(form.year)
      });

      setPapers((previous) => [...previous, response.data]);

      setForm({
        subject: '',
        year: '',
        semester: '',
        regulation: '',
        examType: '',
        fileUrl: ''
      });

      setMessage('Question paper added successfully!');
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          'Failed to add question paper.'
      );
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this question paper?'
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setPapers((previous) =>
        previous.filter((paper) => paper._id !== id)
      );

      setMessage('Question paper deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete question paper.');
    }
  }

  const filteredPapers = papers.filter((paper) => {
    const matchesSubject = paper.subject
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesYear =
      yearFilter === '' ||
      String(paper.year) === yearFilter;

    const matchesSemester =
      semesterFilter === '' ||
      String(paper.semester) === semesterFilter;

    return matchesSubject && matchesYear && matchesSemester;
  });

  return (
    <main className="container">
      <header>
        <h1>Previous Question Paper Repository</h1>
        <p>Find and organize your previous examination papers.</p>
      </header>

      <div className="layout">
        <section className="panel">
          <h2>Add Question Paper</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="subject"
              placeholder="Subject name"
              value={form.subject}
              onChange={handleChange}
              required
            />

            <input
              name="year"
              type="number"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              required
            />

            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
            >
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={String(sem)}>
                  Semester {sem}
                </option>
              ))}
            </select>

            <input
              name="regulation"
              placeholder="Regulation (e.g. R20)"
              value={form.regulation}
              onChange={handleChange}
              required
            />

            <select
              name="examType"
              value={form.examType}
              onChange={handleChange}
              required
            >
              <option value="">Select Exam Type</option>
              <option value="Mid-1">Mid-1 Examination</option>
              <option value="Mid-2">Mid-2 Examination</option>
              <option value="Semester End">
                Semester End Examination
              </option>
              <option value="Supplementary">
                Supplementary Examination
              </option>
            </select>

            <input
              name="fileUrl"
              type="url"
              placeholder="PDF URL"
              value={form.fileUrl}
              onChange={handleChange}
              required
            />

            <button type="submit">Add Question Paper</button>
          </form>

          {message && <p className="message">{message}</p>}
        </section>

        <section className="panel">
          <h2>
            Available Question Papers ({filteredPapers.length})
          </h2>

          <input
            type="text"
            placeholder="Search by subject..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <div style={{ marginTop: '12px' }}>
            <input
              type="number"
              placeholder="Filter by year"
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
            />
          </div>

          <div style={{ marginTop: '12px' }}>
            <select
              value={semesterFilter}
              onChange={(event) =>
                setSemesterFilter(event.target.value)
              }
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={String(sem)}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearch('');
              setYearFilter('');
              setSemesterFilter('');
              setMessage('');
            }}
            style={{ marginTop: '12px' }}
          >
            Reset Filters
          </button>

          {filteredPapers.length === 0 && (
            <p>No matching question papers found.</p>
          )}

          {filteredPapers.map((paper) => (
            <article className="paper-card" key={paper._id}>
              <h3>{paper.subject}</h3>

              <p><strong>Year:</strong> {paper.year}</p>
              <p><strong>Semester:</strong> {paper.semester}</p>
              <p><strong>Regulation:</strong> {paper.regulation}</p>
              <p><strong>Exam Type:</strong> {paper.examType}</p>

              <a
                href={paper.fileUrl}
                target="_blank"
                rel="noreferrer"
              >
                View Question Paper ↗
              </a>

              <button
                type="button"
                onClick={() => handleDelete(paper._id)}
                style={{
                  display: 'block',
                  marginTop: '12px',
                  background: '#dc2626'
                }}
              >
                Delete
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export default App;
