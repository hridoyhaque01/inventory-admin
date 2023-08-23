import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const ProductSuggestions = ({
  suggestions,
  setSelectedProduct,
  setValue,
  value,
}) => {
  const [suggestionsList, setSuggestionsList] = useState([]);

  const getSuggestions = (inputValue) => {
    return suggestions.filter((suggestion) =>
      suggestion.productId.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSelectedProduct(suggestion);
  };

  const renderSuggestion = (suggestion) => (
    <div className="px-4 py-2 cursor-pointer hover:bg-whiteHigh">
      <div>{suggestion.productId}</div>
    </div>
  );

  const inputProps = {
    placeholder: "Enter product Id",
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
      getSuggestionValue={(suggestion) => suggestion.productId}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      placeholder="Enter product id"
    />
  );
};

export default ProductSuggestions;
