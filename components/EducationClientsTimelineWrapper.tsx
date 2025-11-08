import EducationClientsTimeline from './EducationClientsTimeline';
import educationClientData from '../public/education_client_data.json';
import DevHub from './DevHub';

interface TimelineType {
    id: string;
    position: string;
    timeline: string;
    description: string;
    url: string;
    website: string;
    image_url: string;
    type: string;
    is_education: boolean;
    company?: string;
    via?: string;
    tags?: string;
    ended_year?: number;
}

export default function EducationClientsTimelineWrapper() {
    return <EducationClientsTimeline data={educationClientData} />;
}
