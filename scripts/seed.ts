import "dotenv/config";

import { drizzle } from "drizzle-orm/neon-http";

import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);


        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "English",
                imageSrc: "/gb.svg"
            },
            {
                id: 2,
                title: "Vietnamese",
                imageSrc: "/vn.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "/fr.svg"
            },
            {
                id: 4,
                title: "Chinese",
                imageSrc: "/cn.svg"
            }
        ]);

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of English",
                order: 1,
            }
        ]);
        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verb"
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Nouns"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verb"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Nouns"
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Đâu là từ miêu tả "người đàn ông"?'
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: 'Thây ma'
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 3,
                question: 'Đâu là từ miêu tả "người phụ nữ"'
            }
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "The man",
                audioSrc: "/en_man.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/zombie.svg",
                correct: false,
                text: "The zombie",
                audioSrc: "/en_zombie.mp3"
            },
            {
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "The robot",
                audioSrc: "/en_robot.mp3",
            }
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: false,
                text: "The man",
                audioSrc: "/en_man.mp3"
            },
            {
                challengeId: 2,
                correct: true,
                text: "The zombie",
                audioSrc: "/en_zombie.mp3"
            },
            {
                challengeId: 2,
                correct: false,
                text: "The robot",
                audioSrc: "/en_robot.mp3",
            },
        ]);
        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/man.svg",
                correct: false,
                text: "The man",
                audioSrc: "/en_man.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/zombie.svg",
                correct: false,
                text: "The zombie",
                audioSrc: "/en_zombie.mp3"
            },
            {
                challengeId: 3,
                imageSrc: "/woman.svg",
                correct: true,
                text: "The woman",
                audioSrc: "/en_woman.mp3"
            }
        ]);
        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Đâu là từ miêu tả "người đàn ông"?'
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: 'Thây ma'
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 3,
                question: 'Đâu là từ miêu tả "người phụ nữ"'
            }
        ]);
        console.log("Seeding finished");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();