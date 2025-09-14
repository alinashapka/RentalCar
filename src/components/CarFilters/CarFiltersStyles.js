export const styles = {
  control: (base, state) => ({
    ...base,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "204px",
    height: "44px",
    background: "#f7f7f7",
    border: "none",
    cursor: "pointer",
    boxShadow: "none",
    "&:hover": {
      background: "#f0f0f0",
    },
  }),

  menu: (base) => ({
    ...base,
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0px 4px 16px rgba(17, 17, 17, 0.1)",
    border: "1px solid #f0f0f0",
    marginTop: "4px",
    overflow: "hidden",
    zIndex: 10000,
  }),

  menuList: (base) => ({
    ...base,
    padding: "8px 0",
    borderRadius: "12px",
    maxHeight: "200px",
  }),

  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f8f9fa" : "#ffffff",
    color: "#8d929a",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.15s ease",

    "&:hover": {
      backgroundColor: "#f8f9fa",
    },

    ...(state.isSelected && {
      backgroundColor: "#e3f2fd",
      color: "#1976d2",
      fontWeight: "500",
    }),
  }),

  placeholder: (base) => ({
    ...base,
    color: "#101828",
    fontWeight: "500",
    fontSize: "16px",
    textAlign: "left",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    color: "#666666",
    padding: "0",
    "&:hover": {
      color: "#333333",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#101828",
    fontWeight: "500",
    fontSize: "16px",
    textAlign: "left",
  }),
};
