using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class JSDoc : Node
{
    [JsonConverter(typeof(JSDocConverter))]
    public List<Node> Comment { get; set; }

    public List<Node> Tags { get; set; }
}
