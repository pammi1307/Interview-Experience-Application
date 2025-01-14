import { useState, useEffect } from 'react';
import submissionService from '../services/submission.service';
import SubmissionForm from '../components/SubmissionForm';
import './Home.css';

function Home() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSubmissions = async () => {
    try {
      const data = await submissionService.getAllSubmissions(page);
      setSubmissions(data.submissions);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch submissions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [page]);

  if (loading) {
    return <div><h3>Loading...</h3></div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home">
      <SubmissionForm onSubmissionComplete={fetchSubmissions} />
      <div className="submissions-list">
        <h2>Recent Submissions</h2>
        {submissions.map((submission) => (
          <div key={submission._id} className="submission-card">
            <h3>{submission.company}</h3>
            <p>By: {submission.name}</p>
            <p>Country: {submission.country}</p>
            <div className="questions">
              <h4>Interview Questions:</h4>
              <ul>
                {submission.questions.map((question, index) => (
                  <li key={index}>
                    <p>{question}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="btn"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="btn"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home; 