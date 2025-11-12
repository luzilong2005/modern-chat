import { faker } from "@faker-js/faker";

export const mockConversations = Array.from({ length: 100 }, (_, idx) => {
    return {
        id: idx,
        title: faker.lorem.lines(1),
        updateDate: faker.date.past(),
    };
});

export const mockMessages = Array.from({ length: 100 }, (_, idx) => {
    return {
        id: idx,
        conversationId: faker.number.int({ min: 0, max: 199 }),
        title: faker.lorem.lines(1),
        content: faker.lorem.lines(faker.number.int({ min: 1, max: 50 })),
        sender: ["user", "bot"][faker.number.int({ min: 0, max: 1 })],
        sendDate: faker.date.past(),
    };
});
