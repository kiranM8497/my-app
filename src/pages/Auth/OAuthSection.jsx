import React from "react";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";

const OAuthButton = ({ Icon }) => (
  <button
    type="button"
    aria-label="OAuth"
    className="hover:scale-110 transition-transform text-neutral-800 dark:text-neutral-300"
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
  </button>
);

const OAuthSection = () => (
  <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8">
    {/* <OAuthButton Icon={IconBrandGithub} /> */}
    <OAuthButton Icon={IconBrandGoogle} />
    <OAuthButton Icon={IconBrandFacebook} />
  </div>
);

export default OAuthSection;
