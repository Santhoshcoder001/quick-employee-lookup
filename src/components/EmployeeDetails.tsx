
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Database, Info, MapPin, Globe } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface EmployeeData {
  EmpID: string;
  Name: string;
  Department: string;
  Section1_Place1?: string;
  Section1_Place2?: string;
  Section1_Place3?: string;
  Section2_Place1?: string;
  Section2_Place2?: string;
  Section2_Place3?: string;
}

interface EmployeeDetailsProps {
  employee: EmployeeData;
  onPlaceChange: (section: string, field: string, value: string) => void;
  onSubmit: () => void;
}

const EmployeeDetails = ({ employee, onPlaceChange, onSubmit }: EmployeeDetailsProps) => {
  // List of domestic place options
  const domesticPlaceOptions = [
    "Mumbai", "Delhi", "Bengaluru", "Ahmedabad", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow",
  ];

  // List of foreign place options
  const foreignPlaceOptions = [
    "New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", 
    "Hong Kong", "Sydney", "Berlin", "Toronto", "Zurich",
  ];

  // Check if user is from Technical department
  const isTechnicalDepartment = employee.Department === "Technical";

  // Filter out already selected places for each section's dropdown
  const getAvailablePlaces = (section: string, currentField: string, options: string[]) => {
    const selectedPlaces = [];
    
    if (section === "Section1") {
      if (employee.Section1_Place1 && currentField !== "Place1") {
        selectedPlaces.push(employee.Section1_Place1);
      }
      
      if (employee.Section1_Place2 && currentField !== "Place2") {
        selectedPlaces.push(employee.Section1_Place2);
      }
      
      if (employee.Section1_Place3 && currentField !== "Place3") {
        selectedPlaces.push(employee.Section1_Place3);
      }
    } else {
      if (employee.Section2_Place1 && currentField !== "Place1") {
        selectedPlaces.push(employee.Section2_Place1);
      }
      
      if (employee.Section2_Place2 && currentField !== "Place2") {
        selectedPlaces.push(employee.Section2_Place2);
      }
      
      if (employee.Section2_Place3 && currentField !== "Place3") {
        selectedPlaces.push(employee.Section2_Place3);
      }
    }
    
    return options.filter(place => !selectedPlaces.includes(place));
  };

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
            {isTechnicalDepartment && <span className="text-xs text-red-500 ml-2">(Disabled for Technical Department)</span>}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Place 1 Selection */}
            <div className="space-y-2">
              <Label>Place 1</Label>
              <Select
                value={employee.Section1_Place1 || ""}
                onValueChange={(value) => onPlaceChange("Section1", "Place1", value)}
                disabled={isTechnicalDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 1" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section1", "Place1", domesticPlaceOptions).map((place) => (
                    <SelectItem key={`section1-place1-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Place 2 Selection */}
            <div className="space-y-2">
              <Label>Place 2</Label>
              <Select
                value={employee.Section1_Place2 || ""}
                onValueChange={(value) => onPlaceChange("Section1", "Place2", value)}
                disabled={isTechnicalDepartment || !employee.Section1_Place1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 2" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section1", "Place2", domesticPlaceOptions).map((place) => (
                    <SelectItem key={`section1-place2-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Place 3 Selection */}
            <div className="space-y-2">
              <Label>Place 3</Label>
              <Select
                value={employee.Section1_Place3 || ""}
                onValueChange={(value) => onPlaceChange("Section1", "Place3", value)}
                disabled={isTechnicalDepartment || !employee.Section1_Place2}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 3" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section1", "Place3", domesticPlaceOptions).map((place) => (
                    <SelectItem key={`section1-place3-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Section 2 - Foreign Places */}
        <div>
          <h3 className="text-md font-semibold mb-3 flex items-center gap-1.5">
            <Globe size={16} />
            Section 2 - Foreign Places
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Place 1 Selection */}
            <div className="space-y-2">
              <Label>Place 1</Label>
              <Select
                value={employee.Section2_Place1 || ""}
                onValueChange={(value) => onPlaceChange("Section2", "Place1", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 1" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section2", "Place1", foreignPlaceOptions).map((place) => (
                    <SelectItem key={`section2-place1-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Place 2 Selection */}
            <div className="space-y-2">
              <Label>Place 2</Label>
              <Select
                value={employee.Section2_Place2 || ""}
                onValueChange={(value) => onPlaceChange("Section2", "Place2", value)}
                disabled={!employee.Section2_Place1}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 2" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section2", "Place2", foreignPlaceOptions).map((place) => (
                    <SelectItem key={`section2-place2-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Place 3 Selection */}
            <div className="space-y-2">
              <Label>Place 3</Label>
              <Select
                value={employee.Section2_Place3 || ""}
                onValueChange={(value) => onPlaceChange("Section2", "Place3", value)}
                disabled={!employee.Section2_Place2}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select place 3" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailablePlaces("Section2", "Place3", foreignPlaceOptions).map((place) => (
                    <SelectItem key={`section2-place3-${place}`} value={place}>
                      {place}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
