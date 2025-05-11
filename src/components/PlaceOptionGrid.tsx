
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface PlaceOption {
  id: string;
  name: string;
}

interface OptionSet {
  id: string;
  name: string;
  places: PlaceOption[];
}

interface PlaceOptionGridProps {
  title: string;
  optionSets: OptionSet[];
  selectedOption: string | null;
  onOptionSelect: (optionId: string) => void;
  disabled?: boolean;
}

const PlaceOptionGrid: React.FC<PlaceOptionGridProps> = ({
  title,
  optionSets,
  selectedOption,
  onOptionSelect,
  disabled = false
}) => {
  return (
    <div className={cn("mt-4", disabled && "opacity-50")}>
      <h3 className="text-md font-semibold mb-3">{title}</h3>
      
      <Card className={cn("border", disabled ? "bg-gray-100" : "bg-white")}>
        <CardContent className="p-4">
          <div className="grid grid-cols-4 gap-2 mb-2">
            <div className="font-medium">Places</div>
            {optionSets.map((set) => (
              <div key={set.id} className="text-center font-medium">
                {set.name}
              </div>
            ))}
          </div>

          <RadioGroup
            value={selectedOption || ""}
            onValueChange={onOptionSelect}
            disabled={disabled}
            className="space-y-4"
          >
            {optionSets[0].places.map((_, placeIndex) => (
              <div key={placeIndex} className="grid grid-cols-4 gap-2 items-center">
                <div className="font-medium">Place {placeIndex + 1}</div>
                {optionSets.map((set) => {
                  const place = set.places[placeIndex];
                  const optionId = `${set.id}-${place.id}`;
                  
                  return (
                    <div key={optionId} className="flex flex-col items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={optionId} 
                          id={optionId}
                          disabled={disabled}
                        />
                        <Label htmlFor={optionId} className="text-sm">
                          {place.name}
                        </Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceOptionGrid;
