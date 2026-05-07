import { Mail } from "lucide-react";
import { IconPill } from "../ui/pill";

export default function Contact() {
  return (
    <div
      id="contact-sticky"
      className="min-h-screen bg-black flex flex-col items-center gap-10"
    >
      <div
        id="header"
        className="w-fill h-auto items-center justify-center flex flex-col gap-5 text-white mt-40"
      >
        <h2 className="font-extrabold text-5xl max-w-3xl text-center">
          Tell us what you want to{" "}
          <span className="text-accent italic"> delegate </span>
        </h2>
        <p className="text-lg max-w-3xl text-center">
          Share the role, workload, or workflow you need help with. We'll help
          shape the right support setup for your business.
        </p>
      </div>

      <div
        id="contact-pills"
        className="flex flex-row gap-4 w-fit items-center justify-center mt-4"
      >
        <IconPill icon={Mail} label="info@sngroup.com.au" variant="dark" />
        <IconPill
          icon={
            <img
              src="/linkedin-svgrepo-com.svg"
              className="w-full h-full"
              alt="LinkedIn"
            />
          }
          label="SN International Group"
          variant="dark"
        />
      </div>
    </div>
  );
}
