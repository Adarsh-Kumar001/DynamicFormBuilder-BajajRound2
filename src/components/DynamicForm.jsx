import { useState } from "react";
import FormSection from "./FormSection";

export default function DynamicForm({ formStructure }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = () => {
    if (currentSection < formStructure.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
    } else {
      console.log("Form Data:", formData);
      alert("Form submitted! Check console for form data.");
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  const section = formStructure.sections[currentSection];

  return (
    <div className="mx-auto p-6 bg-blue-100 w-full shadow rounded">
      <h1 className="text-2xl font-bold mb-4 mx-auto flex justify-center ">
        {formStructure.formTitle}
      </h1>
      <FormSection
        section={section}
        formData={formData}
        setFormData={setFormData}
        onNext={handleNext}
        onPrev={currentSection > 0 ? handlePrev : null}
        isLast={currentSection === formStructure.sections.length - 1}
      />
    </div>
  );
}
