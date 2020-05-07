import React, { useState } from "react";

const ProcessMember = ({
  originalName = "",
  originalSurname = "",
  originalAddress = "",

  onProcess,
  buttonText,
  loading,
}) => {
  const [name, upgradeName] = useState(originalName);
  const [surname, upgradeSurname] = useState(originalName);
  const [address, upgradeAddress] = useState(originalName);

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        value={name || ""}
        tabIndex="1"
        onChange={e => upgradeName(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="surname"
        value={surname || ""}
        tabIndex="2"
        onChange={e => upgradeSurname(e.currentTarget.value)}
      />
      <textarea
        placeholder="address"
        value={address || ""}
        tabIndex="3"
        onChange={e => upgradeAddress(e.currentTarget.value)}
      />

      {loading ? (
        "...Loading"
      ) : (
        <button
          onClick={() => onProcess({ name, surname, address })}
          tabIndex="4"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ProcessMember;