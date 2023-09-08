using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class SourceFile : Node
{
    public SyntaxKind Kind { get; set; }

    public List<Node> Statements { get; set; }
}
