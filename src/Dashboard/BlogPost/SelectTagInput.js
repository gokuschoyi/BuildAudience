import React, { useState } from 'react';
import Select from 'react-select';
import { ActionMeta, OnChangeValue } from 'react-select';

const options = [
    { value: 'Technology', label: 'Technology' },
    { value: 'AI', label: 'AI' },
    { value: 'Sogtware Engineering', label: 'Software Engineering' },
    { value: 'ML', label: 'ML' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Business', label: 'Business' },
];

export default function SelectTag() {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <div className="App">
            <Select
                defaultValue={selectedOption}
                closeMenuOnSelect={false}
                isMulti
                onChange={setSelectedOption}
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
            />
        </div>
    );
}
