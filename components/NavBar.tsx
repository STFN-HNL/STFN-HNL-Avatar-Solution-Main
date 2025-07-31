"use client";

import Link from "next/link";
import { EnvironmentUtils } from "@/app/lib/environment-utils";

import { GithubIcon, HeyGenLogo } from "./Icons";

export default function NavBar() {
  const branding = EnvironmentUtils.getBranding();

  return (
    <>
      <div className="flex flex-row justify-between items-center w-[1000px] m-auto p-6">
        <div className="flex flex-row items-center gap-4">
          <Link href="https://app.heygen.com/" target="_blank">
            <HeyGenLogo />
          </Link>
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text">
            <p className="text-xl font-semibold text-transparent">
              {branding?.title || "HeyGen Interactive Avatar SDK NextJS Demo"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-row items-center gap-6 text-gray-700">
          <Link
            href="https://labs.heygen.com/interactive-avatar"
            target="_blank"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Avatars
          </Link>
          <Link
            href="https://docs.heygen.com/reference/list-voices-v2"
            target="_blank"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Voices
          </Link>
          <Link
            href="https://docs.heygen.com/reference/new-session-copy"
            target="_blank"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            API Docs
          </Link>
          <Link
            href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
            target="_blank"
            className="hover:text-blue-600 transition-colors duration-200"
          >
            Guide
          </Link>
          <Link
            aria-label="Github"
            className="flex flex-row justify-center gap-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
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
    </>
  );
}
