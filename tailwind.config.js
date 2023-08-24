/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      gradientColor: "#FF9D80",
      disabledColor: "#797979",
      pureBlackColor: "#000000",
      blackRgb: "rgba(0, 0, 0, 0.60)",
      overlay: "rgba(0, 0, 0, 0.45)",

      black: "#212121",
      blackHigh: "#474747",
      blackMid: "#6C6C6C",
      blackLow: "#404040",
      blackSemi: "#303030",

      blueLight: "#F0F1FF",
      navyDark: "#242F57",
      // #2ED3D2
      whiteHigh: "#FFFFFF",
      whiteMid: "#F5F5F5",
      whiteSemi: "#F6F6F6",
      whiteLow: "#E8E8E8",

      successColor: "#00AE5B",

      warningColor: "#FECA57",
      warningLowColor: "#FFE788",
      warningLightColor: "#FFEBEB",
      errorColor: "#FF4646",
      errorMidColor: "#FC5B2B",
      errorLightColor: "#FD5D5D",
      errorLowColor: "#FF6B6B",
      infoColor: "#2D8EFF",
      alertColor: "#F4A100",

      primaryMain: "#515EDB",
      primaryMainDark: "#414BAF",
      primaryMainDarker: "#313883",
      primaryMainDarkest: "#234B4C",
      primaryMainLight: "#54ADAA",
      primaryMainLighter: "#979EE9",
      primaryMainLightest: "#D7F0ED",

      secondaryMain: "#FFD44A",
      secondaryMainDark: "#1EBB66",
      secondaryMainDarker: "#12AA58",
      secondaryMainDarkest: "#005F2C",
      secondaryMainLight: "#37B6B6",
      secondaryMainLighter: "#AFE2E2",
      secondaryMainLightest: "#D7F0F0",

      successMain: "#12AA58",
      successLight: "#EDFFF5",

      warningMain: "#FF9F43",
      warningLight: "#FFEFD1",

      fadeColor: "#808080",
      fadeHigh: "#919191",
      fadeLight: "#E0E0E0",
    },
    backgroundImage: {
      "gradient-primary":
        "linear-gradient(143.77deg, rgba(255, 255, 255, 0.36) 30.9%, rgba(255, 255, 255, 0.03) 83.54%);",
      "gradient-secondary":
        "linear-gradient(175.57deg, #FC8165 -36.85%, rgba(255, 255, 255, 0.25) 107.36%);",
      login: "url('./assets/images/loginBg.png')",
      reset: "url('./assets/images/resetPasswordBg.png')",
    },
    fontFamily: {
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    extend: {
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
