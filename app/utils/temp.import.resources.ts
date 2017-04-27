import {getLogger} from "./logger";
import {Schemas} from "../resources/schemas";
import {DB} from "../resources/ensure.schemas";

const logger = getLogger('temp.import.resources');

export async function addMocksToDB() {
    // Process
    try {
        let genericModel = DB.model(Schemas.Generic);

        for (let i = 1; i < 100; i++) {
            await new genericModel({
                testField: "TEST_FIELD_VALUE" + (2 * i),
                genericNumber: i,
                genericUnk: "TEST UNK: " + (i)
            }).save();
        }
    } catch (er) {
        logger.info(er)
    }
}
