export default function FormSection({
  section,
  formData,
  setFormData,
  validateSection,
  onNext,
  onPrev,
  isLast,
}) {
  const handleChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [section.sectionId]: {
        ...prev[section.sectionId],
        [fieldId]: value,
      },
    }));
  };

  const validateField = (field, value) => {
    if (
      field.required &&
      (!value || (Array.isArray(value) && value.length === 0))
    ) {
      return `${field.label} is required`;
    }
    if (field.minLength && value.length < field.minLength)
      return `${field.label} must be at least ${field.minLength} characters`;
    if (field.maxLength && value.length > field.maxLength)
      return `${field.label} must be at most ${field.maxLength} characters`;
    return null;
  };

  const handleNext = () => {
    const errors = section.fields
      .map((field) => {
        const value = formData?.[section.sectionId]?.[field.fieldId] || "";
        return validateField(field, value);
      })
      .filter(Boolean);

    if (errors.length) {
      alert(errors.join("\n"));
    } else {
      onNext();
    }
  };

  return (
    <div className="bg-gray-100 p-6 shadow-lg rounded-xl space-y-6 w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {section.title}
        </h2>
        <p className="text-gray-500">{section.description}</p>
      </div>

      {section.fields.map((field) => (
        <div key={field.fieldId} className="flex flex-col">
          <label className="font-semibold mb-2 text-gray-700">
            {field.label}
          </label>

          {field.type === "text" ||
          field.type === "email" ||
          field.type === "tel" ||
          field.type === "date" ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData?.[section.sectionId]?.[field.fieldId] || ""}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              data-testid={field.dataTestId}
            />
          ) : field.type === "textarea" ? (
            <textarea
              placeholder={field.placeholder}
              value={formData?.[section.sectionId]?.[field.fieldId] || ""}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              data-testid={field.dataTestId}
            />
          ) : field.type === "dropdown" ? (
            <select
              value={formData?.[section.sectionId]?.[field.fieldId] || ""}
              onChange={(e) => handleChange(field.fieldId, e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              data-testid={field.dataTestId}
            >
              <option value="">Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="flex gap-4">
              {field.options?.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.fieldId}
                    value={opt.value}
                    checked={
                      formData?.[section.sectionId]?.[field.fieldId] ===
                      opt.value
                    }
                    onChange={(e) =>
                      handleChange(field.fieldId, e.target.value)
                    }
                    data-testid={opt.dataTestId}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          ) : null}
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={onPrev === null}
          className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={handleNext}
          className={`${
            isLast
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white px-4 py-2 rounded-md`}
        >
          {isLast ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
