"use client";

import Link from "next/link";

import { GithubIcon, HeyGenLogo } from "./Icons";

import { EnvironmentUtils } from "@/app/lib/environment-utils";

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
              className="hover:text-accent transition-colors duration-200"
              href="https://labs.heygen.com/interactive-avatar"
              target="_blank"
            >
              Avatars
            </Link>
            <Link
              className="hover:text-accent transition-colors duration-200"
              href="https://docs.heygen.com/reference/list-voices-v2"
              target="_blank"
            >
              Voices
            </Link>
            <Link
              className="hover:text-accent transition-colors duration-200"
              href="https://docs.heygen.com/reference/new-session-copy"
              target="_blank"
            >
              API Docs
            </Link>
            <Link
              className="hover:text-accent transition-colors duration-200"
              href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
              target="_blank"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-sm"
              href="https://app.heygen.com/"
              target="_blank"
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
