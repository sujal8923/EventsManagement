import React, { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'; // Import EyeIcon and EyeSlashIcon

function FormModal({ isOpen, onClose, onSubmit, fields, initialData = {}, title = "Form" }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  useEffect(() => {
    setFormData(initialData || {});
    setErrorMsg('');
    setShowPassword(false); // Reset password visibility when modal opens/data changes
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    for (const field of fields) {
      if (field.required && (formData[field.name] === undefined || formData[field.name] === '')) {
        setErrorMsg(`Please fill in the '${field.label}' field.`);
        return;
      }
    }
    onSubmit(formData);
  };

  const inputStyle =
    'w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all';
  const textareaStyle =
    'w-full p-3 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-md placeholder-gray-400 transition-all min-h-[100px]';

  return (
    // Modal Overlay - Changed bg-black bg-opacity-50 to bg-gray-200 bg-opacity-75 for whitish-gray
    <div className="fixed inset-0 bg-gray-200 bg-opacity-75 flex justify-center items-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close"
        >
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </button>

        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">{title}</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="relative"> {/* Added relative for icon positioning */}
              <label htmlFor={field.name} className="block text-gray-700 text-sm font-medium mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleChange}
                  className={textareaStyle}
                  placeholder={field.label}
                  required={field.required}
                ></textarea>
              ) : (
                <>
                  <input
                    type={field.type === 'password' && showPassword ? 'text' : field.type} // Toggle type for password
                    id={field.name}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    className={inputStyle}
                    placeholder={field.label}
                    required={field.required}
                  />
                  {field.type === 'password' && ( // Show eye icon only for password fields
                    <button
                      type="button" // Important: type="button" to prevent form submission
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 mt-3 text-gray-500 hover:text-gray-700" // Adjust mt-3 to align with input
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </>
              )}
            </div>
          ))}

          {errorMsg && (
            <p className="text-red-500 text-sm font-medium text-center">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormModal;
