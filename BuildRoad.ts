import { Moved, IMovedRegistry } from '@civ-clone/core-unit/Rules/Moved';
import {
  MovementCost,
  IMovementCostRegistry,
} from '@civ-clone/core-unit/Rules/MovementCost';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Road from '@civ-clone/base-tile-improvement-road/Road';

export class BuildRoad extends DelayedAction {
  perform(): void {
    const [
      moveCost,
    ]: number[] = (this.ruleRegistry() as IMovementCostRegistry)
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(moveCost || 0, (): void => {
      new Road(this.unit().tile());
    });

    (this.ruleRegistry() as IMovedRegistry).process(Moved, this.unit(), this);
  }
}

export default BuildRoad;
