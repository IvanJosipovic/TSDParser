using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class JSDocComment : Node
{
    public SyntaxKind Kind { get; set; }

    public string Comment { get; set; }
}
