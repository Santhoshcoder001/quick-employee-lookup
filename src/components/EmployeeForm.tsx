import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Send } from "lucide-react";
import EmployeeDetails from "./EmployeeDetails";

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

const EmployeeForm = () => {
  const [empId, setEmpId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const { toast } = useToast();

  // This function would normally fetch from your backend
  const fetchEmployeeDetails = async (id: string) => {
    setIsLoading(true);
    
    try {
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
          Department: "Technical"
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

  const handlePlaceChange = (section: string, field: string, value: string) => {
    if (employeeData) {
      setEmployeeData({
        ...employeeData,
        [`${section}_${field}`]: value
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

  const submitToGoogleSheet = async () => {
    if (!employeeData) return;

    setIsSubmitting(true);

    const isTechnicalDepartment = employeeData.Department === "Technical";

    // Check if required fields are filled
    if (!isFormValid(employeeData, isTechnicalDepartment)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real application, this would call your API to submit to Google Sheets
      await new Promise(resolve => setTimeout(resolve, 1200)); // simulate network delay

      // Prepare data for submission
      const submissionData = {
        userId: employeeData.EmpID,
        department: employeeData.Department,
        section1_place1: isTechnicalDepartment ? "N/A" : employeeData.Section1_Place1,
        section1_place2: isTechnicalDepartment ? "N/A" : employeeData.Section1_Place2,
        section1_place3: isTechnicalDepartment ? "N/A" : employeeData.Section1_Place3,
        section2_place1: employeeData.Section2_Place1,
        section2_place2: employeeData.Section2_Place2,
        section2_place3: employeeData.Section2_Place3,
        timestamp: new Date().toISOString()
      };

      console.log("Submitting to Google Sheets:", submissionData);

      // In a real application, you would send this data to your backend
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(submissionData),
      // });

      toast({
        title: "Success",
        description: "Your preferences have been submitted successfully!",
      });

      // Optional: Reset form or keep data and allow modifications
    } catch (error) {
      console.error("Error submitting data:", error);
      toast({
        title: "Error",
        description: "Failed to submit data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validation function
  const isFormValid = (data: EmployeeData, isTechnical: boolean) => {
    if (isTechnical) {
      // For Technical department, only Section 2 is required
      return (
        !!data.Section2_Place1 &&
        !!data.Section2_Place2 &&
        !!data.Section2_Place3
      );
    } else {
      // For other departments, both sections are required
      return (
        !!data.Section1_Place1 &&
        !!data.Section1_Place2 &&
        !!data.Section1_Place3 &&
        !!data.Section2_Place1 &&
        !!data.Section2_Place2 &&
        !!data.Section2_Place3
      );
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
            <>
              <EmployeeDetails 
                employee={employeeData} 
                onPlaceChange={handlePlaceChange}
                onSubmit={submitToGoogleSheet}
              />
              
              <div className="flex justify-end mt-6">
                <Button 
                  type="button"
                  onClick={submitToGoogleSheet}
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isSubmitting ? "Submitting..." : (
                    <>
                      <Send size={18} className="mr-2" />
                      Submit Preferences
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EmployeeForm;
