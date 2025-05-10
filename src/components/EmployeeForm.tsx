
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import EmployeeDetails from "./EmployeeDetails";

interface EmployeeData {
  EmpID: string;
  Name: string;
  Department: string;
  Place1?: string;
  Place2?: string;
  Place3?: string;
}

const EmployeeForm = () => {
  const [empId, setEmpId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const { toast } = useToast();

  // This function would normally fetch from your Flask backend
  // For now, we'll mock the API call
  const fetchEmployeeDetails = async (id: string) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would be your actual API endpoint
      // const response = await fetch(`http://localhost:5000/api/employee?emp_id=${id}`);
      
      // For demo purposes, we'll simulate an API call with mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate network delay
      
      // Simulate API response based on the ID
      if (id === "E001") {
        return {
          EmpID: "E001",
          Name: "John Doe",
          Department: "Engineering"
        };
      } else if (id === "E002") {
        return {
          EmpID: "E002",
          Name: "Jane Smith",
          Department: "Marketing"
        };
      } else if (id === "E003") {
        return {
          EmpID: "E003",
          Name: "Robert Johnson",
          Department: "Finance"
        };
      } else {
        throw new Error("Employee not found");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceChange = (field: string, value: string) => {
    if (employeeData) {
      setEmployeeData({
        ...employeeData,
        [field]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!empId.trim()) {
      toast({
        title: "Error",
        description: "Please enter an employee ID",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = await fetchEmployeeDetails(empId);
      setEmployeeData(data);
      toast({
        title: "Success",
        description: "Employee details fetched successfully",
      });
    } catch (error) {
      setEmployeeData(null);
      toast({
        title: "Error",
        description: "Employee not found. Please check the ID and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Enter Employee ID</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="empId">Employee ID</Label>
            <div className="flex gap-2">
              <Input
                id="empId"
                placeholder="Enter ID (try E001, E002, or E003)"
                value={empId}
                onChange={(e) => setEmpId(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                {isLoading ? "Loading..." : (
                  <>
                    <Search size={18} />
                    Fetch
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {employeeData && (
            <EmployeeDetails 
              employee={employeeData} 
              onPlaceChange={handlePlaceChange}
            />
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
