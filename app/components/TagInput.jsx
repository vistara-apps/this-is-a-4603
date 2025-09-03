import React, { useState } from 'react';
import { X, Tag } from 'lucide-react';

const TagInput = ({ tags = [], onChange, variant = 'suggestive' }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions] = useState([
    'dog', 'cat', 'bird', 'rabbit', 'hamster', 'fish', 'outdoor', 'indoor',
    'playing', 'sleeping', 'eating', 'cute', 'funny', 'beautiful', 'portrait',
    'action', 'nature', 'garden', 'park', 'home', 'puppy', 'kitten'
  ]);

  const addTag = (tag) => {
    if (tag.trim() && !tags.includes(tag.trim().toLowerCase())) {
      onChange([...tags, tag.trim().toLowerCase()]);
    }
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.includes(inputValue.toLowerCase()) && 
      !tags.includes(suggestion) &&
      inputValue.length > 0
  );

  return (
    <div className="space-y-2">
      {/* Tag Display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-2 text-primary/60 hover:text-primary"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add tags (press Enter or comma to add)"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        {/* Suggestions */}
        {variant === 'suggestive' && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-40 overflow-y-auto z-10">
            {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInput;

