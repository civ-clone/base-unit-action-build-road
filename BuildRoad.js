"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildRoad = exports.COMPLETE = void 0;
const BuildingRoad_1 = require("./Rules/BuildingRoad");
const DelayedAction_1 = require("@civ-clone/core-unit/DelayedAction");
const Moved_1 = require("@civ-clone/core-unit/Rules/Moved");
const MovementCost_1 = require("@civ-clone/core-unit/Rules/MovementCost");
const Road_1 = require("@civ-clone/base-tile-improvement-road/Road");
const registerDelayedAction_1 = require("@civ-clone/core-unit/registerDelayedAction");
exports.COMPLETE = 'base-unit-action-build-road:complete';
class BuildRoad extends DelayedAction_1.default {
    perform() {
        const [moveCost] = this.ruleRegistry()
            .process(MovementCost_1.default, this.unit(), this)
            .sort((a, b) => b - a);
        super.perform(moveCost || 0, exports.COMPLETE, BuildingRoad_1.default);
        this.ruleRegistry().process(Moved_1.default, this.unit(), this);
    }
}
exports.BuildRoad = BuildRoad;
// Registered here rather than passed to `perform` as a closure: a closure
// cannot be written to a file, which is why a unit part-way through this could
// not be saved. The save records the identifier; the behaviour stays here.
(0, registerDelayedAction_1.default)({
    BusyRule: BuildingRoad_1.default,
    handler: exports.COMPLETE,
    action: (unit) => new BuildRoad(unit.tile(), unit.tile(), unit),
    complete: (unit) => {
        new Road_1.default(unit.tile());
    },
});
exports.default = BuildRoad;
//# sourceMappingURL=BuildRoad.js.map