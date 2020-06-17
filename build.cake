#addin nuget:?package=Cake.Json&version=4.0.0
#addin nuget:?package=Newtonsoft.Json&version=11.0.2

var target = Argument("target", "Default");

Task("Bump")
    .Does(
        () =>
        {
            dynamic resources = ParseJsonFromFile(@"resources\manifest.json");
            resources.header.version[2].Value++;
            SerializeJsonToPrettyFile(@"resources\manifest.json", resources);

            dynamic behaviors = ParseJsonFromFile(@"behaviors\manifest.json");
            behaviors.header.version[2].Value++;
            behaviors.dependencies[0].version[2].Value++;
            SerializeJsonToPrettyFile(@"behaviors\manifest.json", behaviors);
        });

Task("Build")
    .IsDependentOn("Bump")
    .Does(
        () =>
        {
            Zip("resources", "resources.mcpack");
            Zip("behaviors", "behaviors.mcpack");
        });

Task("Default")
    .IsDependentOn("Build");

RunTarget(target);
