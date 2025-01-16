// So you like cutting grass and breaking pots with a sword? Your efforts will
// no longer go unrewarded!

import { ItemStack, world } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/vanilla-data";

export function addGrassDrops() {
  const swordTypes = [
    MinecraftItemTypes.WoodenSword,
    MinecraftItemTypes.StoneSword,
    MinecraftItemTypes.IronSword,
    MinecraftItemTypes.GoldenSword,
    MinecraftItemTypes.DiamondSword,
    MinecraftItemTypes.NetheriteSword,
  ];

  world.afterEvents.playerBreakBlock.subscribe(
    (e) => {
      if (e.itemStackBeforeBreak == null || !swordTypes.includes(e.itemStackBeforeBreak.typeId as MinecraftItemTypes))
        return;

      let chance = Math.random();
      if (chance < 0.125) {
        let itemType;
        chance *= 8.0;
        if (chance < 0.25) {
          itemType = MinecraftItemTypes.Emerald;
        } else if (chance < 0.5) {
          itemType = MinecraftItemTypes.Arrow;
        } else {
          itemType = MinecraftItemTypes.Apple;
        }

        e.dimension.spawnItem(new ItemStack(itemType), e.block.location);
      }
    },
    {
      blockTypes: [
        MinecraftBlockTypes.ShortGrass,
        MinecraftBlockTypes.TallGrass,
        MinecraftBlockTypes.DecoratedPot,
        MinecraftBlockTypes.Fern,
        MinecraftBlockTypes.LargeFern,
      ],
    }
  );
}
