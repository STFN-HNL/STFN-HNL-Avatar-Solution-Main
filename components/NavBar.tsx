"use client";

import Link from "next/link";
import { EnvironmentUtils } from "@/app/lib/environment-utils";

import { GithubIcon, HeyGenLogo } from "./Icons";

export function NavBar() {
  const branding = EnvironmentUtils.getBranding();

  return (
    <div className="bg-gradient-to-r from-primary-dark to-gray-700 border-b border-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <HeyGenLogo />
            <h1 className="text-sm font-semibold text-neutral tracking-tight">
              {branding?.title || "Avatar Solution"}
            </h1>
          </div>
        
        <div className="flex flex-row items-center gap-6 text-primary-light">
          <Link
            href="https://labs.heygen.com/interactive-avatar"
            target="_blank"
            className="hover:text-accent transition-colors duration-200"
          >
            Avatars
          </Link>
          <Link
            href="https://docs.heygen.com/reference/list-voices-v2"
            target="_blank"
            className="hover:text-accent transition-colors duration-200"
          >
            Voices
          </Link>
          <Link
            href="https://docs.heygen.com/reference/new-session-copy"
            target="_blank"
            className="hover:text-accent transition-colors duration-200"
          >
            API Docs
          </Link>
          <Link
            href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
            target="_blank"
            className="hover:text-accent transition-colors duration-200"
          >
            Guide
          </Link>
          <Link
            aria-label="Github"
            className="flex flex-row justify-center gap-1 text-primary-light hover:text-accent transition-colors duration-200"
            href="https://github.com/HeyGen-Official/StreamingAvatarSDK"
            target="_blank"
          >
            <GithubIcon className="text-inherit" />
            SDK
          </Link>
          <Link
            href="https://app.heygen.com/"
            target="_blank"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-sm"
          >
            Learn More
          </Link>
        </div>
              </div>
      </div>
    </div>
  );
}

export default NavBar;
