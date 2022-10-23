import BuildingRoad from './Rules/BuildingRoad';
import DelayedAction from '@civ-clone/core-unit/DelayedAction';
import Moved from '@civ-clone/core-unit/Rules/Moved';
import MovementCost from '@civ-clone/core-unit/Rules/MovementCost';
import Road from '@civ-clone/base-tile-improvement-road/Road';

export class BuildRoad extends DelayedAction {
  perform(): void {
    const [moveCost]: number[] = this.ruleRegistry()
      .process(MovementCost, this.unit(), this)
      .sort((a: number, b: number): number => b - a);

    super.perform(
      moveCost || 0,
      (): void => {
        new Road(this.unit().tile());
      },
      BuildingRoad
    );

    this.ruleRegistry().process(Moved, this.unit(), this);
  }
}

export default BuildRoad;
