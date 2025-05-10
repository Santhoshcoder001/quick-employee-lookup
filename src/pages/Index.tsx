
import { useState } from "react";
import EmployeeForm from "@/components/EmployeeForm";
import EmployeeHeader from "@/components/EmployeeHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <EmployeeHeader />
        <div className="mt-8">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
};

export default Index;
