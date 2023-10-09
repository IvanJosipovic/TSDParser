using Jering.Javascript.NodeJS;
using System.Reflection;
using System.Text.Json;

namespace TSDParser;

public static class TSDParser
{
    public static async Task<SourceFile?> ParseDefinition(string definition)
    {
        var assembly = Assembly.GetExecutingAssembly();
        var resourceName = "TSDParser.dist.bundle.js";

        using Stream stream = assembly.GetManifestResourceStream(resourceName);

        var result = await StaticNodeJSService.InvokeFromStreamAsync<string>(stream, "bundle.js", null, args: new object[] { definition });

        return JsonSerializer.Deserialize<SourceFile>(result!, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true,
            Converters =
        {
            new JsonPolymorphicConverter<Node>(discriminatorPropertyName: "kind")
        }
        });
    }
}
