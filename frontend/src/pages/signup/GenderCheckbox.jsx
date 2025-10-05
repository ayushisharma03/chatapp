function GenderCheckbox({ onCheckboxChange, selectedGender }) {
  return (
    <div className="flex space-x-6 mt-2">
      <div className="form-control">
        <label
          className={`label cursor-pointer flex items-center space-x-2 ${
            selectedGender === "male" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="gender"
            value="male"
            className="radio radio-primary"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="label-text text-white">Male</span>
        </label>
      </div>

      <div className="form-control">
        <label
          className={`label cursor-pointer flex items-center space-x-2 ${
            selectedGender === "female" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="gender"
            value="female"
            className="radio radio-primary"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="label-text text-white">Female</span>
        </label>
      </div>
    </div>
  );
}

export default GenderCheckbox;
