import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function TagInput({ tags = [], onChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      onChange(newTags);
    }
    setInputValue('');
  };

  const removeTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange(newTags);
  };

  return (
    <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="ml-1 text-primary/70 hover:text-primary"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
        
        <div className="flex-1 min-w-[120px]">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="w-full border-none p-0 focus:outline-none focus:ring-0 text-sm"
            placeholder={tags.length === 0 ? "Add tags (press Enter after each tag)" : ""}
          />
        </div>
      </div>
      
      {inputValue.trim() && (
        <button
          type="button"
          onClick={() => addTag(inputValue.trim())}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary"
        >
          <Plus className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

