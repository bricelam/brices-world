#addin nuget:?package=Cake.Json&version=4.0.0

var target = Argument("target", "Default");

Task("Bump")
    .Does(
        () =>
        {
            dynamic behaviors = ParseJsonFromFile(@"behaviors\manifest.json");
            behaviors.header.version[2].Value++;
            SerializeJsonToPrettyFile(@"behaviors\manifest.json", behaviors);
        });

Task("Build")
    .IsDependentOn("Bump")
    .Does(
        () =>
        {
            Zip("behaviors", "behaviors.mcpack");
        });

Task("Default")
    .IsDependentOn("Build");

RunTarget(target);
