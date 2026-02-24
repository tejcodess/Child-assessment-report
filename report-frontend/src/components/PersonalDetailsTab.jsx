// // src/components/PersonalDetailsTab.jsx
// import React, { useEffect , useState } from "react";
// import Select from "react-select";

// const classOptions = [
//   { value: "PP1", label: "PP1" },
//   { value: "PP2", label: "PP2" },
//   { value: "I", label: "I" },
//   { value: "II", label: "II" },
//   { value: "III", label: "III" },
//   { value: "IV", label: "IV" },
//   { value: "V", label: "V" },
//   { value: "VI", label: "VI" },
//   { value: "VII", label: "VII" },
//   { value: "VIII", label: "VIII" },
//   { value: "IX", label: "IX" },
//   { value: "X", label: "X" },
//   { value: "XI", label: "XI" },
//   { value: "XII", label: "XII" },
// ];


// const calculateAge = (dob, testDate) => {
//   const birthDate = new Date(dob);
//   const testingDate = new Date(testDate);

//   let age = testingDate.getFullYear() - birthDate.getFullYear();
//   const m = testingDate.getMonth() - birthDate.getMonth();

//   if (m < 0 || (m === 0 && testingDate.getDate() < birthDate.getDate())) {
//     age--;
//   }
//   return age;
// };

// const PersonalDetailsTab = ({
//   register,
//   watch,
//   errors,
//   setValue,
//   age,
//   setAge,
//   setActiveTab,
//   isValid,
//   trigger, // Add trigger to destructuring
// }) => {
//   const dob = watch("dob");
//   const dateOfTesting = watch("dateOfTesting");

//   const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
//   const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

//   // Ref for the tab container to query focusable elements
//   const tabRef = React.useRef(null);

//   // Handle Enter key navigation
//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault();
//       const formElements = Array.from(
//         tabRef.current.querySelectorAll('input:not([type="hidden"]), select')
//       );
//       const index = formElements.indexOf(event.target);
//       if (index > -1 && index < formElements.length - 1) {
//         formElements[index + 1].focus();
//       }
//     }
//   };

//   // Whenever dob or dateOfTesting changes, update age
//   useEffect(() => {
//     if (dob && dateOfTesting) {
//       const computedAge = calculateAge(dob, dateOfTesting);
//       localStorage.setItem("childAge", computedAge);
//       setAge(computedAge);
//     }
//   }, [dob, dateOfTesting, setAge]);

//   return (
//     <div className="space-y-6" ref={tabRef}> {/* Attach ref to the main div */}
//       {/* Name */}
//       <div className="flex flex-col">
//         <label htmlFor="name" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Name {errors.name && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="name"
//           type="text"
//           placeholder="Enter your name"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.name ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("name", { required: true })}
//           autoComplete="name"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('name', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Gender */}
//       <div className="flex flex-col">
//         <label htmlFor="gender" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Gender {errors.gender && <span className="text-red-500">*</span>}
//         </label>
//         <select
//           id="gender"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.gender ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("gender", { required: true })}
//           onKeyDown={handleKeyDown}
//           onChange={async (e) => { // Trigger validation on change
//             setValue('gender', e.target.value, { shouldValidate: true });
//           }}
//         >
//           <option value="">Select Gender</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* Date of Birth */}
//       <div className="flex flex-col">
//         <label htmlFor="dob" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Date of Birth {errors.dob && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="dob"
//           type="date"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.dob ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("dob", { required: true })}
//           autoComplete="bday"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('dob', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Date of Testing */}
//       <div className="flex flex-col">
//         <label
//           htmlFor="dateOfTesting"
//           className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
//         >
//           Date of Testing {errors.dateOfTesting && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="dateOfTesting"
//           type="date"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.dateOfTesting ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("dateOfTesting", {
//             required: true,
//           })}
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('dateOfTesting', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Age (Read-only, so no onKeyDown needed directly for navigation) */}
//       <div className="flex flex-col">
//         <label htmlFor="age" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           Age
//         </label>
//         <input
//           id="age"
//           type="text"
//           value={age ? `${age} years` : ""}
//           readOnly
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: 'var(--medium-gray)',
//           }}
//           onKeyDown={handleKeyDown}
//         />
//       </div>
//      {/* Class */}
// <div className="flex flex-col">
//   <label htmlFor="class" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//     Class {errors.class && <span className="text-red-500">*</span>}
//   </label>
//   <select
//     id="class"
//     className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//     style={{
//       color: 'var(--dark-gray)',
//       borderColor: errors.class ? 'red' : 'var(--medium-gray)',
//     }}
//     {...register("class", { required: true })}
//     onKeyDown={handleKeyDown}
//     onChange={async (e) => {
//       setValue('class', e.target.value, { shouldValidate: true });
//     }}
//   >
//     <option value="">Select Class</option>
//     {classOptions.map((option) => (
//       <option key={option.value} value={option.value}>
//         {option.label}
//       </option>
//     ))}
//   </select>
// </div>

//       {/* Informant */}
//       <div className="flex flex-col">
//         <label
//           htmlFor="informant"
//           className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
//         >
//           Informant {errors.informant && <span className="text-red-500">*</span>}
//         </label>
//         <select
//           id="informant"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.informant ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("informant", { required: true })}
//           onKeyDown={handleKeyDown}
//           onChange={async (e) => { // Trigger validation on change
//             setValue('informant', e.target.value, { shouldValidate: true });
//           }}
//         >
//           <option value="">Select Informant</option>
//           <option value="father">Father</option>
//           <option value="mother">Mother</option>
//           <option value="grand-parent">Grand Parent</option>
//           <option value="guardian">Guardian</option>
//           <option value="other">Other</option>
//         </select>
//       </div>

//       {/* School Name */}
//       <div className="flex flex-col">
//         <label htmlFor="school" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
//           School Name {errors.school && <span className="text-red-500">*</span>}
//         </label>
//         <input
//           id="school"
//           type="text"
//           placeholder="Enter school name"
//           className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
//           style={{
//             color: 'var(--dark-gray)',
//             borderColor: errors.school ? 'red' : 'var(--medium-gray)',
//           }}
//           {...register("school", { required: true })}
//           autoComplete="off"
//           onKeyDown={handleKeyDown}
//           onBlur={async (e) => {
//             setValue('school', e.target.value, { shouldValidate: true });
//           }} // Trigger validation on blur
//         />
//       </div>

//       {/* Navigation Buttons */}
//       <div className="flex justify-end">
//         <button
//           type="button"
//           className="px-4 py-2 rounded-lg"
//           style={{
//             backgroundColor: isNextButtonPressed ? '#7f1616' : (isNextButtonHovered ? '#a82a2a' : '#9b1c1c'), // Red for next button, explicit hex
//             color: 'white',
//             transition: 'background-color 0.2s ease, transform 0.1s ease',
//             transform: isNextButtonPressed ? 'scale(0.98)' : 'scale(1)',
//           }}
//           onClick={async () => {
//             const result = await trigger(["name", "gender", "dob", "dateOfTesting", "class", "informant", "school"]);
//             if (result) {
//               setActiveTab("tab2");
//             }
//           }}
//           disabled={!isValid}
//           onKeyDown={handleKeyDown}
//           onMouseEnter={() => setIsNextButtonHovered(true)}
//           onMouseLeave={() => setIsNextButtonHovered(false)}
//           onMouseDown={() => setIsNextButtonPressed(true)}
//           onMouseUp={() => setIsNextButtonPressed(false)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PersonalDetailsTab;
// src/components/PersonalDetailsTab.jsx
import React, { useEffect , useState } from "react";
import Select from "react-select";

const classOptions = [
  { value: "PP1", label: "PP1" },
  { value: "PP2", label: "PP2" },
  { value: "I", label: "I" },
  { value: "II", label: "II" },
  { value: "III", label: "III" },
  { value: "IV", label: "IV" },
  { value: "V", label: "V" },
  { value: "VI", label: "VI" },
  { value: "VII", label: "VII" },
  { value: "VIII", label: "VIII" },
  { value: "IX", label: "IX" },
  { value: "X", label: "X" },
  { value: "XI", label: "XI" },
  { value: "XII", label: "XII" },
];

// [Step 3B] School dropdown list — Req #2: provide a list of schools with an "Other" option
const schoolList = [
  "Bal Vihar School",
  "Bright Future Academy",
  "Delhi Public School",
  "Government High School",
  "Holy Cross School",
  "Little Flower School",
  "Mount Carmel School",
  "Navyug School",
  "St. Mary's School",
  "Sunshine English School",
];

// [Step 3C] Expanded complaint suggestions — Req #3: includes memory issues and more options
const complaintOptions = [
  "Difficulty in concentration",
  "Poor handwriting",
  "Reading problems",
  "Spelling mistakes",
  "Difficulty in following instructions",
  "Memory issues",
  "Poor academic performance",
  "Hyperactivity",
  "Attention difficulties",
  "Social interaction problems",
  "Language delay",
  "Emotional outbursts",
];

const calculateAge = (dob, testDate) => {
  const birthDate = new Date(dob);
  const testingDate = new Date(testDate);

  let age = testingDate.getFullYear() - birthDate.getFullYear();
  const m = testingDate.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && testingDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const PersonalDetailsTab = ({
  register,
  watch,
  errors,
  setValue,
  age,
  setAge,
  setActiveTab,
  isValid,
  trigger, // Add trigger to destructuring
}) => {
  const dob = watch("dob");
  const dateOfTesting = watch("dateOfTesting");

  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [complaintInput, setComplaintInput] = useState("");
  // Ref for the tab container to query focusable elements
  const tabRef = React.useRef(null);

  // Handle Enter key navigation
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const formElements = Array.from(
        tabRef.current.querySelectorAll('input:not([type="hidden"]), select')
      );
      const index = formElements.indexOf(event.target);
      if (index > -1 && index < formElements.length - 1) {
        formElements[index + 1].focus();
      }
    }
  };

  // Whenever dob or dateOfTesting changes, update age
  useEffect(() => {
    if (dob && dateOfTesting) {
      const computedAge = calculateAge(dob, dateOfTesting);
      localStorage.setItem("childAge", computedAge);
      setAge(computedAge);
    }
  }, [dob, dateOfTesting, setAge]);
  
  useEffect(() => {
  setValue("complaints", complaints);
}, [complaints, setValue]);


  return (
    <div className="space-y-6" ref={tabRef}> {/* Attach ref to the main div */}
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Name {errors.name && <span className="text-red-500">*</span>}
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.name ? 'red' : 'var(--medium-gray)',
          }}
          {...register("name", { required: true })}
          autoComplete="name"
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('name', e.target.value, { shouldValidate: true });
          }} // Trigger validation on blur
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <label htmlFor="gender" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Gender {errors.gender && <span className="text-red-500">*</span>}
        </label>
        <select
          id="gender"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.gender ? 'red' : 'var(--medium-gray)',
          }}
          {...register("gender", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => { // Trigger validation on change
            setValue('gender', e.target.value, { shouldValidate: true });
          }}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Date of Birth */}
      <div className="flex flex-col">
        <label htmlFor="dob" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Date of Birth {errors.dob && <span className="text-red-500">*</span>}
        </label>
        <input
          id="dob"
          type="date"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.dob ? 'red' : 'var(--medium-gray)',
          }}
          {...register("dob", { required: true })}
          autoComplete="bday"
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('dob', e.target.value, { shouldValidate: true });
          }} // Trigger validation on blur
        />
      </div>

      {/* Date of Testing */}
      <div className="flex flex-col">
        <label
          htmlFor="dateOfTesting"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Date of Testing {errors.dateOfTesting && <span className="text-red-500">*</span>}
        </label>
        <input
          id="dateOfTesting"
          type="date"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.dateOfTesting ? 'red' : 'var(--medium-gray)',
          }}
          {...register("dateOfTesting", {
            required: true,
          })}
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('dateOfTesting', e.target.value, { shouldValidate: true });
          }} // Trigger validation on blur
        />
      </div>

      {/* Age (Read-only, so no onKeyDown needed directly for navigation) */}
      <div className="flex flex-col">
        <label htmlFor="age" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          Age
        </label>
        <input
          id="age"
          type="text"
          value={age ? `${age} years` : ""}
          readOnly
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: 'var(--medium-gray)',
          }}
          onKeyDown={handleKeyDown}
        />
      </div>
     {/* Class */}
<div className="flex flex-col">
  <label htmlFor="class" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
    Class {errors.class && <span className="text-red-500">*</span>}
  </label>
  <select
    id="class"
    className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
    style={{
      color: 'var(--dark-gray)',
      borderColor: errors.class ? 'red' : 'var(--medium-gray)',
    }}
    {...register("class", { required: true })}
    onKeyDown={handleKeyDown}
    onChange={async (e) => {
      setValue('class', e.target.value, { shouldValidate: true });
    }}
  >
    <option value="">Select Class</option>
    {classOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
</div>

      {/* Informant */}
      <div className="flex flex-col">
        <label
          htmlFor="informant"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Informant {errors.informant && <span className="text-red-500">*</span>}
        </label>
        <select
          id="informant"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.informant ? 'red' : 'var(--medium-gray)',
          }}
          {...register("informant", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => { // Trigger validation on change
            setValue('informant', e.target.value, { shouldValidate: true });
          }}
        >
          {/* [Step 3A] Updated informant options — Req #1: added "Parents (Both)" and kept Others */}
          <option value="">Select Informant</option>
          <option value="Parents">Parents (Both)</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Grand Parent">Grand Parent</option>
          <option value="Guardian">Guardian</option>
          <option value="other">Other</option>
        </select>
        {/* [Step 3A] Show free-text field when "Other" is selected — Req #1 */}
        {watch("informant") === "other" && (
          <input
            type="text"
            placeholder="Please specify (e.g., caretaker, warden)"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{ color: "var(--dark-gray)", borderColor: "var(--medium-gray)" }}
            onChange={(e) => setValue("informant", e.target.value)}
          />
        )}
      </div>

      {/* School Name — [Step 3B] Replaced text input with dropdown + "Other" free-text — Req #2 */}
      <div className="flex flex-col">
        <label htmlFor="school" className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          School Name {errors.school && <span className="text-red-500">*</span>}
        </label>
        <select
          id="school"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
          style={{ color: 'var(--dark-gray)', borderColor: errors.school ? 'red' : 'var(--medium-gray)' }}
          onChange={(e) => {
            if (e.target.value === "other") {
              setValue("school", "");
            } else {
              setValue("school", e.target.value, { shouldValidate: true });
            }
          }}
        >
          <option value="">Select School</option>
          {schoolList.map((s) => <option key={s} value={s}>{s}</option>)}
          <option value="other">Other</option>
        </select>
        <input type="hidden" {...register("school", { required: true })} />
        {/* [Step 3B] Show free-text input when school value is empty ("Other" selected) */}
        {watch("school") === "" && (
          <input
            type="text"
            placeholder="Enter school name"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
            onChange={(e) => setValue("school", e.target.value, { shouldValidate: true })}
          />
        )}
      </div>
{/* Complaints (Display Only, No localStorage) */}
      <div className="flex flex-col">
        <label htmlFor="complaints" className="text-base font-medium" style={{ color: "var(--text-gray)" }}>
          Complaints
        </label>

        {/* Selected complaints as tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {complaints.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
            >
              <span className="text-sm">{c}</span>
              <button
                type="button"
                onClick={() => {
                  const newComplaints = complaints.filter((cc) => cc !== c);
                  setComplaints(newComplaints);
                }}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Input with dropdown */}
        <div className="relative">
          <input
            id="complaints"
            type="text"
            value={complaintInput}
            onChange={(e) => setComplaintInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (complaintInput && !complaints.includes(complaintInput.trim())) {
                  setComplaints([...complaints, complaintInput.trim()]);
                }
                setComplaintInput("");
              }
            }}
            placeholder="Type or select complaint"
            className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
            style={{
              color: "var(--dark-gray)",
              borderColor: "var(--medium-gray)",
            }}
          />

          {/* Dropdown list */}
          {complaintInput && (
            <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow">
              {/* [Step 3C] Filter uses complaintOptions — Req #3: expanded suggestion list */}
              {complaintOptions
                .filter(
                  (opt) =>
                    opt.toLowerCase().includes(complaintInput.toLowerCase()) &&
                    !complaints.includes(opt)
                )
                .map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setComplaints([...complaints, opt]);
                      setComplaintInput("");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}

              {/* Option to add custom complaint */}
              {/* [Step 3C] "some" check also uses complaintOptions */}
              {!complaintOptions.some(
                (opt) => opt.toLowerCase() === complaintInput.toLowerCase()
              ) && (
                <li
                  onClick={() => {
                    setComplaints([...complaints, complaintInput]);
                    setComplaintInput("");
                  }}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 cursor-pointer"
                >
                  Add "{complaintInput}"
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: isNextButtonPressed ? '#7f1616' : (isNextButtonHovered ? '#a82a2a' : '#9b1c1c'), // Red for next button, explicit hex
            color: 'white',
            transition: 'background-color 0.2s ease, transform 0.1s ease',
            transform: isNextButtonPressed ? 'scale(0.98)' : 'scale(1)',
          }}
          onClick={async () => {
            const result = await trigger(["name", "gender", "dob", "dateOfTesting", "class", "informant", "school"]);
            if (result) {
              setActiveTab("tab2");
            }
          }}
          disabled={!isValid}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsNextButtonHovered(true)}
          onMouseLeave={() => setIsNextButtonHovered(false)}
          onMouseDown={() => setIsNextButtonPressed(true)}
          onMouseUp={() => setIsNextButtonPressed(false)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetailsTab;

