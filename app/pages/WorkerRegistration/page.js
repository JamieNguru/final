'use client';

import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { 
  BaseFormLayout, 
  Section, 
  FormInput, 
  FileUpload, 
  RadioButton, 
  Checkbox 
} from '../../components/forms';

import { useRegistrationForm } from '../../Hooks/useRegistrationForm';

export default function WorkerRegistrationForm() {
  const [hasCert, setHasCert] = useState(false);
  const [criminalRecord, setCriminalRecord] = useState('No');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [hoveredUpload, setHoveredUpload] = useState(null);

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleFileChange,
    validate,
    setFormData,
    setErrors,
    setIsSubmitting
  } = useRegistrationForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    occupation: '',
    experience: '',
    education: '',
    degree: '',
    field: '',
    completionYear: '',
    certificationName: '',
    issuingOrg: '',
    certificationDate: '',
    explanation: '',
    confirmInfo: false,
    consent: false,
    idFront: null,
    idBack: null,
    cv: null,
    certificate: null
  });

  const addSkill = () => {
    if (skillInput && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);

      try {
        const payload = new FormData();

        payload.append('name', `${formData.firstName} ${formData.lastName}`);
        payload.append('firstName', formData.firstName);
        payload.append('lastName', formData.lastName);
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('dob', formData.dob);
        payload.append('gender', formData.gender);
        payload.append('street', formData.street);
        payload.append('city', formData.city);
        payload.append('state', formData.state);
        payload.append('zip', formData.zip);
        payload.append('country', formData.country);
        payload.append('occupation', formData.occupation);
        payload.append('experience', formData.experience || '0');
        payload.append('education', formData.education);
        payload.append('degree', formData.degree);
        payload.append('field', formData.field);
        payload.append('completionYear', formData.completionYear);
        payload.append('hasCert', hasCert);
        payload.append('certificationName', formData.certificationName);
        payload.append('issuingOrg', formData.issuingOrg);
        payload.append('certificationDate', formData.certificationDate);
        payload.append('criminalRecord', criminalRecord);
        payload.append('explanation', formData.explanation);
        payload.append('confirmInfo', formData.confirmInfo);
        payload.append('consent', formData.consent);

        skills.forEach((skill, i) => {
          payload.append(`skills[${i}]`, skill);
        });

        if (formData.cv) {
          payload.append('cv', formData.cv);
        }

        if (formData.idFront) {
          payload.append('idFront', formData.idFront);
        }

        if (formData.idBack) {
          payload.append('idBack', formData.idBack);
        }

        if (formData.certificate) {
          payload.append('certificate', formData.certificate);
        }

        const response = await fetch('http://localhost:5000/api/workers', {
          method: 'POST',
          body: payload,
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful!');
          console.log(data);
        } else {
          alert(data.message || 'Something went wrong.');
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <BaseFormLayout
      title="Worker Registration"
      description="Join our network of skilled professionals"
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >

      {/* Personal Information Section */}
      <Section title="Personal Information" icon="👤">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name*"
            error={errors.firstName}
            icon="user"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name*"
            error={errors.lastName}
            icon="user"
            className="text-black placeholder:text-black"
          />
          <FormInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address*"
            error={errors.email}
            icon="email"
            className="text-black placeholder:text-black"
          />
          <div>
            <PhoneInput
              country={'ke'}
              value={formData.phone}
              onChange={(phone) => setFormData({ ...formData, phone })}
              placeholder="Phone Number*"
              inputClass="!w-full !h-11 !pl-14 !rounded-lg !border-gray-300 !focus:ring-2 !focus:ring-blue-500 !focus:border-transparent !text-black placeholder:!text-black"
              dropdownClass="!rounded-lg !border !border-gray-200 !shadow-lg"
              buttonClass="!rounded-l-lg !bg-gray-100 !border-r !border-gray-300"
              containerClass={`!w-full ${errors.phone ? '!border-red-500 !rounded-lg' : ''}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black appearance-none"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          >
            <option value="" disabled hidden>Gender*</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </Section>

      {/* Address Information */}
      <Section title="Address Information" icon="📍">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Street Address*"
            error={errors.street}
            icon="location"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City*"
            error={errors.city}
            icon="city"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State/Province*"
            error={errors.state}
            icon="region"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Zip/Postal Code*"
            error={errors.zip}
            icon="zip"
            className="text-black placeholder:text-black"
          />
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          >
            <option value="" disabled hidden>Country*</option>
            <option value="kenya">Kenya</option>
            <option value="uganda">Uganda</option>
            <option value="tanzania">Tanzania</option>
          </select>
        </div>
      </Section>

      {/* Work Information */}
      <Section title="Work Information" icon="💼">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Primary Occupation*"
            error={errors.occupation}
            icon="briefcase"
            className="text-black placeholder:text-black"
          />
          <FormInput
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Years of Experience*"
            error={errors.experience}
            icon="calendar"
            className="text-black placeholder:text-black"
          />
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills" icon="🛠️">
        <div className="flex gap-4 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Enter a skill"
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black placeholder:text-black"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm flex items-center"
            >
              {skill}
              <button
                type="button"
                className="ml-2 text-red-500 hover:text-red-700"
                onClick={() => removeSkill(skill)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
      </Section>

      {/* Education */}
      <Section title="Education" icon="🎓">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Institution Name"
            icon="school"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree or Certificate"
            icon="certificate"
            className="text-black placeholder:text-black"
          />
          <FormInput
            name="field"
            value={formData.field}
            onChange={handleChange}
            placeholder="Field of Study"
            icon="book"
            className="text-black placeholder:text-black"
          />
          <input
            type="month"
            name="completionYear"
            value={formData.completionYear}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
          />
        </div>
      </Section>

      {/* Certifications */}
      <Section title="Certifications" icon="📜">
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Do you have any professional certifications?
          </label>
          <div className="flex gap-6">
            <RadioButton
              name="hasCert"
              value="yes"
              label="Yes"
              checked={hasCert}
              onChange={() => setHasCert(true)}
            />
            <RadioButton
              name="hasCert"
              value="no"
              label="No"
              checked={!hasCert}
              onChange={() => setHasCert(false)}
            />
          </div>
        </div>
        {hasCert && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              name="certificationName"
              value={formData.certificationName}
              onChange={handleChange}
              placeholder="Certification Name"
              icon="badge"
              className="text-black placeholder:text-black"
            />
            <FormInput
              name="issuingOrg"
              value={formData.issuingOrg}
              onChange={handleChange}
              placeholder="Issuing Organization"
              icon="organization"
              className="text-black placeholder:text-black"
            />
            <input
              type="month"
              name="certificationDate"
              value={formData.certificationDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
            />
            <FileUpload
              label="Upload Certificate"
              side="certificate"
              onChange={(e) => handleFileChange(e, 'certificate')}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        )}
      </Section>

      {/* Upload CV */}
      <Section title="Upload CV" icon="📄">
        <FileUpload
          label="CV/Resume (PDF, DOC, DOCX)"
          side="cv"
          onChange={(e) => handleFileChange(e, 'cv')}
          accept=".pdf,.doc,.docx"
        />
        <p className="text-xs text-gray-500 mt-1">
          Accepted formats: PDF, DOC, DOCX (Max: 5MB)
        </p>
      </Section>

      {/* ID Verification */}
      <Section title="ID Verification" icon="🪪">
        <p className="mb-4 text-sm text-gray-600">
          Upload both sides of your government-issued ID
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FileUpload
            label="Front Side of ID*"
            side="idFront"
            onChange={(e) => handleFileChange(e, 'idFront')}
            isHovered={hoveredUpload === 'front'}
            onMouseEnter={() => setHoveredUpload('front')}
            onMouseLeave={() => setHoveredUpload(null)}
            error={errors.idFront}
          />
          <FileUpload
            label="Back Side of ID*"
            side="idBack"
            onChange={(e) => handleFileChange(e, 'idBack')}
            isHovered={hoveredUpload === 'back'}
            onMouseEnter={() => setHoveredUpload('back')}
            onMouseLeave={() => setHoveredUpload(null)}
            error={errors.idBack}
          />
        </div>
      </Section>

      {/* Background Declaration */}
      <Section title="Background Declaration" icon="🔍">
        <div className="space-y-3">
          <label className="block text-gray-700 font-medium">
            Do you have any criminal record?*
          </label>
          <div className="flex flex-wrap gap-4">
            <RadioButton
              name="criminalRecord"
              value="no"
              label="No"
              checked={criminalRecord === "No"}
              onChange={() => setCriminalRecord("No")}
            />
            <RadioButton
              name="criminalRecord"
              value="yes"
              label="Yes"
              checked={criminalRecord === "Yes"}
              onChange={() => setCriminalRecord("Yes")}
            />
          </div>
          {criminalRecord === "Yes" && (
            <div className="mt-3">
              <label className="block text-gray-700 font-medium mb-1">
                Please provide details of the offence*
              </label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., Minor traffic offence in 2020"
                className="w-full px-4 py-2 text-black font-medium rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-black"
              />
            </div>
          )}
        </div>
      </Section>

      {/* Terms & Conditions */}
      <Section title="Terms & Conditions" icon="📝">
        <div className="space-y-3">
          <Checkbox
            name="confirmInfo"
            checked={formData.confirmInfo}
            onChange={handleChange}
            label="I certify that all information provided is accurate and complete."
            error={errors.confirmInfo}
          />
          <Checkbox
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            label="I agree to the Terms of Service and Privacy Policy."
            error={errors.consent}
          />
        </div>
      </Section>

    </BaseFormLayout>
  );
}

