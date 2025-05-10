
import React from "react";

const EmployeeHeader = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">Employee Information Form</h1>
      <p className="mt-2 text-gray-600">
        Enter employee ID to fetch their details from the database
      </p>
    </div>
  );
};

export default EmployeeHeader;
