import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import { useTranslation } from "react-i18next";

const ProductSuggestions = ({
  suggestions,
  setSelectedProduct,
  setValue,
  value,
}) => {
  const [suggestionsList, setSuggestionsList] = useState([]);
  const { t } = useTranslation();

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
    <div className="px-4 py-2 cursor-pointer hover:bg-whiteHigh z-50">
      <div>{suggestion.productId}</div>
    </div>
  );

  const inputProps = {
    placeholder: t("placeholders.enterProductId"),
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
    />
  );
};

export default ProductSuggestions;
