import Technologies from '@/components/Technologies';
import BubbleTimeline from '@/components/BubbleTimeline';
import Languages from '@/components/Languages';
import EducationClientsTimelineWrapper from '@/components/features/Experience/EducationClientsTimelineWrapper';

export default function Home() {
  return (
    <div className="bg-secondary text-primary w-full p-safe-or-4 lg:p-safe-or-16">
      {/* Hero Section */}
      <div className="mb-8 lg:mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-extrabold text-2xl lg:text-5xl">
              Ar
              <span className="text-accent">tur-Yur</span>
              ii
            </h1>
            <h1 className="font-extrabold text-2xl lg:text-5xl">Korchynskyi</h1>
            <h2 className="text-lg lg:text-3xl mt-2">Protocol Engineer</h2>
          </div>
          {/* Journey and Languages in top right corner */}
          <div className="hidden lg:flex flex-col gap-4">
            <BubbleTimeline />
            <Languages />
          </div>
        </div>

        {/* Technologies below Protocol Engineer */}
        <Technologies />
      </div>

      {/* Journey and Languages for mobile - below technologies */}
      <div className="lg:hidden mb-8 space-y-4">
        <BubbleTimeline />
        <Languages />
      </div>

      {/* Experience Timeline */}
      <EducationClientsTimelineWrapper />
    </div>
  );
}
