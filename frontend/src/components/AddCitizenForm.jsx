import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { addCitizen } from '../api';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AddCitizenForm = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Personality: "",
    PublicRecord: {
      Name: "",
      Age: "",
      Location: "",
      Occupation: "",
      Education: "",
      PoliticalAffiliation: "",
      Family: ""
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const submitData = {
        Name: formData.Name,
        Personality: formData.Personality,
        PublicRecord: `Name: ${formData.PublicRecord.Name}, Age: ${formData.PublicRecord.Age}, Location: ${formData.PublicRecord.Location}, Occupation: ${formData.PublicRecord.Occupation}, Education: ${formData.PublicRecord.Education}, Political Affiliation: ${formData.PublicRecord.PoliticalAffiliation}, Family: ${formData.PublicRecord.Family}`
      };
      
      const response = await addCitizen(submitData);
      
      if (response.success) {
        toast({
          title: "Success",
          description: "Citizen added successfully",
        });
        
        setFormData({
          Name: "",
          Personality: "",
          PublicRecord: {
            Name: "",
            Age: "",
            Location: "",
            Occupation: "",
            Education: "",
            PoliticalAffiliation: "",
            Family: ""
          }
        });
        
        onOpenChange(false);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add citizen",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-got-darkgray border border-got-gold text-got-ivory max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-cinzel text-got-gold">Add New Citizen</DialogTitle>
          <DialogDescription className="text-got-ivory/80">
            Enter the details for the new citizen of the realm.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="Name" className="text-got-gold">Name</Label>
            <Input 
              id="Name" 
              name="Name" 
              value={formData.Name}
              onChange={handleChange}
              required
              className="bg-got-darkgray border-got-gold text-got-ivory"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="Personality" className="text-got-gold">Personality</Label>
            <Textarea 
              id="Personality" 
              name="Personality" 
              value={formData.Personality}
              onChange={handleChange}
              required
              rows={5}
              className="bg-got-darkgray border-got-gold text-got-ivory"
            />
          </div>
          
          <div className="pt-4 border-t border-got-gold/30">
            <h3 className="text-lg font-cinzel text-got-gold mb-3">Public Record</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.Name" className="text-got-gold">Name</Label>
                <Input 
                  id="PublicRecord.Name" 
                  name="PublicRecord.Name" 
                  value={formData.PublicRecord.Name}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.Age" className="text-got-gold">Age</Label>
                <Input 
                  id="PublicRecord.Age" 
                  name="PublicRecord.Age" 
                  value={formData.PublicRecord.Age}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.Location" className="text-got-gold">Location</Label>
                <Input 
                  id="PublicRecord.Location" 
                  name="PublicRecord.Location" 
                  value={formData.PublicRecord.Location}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.Occupation" className="text-got-gold">Occupation</Label>
                <Input 
                  id="PublicRecord.Occupation" 
                  name="PublicRecord.Occupation" 
                  value={formData.PublicRecord.Occupation}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.Education" className="text-got-gold">Education</Label>
                <Input 
                  id="PublicRecord.Education" 
                  name="PublicRecord.Education" 
                  value={formData.PublicRecord.Education}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="PublicRecord.PoliticalAffiliation" className="text-got-gold">Political Affiliation</Label>
                <Input 
                  id="PublicRecord.PoliticalAffiliation" 
                  name="PublicRecord.PoliticalAffiliation" 
                  value={formData.PublicRecord.PoliticalAffiliation}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="PublicRecord.Family" className="text-got-gold">Family</Label>
                <Input 
                  id="PublicRecord.Family" 
                  name="PublicRecord.Family" 
                  value={formData.PublicRecord.Family}
                  onChange={handleChange}
                  className="bg-got-darkgray border-got-gold text-got-ivory"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="border-got-gold text-got-gold hover:bg-got-gold/20"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              className="bg-got-gold text-got-black hover:bg-got-darkgold"
            >
              {isSubmitting ? "Adding..." : "Add Citizen"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCitizenForm;