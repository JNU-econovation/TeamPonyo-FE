
import { useParams } from 'react-router'
import React, { useState } from 'react';
import './Join.css'; 

function Join() {
  const [form, setForm] = useState({
    nickname: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.username.match(/^[a-zA-Z0-9]{1,10}$/)) {
      newErrors.username = '아이디는 영어와 숫자로 10자리 이하여야 합니다.';
    }

    if (!form.password.match(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,20}$/)) {
      newErrors.password = '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~20자리여야 합니다.';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form submitted:', form);
      // 추가 로직 (ex: 서버에 데이터 전송)
    }
  };

  return (
    <div className="join-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>닉네임</label>
          <input type="text" name="nickname" value={form.nickname} onChange={handleChange} required />
        </div>
        <div>
          <label>아이디</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>비밀번호 확인</label>
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>
        <div>
          <label>이메일</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Join;