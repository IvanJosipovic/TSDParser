using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class Identifier : Node
{
    public SyntaxKind Kind { get; set; }

    public string EscapedText { get; set; }
}
