using System.Text.Json.Serialization;

namespace TSDParser.Class;

public class TypeParameter : Node
{
    public SyntaxKind Kind { get; set; }

    public Identifier Name { get; set; }

    public Node Constraint { get; set; }

    public Node Default { get; set; }
}
