
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Search, Send } from "lucide-react";
import EmployeeDetails from "./EmployeeDetails";
import { SheetSubmissionData, submitToGoogleSheets } from "@/utils/googleSheetsService";

interface EmployeeData {
  EmpID: string;
  Name: string;
  Department: string;
  Section1_option?: string;
  Section2_option?: string;
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

  const handleOptionSelect = (section: string, optionId: string) => {
    if (employeeData) {
      setEmployeeData({
        ...employeeData,
        [`${section}_option`]: optionId
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

  const parseOptionSelection = (optionId: string | undefined) => {
    if (!optionId) return { optionSet: null, place1: "", place2: "", place3: "" };
    
    // Format: "optionX-placeY"
    const [optionSet, placeId] = optionId.split("-");
    
    // Based on selected option, determine the places for that option set
    let places;
    if (optionSet === "option1") {
      places = {
        domestic: ["Mumbai", "Delhi", "Kolkata"],
        foreign: ["New York", "London", "Tokyo"]
      };
    } else if (optionSet === "option2") {
      places = {
        domestic: ["Bengaluru", "Chennai", "Hyderabad"],
        foreign: ["Paris", "Dubai", "Singapore"]
      };
    } else {
      places = {
        domestic: ["Ahmedabad", "Pune", "Jaipur"],
        foreign: ["Berlin", "Sydney", "Toronto"]
      };
    }
    
    return {
      optionSet,
      place1: places.domestic[0],
      place2: places.domestic[1],
      place3: places.domestic[2]
    };
  }

  const submitToGoogleSheet = async () => {
    if (!employeeData) return;

    setIsSubmitting(true);

    const isTechnicalDepartment = employeeData.Department === "Technical";

    // Check if required options are selected
    if ((isTechnicalDepartment && !employeeData.Section2_option) || 
        (!isTechnicalDepartment && (!employeeData.Section1_option || !employeeData.Section2_option))) {
      toast({
        title: "Error",
        description: "Please select required options for all sections",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Parse the selected options
      const section1Selection = parseOptionSelection(employeeData.Section1_option);
      const section2Selection = parseOptionSelection(employeeData.Section2_option);
      
      // Get the option sets and places based on selection
      const section1Option = section1Selection.optionSet;
      const section2Option = section2Selection.optionSet;
      
      // Determine places for domestic section
      let domesticPlaces = ["", "", ""];
      if (section1Option === "option1") {
        domesticPlaces = ["Mumbai", "Delhi", "Kolkata"];
      } else if (section1Option === "option2") {
        domesticPlaces = ["Bengaluru", "Chennai", "Hyderabad"];
      } else if (section1Option === "option3") {
        domesticPlaces = ["Ahmedabad", "Pune", "Jaipur"];
      }
      
      // Determine places for foreign section
      let foreignPlaces = ["", "", ""];
      if (section2Option === "option1") {
        foreignPlaces = ["New York", "London", "Tokyo"];
      } else if (section2Option === "option2") {
        foreignPlaces = ["Paris", "Dubai", "Singapore"];
      } else if (section2Option === "option3") {
        foreignPlaces = ["Berlin", "Sydney", "Toronto"];
      }

      // Prepare data for submission
      const submissionData: SheetSubmissionData = {
        userId: employeeData.EmpID,
        department: employeeData.Department,
        section1_option: isTechnicalDepartment ? "N/A" : (section1Option || ""),
        section1_place1: isTechnicalDepartment ? "N/A" : domesticPlaces[0],
        section1_place2: isTechnicalDepartment ? "N/A" : domesticPlaces[1],
        section1_place3: isTechnicalDepartment ? "N/A" : domesticPlaces[2],
        section2_option: section2Option || "",
        section2_place1: foreignPlaces[0],
        section2_place2: foreignPlaces[1],
        section2_place3: foreignPlaces[2],
        timestamp: new Date().toISOString()
      };

      console.log("Submitting to Google Sheets:", submissionData);

      // In a real application, you would call your backend API
      await submitToGoogleSheets(submissionData);

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
                onOptionSelect={handleOptionSelect}
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
