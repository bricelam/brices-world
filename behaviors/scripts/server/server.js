const system = server.registerSystem(0, 0);

system.initialize = function() {
    let config = this.createEventData("minecraft:script_logger_config");
    config.data.log_information = true;
    this.broadcastEvent("minecraft:script_logger_config", config);

    this.listenForEvent(
        "minecraft:block_destruction_stopped",
        e => this.log("block_destruction_stopped", e));
    this.listenForEvent(
        "minecraft:block_interacted_with",
        e => this.log("block_interacted_with", e));
    this.listenForEvent(
        "minecraft:player_destroyed_block",
        e => this.log("player_destroyed_block", e));
    this.listenForEvent(
        "minecraft:player_placed_block",
        e => this.log("player_placed_block", e));
};

system.log = function(name, e) {
    let position = e.data.block_position;
    server.log("##minecraft[" + name + " player='" + e.data.player.id + "' position='" + position.x + " " + position.y + " " + position.z + "']");
};