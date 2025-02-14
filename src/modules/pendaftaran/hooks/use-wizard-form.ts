import { useEffect, useState } from "react";

// Choose localStorage (persists across sessions) or sessionStorage (clears on tab close)
const STORAGE_KEY = "wizardFormData";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useWizardForm = (stepDefaults: Record<string, any>) => {
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData
        ? { ...stepDefaults, ...JSON.parse(savedData) }
        : stepDefaults;
    }
    return stepDefaults;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateFormData = (newData: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: Record<string, any>) => ({ ...prev, ...newData }));
  };

  const clearFormData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({});
  };

  return { formData, updateFormData, clearFormData };
};
