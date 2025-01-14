import { useState, useEffect } from 'react';
import submissionService from '../services/submission.service';
import './MySubmissions.css';

function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMySubmissions = async () => {
      try {
        const data = await submissionService.getUserSubmissions();
        setSubmissions(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch your submissions');
        setLoading(false);
      }
    };

    fetchMySubmissions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-submissions">
      <h2>My Submissions</h2>
      {submissions.length === 0 ? (
        <p>You haven't made any submissions yet.</p>
      ) : (
        <div className="submissions-grid">
          {submissions.map((submission) => (
            <div key={submission._id} className="submission-card">
              <h3>{submission.company}</h3>
              <p>Name: {submission.name}</p>
              <p>Country: {submission.country}</p>
              <div className="questions">
                <h4>Interview Questions:</h4>
                <ul>
                  {submission.questions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
              <p className="submission-date">
                Submitted on: {new Date(submission.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySubmissions; 