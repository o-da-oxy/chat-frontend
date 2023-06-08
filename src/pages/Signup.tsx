import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../state/appApi';
import defaultAvatar from '../assets/flower_avatar.png';
import '../styles/Signup.css';

function Signup() {
  // form states for the backend
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // image upload states
  const [image, setImage] = useState(null); // validateImage(), uploadImage()
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // картинка при регистрации
  // rtk query
  const [signupUser] = useSignupUserMutation();
  // navigation after signing up
  const navigate = useNavigate();

  function validateImage(event: any) {
    const file = event.target.files[0];
    if (file.size >= 1048576) {
      return alert('Max image size is 1mb');
    }
    setImage(file);
    const preview: React.SetStateAction<any> = URL.createObjectURL(file);
    setImagePreview(preview);
  }

  async function uploadImage(image: string) {
    const data = new FormData();
    const uploadPreset = 'd59pcjpj';
    const cloudinaryUrl =
      'https://api.cloudinary.com/v1_1/dteevaoxv/image/upload';
    data.append('file', image);
    data.append('upload_preset', uploadPreset);
    try {
      setUploadingImg(true);
      const res = await fetch(cloudinaryUrl, {
        method: 'post',
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      console.log(urlData.url);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!image) return alert('Wrong format! Please, upload an image');
    const url = await uploadImage(image);
    signupUser({ picture: url, name, email, password }).then((res: any) => {
      try {
        if (res.data) {
          navigate('/chat');
          console.log(res.data);
        } else if (res.error) {
          console.log(res.error);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <Container>
      <Form
        style={{ width: '80%', maxWidth: 500, margin: '0 auto' }}
        onSubmit={handleSignup}
      >
        <h2 className="text-center">Create an account</h2>
        <div className="signup-avatar_container">
          <img src={imagePreview || defaultAvatar} className="signup-avatar" />
          <label htmlFor="image-upload" className="image-upload-label">
            <i className="fas fa-plus-circle add-picture-icon" />
          </label>
          <input
            type="file"
            id="image-upload"
            hidden
            accept="image/*"
            onChange={validateImage}
          />
        </div>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {uploadingImg ? 'Signing you up...' : 'Sign up'}
        </Button>
        <div className="py-3">
          <p className="text-center">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </Form>
    </Container>
  );
}

export default Signup;
