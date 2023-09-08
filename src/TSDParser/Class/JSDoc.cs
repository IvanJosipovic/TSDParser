using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class JSDoc : Node
{
    public SyntaxKind Kind { get; set; }

    //[JsonConverter(typeof(SingleOrArrayConverter<string>))]
    //public List<Node> Comment { get; set; }
}
