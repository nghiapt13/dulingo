import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";
import { getTranslations } from "next-intl/server";

const CoursesPage = async () => {
    const t = await getTranslations('Courses');
    const courses = await getCourses();
    const userProgress = await getUserProgress();
    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                {t('title')}
            </h1>
            <List
                courses={courses}
                activeCourseId={userProgress?.activeCourseId}
            
            />
        </div>
    );
}

export default CoursesPage;