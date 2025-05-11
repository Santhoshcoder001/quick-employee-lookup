
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Database, Info, MapPin, Globe } from "lucide-react";
import PlaceOptionGrid from "./PlaceOptionGrid";

interface EmployeeData {
  EmpID: string;
  Name: string;
  Department: string;
  Section1_option?: string;
  Section2_option?: string;
}

interface EmployeeDetailsProps {
  employee: EmployeeData;
  onOptionSelect: (section: string, optionId: string) => void;
  onSubmit: () => void;
}

const EmployeeDetails = ({ employee, onOptionSelect, onSubmit }: EmployeeDetailsProps) => {
  // List of domestic place options organized in sets
  const domesticOptionSets = [
    {
      id: "option1",
      name: "Option 1",
      places: [
        { id: "place1", name: "Mumbai" },
        { id: "place2", name: "Delhi" },
        { id: "place3", name: "Kolkata" },
      ]
    },
    {
      id: "option2",
      name: "Option 2",
      places: [
        { id: "place1", name: "Bengaluru" },
        { id: "place2", name: "Chennai" },
        { id: "place3", name: "Hyderabad" },
      ]
    },
    {
      id: "option3",
      name: "Option 3",
      places: [
        { id: "place1", name: "Ahmedabad" },
        { id: "place2", name: "Pune" },
        { id: "place3", name: "Jaipur" },
      ]
    }
  ];

  // List of foreign place options organized in sets
  const foreignOptionSets = [
    {
      id: "option1",
      name: "Option 1",
      places: [
        { id: "place1", name: "New York" },
        { id: "place2", name: "London" },
        { id: "place3", name: "Tokyo" },
      ]
    },
    {
      id: "option2",
      name: "Option 2",
      places: [
        { id: "place1", name: "Paris" },
        { id: "place2", name: "Dubai" },
        { id: "place3", name: "Singapore" },
      ]
    },
    {
      id: "option3",
      name: "Option 3",
      places: [
        { id: "place1", name: "Berlin" },
        { id: "place2", name: "Sydney" },
        { id: "place3", name: "Toronto" },
      ]
    }
  ];

  // Check if user is from Technical department
  const isTechnicalDepartment = employee.Department === "Technical";

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

        {/* Section 1 - Domestic Places */}
        <div className={`${isTechnicalDepartment ? 'opacity-50' : ''}`}>
          <h3 className="text-md font-semibold mb-3 flex items-center gap-1.5">
            <MapPin size={16} />
            Section 1 - Domestic Places
            {isTechnicalDepartment && (
              <span className="text-xs text-red-500 ml-2">(Disabled for Technical Department)</span>
            )}
          </h3>
          
          <PlaceOptionGrid
            title="Select one option for domestic places"
            optionSets={domesticOptionSets}
            selectedOption={employee.Section1_option || null}
            onOptionSelect={(optionId) => onOptionSelect("Section1", optionId)}
            disabled={isTechnicalDepartment}
          />
        </div>

        {/* Section 2 - Foreign Places */}
        <div>
          <h3 className="text-md font-semibold mb-3 flex items-center gap-1.5">
            <Globe size={16} />
            Section 2 - Foreign Places
          </h3>
          
          <PlaceOptionGrid
            title="Select one option for foreign places"
            optionSets={foreignOptionSets}
            selectedOption={employee.Section2_option || null}
            onOptionSelect={(optionId) => onOptionSelect("Section2", optionId)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
