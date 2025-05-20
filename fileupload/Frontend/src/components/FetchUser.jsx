import axios from 'axios';
import React, { useEffect, useState } from 'react'

const FetchUser = () => {
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/fetch");
        console.log(response.data.users[0].firstName)
        setResponseData(response.data.users);
      } catch (error) {
        console.error("Error Fetching data");
        alert("Error fetching data");
      }
    };
    fetchCourse();
  }, []);

  return (
    <>
      {responseData.length > 0 ? (
        responseData.map((user, index) => (
          <div
            key={index}
            className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow-md"
          >
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            {user.url && (
              <div className="mt-2">
                <img
                  src={user.url}
                  alt="Uploaded preview"
                  className="w-64 h-auto rounded-lg border border-gray-600"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-white">No users found.</p>
      )}
    </>
  );
};

export default FetchUser;