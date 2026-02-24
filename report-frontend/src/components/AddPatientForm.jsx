// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import PersonalDetailsTab from "./PersonalDetailsTab";
// import TestInformationTab from "./TestInformationTab";
// import VerbalTestsTab from "./VerbalTestsTab";
// import PerformanceTestsTab from "./PerformanceTestsTab";
// import RecommendationsTab from "./RecommendationsTab";
// import NormTableModal from "./NormTableModal";

// const TabForm = () => {
//   const [activeTab, setActiveTab] = useState("tab1");
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//     control,
//     setValue,
//     setError,
//     getValues,
//     trigger,
//     clearErrors,
//   } = useForm();
//   const [age, setAge] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [tqScore, setTqScore] = useState(null);

//   // State and handlers for Norm Table Modal
//   const [showModal, setShowModal] = useState(false);
//   const [isButtonHovered, setIsButtonHovered] = useState(false);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const onSubmit = async (data) => {
//     const hasVocabulary = data.vocabulary?.trim() !== "";
//     const hasDigitSpan = data.digitSpan?.trim() !== "";
//     if ((hasVocabulary && hasDigitSpan) || (!hasVocabulary && !hasDigitSpan)) {
//       setError("vocabulary", {
//         type: "manual",
//         message:
//           "Please fill either Vocabulary or Digit Span (not both or none)",
//       });
//       return;
//     }

//     try {
//       const response = await fetch(
//         `/getTQScore?age=${age}&section=${data.class}&name=${
//           data.name
//         }&raw_score=${data.vocabulary || data.digitSpan}`
//       );
//       const result = await response.json();
//       if (response.ok) {
//         setTqScore(result.tq_score);
//       } else {
//         setTqScore(null);
//         console.error(result.error);
//       }
//     } catch (error) {
//       console.error("Error fetching TQ score:", error);
//     }

//     localStorage.setItem("patientData", JSON.stringify(data));
//     console.log(data);
//   };

//   // Function to calculate age
//   const calculateAge = (dob) => {
//     const birthDate = new Date(dob);
//     const today = new Date();
//     const age = today.getFullYear() - birthDate.getFullYear();
//     const month = today.getMonth() - birthDate.getMonth();
//     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
//       setAge(age - 1);
//     } else {
//       setAge(age);
//     }
//   };

//   const handleCheckboxChange = (option) => {
//     if (selectedOption === option) {
//       setSelectedOption(null);
//       setValue("vocabulary", "");
//       setValue("digitSpan", "");
//     } else {
//       setSelectedOption(option);
//       if (option === "vocabulary") {
//         setValue("digitSpan", "");
//       } else {
//         setValue("vocabulary", "");
//       }
//     }
//   };

//   const tabs = [
//     { id: "tab1", name: "Personal Details" },
//     { id: "tab2", name: "Test Information" },
//     { id: "tab3", name: "Verbal Tests" },
//     { id: "tab4", name: "Performance Tests" },
//     { id: "tab5", name: "Recommendations" },
//   ];

//   return (
//     <div className="w-full max-w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5] flex flex-col items-center py-6 md:py-12 px-2 sm:px-4 md:px-8 box-border">
//       {/* Progress Bar/Steps */}
//       <div className="w-full max-w-4xl px-0 sm:px-2 md:px-4 mb-6">
//         {/* Make steps bar horizontally scrollable on small screens */}
//         <div className="flex justify-between items-center relative overflow-x-auto pb-2 no-scrollbar">
//           {tabs.map((tab, index) => (
//             <React.Fragment key={tab.id}>
//               <div
//                 className="flex flex-col items-center cursor-pointer min-w-[70px]"
//                 onClick={() => setActiveTab(tab.id)}
//               >
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}
//                   style={{
//                     backgroundColor:
//                       activeTab === tab.id ||
//                       tabs.findIndex((t) => t.id === activeTab) > index
//                         ? "#9b1c1c"
//                         : "#e5e5e5",
//                     color: "white",
//                     transition: "background-color 0.3s ease",
//                   }}
//                 >
//                   {index + 1}
//                 </div>
//                 <div className="mt-2 text-center text-xs sm:text-sm font-medium whitespace-nowrap">
//                   {tab.name}
//                 </div>
//               </div>
//               {index < tabs.length - 1 && (
//                 <div
//                   className="flex-1 h-1 mx-2 min-w-[24px]"
//                   style={{
//                     backgroundColor:
//                       tabs.findIndex((t) => t.id === activeTab) > index
//                         ? "#9b1c1c"
//                         : "#e5e5e5",
//                     transition: "background-color 0.3s ease",
//                   }}
//                 ></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//         {/* Show Norm Tables Button */}
//         <div className="flex justify-end mt-4">
//           <button
//             type="button"
//             onClick={handleShowModal}
//             onMouseEnter={() => setIsButtonHovered(true)}
//             onMouseLeave={() => setIsButtonHovered(false)}
//             className="px-4 py-2 rounded-lg transition-all duration-150"
//             style={{
//               backgroundColor: isButtonHovered ? "#a82a2a" : "#9b1c1c",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               transform: isButtonHovered ? "scale(1.02)" : "scale(1)",
//             }}
//           >
//             Show Norm Tables
//           </button>
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="w-full flex flex-col items-center px-1 sm:px-2 md:px-6 space-y-4 md:space-y-8 mt-6 md:mt-8">
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full max-w-lg md:max-w-2xl space-y-4 md:space-y-6"
//         >
//           {activeTab === "tab1" && (
//             <PersonalDetailsTab
//               register={register}
//               control={control}
//               watch={watch}
//               errors={errors}
//               setValue={setValue}
//               calculateAge={calculateAge}
//               age={age}
//               setAge={setAge}
//               setActiveTab={setActiveTab}
//               isValid={
//                 !errors.name &&
//                 !errors.gender &&
//                 !errors.dob &&
//                 !errors.dateOfTesting &&
//                 !errors.class &&
//                 !errors.informant &&
//                 !errors.school
//               }
//               trigger={trigger}
//             />
//           )}
//           {activeTab === "tab2" && (
//             <TestInformationTab
//               register={register}
//               errors={errors}
//               setActiveTab={setActiveTab}
//               isValid={
//                 !errors.testsadministered &&
//                 !errors.otherTest &&
//                 !errors.readingAge &&
//                 !errors.spellingAge
//               }
//               trigger={trigger}
//               setValue={setValue}
//             />
//           )}
//           {activeTab === "tab3" && (
//             <VerbalTestsTab
//               register={register}
//               errors={errors}
//               selectedOption={selectedOption}
//               handleCheckboxChange={handleCheckboxChange}
//               setActiveTab={setActiveTab}
//               setValue={setValue}
//               getValues={getValues}
//               isValid={
//                 !errors.information &&
//                 !errors.comprehension &&
//                 !errors.arithmetic &&
//                 !errors.similarities &&
//                 !errors.vocabulary &&
//                 !errors.digitSpan
//               }
//               trigger={trigger}
//             />
//           )}
//           {activeTab === "tab4" && (
//             <PerformanceTestsTab
//               register={register}
//               errors={errors}
//               setActiveTab={setActiveTab}
//               getValues={getValues}
//               isValid={
//                 !errors.pictureCompletion &&
//                 !errors.blockDesign &&
//                 !errors.objectAssembly &&
//                 !errors.coding &&
//                 !errors.mazes
//               }
//               trigger={trigger}
//               setValue={setValue}
//               clearErrors={clearErrors}
//             />
//           )}
//           {activeTab === "tab5" && (
//             <RecommendationsTab
//               register={register}
//               errors={errors}
//               setValue={setValue}
//               control={control}
//               setActiveTab={setActiveTab}
//               getValues={getValues}
//               isValid={!errors.summary && !errors.recommendations}
//               trigger={trigger}
//             />
//           )}
//           {tqScore !== null && (
//             <div className="mt-2 md:mt-4">
//               <p className="text-base md:text-lg font-semibold">
//                 TQ Score: {tqScore}
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//       <NormTableModal isOpen={showModal} onClose={handleCloseModal}>
//         <h2>Norm Table Images</h2>
//         <p>This is where the images will be displayed.</p>
//       </NormTableModal>
//     </div>
//   );
// };

// export default TabForm;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalDetailsTab from "./PersonalDetailsTab";
import TestInformationTab from "./TestInformationTab";
import VerbalTestsTab from "./VerbalTestsTab";
import PerformanceTestsTab from "./PerformanceTestsTab";
import RecommendationsTab from "./RecommendationsTab";
import NormTableModal from "./NormTableModal";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
    getValues,
    trigger,
    clearErrors,
  } = useForm();
  const [age, setAge] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [tqScore, setTqScore] = useState(null);

  // State and handlers for Norm Table Modal
  const [showModal, setShowModal] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const onSubmit = async (data) => {
    const hasVocabulary = data.vocabulary?.trim() !== "";
    const hasDigitSpan = data.digitSpan?.trim() !== "";
    if ((hasVocabulary && hasDigitSpan) || (!hasVocabulary && !hasDigitSpan)) {
      setError("vocabulary", {
        type: "manual",
        message:
          "Please fill either Vocabulary or Digit Span (not both or none)",
      });
      return;
    }

    try {
      const response = await fetch(
        `/getTQScore?age=${age}&section=${data.class}&name=${
          data.name
        }&raw_score=${data.vocabulary || data.digitSpan}`
      );
      const result = await response.json();
      if (response.ok) {
        setTqScore(result.tq_score);
      } else {
        setTqScore(null);
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching TQ score:", error);
    }

    localStorage.setItem("patientData", JSON.stringify(data));

    // Retrieve complaints from localStorage
    const storedComplaints = localStorage.getItem("currentComplaints");
    const complaints = storedComplaints ? JSON.parse(storedComplaints) : [];

    // Add complaints to the data object
    data.complaints = complaints;

    console.log(data);
  };

  // Function to calculate age
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      setAge(age - 1);
    } else {
      setAge(age);
    }
  };

  const handleCheckboxChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setValue("vocabulary", "");
      setValue("digitSpan", "");
    } else {
      setSelectedOption(option);
      if (option === "vocabulary") {
        setValue("digitSpan", "");
      } else {
        setValue("vocabulary", "");
      }
    }
  };

  const tabs = [
    { id: "tab1", name: "Personal Details" },
    { id: "tab2", name: "Test Information" },
    { id: "tab3", name: "Verbal Tests" },
    { id: "tab4", name: "Performance Tests" },
    { id: "tab5", name: "Recommendations" },
  ];

  return (
    <div className="w-full max-w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f1f1f1] to-[#e5e5e5] flex flex-col items-center py-6 md:py-12 px-2 sm:px-4 md:px-8 box-border">
      {/* Progress Bar/Steps */}
      <div className="w-full max-w-4xl px-0 sm:px-2 md:px-4 mb-6">
        {/* Make steps bar horizontally scrollable on small screens */}
        <div className="flex justify-between items-center relative overflow-x-auto pb-2 no-scrollbar">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.id}>
              <div
                className="flex flex-col items-center cursor-pointer min-w-[70px]"
                onClick={() => setActiveTab(tab.id)}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id ||
                      tabs.findIndex((t) => t.id === activeTab) > index
                        ? "#9b1c1c"
                        : "#e5e5e5",
                    color: "white",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center text-xs sm:text-sm font-medium whitespace-nowrap">
                  {tab.name}
                </div>
              </div>
              {index < tabs.length - 1 && (
                <div
                  className="flex-1 h-1 mx-2 min-w-[24px]"
                  style={{
                    backgroundColor:
                      tabs.findIndex((t) => t.id === activeTab) > index
                        ? "#9b1c1c"
                        : "#e5e5e5",
                    transition: "background-color 0.3s ease",
                  }}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Show Norm Tables Button */}
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleShowModal}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            className="px-4 py-2 rounded-lg transition-all duration-150"
            style={{
              backgroundColor: isButtonHovered ? "#a82a2a" : "#9b1c1c",
              color: "white",
              border: "none",
              cursor: "pointer",
              transform: isButtonHovered ? "scale(1.02)" : "scale(1)",
            }}
          >
            Show Norm Tables
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full flex flex-col items-center px-1 sm:px-2 md:px-6 space-y-4 md:space-y-8 mt-6 md:mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg md:max-w-2xl space-y-4 md:space-y-6"
        >
          {activeTab === "tab1" && (
            <PersonalDetailsTab
              register={register}
              control={control}
              watch={watch}
              errors={errors}
              setValue={setValue}
              calculateAge={calculateAge}
              age={age}
              setAge={setAge}
              setActiveTab={setActiveTab}
              isValid={
                !errors.name &&
                !errors.gender &&
                !errors.dob &&
                !errors.dateOfTesting &&
                !errors.class &&
                !errors.informant &&
                !errors.school
              }
              trigger={trigger}
            />
          )}
          {activeTab === "tab2" && (
            <TestInformationTab
              register={register}
              errors={errors}
              setActiveTab={setActiveTab}
              isValid={
                !errors.testsadministered &&
                !errors.otherTest &&
                !errors.readingAge &&
                !errors.spellingAge
              }
              trigger={trigger}
              setValue={setValue}
            />
          )}
          {activeTab === "tab3" && (
            <VerbalTestsTab
              register={register}
              errors={errors}
              selectedOption={selectedOption}
              handleCheckboxChange={handleCheckboxChange}
              setActiveTab={setActiveTab}
              setValue={setValue}
              getValues={getValues}
              isValid={
                !errors.information &&
                !errors.comprehension &&
                !errors.arithmetic &&
                !errors.similarities &&
                !errors.vocabulary &&
                !errors.digitSpan
              }
              trigger={trigger}
            />
          )}
          {activeTab === "tab4" && (
            <PerformanceTestsTab
              register={register}
              errors={errors}
              setActiveTab={setActiveTab}
              getValues={getValues}
              isValid={
                !errors.pictureCompletion &&
                !errors.blockDesign &&
                !errors.objectAssembly &&
                !errors.coding &&
                !errors.mazes
              }
              trigger={trigger}
              setValue={setValue}
              clearErrors={clearErrors}
            />
          )}
          {activeTab === "tab5" && (
            <RecommendationsTab
              register={register}
              errors={errors}
              setValue={setValue}
              control={control}
              setActiveTab={setActiveTab}
              getValues={getValues}
              isValid={!errors.summary && !errors.recommendations}
              trigger={trigger}
            />
          )}
          {tqScore !== null && (
            <div className="mt-2 md:mt-4">
              <p className="text-base md:text-lg font-semibold">
                TQ Score: {tqScore}
              </p>
            </div>
          )}
        </form>
      </div>
      <NormTableModal isOpen={showModal} onClose={handleCloseModal}>
        <h2>Norm Table Images</h2>
        <p>This is where the images will be displayed.</p>
      </NormTableModal>
    </div>
  );
};

export default TabForm;
