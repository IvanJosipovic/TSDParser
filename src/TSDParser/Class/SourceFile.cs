using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class SourceFile : Node
{
    public List<Node> Statements { get; set; }
}
