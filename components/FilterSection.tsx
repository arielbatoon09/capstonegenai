import { motion } from 'framer-motion';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { INDUSTRIES, PROJECT_TYPES, DIFFICULTY_LEVELS, Industry, ProjectType, DifficultyLevel } from '../types/capstone';

interface FilterSectionProps {
  industry: Industry | '';
  projectType: ProjectType | '';
  difficulty: DifficultyLevel | '';
  onIndustryChange: (value: Industry) => void;
  onProjectTypeChange: (value: ProjectType) => void;
  onDifficultyChange: (value: DifficultyLevel) => void;
}

export function FilterSection({
  industry,
  projectType,
  difficulty,
  onIndustryChange,
  onProjectTypeChange,
  onDifficultyChange,
}: FilterSectionProps) {
  const [industryOpen, setIndustryOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="industry" className="text-base font-medium text-slate-700">
          Industry
        </Label>
        <Popover open={industryOpen} onOpenChange={setIndustryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={industryOpen}
              className="w-full !h-12 cursor-pointer text-base justify-between"
            >
              {industry || "Select an industry..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start" sideOffset={4}>
            <Command>
              <CommandInput placeholder="Search industries..." />
              <CommandList>
                <CommandEmpty>No industry found.</CommandEmpty>
                <CommandGroup>
                  {INDUSTRIES.map((ind) => (
                    <CommandItem
                      key={ind}
                      value={ind}
                      onSelect={(currentValue) => {
                        onIndustryChange(currentValue as Industry);
                        setIndustryOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          industry === ind ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {ind}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="projectType" className="text-base font-medium text-slate-700">
          Project Type
        </Label>
        <Select value={projectType} onValueChange={onProjectTypeChange}>
          <SelectTrigger id="projectType" className="w-full !h-12 cursor-pointer text-base">
            <SelectValue placeholder="Select a project type" />
          </SelectTrigger>
          <SelectContent>
            {PROJECT_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-base font-medium text-slate-700">
          Difficulty Level
        </Label>
        <Select value={difficulty} onValueChange={onDifficultyChange}>
          <SelectTrigger id="difficulty" className="w-full !h-12 cursor-pointer text-base">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {DIFFICULTY_LEVELS.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}