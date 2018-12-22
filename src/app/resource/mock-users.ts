import { User } from "../entity/user";

/**
 * ユーザのモックデータ定数。
 */
export const Users: User[] = [
    { userId: "1000", name: "sample user", email: "test@example.com", password: "testtest", usedFlag: "0" },
    { userId: "1001", name: "sample user2", email: "test2@example.com", password: "testtest", usedFlag: "0" }
]