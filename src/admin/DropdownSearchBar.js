import React, { useState } from 'react';

const DropdownSearchBar = ({ options, onSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setIsOpen(value.trim().length > 0);
  };

  const handleOptionClick = (option) => {
    setSearchValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div>
      <input
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {isOpen && (
        <div>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownSearchBar;
