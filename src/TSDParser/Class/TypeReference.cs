namespace TSDParser.Class;

public class TypeReference : Node
{
    public Identifier TypeName { get; set; }

    public List<Node> TypeArguments { get; set; }
}
