import React, { useState, useEffect, useContext } from "react";

const FormDataContext = React.createContext();

export const useFormData = () => {
  return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          personalInfo: {
            name: "",
            email: "",
            phone: "",
            address: "",
            linkedin: "",
            github: "",
            position: "",
          },
          profilePic: "",
          technicalSkills: [],
          certifications: [],
          extraCurricularActivities: [],
          internships: [],
          summerTraining: [],
          projects: [],
          achievements: [],
          education: [],
          visibility: { 
            certifications: true,
            extraCurricularActivities: true,
            internships: true,
            summerTraining: true,
            projects: true,
            achievements: true,
          },
          settings: {
            fontSize: "12",
            fontFamily: "Poppins",
            titleCase: "Uppercase",
            pageMargins: "24",
            lineHeight: "8",
          },
        };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e, section, index) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      if (section === "personalInfo") {
        updatedData[section][name] = value;
      } else {
        updatedData[section] = value;
      }
      return updatedData;
    });
  };

  const handleProfilePic = (url) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePic: url,
    }));
  };

  const handleVisibility = (section) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        visibility: {
          ...prevData.visibility,
          [section]: !prevData.visibility[section]
        }
      };
    });
  };
  

  return (
    <FormDataContext.Provider
      value={{ formData, handleChange, handleProfilePic, handleVisibility }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export default FormDataContext;
