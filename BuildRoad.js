"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildRoad = void 0;
const BuildingRoad_1 = require("./Rules/BuildingRoad");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const Road_1 = require("@civ-clone/base-tile-improvement-road/Road");
class BuildRoad extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, () => {
            new Road_1.default(this.unit().tile());
        }, BuildingRoad_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.BuildRoad = BuildRoad;
exports.default = BuildRoad;
//# sourceMappingURL=BuildRoad.js.map