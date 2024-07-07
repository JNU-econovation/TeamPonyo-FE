import React from 'react'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router'

const Signup = () => {
  const { joinId } = useParams();
  const navigate = useNavigate();  // 페이지 이동을 위한 훅
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // 여기서 서버로 데이터를 전송하거나 다른 처리를 수행

    // 회원가입이 완료되면 다른 페이지로 이동
    navigate('/welcome');
  };

  return (
    <div>
      <h1>Signup {joinId} 입니다.</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
