import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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

  function validateImage(event: any) {
    // валидирует только размер
    const file = event.target.files[0]; // загруженный файл картинки
    if (file.size >= 1048576) {
      return alert('Max image size is 1mb');
    }
    setImage(file);
    const preview: React.SetStateAction<any> = URL.createObjectURL(file);
    setImagePreview(preview); // ставим на превью
  }

  async function uploadImage(image: string) {
    // загрузка картинки в хранилище cloudinary
    const data = new FormData(); // key - value
    const uploadPreset: string = process.env.REACT_APP_UPLOAD_PRESET!;
    const cloudinaryUrl: string = process.env.REACT_APP_CLOUDINARY_FETCH!;
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
      console.log(urlData.url); // по этой ссылке лежит картинка в cloudinary
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!image) return alert('Wrong format! Please, upload an image');
    const url = await uploadImage(image);
    // signup logic
  }

  // id="image-upload" - чтобы открывался проводник
  // accept="image/*" - в проводнике только картинки
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
            type="email"
            placeholder="Enter name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
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
        <Button type="submit">
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
