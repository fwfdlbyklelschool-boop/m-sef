
import React, { useState } from 'react';
import { UserProfile } from '../types';
import Button from './common/Button';
import Input from './common/Input';

interface SignUpFormProps {
  onSubmit: (data: Omit<UserProfile, 'interests' | 'answers'>) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.gender && formData.age && formData.email) {
      onSubmit({
        ...formData,
        age: parseInt(formData.age, 10),
      });
    } else {
      alert("Please fill out all required fields.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-cyan-500/50 backdrop-blur-sm rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input name="name" type="text" placeholder="User Name" value={formData.name} onChange={handleChange} required />
        <div className="flex space-x-4">
          <div className="w-1/2">
            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition">
              <option value="" disabled>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="w-1/2">
            <Input name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} required />
          </div>
        </div>
        <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <Input name="phone" type="tel" placeholder="Phone Number (Optional)" value={formData.phone} onChange={handleChange} />
        <div className="pt-4">
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
