"use client";

import Link from "next/link";
import { EnvironmentUtils } from "@/app/lib/environment-utils";

import { GithubIcon, HeyGenLogo } from "./Icons";

export default function NavBar() {
  const branding = EnvironmentUtils.getBranding();
  const isDemo = EnvironmentUtils.isDemo();
  const isDevelopment = EnvironmentUtils.isDevelopment();

  return (
    <>
      <div className="flex flex-row justify-between items-center w-[1000px] m-auto p-6">
        <div className="flex flex-row items-center gap-4">
          <Link href="https://app.heygen.com/" target="_blank">
            <HeyGenLogo />
          </Link>
          <div className="bg-gradient-to-br from-sky-300 to-indigo-500 bg-clip-text">
            <p className="text-xl font-semibold text-transparent">
              {branding.title || "HeyGen Interactive Avatar SDK NextJS Demo"}
            </p>
          </div>
          {isDevelopment && (
            <span className="bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
              DEV
            </span>
          )}
          {isDemo && (
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
              DEMO
            </span>
          )}
        </div>
        
        <div className="flex flex-row items-center gap-6">
          {/* Show full navigation in development */}
          {isDevelopment && (
            <>
              <Link
                href="https://labs.heygen.com/interactive-avatar"
                target="_blank"
              >
                Avatars
              </Link>
              <Link
                href="https://docs.heygen.com/reference/list-voices-v2"
                target="_blank"
              >
                Voices
              </Link>
              <Link
                href="https://docs.heygen.com/reference/new-session-copy"
                target="_blank"
              >
                API Docs
              </Link>
              <Link
                href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
                target="_blank"
              >
                Guide
              </Link>
              <Link
                aria-label="Github"
                className="flex flex-row justify-center gap-1 text-foreground"
                href="https://github.com/HeyGen-Official/StreamingAvatarSDK"
                target="_blank"
              >
                <GithubIcon className="text-default-500" />
                SDK
              </Link>
            </>
          )}
          
          {/* Limited navigation for production/demo */}
          {!isDevelopment && (
            <>
              <Link
                href="https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide"
                target="_blank"
              >
                Guide
              </Link>
              {!isDemo && (
                <Link
                  href="https://app.heygen.com/"
                  target="_blank"
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
                >
                  Learn More
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
