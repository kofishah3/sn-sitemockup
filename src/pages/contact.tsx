import { Mail } from "lucide-react";
import { IconPill } from "../components/ui/pill";
import TopNavBar from "../components/navigation/top-navbar";
import Footer from "../components/navigation/footer";
import BriefForm from "../components/input/brief-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-bg flex flex-col">
      <TopNavBar />
      <div className="grow flex flex-col items-center justify-center gap-10 px-6 mt-20">
        <div className="w-full max-w-4xl flex flex-col gap-6 text-black text-center items-center">
          <h2 className="font-display font-extrabold text-4xl md:text-6xl ">
            Tell us what you want to{" "}
            <span className="text-accent italic font-bold"> delegate </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
            Share the role, workload, or workflow you need help with. We'll help
            shape the right support setup for your business.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full max-w-4xl items-center justify-center">
          <IconPill icon={Mail} label="info@sngroup.com.au" variant="light" />
          <IconPill
            icon={
              <img
                src="/linkedin-svgrepo-com.svg"
                className="w-full h-full"
                alt="LinkedIn"
              />
            }
            label="SN International Group"
            variant="light"
          />
        </div>

        <div className="w-full max-w-4xl">
          <BriefForm variant="light" />
        </div>
      </div>
      <Footer />
    </main>
  );
}
