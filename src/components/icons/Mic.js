import * as React from "react";

const SvgMic = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M448 224c0-17.672-14.328-32-32-32s-32 14.328-32 32c0 70.578-57.422 128-128 128s-128-57.422-128-128c0-17.672-14.328-32-32-32s-32 14.328-32 32c0 94.945 69.336 173.801 160 189.109V448h-16c-17.672 0-32 14.328-32 32v32h160v-32c0-17.672-14.328-32-32-32h-16v-34.891C378.664 397.801 448 318.945 448 224zM352 96c0-53.02-42.98-96-96-96s-96 42.98-96 96v48h192V96z" />
    <path d="M256 320c53.02 0 96-42.98 96-96v-48H160v48c0 53.02 42.98 96 96 96z" />
  </svg>
);

export default SvgMic;
