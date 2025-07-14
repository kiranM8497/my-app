import React from "react";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from "@tabler/icons-react";

const OAuthButton = ({ Icon, onClick }) => (
  <button
    type="button"
    aria-label="OAuth"
    className="hover:scale-110 transition-transform text-neutral-800 dark:text-neutral-300"
    onClick={onClick}
  >
    <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
  </button>
);

const OAuthSection = () => {
  const handleFacebookLogin = () => {
    // Optional: add ?redirect=... here if needed
    window.location.href = "http://localhost:2000/auth/facebook";
  };

  return (
    <div className="mt-6 sm:mt-8 flex items-center justify-center space-x-4 sm:space-x-6 md:space-x-8">
      {/* <OAuthButton Icon={IconBrandGithub} /> */}
      <OAuthButton
        Icon={IconBrandGoogle}
        onClick={() => alert("Google not implemented yet")}
      />
      <OAuthButton Icon={IconBrandFacebook} onClick={handleFacebookLogin} />
    </div>
  );
};
export default OAuthSection;
