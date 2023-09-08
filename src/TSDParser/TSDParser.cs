using Jering.Javascript.NodeJS;
using System.Text.Json;

namespace TSDParser;

public static class TSDParser
{
    public static async Task<SourceFile?> ParseDefinition(string definition)
    {
        var result = await StaticNodeJSService.InvokeFromFileAsync<string>("wrapper.js", args: new object[] { definition });

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
