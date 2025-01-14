
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import submissionService from '../services/submission.service';
import './SubmissionForm.css';

function SubmissionForm({ onSubmissionComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    company: '',
    questions: [''],
  });
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData((prevState) => ({
      ...prevState,
      questions: newQuestions,
    }));
  };

  const addQuestion = () => {
    setFormData((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, ''],
    }));
  };

  const removeQuestion = (index) => {
    if (formData.questions.length > 1) {
      const newQuestions = formData.questions.filter((_, i) => i !== index);
      setFormData((prevState) => ({
        ...prevState,
        questions: newQuestions,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('Please login to submit an experience');
      navigate('/login');
      return;
    }

    try {
      const response = await submissionService.createSubmission(formData);
      setFormData({
        name: '',
        country: '',
        company: '',
        questions: [''],
      });
      if (onSubmissionComplete) {
        onSubmissionComplete();
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Session expired. Please login again');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  return (
    <div className="submission-form">
      <h2>Submit Interview Experience</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={onChange}
            placeholder="Your country"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={onChange}
            placeholder="Company name"
            required
          />
        </div>
        <div className="questions-container form-group">
          <h3>Interview Questions</h3>
          {formData.questions.map((question, index) => (
            <div key={index} className="question-group">
              <div className="input-button-wrapper">
              <input
                type="text"
                value={question}
                onChange={(e) => onQuestionChange(index, e.target.value)}
                placeholder={`Question ${index + 1}`}
                required
              />
              {formData.questions.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger remove-btn"
                  onClick={() => removeQuestion(index)}
                >
                  Remove
                </button>
              )}
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-secondary" onClick={addQuestion}>
            Add Question
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmissionForm; 