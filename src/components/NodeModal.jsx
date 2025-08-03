/* eslint-disable react/prop-types */

export default function NodeModal({
  isOpen,
  isMobile,
  node,
  gender,
  toggle,
  newLabel,
  additionalText,
  onClose,
  onLabelChange,
  onAdditionalTextChange,
  onSubmit,
  onToggle,
  onGenderChange,
  onUpdateMarriage,
  onAddChild,
  parentNodes,
  childNodes,
  onChildClick,
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        width: isMobile ? "90%" : "400px",
        maxHeight: "90vh",
        overflowY: "auto",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "16px", color: "#333" }}>
          {node?.data?.label ? `Edit "${node.data.label}"` : "Edit Node"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
            color: "#999",
          }}
          aria-label="Close Modal"
        >
          ×
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            value={newLabel}
            onChange={onLabelChange}
            style={inputStyle}
            placeholder="Enter name"
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Gender</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              type="button"
              onClick={() => onGenderChange("M")}
              style={{
                ...toggleButtonStyle,
                backgroundColor: gender === "M" ? "#007BFF" : "#ccc",
              }}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => onGenderChange("F")}
              style={{
                ...toggleButtonStyle,
                backgroundColor: gender === "F" ? "#007BFF" : "#ccc",
              }}
            >
              Female
            </button>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle}>Marital Status</label>
          <button
            type="button"
            onClick={onToggle}
            style={{
              ...primaryButtonStyle,
              backgroundColor: toggle ? "#FF6B6B" : "#007BFF",
            }}
          >
            {toggle ? "Married" : "Not Married"}
          </button>
        </div>

        {toggle && (
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Spouse Name</label>
            <input
              type="text"
              value={additionalText}
              onChange={onAdditionalTextChange}
              placeholder="Enter spouse's name"
              style={inputStyle}
            />
            <div
              style={{
                marginTop: "8px",
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={onUpdateMarriage}
                style={secondaryButtonStyle}
              >
                Update Spouse Info
              </button>
              <button
                type="button"
                onClick={onAddChild}
                style={secondaryButtonStyle}
              >
                Add Child
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          <button type="submit" style={primaryButtonStyle}>
            Save
          </button>
          <button type="button" onClick={onClose} style={dangerButtonStyle}>
            Cancel
          </button>
        </div>
      </form>

      <hr style={{ margin: "24px 0" }} />

      <div>
        <h4 style={sectionTitleStyle}>Parents</h4>
        <ul style={listStyle}>
          {parentNodes.length ? (
            parentNodes.map((p) => <li key={p.id}>{p.data.label}</li>)
          ) : (
            <li>No parents linked</li>
          )}
        </ul>
      </div>

      <div>
        <h4 style={sectionTitleStyle}>Children</h4>
        <ul style={listStyle}>
          {childNodes.length ? (
            childNodes.map((c) => (
              <li
                key={c.id}
                style={{ cursor: "pointer", color: "#007BFF" }}
                onClick={(e) => onChildClick(e, c)}
              >
                {c.data.label}
              </li>
            ))
          ) : (
            <li>No children</li>
          )}
        </ul>
      </div>
    </div>
  );
}

// 🎨 Styles
const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontWeight: "bold",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const primaryButtonStyle = {
  padding: "10px 16px",
  backgroundColor: "#007BFF",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  flex: 1,
};

const secondaryButtonStyle = {
  padding: "8px 12px",
  backgroundColor: "#6c757d",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const dangerButtonStyle = {
  ...primaryButtonStyle,
  backgroundColor: "#dc3545",
};

const toggleButtonStyle = {
  flex: 1,
  padding: "8px",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const sectionTitleStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "6px",
  color: "#333",
};

const listStyle = {
  listStyle: "disc",
  paddingLeft: "18px",
  marginBottom: "16px",
};
