import Typography from "typography";

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Cardo", "Georgia", "Times New Roman", "serif"],
  bodyFontFamily: ["Lato", "Helvetica Neue", "Helvetica", "sans-serif"],
  // See below for the full list of options.
});

export const { scale, rhythm, options } = typography;
export default typography;
