import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const SupplierSuggestions = ({
  suggestions,
  setSelectedSupplier,
  setValue,
  value,
}) => {
  const [suggestionsList, setSuggestionsList] = useState([]);

  const getSuggestions = (inputValue) => {
    return suggestions.filter((suggestion) =>
      suggestion.supplierName?.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedSupplier(suggestion);
  };

  const renderSuggestion = (suggestion) => (
    <div className="px-4 py-2 cursor-pointer hover:bg-whiteHigh">
      <div>{suggestion?.supplierName}</div>
    </div>
  );

  const inputProps = {
    placeholder: "Enter supplier name",
    required: true,
    value,
    onChange: (event, { newValue }) => {
      setValue(newValue);
    },
  };

  return (
    <Autosuggest
      suggestions={suggestionsList}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion.supplierName}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default SupplierSuggestions;
