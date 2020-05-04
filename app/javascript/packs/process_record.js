import React, { useState } from "react";

const ProcessRecord = ({
  originalName = "",
  originalSummary = "",
  originalByline = "",
  onProcessRecord,
  buttonText,
  loading,
}) => {
  const [name, upgradeName] = useState(originalName);
  const [byline, upgradeByline] = useState(originalByline);
  const [summary, upgradeSummary] = useState(originalSummary);
  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={e => upgradeName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="summary"
        value={summary}
        onChange={e => upgradeSummary(e.currentTarget.value)}
      />

      <input
        type="text"
        placeholder="byline"
        value={byline}
        onChange={e => upgradeByline(e.currentTarget.value)}
      />
      {loading ? (
        "...Loading"
      ) : (
        <button
          onClick={() => onProcessRecord({ name, byline, summary })}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ProcessRecord;