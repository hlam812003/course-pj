import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { nextui } from "@nextui-org/react";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|alert|autocomplete|avatar|badge|breadcrumbs|button|calendar|card|checkbox|chip|code|divider|drawer|dropdown|form|image|input|input-otp|kbd|link|listbox|menu|modal|navbar|pagination|popover|progress|ripple|scroll-shadow|select|skeleton|slider|snippet|spacer|spinner|toggle|table|tabs|user).js",
],
  theme: {
  	extend: {
			fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
      }
		},
  },
  plugins: [animate, nextui()],
};
export default config;
