import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    isNew: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'שם מלא נדרש';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'מספר פלאפון נדרש';
    if (!formData.isNew) newErrors.isNew = 'יש לבחור אפשרות';
    if (!formData.message) newErrors.message = 'הודעה נדרשת';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const regex = /^[0-9+]*$/;
      if (!regex.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit form
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div id="contact-us" className="relative max-w-lg mx-auto p-8 bg-white bg-opacity-50 backdrop-blur-md rounded-lg shadow-md mt-40 z-50 mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center">צור קשר</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700">שם מלא</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-primary-green focus:border-transparent sm:text-base p-3"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">מספר פלאפון</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-primary-green focus:border-transparent sm:text-base p-3"
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">חדש בתחום הקריפטו?</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="isNew"
                value="yes"
                checked={formData.isNew === 'yes'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-primary-green focus:ring-primary-green"
              />
              <span className="ml-3">כן</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="isNew"
                value="no"
                checked={formData.isNew === 'no'}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-primary-green focus:ring-primary-green"
              />
              <span className="ml-3">לא</span>
            </label>
          </div>
          {errors.isNew && <p className="text-red-500 text-xs mt-1">{errors.isNew}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">הודעה</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-primary-green focus:border-transparent sm:text-base p-3"
            rows="4"
          ></textarea>
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-3 px-5 border border-transparent shadow-lg text-base font-medium rounded-lg text-white bg-gradient-to-r from-primary-green to-secondary-green hover:from-secondary-green hover:to-primary-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green transform transition-transform duration-300 hover:scale-105"
          >
            שלח
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 