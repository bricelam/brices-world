// Everyone feels better after a good night's sleep.

import {
  EntityComponentTypes,
  EntityHealthComponent,
  MinecraftDimensionTypes,
  Player,
  system,
  TimeOfDay,
  world,
} from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftEntityTypes } from "@minecraft/vanilla-data";

export function addSleepHeals() {
  world.afterEvents.playerInteractWithBlock.subscribe((e) => {
    if (e.block.typeId != MinecraftBlockTypes.Bed || !e.player.isSleeping) return;

    waitForMorning(99);
  });
  world.afterEvents.playerDimensionChange.subscribe((e) => {
    if (e.fromDimension.id != MinecraftDimensionTypes.overworld) return;
    if (world.getTimeOfDay() >= 200) return;

    sleptThroughNight();
  });
  world.afterEvents.playerLeave.subscribe(() => {
    if (world.getTimeOfDay() == 0) {
      sleptThroughNight();
    } else {
      waitForMorning(40);
    }
  });
  world.afterEvents.entityDie.subscribe(
    (e) => {
      if (e.deadEntity.dimension.id != MinecraftDimensionTypes.overworld) return;
      if (world.getTimeOfDay() != 0) return;

      sleptThroughNight();
    },
    { entityTypes: [MinecraftEntityTypes.Player] }
  );
}

function waitForMorning(expectBy: number) {
  const players = getPlayers();
  if (players.length == 0 || !players.every((p) => p.isSleeping)) return;

  system.runTimeout(expectMorning, expectBy);
}

function getPlayers() {
  return world
    .getDimension(MinecraftDimensionTypes.overworld)
    .getPlayers()
    .filter((p) => getHealth(p).currentValue > 0);
}

function getHealth(player: Player) {
  return player.getComponent(EntityComponentTypes.Health) as EntityHealthComponent;
}

function expectMorning() {
  if (world.getTimeOfDay() > TimeOfDay.Sunset) return;

  sleptThroughNight();
}

function sleptThroughNight() {
  getPlayers().forEach((p) => getHealth(p).resetToMaxValue());
}
