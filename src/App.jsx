import { useState } from "react";
import { createUser, getForm } from "./api/api";
import UserLoginForm from "./components/UserLoginForm";
import DynamicForm from "./components/DynamicForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formStructure, setFormStructure] = useState(null);

  const handleLogin = async (rollNumber, name) => {
    try {
      await createUser(rollNumber, name);
      const formResp = await getForm(rollNumber);
      setFormStructure(formResp.form);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {!isLoggedIn ? (
        <UserLoginForm onLogin={handleLogin} />
      ) : (
        formStructure && <DynamicForm formStructure={formStructure} />
      )}
    </div>
  );
}

export default App;
