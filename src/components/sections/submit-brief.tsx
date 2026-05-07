import BriefForm from "../input/brief-form";

export default function SubmitBrief() {
  return (
    <section
      id="cta"
      className="bg-black py-24 px-6 md:px-12 gap-20 
       overflow-hidden items-center flex justify-center"
    >
      <div className="items-center justify-between flex flex-col md:flex-row lg:max-w-8xl">
        <div className="z-10">
          <h2 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white mb-6">
            Ready to build your{" "}
            <span className="text-accent-mid italic font-bold">
              support team?
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-md">
            Submit a brief and we'll match you with the right service track.
            Most teams are live within 7 days
          </p>
        </div>

        <BriefForm variant="dark" />
      </div>
    </section>
  );
}
