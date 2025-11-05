import Technologies from '@/components/Technologies';
import BubbleTimeline from '@/components/BubbleTimeline';
import EducationClientsTimelineWrapper from '@/components/EducationClientsTimelineWrapper';

export default function Home() {
  return (
    <div className="bg-secondary text-main w-full p-safe-or-4 lg:p-safe-or-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-extrabold text-2xl lg:text-6xl">
            Ar
            <span className="text-third">tur-Yur</span>
            ii
          </h1>
          <h1 className="font-extrabold text-2xl lg:text-6xl">Korchynskyi</h1>
          <h2 className="text-xl lg:text-5xl">Protocol Engineer</h2>
        </div>
      </div>
      <Technologies />
      <BubbleTimeline />
      <EducationClientsTimelineWrapper />
    </div>
  );
}
