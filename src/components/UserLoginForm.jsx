import { useState } from "react";

export default function UserLoginForm({ onLogin }) {
  const [rollNumber, setRollNumber] = useState("");
  const [loader, setLoader] = useState(0);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    setLoader(1);
    e.preventDefault();
    if (rollNumber && name) {
      onLogin(rollNumber, name);
    }
  };

  return (
    <form
      className="w-[30rem] mx-auto p-4 bg-white shadow rounded"
      onSubmit={handleSubmit}
    >
      <h2 className="mb-5 mt-5 text-2xl font-bold w-full mx-auto  flex justify-center items-center">
        Login
      </h2>
      <div>
        <label className="block mb-1">Reg Number</label>
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 hover:cursor-pointer"
      >
        {loader ? "Loading..." : "Login"}
      </button>
    </form>
  );
}
