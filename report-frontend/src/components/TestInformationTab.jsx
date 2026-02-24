// src/components/TestInformationTab.jsx
import React, { useRef, useState } from "react";

const TestInformationTab = ({ register, errors, setActiveTab, isValid, trigger, setValue }) => {
  const tabRef = useRef(null);

  const [isPrevButtonHovered, setIsPrevButtonHovered] = useState(false);
  const [isPrevButtonPressed, setIsPrevButtonPressed] = useState(false);

  const [isNextButtonHovered, setIsNextButtonHovered] = useState(false);
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const formElements = Array.from(
        tabRef.current.querySelectorAll('input:not([type="hidden"]), select')
      );
      const index = formElements.indexOf(event.target);
      if (index > -1 && index < formElements.length - 1) {
        formElements[index + 1].focus();
      } else if (index === formElements.length - 1) {
        // If at the last element, try to focus the 'Next' button
        const nextButton = tabRef.current.querySelector('button:last-of-type');
        if (nextButton) {
          nextButton.focus();
        }
      }
    }
  };

  return (
    <div className="space-y-6" ref={tabRef}> {/* Attach ref to the main div */}
      {/* Tests Administered */}
      <div className="flex flex-col">
        <label
          htmlFor="testsadministered"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Tests Administered {errors.testsadministered && <span className="text-red-500">*</span>}
        </label>
        {/* <input
          id="testsadministered"
          type="text"
          placeholder="Enter the test administered"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("test_administered", {
            required: "Tests Administered is required",
          })}
        /> */}
        <select
          id="testsadministered"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.testsadministered ? 'red' : 'var(--medium-gray)',
          }}
          {...register("testsadministered", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => {
            setValue('testsadministered', e.target.value, { shouldValidate: true });
            console.log('Test Information Tab - testsadministered changed:', e.target.value); // Debug log
            await trigger('testsadministered');
          }}
        >
          <option value="">Select Test administered</option>
          <option value="MISIC">MISIC</option>
          <option value="BKT">BKT</option>
          <option value="WISC">WISC</option>
          <option value="WAIS">WAIS</option>
          <option value="CAS">CAS</option>
          <option value="other">Other</option>
        </select>
      </div>
      {/* Other Test */}
      <div className="flex flex-col">
        <label
          htmlFor="otherTest"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Other Test {errors.otherTest && <span className="text-red-500">*</span>}
        </label>
        {/* <input
          id="otherTest"
          type="text"
          placeholder="Enter other test name"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b1c1c] focus:border-[#9b1c1c] transition-all duration-200"
          {...register("otherTest", { required: "Other test is required" })}
        /> */}
        <select
          id="otherTest"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.otherTest ? 'red' : 'var(--medium-gray)',
          }}
          {...register("otherTest", { required: true })}
          onKeyDown={handleKeyDown}
          onChange={async (e) => {
            setValue('otherTest', e.target.value, { shouldValidate: true });
            await trigger('otherTest');
          }}
        >
          <option value="">Any Other Test administered</option>
          <option value="MISIC">MISIC</option>
          <option value="BKT">BKT</option>
          <option value="WISC">WISC</option>
          <option value="WAIS">WAIS</option>
          <option value="CAS">CAS</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Reading Age */}
      <div className="flex flex-col">
        <label
          htmlFor="readingAge"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Reading Age {errors.readingAge && <span className="text-red-500">*</span>}
        </label>
        <input
          id="readingAge"
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="Enter reading age"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.readingAge ? 'red' : 'var(--medium-gray)',
          }}
          {...register("readingAge", { required: true })}
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('readingAge', e.target.value, { shouldValidate: true });
            await trigger('readingAge');
          }}
        />
        {/* Req #5A: Below/Above selector for reading age comparison */}
        <select
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
          style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
          {...register("belowReading")}
          onChange={(e) => setValue('belowReading', e.target.value)}
        >
          <option value="below">Below chronological age</option>
          <option value="above">Above chronological age</option>
          <option value="at par with">At par with chronological age</option>
        </select>
      </div>

      {/* Spelling Age */}
      <div className="flex flex-col">
        <label
          htmlFor="spellingAge"
          className="text-base font-medium" style={{ color: 'var(--text-gray)' }}
        >
          Spelling Age {errors.spellingAge && <span className="text-red-500">*</span>}
        </label>
        <input
          id="spellingAge"
          type="number"
          onWheel={(e) => e.target.blur()}
          placeholder="Enter spelling age"
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg transition-all duration-200"
          style={{
            color: 'var(--dark-gray)',
            borderColor: errors.spellingAge ? 'red' : 'var(--medium-gray)',
          }}
          {...register("spellingAge", { required: true })}
          onKeyDown={handleKeyDown}
          onBlur={async (e) => {
            setValue('spellingAge', e.target.value, { shouldValidate: true });
            await trigger('spellingAge');
          }}
        />
        {/* Req #5A: Below/Above selector for spelling age comparison */}
        <select
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg"
          style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
          {...register("aboveSpelling")}
          onChange={(e) => setValue('aboveSpelling', e.target.value)}
        >
          <option value="below">Below chronological age</option>
          <option value="above">Above chronological age</option>
          <option value="at par with">At par with chronological age</option>
        </select>
      </div>

      {/* Req #5C: Optional NIMHANS field — leave blank to hide the NIMHANS page from report */}
      <div className="flex flex-col">
        <label className="text-base font-medium" style={{ color: 'var(--text-gray)' }}>
          NIMHANS Arithmetic Result
          <span className="text-xs ml-2 font-normal" style={{ color: 'var(--text-gray)' }}>
            (optional — leave blank to exclude from report)
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="e.g. has difficulty with basic division and fractions..."
          className="block w-full px-4 py-3 mt-2 text-base text-gray-900 border rounded-lg resize-none"
          style={{ color: 'var(--dark-gray)', borderColor: 'var(--medium-gray)' }}
          {...register("nimhansResult")}
        />
      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className="px-4 py-2 rounded-lg"
          style={{
            backgroundColor: isPrevButtonPressed ? '#333333' : (isPrevButtonHovered ? '#444444' : '#666666'), // Grey for previous button, explicit hex
            color: 'white', // Explicit dark grey text
            transition: 'background-color 0.2s ease, transform 0.1s ease',
            transform: isPrevButtonPressed ? 'scale(0.98)' : 'scale(1)',
          }}
          onClick={() => setActiveTab("tab1")} // Navigate to Personal Details
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPrevButtonHovered(true)}
          onMouseLeave={() => setIsPrevButtonHovered(false)}
          onMouseDown={() => setIsPrevButtonPressed(true)}
          onMouseUp={() => setIsPrevButtonPressed(false)}
        >
          Previous
        </button>
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
            const result = await trigger(["testsadministered", "otherTest", "readingAge", "spellingAge"]);
            if (result) {
              setActiveTab("tab3");
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

export default TestInformationTab;
