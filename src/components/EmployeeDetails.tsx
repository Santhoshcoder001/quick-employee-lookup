
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Database, Info, MapPin } from "lucide-react";
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
  Place1?: string;
  Place2?: string;
  Place3?: string;
}

interface EmployeeDetailsProps {
  employee: EmployeeData;
  onPlaceChange: (field: string, value: string) => void;
}

const EmployeeDetails = ({ employee, onPlaceChange }: EmployeeDetailsProps) => {
  // List of place options from the Excel sheet
  const placeOptions = [
    // Option1 column
    "Mumbai", "Delhi", "Bengaluru", "Ahmedabad", "Hyderabad", "Chennai", 
    "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow",
    // Option2 column
    "Visakhapatnam", "Vadodara", "Firozabad", "Ludhiana", "Rajkot", "Agra",
    "Siliguri", "Nashik", "Patiala", "Kalyan-Dombivali", "Jhansi",
    // Option3 column
    "Sangli", "Loni", "Patna", "Pondicherry", "Nellore", "Jammu", 
    "Raurkela", "Mangaluru", "Tirunelveli", "Gaya", "Tiruppur"
  ];

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

        {/* Place 1 Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <MapPin size={16} />
            Place 1
          </Label>
          <Select
            value={employee.Place1 || ""}
            onValueChange={(value) => onPlaceChange("Place1", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select place 1" />
            </SelectTrigger>
            <SelectContent>
              {placeOptions.map((place) => (
                <SelectItem key={`place1-${place}`} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Place 2 Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <MapPin size={16} />
            Place 2
          </Label>
          <Select
            value={employee.Place2 || ""}
            onValueChange={(value) => onPlaceChange("Place2", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select place 2" />
            </SelectTrigger>
            <SelectContent>
              {placeOptions.map((place) => (
                <SelectItem key={`place2-${place}`} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Place 3 Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5">
            <MapPin size={16} />
            Place 3
          </Label>
          <Select
            value={employee.Place3 || ""}
            onValueChange={(value) => onPlaceChange("Place3", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select place 3" />
            </SelectTrigger>
            <SelectContent>
              {placeOptions.map((place) => (
                <SelectItem key={`place3-${place}`} value={place}>
                  {place}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeDetails;
