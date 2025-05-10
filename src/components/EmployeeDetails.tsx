
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Database, Info } from "lucide-react";

interface EmployeeData {
  EmpID: string;
  Name: string;
  Department: string;
}

interface EmployeeDetailsProps {
  employee: EmployeeData;
}

const EmployeeDetails = ({ employee }: EmployeeDetailsProps) => {
  return (
    <Card className="mt-6 border border-green-200 bg-green-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-green-800 flex items-center gap-2">
          <Info size={18} />
          Employee Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <User size={16} />
            Name
          </Label>
          <Input
            value={employee.Name}
            readOnly
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <Database size={16} />
            Department
          </Label>
          <Input
            value={employee.Department}
            readOnly
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
